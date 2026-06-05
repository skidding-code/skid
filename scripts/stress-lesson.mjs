import { chromium } from "playwright";

// Repeatedly run one lesson to shake out timing flakes. Usage:
//   LESSON=web-js-console RUNS=8 node scripts/stress-lesson.mjs
const BASE = process.env.BASE_URL || "http://localhost:4173";
const LESSON = process.env.LESSON || "web-js-console";
const RUNS = Number(process.env.RUNS || 8);

const browser = await chromium.launch();
let fails = 0;
for (let i = 1; i <= RUNS; i++) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  try {
    await page.goto(`${BASE}/#/lesson/${LESSON}`, { waitUntil: "networkidle" });
    await page.waitForSelector(".cm-editor", { timeout: 15000 });
    await page.getByRole("button", { name: /reveal solution/i }).click();
    await page.getByRole("button", { name: /^► Run/ }).click();
    await page.waitForFunction(
      () => document.querySelector(".results__status")?.textContent?.includes("All goals met"),
      null,
      { timeout: 45000, polling: 150 },
    );
    console.log(`  ✅ run ${i}`);
  } catch {
    fails++;
    const goals = await page.$$eval(".checklist__item", (els) => els.map((e) => e.textContent).join(" · ")).catch(() => "");
    console.log(`  ❌ run ${i} — goals: ${goals}`);
  } finally {
    await ctx.close();
  }
}
await browser.close();
console.log(`\n${LESSON}: ${RUNS - fails}/${RUNS} passed`);
console.log(`STRESS_EXIT: ${fails === 0 ? 0 : 1}`);
process.exit(fails === 0 ? 0 : 1);
