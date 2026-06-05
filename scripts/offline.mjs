import { chromium } from "playwright";

/**
 * Verifies the offline PWA promise end-to-end:
 *   1. load the app online and register the service worker,
 *   2. run a Python lesson online (this fetches Pyodide, which the SW caches),
 *   3. go offline and FULL-RELOAD the page (served from the SW cache),
 *   4. boot a fresh Python worker and run a lesson with NO network — Pyodide
 *      must load from cache and the lesson must still grade green.
 *
 * If anything needed wasn't cached, step 4 fails — which is the whole point.
 */

const BASE = process.env.BASE_URL || "http://localhost:4173";
const log = (...a) => console.log(...a);

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

let failures = 0;
const expect = (cond, label) => {
  if (cond) log(`  ✅ ${label}`);
  else {
    failures++;
    log(`  ❌ ${label}`);
  }
};

const runLessonAndPass = async (id) => {
  await page.evaluate((lid) => (location.hash = `#/lesson/${lid}`), id);
  await page.waitForSelector(".cm-editor", { timeout: 15000 });
  await page.getByRole("button", { name: /reveal solution/i }).click();
  await page.getByRole("button", { name: /^► Run/ }).click();
  await page.waitForFunction(
    () => document.querySelector(".results__status")?.textContent?.includes("All goals met"),
    null,
    { timeout: 90000, polling: 400 },
  );
};

log("ONLINE warm-up");
await page.goto(`${BASE}/#/lesson/py-hello`, { waitUntil: "networkidle" });
const swReady = await page.evaluate(() =>
  "serviceWorker" in navigator
    ? navigator.serviceWorker.ready.then(() => true).catch(() => false)
    : false,
);
expect(swReady, "service worker registered");

// Reload so the SW controls the page (and its worker's fetches).
await page.reload({ waitUntil: "networkidle" });
const controlled = await page.evaluate(() => !!navigator.serviceWorker.controller);
expect(controlled, "service worker controls the page");

await runLessonAndPass("py-hello"); // caches Pyodide via the SW
log("  · online Python run cached the runtime");

log("OFFLINE");
await ctx.setOffline(true);
await page.reload({ waitUntil: "load" });
const stillThere = await page.$(".app, #root");
expect(!!stillThere, "app shell loads from cache while offline");

try {
  await runLessonAndPass("py-math"); // fresh worker boots Pyodide from cache
  expect(true, "Python lesson runs and grades green with NO network");
} catch (e) {
  expect(false, `Python offline run failed: ${String(e).split("\n")[0]}`);
}

await ctx.setOffline(false);
await browser.close();

if (errors.length) log("page errors: " + errors.slice(0, 3).join(" | "));
log(`\nOFFLINE_EXIT: ${failures === 0 ? 0 : 1}`);
process.exit(failures === 0 ? 0 : 1);
