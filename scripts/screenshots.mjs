import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:4173";
const OUT = process.env.OUT || "/tmp/shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function shot(name, { path, width = 1280, height = 860, theme = "dark", prep } = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    colorScheme: theme === "dark" ? "dark" : "light",
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/#${path}`, { waitUntil: "networkidle" });
  // Force the app's own theme preference.
  await page.evaluate((t) => {
    localStorage.setItem("playground-progress-v1", JSON.stringify({ state: { completed: {}, saved: {}, theme: t }, version: 0 }));
  }, theme);
  await page.reload({ waitUntil: "networkidle" });
  if (prep) await prep(page);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`📸 ${name}.png`);
  await ctx.close();
}

const runAndPass = async (page) => {
  await page.waitForSelector(".cm-editor", { timeout: 15000 });
  await page.getByRole("button", { name: /reveal solution/i }).click();
  await page.getByRole("button", { name: /^► Run/ }).click();
  await page.waitForFunction(
    () => document.querySelector(".results__status")?.textContent?.includes("All goals met"),
    null,
    { timeout: 90000, polling: 400 },
  );
  await page.waitForTimeout(900); // let confetti + well-done animate in
};

await shot("01-home-dark", { path: "/", theme: "dark" });
await shot("02-home-light", { path: "/", theme: "light" });
await shot("03-course-python", { path: "/learn/python", theme: "dark" });
await shot("04-lesson-python", { path: "/lesson/py-math", theme: "dark", prep: runAndPass });
await shot("05-lesson-web", { path: "/lesson/web-about-me", theme: "light", prep: runAndPass });
await shot("06-lesson-web-capstone", { path: "/lesson/web-color-changer", theme: "dark", prep: runAndPass });
await shot("07-sandbox", { path: "/sandbox", theme: "dark" });
await shot("08-lesson-mobile", { path: "/lesson/py-hello", theme: "dark", width: 412, height: 900 });

await browser.close();
console.log("done");
