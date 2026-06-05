import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:4173";
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
let fails = 0;
const ok = (c, m) => (c ? console.log(`  ✅ ${m}`) : (fails++, console.log(`  ❌ ${m}`)));

// Home shows all five language courses.
await page.goto(`${BASE}/#/`, { waitUntil: "networkidle" });
await page.waitForSelector(".course-card");
const tracks = await page.$$eval('a.course-card[href*="#/learn/"]', (as) =>
  as.map((a) => (a.getAttribute("href") || "").split("#/learn/")[1]),
);
for (const t of ["python", "web", "swift", "java", "rust"]) ok(tracks.includes(t), `home lists ${t}`);

// Each new track's lesson page renders editor + Run (no crash), with starter loaded.
for (const id of ["swift-hello", "java-hello", "rust-hello"]) {
  await page.goto(`${BASE}/#/lesson/${id}`, { waitUntil: "networkidle" });
  const editor = await page.waitForSelector(".cm-editor", { timeout: 15000 }).then(() => true).catch(() => false);
  const runBtn = await page.getByRole("button", { name: /^► Run/ }).count();
  ok(editor && runBtn > 0, `${id} renders editor + Run`);
}

await browser.close();
console.log(`\nSMOKE_EXIT: ${fails === 0 ? 0 : 1}`);
process.exit(fails === 0 ? 0 : 1);
