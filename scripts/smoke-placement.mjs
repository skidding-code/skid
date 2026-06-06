import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:4173";
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
let fails = 0;
const ok = (c, m) => (c ? console.log(`  ✅ ${m}`) : (fails++, console.log(`  ❌ ${m}`)));

await page.goto(`${BASE}/#/placement`, { waitUntil: "networkidle" });
await page.waitForSelector(".pickcard");

// Default selection is Python + Web; turn off Web so the run is short (Python only).
await page.getByRole("button", { name: /Web/ }).click();
await page.getByRole("button", { name: /Start the test/ }).click();

// Answer every question (click the first option each time).
let guard = 0;
while ((await page.$(".quiz__option")) && guard++ < 30) {
  await page.locator(".quiz__option").first().click();
  await page.waitForTimeout(80);
}
ok(await page.$(".results-list"), "reaches results screen");
const cards = await page.$$eval(".result-card", (els) => els.length);
ok(cards >= 1, `shows a recommendation card (${cards})`);
ok(await page.$(".result-card .btn"), "recommendation has a Start link");

// Personal plan must be OFF by default (checkbox unchecked).
const planChecked = await page.$eval(".plan-toggle input", (el) => el.checked).catch(() => true);
ok(planChecked === false, "personal plan is OFF by default");

// Placement persisted to localStorage.
const saved = await page.evaluate(() => {
  try { return JSON.parse(localStorage.getItem("playground-progress-v1")).state.placement; } catch { return null; }
});
ok(saved && Object.keys(saved).includes("python"), `placement saved for python (${JSON.stringify(saved)})`);

await browser.close();
console.log(`\nPLACEMENT_EXIT: ${fails === 0 ? 0 : 1}`);
process.exit(fails === 0 ? 0 : 1);
