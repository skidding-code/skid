/**
 * Tiny client for the optional accounts backend (server/index.mjs). Same-origin
 * by default (the Node server serves the app + the API); override with
 * VITE_API_URL for a split deployment. Everything degrades gracefully: if the
 * server isn't there, the app just stays local-only.
 */

const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
const TOKEN_KEY = "playground-token";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string | null) =>
  t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY);

async function req<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error || `Request failed (${res.status})`);
  return body as T;
}

export interface AuthResult {
  token: string;
  username: string;
}
export interface LeaderEntry {
  username: string;
  xp: number;
  lessons: number;
}

export const api = {
  signup: (username: string, password: string) =>
    req<AuthResult>("/api/auth/signup", { method: "POST", body: JSON.stringify({ username, password }) }),
  login: (username: string, password: string) =>
    req<AuthResult>("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  me: () => req<{ username: string }>("/api/me"),
  getProgress: () => req<{ state: Record<string, unknown> | null }>("/api/progress"),
  putProgress: (state: Record<string, unknown>) =>
    req<{ ok: boolean; xp: number; lessons: number }>("/api/progress", {
      method: "PUT",
      body: JSON.stringify({ state }),
    }),
  leaderboard: () => req<{ entries: LeaderEntry[] }>("/api/leaderboard"),
};

/** Whether an accounts backend is reachable (so we only show the UI if so). */
export async function backendAvailable(): Promise<boolean> {
  try {
    await req("/api/leaderboard");
    return true;
  } catch {
    return false;
  }
}
