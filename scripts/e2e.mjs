import { chromium } from "playwright";

/**
 * Full-curriculum end-to-end test. For every lesson in every track this:
 *   1. opens the lesson in a real (headless) browser,
 *   2. reveals the known-good solution (fills the editor),
 *   3. runs it,
 *   4. asserts the grader reports all goals met.
 *
 * This catches any lesson whose declared checks don't actually pass with its
 * own solution — i.e. it tests the runtime, the preview, the checker, AND the
 * content together.
 */

const BASE = process.env.BASE_URL || "http://localhost:4173";
const ONLY = process.env.ONLY; // optional substring filter on lesson id

const log = (...a) => console.log(...a);

const browser = await chromium.launch();
const ctx = await browser.newContext();

async function lessonIdsFor(track) {
  const page = await ctx.newPage();
  await page.goto(`${BASE}/#/learn/${track}`, { waitUntil: "networkidle" });
  await page.waitForSelector("a.lesson-row", { timeout: 15000 });
  const ids = await page.$$eval("a.lesson-row", (as) =>
    as
      .map((a) => a.getAttribute("href") || "")
      .map((h) => (h.split("#/lesson/")[1] || "").replace(/[#?].*$/, ""))
      .filter(Boolean),
  );
  await page.close();
  return ids;
}

async function testLesson(id, track) {
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("console.error: " + m.text());
  });
  try {
    await page.goto(`${BASE}/#/lesson/${id}`, { waitUntil: "networkidle" });
    await page.waitForSelector(".cm-editor", { timeout: 15000 });
    await page.getByRole("button", { name: /reveal solution/i }).click();
    await page.getByRole("button", { name: /^► Run/ }).click();
    await page.waitForFunction(
      () => document.querySelector(".results__status")?.textContent?.includes("All goals met"),
      null,
      { timeout: 90000, polling: 400 },
    );
    if (errors.length) throw new Error(errors.slice(0, 2).join(" | "));
    return { id, track, ok: true };
  } catch (err) {
    let status = "(n/a)";
    let goals = "(n/a)";
    try {
      status = await page.evaluate(() => document.querySelector(".results__status")?.textContent || "");
      goals = await page.evaluate(() =>
        [...document.querySelectorAll(".checklist__item")]
          .map((li) => (li.className.includes("--pass") ? "✓" : "✗") + " " + (li.querySelector(".checklist__label")?.textContent || ""))
          .join(" · "),
      );
    } catch {
      /* page may be gone */
    }
    return { id, track, ok: false, msg: err.message.split("\n")[0], status, goals };
  } finally {
    await page.close();
  }
}

const tracks = ["python", "web"];
const results = [];
for (const track of tracks) {
  let ids = await lessonIdsFor(track);
  if (ONLY) ids = ids.filter((i) => i.includes(ONLY));
  log(`\n${track.toUpperCase()} — ${ids.length} lessons`);
  for (const id of ids) {
    const r = await testLesson(id, track);
    results.push(r);
    if (r.ok) log(`  ✅ ${id}`);
    else {
      log(`  ❌ ${id} — ${r.msg}`);
      log(`       status: ${r.status}`);
      log(`       goals: ${r.goals}`);
    }
  }
}

await browser.close();
const failed = results.filter((r) => !r.ok);
log(`\n${results.length - failed.length}/${results.length} lessons passed end-to-end.`);
if (failed.length) log("FAILED: " + failed.map((f) => f.id).join(", "));
log(`E2E_EXIT: ${failed.length === 0 ? 0 : 1}`);
process.exit(failed.length === 0 ? 0 : 1);
