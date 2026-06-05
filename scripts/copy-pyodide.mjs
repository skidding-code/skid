/**
 * Copies the core Pyodide runtime from node_modules into public/pyodide so the
 * app serves Python from its own origin instead of a CDN. This makes Python
 * work offline (as a PWA) and removes a third-party runtime dependency.
 *
 * Only the core files are copied (no scientific packages) — the lessons use the
 * standard library only, which keeps this to ~12 MB.
 */
import { mkdirSync, copyFileSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules", "pyodide");
const dest = join(root, "public", "pyodide");

const CORE = [
  "pyodide.mjs",
  "pyodide.asm.js",
  "pyodide.asm.wasm",
  "python_stdlib.zip",
  "pyodide-lock.json",
];

if (!existsSync(src)) {
  console.error("pyodide not found in node_modules — run `npm install` first.");
  process.exit(1);
}

mkdirSync(dest, { recursive: true });
let bytes = 0;
for (const f of CORE) {
  const from = join(src, f);
  const to = join(dest, f);
  copyFileSync(from, to);
  bytes += statSync(to).size;
}
console.log(`Copied ${CORE.length} Pyodide files (${(bytes / 1e6).toFixed(1)} MB) -> public/pyodide`);
