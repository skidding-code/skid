// Regenerate each track's index.ts to import every ch*.ts present and list them
// in the chapters array, preserving the course metadata (title/tagline/etc.).
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const dirs = ["python", "web", "swift", "java", "rust", "node", "bash", "discordpy", "mcmods", "swiftui"];

for (const d of dirs) {
  const base = `src/curriculum/${d}`;
  const files = readdirSync(base)
    .filter((f) => /^ch\d+\.ts$/.test(f))
    .sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
  const names = files.map((f) => f.replace(".ts", ""));
  if (names.length === 0) continue;

  const src = readFileSync(`${base}/index.ts`, "utf8");
  const importType = (src.match(/import type \{ Course \} from "\.\.\/types";/) || [
    'import type { Course } from "../types";',
  ])[0];
  const chImports = names.map((n) => `import { ${n} } from "./${n}";`).join("\n");

  let courseObj = src.slice(src.indexOf("export const"));
  courseObj = courseObj.replace(/chapters:\s*\[[^\]]*\]/, `chapters: [${names.join(", ")}]`);

  writeFileSync(`${base}/index.ts`, `${importType}\n${chImports}\n\n${courseObj}`);
  console.log(`${d}: ${names.length} chapters`);
}
