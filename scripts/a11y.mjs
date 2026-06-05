import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

/**
 * Accessibility scan of the key screens with axe-core. Fails on serious/critical
 * violations (the ones that actually block users); logs minor/moderate as info.
 */

const BASE = process.env.BASE_URL || "http://localhost:4173";
const PAGES = [
  { name: "Home", path: "/" },
  { name: "Course (Python)", path: "/learn/python" },
  { name: "Lesson (Python)", path: "/lesson/py-hello", wait: ".cm-editor" },
  { name: "Lesson (Web)", path: "/lesson/web-about-me", wait: ".cm-editor" },
  { name: "Sandbox", path: "/sandbox", wait: ".cm-editor" },
];

const browser = await chromium.launch();
const ctx = await browser.newContext();
let serious = 0;

for (const p of PAGES) {
  const page = await ctx.newPage();
  await page.goto(`${BASE}/#${p.path}`, { waitUntil: "networkidle" });
  if (p.wait) await page.waitForSelector(p.wait, { timeout: 15000 });

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    // The preview <iframe> hosts the learner's own code; don't audit it here.
    .exclude(".preview-frame")
    .analyze();

  const bad = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  const minor = results.violations.filter((v) => v.impact !== "serious" && v.impact !== "critical");
  serious += bad.length;

  console.log(`\n${p.name}: ${bad.length} serious/critical, ${minor.length} minor`);
  for (const v of bad) {
    console.log(`  ❌ [${v.impact}] ${v.id} — ${v.help}`);
    for (const n of v.nodes.slice(0, 3)) console.log(`       ${n.target.join(" ")}`);
  }
  for (const v of minor) console.log(`  · [${v.impact}] ${v.id} (${v.nodes.length})`);
  await page.close();
}

await browser.close();
console.log(`\nA11Y_EXIT: ${serious === 0 ? 0 : 1}`);
process.exit(serious === 0 ? 0 : 1);
