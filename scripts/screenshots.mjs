import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:4173";
const OUT = process.env.OUT || "/tmp/shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function shot(name, { path, width = 1280, height = 860, theme = "dark", prep, completed } = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    colorScheme: theme === "dark" ? "dark" : "light",
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/#${path}`, { waitUntil: "networkidle" });

  // Optionally seed completed lessons. "*python" / "*web" completes a whole
  // track (ids scraped from its course page); otherwise pass an explicit list.
  let done = {};
  if (completed === "*python" || completed === "*web") {
    const track = completed.slice(1);
    const p2 = await ctx.newPage();
    await p2.goto(`${BASE}/#/learn/${track}`, { waitUntil: "networkidle" });
    await p2.waitForSelector("a.lesson-row");
    const ids = await p2.$$eval("a.lesson-row", (as) =>
      as.map((a) => (a.getAttribute("href") || "").split("#/lesson/")[1]).filter(Boolean),
    );
    await p2.close();
    for (const id of ids) done[id] = Date.now();
  } else if (Array.isArray(completed)) {
    for (const id of completed) done[id] = Date.now();
  }

  await page.evaluate(
    ({ t, d }) => {
      localStorage.setItem(
        "playground-progress-v1",
        JSON.stringify({ state: { completed: d, saved: {}, theme: t }, version: 0 }),
      );
    },
    { t: theme, d: done },
  );
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
await shot("09-home-progress", {
  path: "/",
  theme: "dark",
  completed: ["py-hello", "py-many-lines", "py-math", "py-make-a-variable"],
});
await shot("10-course-complete", { path: "/learn/python", theme: "light", completed: "*python" });
await shot("11-lesson-rust", { path: "/lesson/rust-hello", theme: "dark", prep: (p) => p.waitForSelector(".cm-editor") });
await shot("12-lesson-java", { path: "/lesson/java-hello", theme: "light", prep: (p) => p.waitForSelector(".cm-editor") });
await shot("13-sandbox-languages", { path: "/sandbox", theme: "dark", prep: (p) => p.waitForSelector(".seg") });

await browser.close();
console.log("done");
