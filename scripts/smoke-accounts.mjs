import { chromium } from "playwright";

// Runs against the accounts SERVER (serves app + API same-origin).
const BASE = process.env.BASE_URL || "http://localhost:8787";
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
let fails = 0;
const ok = (c, m) => (c ? console.log(`  ✅ ${m}`) : (fails++, console.log(`  ❌ ${m}`)));
const user = "tester" + Math.floor(Math.random() * 1e6);

// 1) Sign up through the UI.
await page.goto(`${BASE}/#/account`, { waitUntil: "networkidle" });
await page.waitForSelector(".account__form", { timeout: 10000 });
await page.fill('.account__form input[required]:not([type=password])', user);
await page.fill('.account__form input[type=password]', "secret123");
await page.getByRole("button", { name: /^Sign up$/ }).click();
ok(await page.waitForSelector("text=Signed in as", { timeout: 10000 }).then(() => true).catch(() => false),
   `signed up as ${user}`);

// 2) Node lesson RUNS live in the browser (iframe), and grades green.
await page.goto(`${BASE}/#/lesson/node-hello`, { waitUntil: "networkidle" });
await page.waitForSelector(".cm-editor", { timeout: 15000 });
await page.getByRole("button", { name: /reveal solution/i }).click();
await page.getByRole("button", { name: /^► Run/ }).click();
ok(await page.waitForFunction(() => document.querySelector(".results__status")?.textContent?.includes("All goals met"),
   null, { timeout: 30000, polling: 200 }).then(() => true).catch(() => false),
   "Node lesson runs in-browser and passes");

// 3) A guided lesson (Discord bot) — "Check" verifies code without executing.
await page.goto(`${BASE}/#/lesson/discord-create-bot`, { waitUntil: "networkidle" });
await page.waitForSelector(".cm-editor", { timeout: 15000 });
await page.getByRole("button", { name: /reveal solution/i }).click();
await page.getByRole("button", { name: /Check/ }).click();
ok(await page.waitForFunction(() => document.querySelector(".results__status")?.textContent?.includes("All goals met"),
   null, { timeout: 12000, polling: 150 }).then(() => true).catch(() => false),
   "Guided lesson 'Check' verifies code");

// 4) Progress synced → appears on the leaderboard.
await page.waitForTimeout(2500); // debounced push
await page.goto(`${BASE}/#/leaderboard`, { waitUntil: "networkidle" });
await page.waitForSelector(".lb-list, .lb-empty", { timeout: 10000 });
const mine = await page.$(`text=${user}`);
ok(!!mine, "my account appears on the leaderboard after syncing");

await browser.close();
console.log(`\nACCOUNTS_EXIT: ${fails === 0 ? 0 : 1}`);
process.exit(fails === 0 ? 0 : 1);
