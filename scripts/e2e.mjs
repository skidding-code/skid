import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:4173";

const CASES = [
  { id: "py-hello", track: "python" },
  { id: "py-math", track: "python" },
  { id: "web-heading-paragraph", track: "web" },
  { id: "web-links", track: "web" },
  { id: "web-js-console", track: "web" },
];

const log = (...a) => console.log(...a);
let failures = 0;

const browser = await chromium.launch();
const ctx = await browser.newContext();

for (const c of CASES) {
  const page = await ctx.newPage();
  const errors = [];
  const consoleLines = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + String(e)));
  page.on("console", (m) => {
    consoleLines.push(`[${m.type()}] ${m.text()}`);
    if (m.type() === "error") errors.push("console.error: " + m.text());
  });

  try {
    await page.goto(`${BASE}/#/lesson/${c.id}`, { waitUntil: "networkidle" });
    await page.waitForSelector(".cm-editor", { timeout: 15000 });
    await page.getByRole("button", { name: /reveal solution/i }).click();
    await page.getByRole("button", { name: /^► Run/ }).click();

    // 3rd arg is options; 2nd is the (unused) function argument.
    await page.waitForFunction(
      () => document.querySelector(".results__status")?.textContent?.includes("All goals met"),
      null,
      { timeout: 100000, polling: 500 },
    );

    if (errors.length) throw new Error("page errors: " + errors.join(" | "));
    log(`✅ ${c.id} (${c.track})`);
  } catch (err) {
    failures++;
    const status = await page.evaluate(
      () => document.querySelector(".results__status")?.textContent || "(no status)",
    );
    const out = await page.evaluate(
      () => document.querySelector(".console__body")?.textContent?.slice(0, 400) || "(no console)",
    );
    log(`❌ ${c.id} (${c.track}) — ${err.message}`);
    log(`   status: ${status}`);
    log(`   output: ${JSON.stringify(out)}`);
    if (errors.length) log(`   errors: ${errors.slice(0, 3).join(" | ")}`);
    if (consoleLines.length) log(`   last logs: ${consoleLines.slice(-4).join(" | ")}`);
  } finally {
    await page.close();
  }
}

await browser.close();
log(failures === 0 ? "\nALL E2E PASSED" : `\n${failures} E2E FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
