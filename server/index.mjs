// Optional accounts backend for Playground. One process serves the built
// `dist/` app AND a small JSON API for sign-up/login, cross-device progress
// sync, and a leaderboard. The app works fully WITHOUT this server (offline,
// localStorage) — accounts are purely additive.
//
//   node server/index.mjs          # serves ./dist on :8787 (override with PORT)
//   JWT_SECRET=... PORT=8080 node server/index.mjs
//
import express from "express";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";
import { runRemote } from "./runner.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8787);
const DIST = process.env.DIST_DIR || join(__dirname, "..", "dist");
const DB_PATH = process.env.DB_PATH || join(__dirname, "data.db");
const JWT_SECRET = process.env.JWT_SECRET || "dev-insecure-secret-change-me";
const XP_PER_LESSON = 50;

if (JWT_SECRET === "dev-insecure-secret-change-me") {
  console.warn("⚠  Using a default JWT secret. Set JWT_SECRET in production.");
}

// ── DB ──────────────────────────────────────────────────────────────────────
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    pass_hash TEXT NOT NULL,
    created INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS progress (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    data TEXT NOT NULL,
    xp INTEGER NOT NULL DEFAULT 0,
    lessons INTEGER NOT NULL DEFAULT 0,
    updated INTEGER NOT NULL
  );
`);

const q = {
  insertUser: db.prepare("INSERT INTO users (username, pass_hash, created) VALUES (?, ?, ?)"),
  userByName: db.prepare("SELECT * FROM users WHERE username = ?"),
  userById: db.prepare("SELECT id, username FROM users WHERE id = ?"),
  getProgress: db.prepare("SELECT data FROM progress WHERE user_id = ?"),
  upsertProgress: db.prepare(`
    INSERT INTO progress (user_id, data, xp, lessons, updated) VALUES (@uid, @data, @xp, @lessons, @t)
    ON CONFLICT(user_id) DO UPDATE SET data=@data, xp=@xp, lessons=@lessons, updated=@t
  `),
  leaderboard: db.prepare(`
    SELECT u.username AS username, p.xp AS xp, p.lessons AS lessons
    FROM progress p JOIN users u ON u.id = p.user_id
    ORDER BY p.xp DESC, p.lessons DESC LIMIT 25
  `),
};

// ── helpers ───────────────────────────────────────────────────────────────────
const sign = (user) => jwt.sign({ uid: user.id, username: user.username }, JWT_SECRET, { expiresIn: "60d" });

function auth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Sign in required." });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Session expired — sign in again." });
  }
}

const validName = (s) => typeof s === "string" && /^[a-zA-Z0-9_]{3,20}$/.test(s);

function statsFrom(state) {
  const completed = state && state.completed && typeof state.completed === "object" ? state.completed : {};
  const lessons = Object.keys(completed).length;
  return { lessons, xp: lessons * XP_PER_LESSON };
}

// ── app ───────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json({ limit: "1mb" }));

app.post("/api/auth/signup", (req, res) => {
  const { username, password } = req.body || {};
  if (!validName(username)) return res.status(400).json({ error: "Username: 3–20 letters, numbers, or _." });
  if (typeof password !== "string" || password.length < 6)
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  if (q.userByName.get(username)) return res.status(409).json({ error: "That username is taken." });
  const hash = bcrypt.hashSync(password, 10);
  const info = q.insertUser.run(username, hash, Date.now());
  const user = { id: info.lastInsertRowid, username };
  res.json({ token: sign(user), username });
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  const row = q.userByName.get(String(username || ""));
  if (!row || !bcrypt.compareSync(String(password || ""), row.pass_hash))
    return res.status(401).json({ error: "Wrong username or password." });
  res.json({ token: sign(row), username: row.username });
});

app.get("/api/me", auth, (req, res) => {
  const row = q.userById.get(req.user.uid);
  if (!row) return res.status(404).json({ error: "No such user." });
  res.json({ username: row.username });
});

app.get("/api/progress", auth, (req, res) => {
  const row = q.getProgress.get(req.user.uid);
  res.json({ state: row ? JSON.parse(row.data) : null });
});

app.put("/api/progress", auth, (req, res) => {
  const state = req.body && req.body.state;
  if (!state || typeof state !== "object") return res.status(400).json({ error: "Missing progress state." });
  const { xp, lessons } = statsFrom(state);
  q.upsertProgress.run({ uid: req.user.uid, data: JSON.stringify(state), xp, lessons, t: Date.now() });
  res.json({ ok: true, xp, lessons });
});

app.get("/api/leaderboard", (_req, res) => {
  res.json({ entries: q.leaderboard.all() });
});

// Compile + run Swift/Java/Rust/Bash server-side, so the browser never has to
// reach a third-party compiler directly (fixes flaky client-side fetches).
const RUNNABLE = new Set(["swift", "java", "rust", "bash"]);
app.post("/api/run", async (req, res) => {
  const { track, code } = req.body || {};
  if (!RUNNABLE.has(track)) return res.status(400).json({ error: `Can't run "${track}" here.` });
  if (typeof code !== "string" || code.length > 100_000)
    return res.status(400).json({ error: "Missing or oversized code." });
  try {
    res.json(await runRemote(track, code));
  } catch (e) {
    res.json({ ok: false, stdout: "", stderr: String(e), error: "Runner failed.", serviceError: true });
  }
});

// ── static app (SPA) ──────────────────────────────────────────────────────────
if (existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get("*", (_req, res) => res.sendFile(join(DIST, "index.html")));
} else {
  app.get("/", (_req, res) =>
    res.send("API is running. Build the app (npm run build) so this server can serve ./dist."),
  );
}

app.listen(PORT, () => console.log(`Playground server on http://localhost:${PORT}  (API at /api, app from ${DIST})`));
