import { create } from "zustand";
import { api, getToken, setToken, backendAvailable } from "../net/api";
import { useProgress, type SyncState } from "./progress";

type Status = "loading" | "anon" | "in";

interface AuthState {
  username: string | null;
  status: Status;
  /** null = unknown, false = no backend reachable, true = backend present. */
  hasBackend: boolean | null;
  syncing: boolean;
  error: string | null;

  init: () => Promise<void>;
  signup: (u: string, p: string) => Promise<boolean>;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => void;
  pushNow: () => Promise<void>;
}

/** The syncable slice of the progress store. */
function snapshot(): SyncState {
  const s = useProgress.getState();
  return {
    completed: s.completed,
    saved: s.saved,
    streak: s.streak,
    lastActiveDay: s.lastActiveDay,
    placement: s.placement,
    planEnabled: s.planEnabled,
  };
}

let pushTimer: number | undefined;
let subscribed = false;

export const useAuth = create<AuthState>((set, get) => ({
  username: null,
  status: "loading",
  hasBackend: null,
  syncing: false,
  error: null,

  init: async () => {
    const ok = await backendAvailable();
    set({ hasBackend: ok });
    if (!ok) {
      set({ status: "anon" });
      return;
    }
    // Push local changes (debounced) whenever signed in.
    if (!subscribed) {
      subscribed = true;
      useProgress.subscribe(() => {
        if (get().status !== "in") return;
        window.clearTimeout(pushTimer);
        pushTimer = window.setTimeout(() => void get().pushNow(), 1500);
      });
    }
    if (!getToken()) {
      set({ status: "anon" });
      return;
    }
    try {
      const me = await api.me();
      set({ username: me.username, status: "in" });
      const { state } = await api.getProgress();
      if (state) useProgress.getState().mergeRemote(state as Partial<SyncState>);
      await get().pushNow(); // push the merged result back
    } catch {
      setToken(null);
      set({ status: "anon", username: null });
    }
  },

  signup: async (u, p) => {
    set({ error: null });
    try {
      const r = await api.signup(u, p);
      setToken(r.token);
      set({ username: r.username, status: "in" });
      await get().pushNow(); // seed the account with current local progress
      return true;
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Sign up failed." });
      return false;
    }
  },

  login: async (u, p) => {
    set({ error: null });
    try {
      const r = await api.login(u, p);
      setToken(r.token);
      set({ username: r.username, status: "in" });
      const { state } = await api.getProgress();
      if (state) useProgress.getState().mergeRemote(state as Partial<SyncState>);
      await get().pushNow();
      return true;
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Login failed." });
      return false;
    }
  },

  logout: () => {
    setToken(null);
    set({ username: null, status: "anon", error: null });
  },

  pushNow: async () => {
    if (get().status !== "in") return;
    set({ syncing: true });
    try {
      await api.putProgress(snapshot() as unknown as Record<string, unknown>);
    } catch {
      /* offline / transient — the next change retries */
    } finally {
      set({ syncing: false });
    }
  },
}));
