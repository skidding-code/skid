# Writing a lesson

Lessons are **plain data** — no code, no JSX. A chapter is a TypeScript module
that exports a `Chapter` object; the app renders it, runs the learner's code, and
grades it against the chapter's declarative checks. Because lessons are data, the
end-to-end test (`npm run e2e`) can open every lesson, reveal its solution, run
it, and confirm the checks pass — so a new lesson is "done" only when it's green.

## Where things live

```
src/curriculum/
  types.ts            # the Lesson / Chapter / CheckRule schema
  python/chNN.ts      # one chapter per file, exports `chNN`
  python/index.ts     # imports the chapters into the Python course
  web/chNN.ts
  web/index.ts
```

To add a chapter: create `chNN.ts`, then import it and append it to the
`chapters` array in that track's `index.ts`.

## The shape

```ts
import type { Chapter } from "../types";

export const ch13: Chapter = {
  id: "py-something",          // unique, kebab-case
  title: "Human Title",
  glyph: "✨",                  // one emoji
  summary: "One line shown in the course list.",
  lessons: [
    {
      id: "py-something-first", // unique; py-* or web-*
      track: "python",          // "python" | "web"
      title: "Lesson title",
      subtitle: "One-line hook.",
      concepts: ["loops"],      // 1–3 chips
      estimatedMinutes: 5,
      intro: [                  // teaching content, rendered above the editor
        { type: "h", text: "A heading" },
        { type: "p", text: "A short paragraph." },
        { type: "code", lang: "python", text: 'print("hi")' },
        { type: "callout", tone: "tip", text: "A helpful aside." },
        { type: "p", text: "Now do this exact thing…" },
      ],
      starter: "# learner starts here\n",   // string (python) OR {html,css,js} (web)
      solution: 'print("hi")\n',             // a known-good answer
      checks: [ /* see below */ ],
      hints: ["nudge", "bigger nudge", "basically the answer"],
      wellDone: "One encouraging sentence.",
    },
  ],
};
```

For **web** lessons, `starter` and `solution` are `{ html, css, js }` objects
(use `""` for files a lesson doesn't need). The preview wraps body markup, so
`html` can be a fragment.

## Check rules

Each rule has `{ label, kind, value, ci? }`. `label` is shown to the learner as a
goal. `ci: true` makes text matching case-insensitive.

Source / output (any track; for web, `code*` searches html+css+js combined):

| kind | value |
| --- | --- |
| `stdoutContains` | substring that must appear in output |
| `stdoutEquals` | exact output (trimmed) |
| `stdoutMatches` | JS regex source (in a TS string write `\\s`, `\\d`, …) |
| `stdoutMinLines` | a number; at least N non-empty lines |
| `codeContains` / `codeNotContains` | substring of the source |
| `codeMatches` | JS regex source over the source |

Live DOM (web only; evaluated inside the preview):

| kind | value |
| --- | --- |
| `domExists` | a CSS selector |
| `domCountAtLeast` | `"selector::N"` |
| `domTextContains` | `"selector::text"` |
| `domAttrEquals` | `"selector::attr::expected"` |
| `cssProp` | `"selector::prop::substr"` (computed style; colors become `rgb(...)`) |

## Two rules that keep lessons honest

1. Every check **must pass with your `solution`** and **fail with your
   `starter`** (the learner must do real work). The E2E test enforces the first
   half automatically.
2. For interactive web JS (click handlers), don't assert post-click DOM —
   the checker runs shortly after load. Use `codeContains` for the handler, and
   `stdoutContains` for `console.log` output (console is captured like stdout).

Then run `npm run e2e` (with `ONLY=your-lesson-id` to scope it) to verify.
