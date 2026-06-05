/**
 * Server-side verification for the hosted-runner tracks (Swift / Java / Rust).
 *
 * The headless-browser E2E can't reach external networks from the build
 * container, but Node can — so this script compiles & runs every hosted-track
 * lesson's SOLUTION on the real compiler (Wandbox, via the app's own
 * remoteRunner) and asserts the lesson's checks pass. Run with:
 *
 *     npx tsx scripts/verify-remote.ts
 */
import { courses } from "../src/curriculum/index.ts";
import { isRemoteTrack, isWebFiles } from "../src/curriculum/types.ts";
import { evalSourceRules } from "../src/runtime/checker.ts";
import { runRemote } from "../src/runtime/remoteRunner.ts";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
// Optional: TRACKS=java,rust to scope the run (skips slow dead services).
const only = (process.env.TRACKS || "").split(",").map((s) => s.trim()).filter(Boolean);
let failures = 0;
let total = 0;
let skipped = 0;

for (const course of courses) {
  if (!isRemoteTrack(course.track)) continue;
  if (only.length && !only.includes(course.track)) continue;
  console.log(`\n${course.title.toUpperCase()} (${course.track})`);
  for (const chapter of course.chapters) {
    for (const lesson of chapter.lessons) {
      total++;
      if (isWebFiles(lesson.solution)) {
        failures++;
        console.log(`  ❌ ${lesson.id} — solution should be a string for a code track`);
        continue;
      }
      const code = lesson.solution;
      let attempt = 0;
      let res = await runRemote(course.track, code);
      // Retry a couple times on hosted-service hiccups (not code errors).
      while (res.serviceError && attempt < 2) {
        attempt++;
        await sleep(2500);
        res = await runRemote(course.track, code);
      }
      if (res.serviceError) {
        console.log(`  ⚠️  ${lesson.id} — hosted service unavailable: ${res.error}`);
        // Don't count service outages as content failures.
        skipped++;
        await sleep(800);
        continue;
      }
      const results = evalSourceRules(lesson.checks, { stdout: res.stdout, code });
      const failed = results.filter((r) => !r.passed);
      if (failed.length === 0 && res.ok) {
        console.log(`  ✅ ${lesson.id}`);
      } else {
        failures++;
        console.log(`  ❌ ${lesson.id}${res.ok ? "" : " [compile/run error]"}`);
        if (!res.ok) console.log(`       err: ${(res.error || res.stderr).split("\n")[0]}`);
        for (const f of failed) console.log(`       unmet: ${f.rule.label} [${f.rule.kind} ${JSON.stringify(f.rule.value)}]`);
        console.log(`       stdout: ${JSON.stringify(res.stdout.slice(0, 160))}`);
      }
      await sleep(900); // be gentle with the public compiler service
    }
  }
}

const verified = total - failures - skipped;
console.log(`\n${verified} verified, ${failures} failed, ${skipped} skipped (service unavailable) of ${total} hosted lessons.`);
console.log(`REMOTE_EXIT: ${failures === 0 ? 0 : 1}`);
process.exit(failures === 0 ? 0 : 1);
