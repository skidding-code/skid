import { transform } from "sucrase";

/**
 * Turn a learner's TypeScript into runnable JavaScript for the sandboxed
 * preview iframe.
 *
 * The TypeScript track teaches *the type system on top of JavaScript*, so all
 * we need at runtime is type-erasure plus the handful of TS-only constructs
 * that actually emit code (enums, parameter properties, etc.). Sucrase does
 * exactly that, synchronously and tiny — no multi-megabyte compiler shipped to
 * the browser. Type *errors* are intentionally not enforced at runtime: the
 * lessons teach types through reading and writing them, and the grader checks
 * the source for the right annotations.
 *
 * Lessons are single-file scripts (no `import`/`export`), so we only run the
 * `typescript` transform — no CommonJS module wrapping that would reference an
 * undefined `exports` in the bare iframe.
 */
export function transpileTS(code: string): { js: string; error?: string } {
  try {
    const out = transform(code, { transforms: ["typescript"] });
    return { js: out.code };
  } catch (e) {
    return { js: "", error: (e as Error).message };
  }
}
