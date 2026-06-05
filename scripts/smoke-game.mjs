import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:4173";
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
let fails = 0;
const ok = (c, m) => (c ? console.log(`  ✅ ${m}`) : (fails++, console.log(`  ❌ ${m}`)));

// Complete a lesson → expect an XP reward toast.
await page.goto(`${BASE}/#/lesson/py-hello`, { waitUntil: "networkidle" });
await page.waitForSelector(".cm-editor", { timeout: 15000 });
await page.getByRole("button", { name: /reveal solution/i }).click();
await page.getByRole("button", { name: /^► Run/ }).click();
await page.waitForFunction(
  () => document.querySelector(".results__status")?.textContent?.includes("All goals met"),
  null,
  { timeout: 90000, polling: 300 },
);
const toast = await page.waitForSelector(".toast", { timeout: 5000 }).then(() => true).catch(() => false);
ok(toast, "XP reward toast appears on completion");
const toastText = toast ? await page.$eval(".toast", (el) => el.textContent || "") : "";
ok(/XP/.test(toastText), `toast mentions XP (got: ${JSON.stringify(toastText.slice(0, 40))})`);

// Progress page reflects it: level, a stat, and the first badge earned.
await page.goto(`${BASE}/#/progress`, { waitUntil: "networkidle" });
await page.waitForSelector(".profile-hero", { timeout: 10000 });
const earned = await page.$$eval(".badge--earned", (els) => els.length);
ok(earned >= 1, `at least one badge earned (got ${earned})`);
const xpShown = await page.$eval(".profile-hero", (el) => el.textContent || "");
ok(/Level\s*1/i.test(xpShown), "profile shows a level");

// Header shows the level/streak chip after progress exists.
await page.goto(`${BASE}/#/`, { waitUntil: "networkidle" });
const chip = await page.$(".appbar__stats");
ok(!!chip, "header shows the level/XP chip");

await browser.close();
console.log(`\nGAME_EXIT: ${fails === 0 ? 0 : 1}`);
process.exit(fails === 0 ? 0 : 1);
