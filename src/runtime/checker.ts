import type { CheckRule } from "../curriculum/types";

export interface RuleResult {
  rule: CheckRule;
  passed: boolean;
}

/**
 * Evaluate a single source-or-stdout rule. Returns `null` for DOM rules, which
 * must be evaluated inside the preview iframe instead (see webBundle.ts).
 */
export function evalSourceRule(
  rule: CheckRule,
  ctx: { stdout: string; code: string },
): boolean | null {
  const stdout = rule.ci ? ctx.stdout.toLowerCase() : ctx.stdout;
  const code = rule.ci ? ctx.code.toLowerCase() : ctx.code;
  const val = rule.ci ? rule.value.toLowerCase() : rule.value;

  switch (rule.kind) {
    case "stdoutContains":
      return stdout.includes(val);
    case "stdoutEquals":
      return stdout.trim() === val.trim();
    case "stdoutMatches":
      try {
        return new RegExp(rule.value, rule.ci ? "i" : "").test(ctx.stdout);
      } catch {
        return false;
      }
    case "stdoutMinLines":
      return ctx.stdout.replace(/\n+$/, "").split("\n").filter((l) => l.length > 0).length >= Number(rule.value);
    case "codeContains":
      return code.includes(val);
    case "codeNotContains":
      return !code.includes(val);
    case "codeMatches":
      try {
        return new RegExp(rule.value, rule.ci ? "i" : "").test(ctx.code);
      } catch {
        return false;
      }
    default:
      return null; // a DOM rule
  }
}

/** Evaluate every non-DOM rule. DOM rules come back as `passed:false` here and
 * should be overwritten by the iframe's verdict before display. */
export function evalSourceRules(
  rules: CheckRule[],
  ctx: { stdout: string; code: string },
): RuleResult[] {
  return rules.map((rule) => {
    const r = evalSourceRule(rule, ctx);
    return { rule, passed: r === null ? false : r };
  });
}
