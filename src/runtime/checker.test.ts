import { describe, it, expect } from "vitest";
import { evalSourceRule, evalSourceRules } from "./checker";
import type { CheckRule } from "../curriculum/types";

const ctx = (stdout: string, code = "") => ({ stdout, code });

describe("evalSourceRule", () => {
  it("matches stdoutContains", () => {
    expect(evalSourceRule({ label: "", kind: "stdoutContains", value: "Hello" }, ctx("Hello, world!"))).toBe(true);
    expect(evalSourceRule({ label: "", kind: "stdoutContains", value: "bye" }, ctx("Hello"))).toBe(false);
  });

  it("respects case-insensitive flag", () => {
    expect(evalSourceRule({ label: "", kind: "stdoutContains", value: "hello", ci: true }, ctx("HELLO"))).toBe(true);
    expect(evalSourceRule({ label: "", kind: "stdoutContains", value: "hello" }, ctx("HELLO"))).toBe(false);
  });

  it("stdoutEquals trims both sides", () => {
    expect(evalSourceRule({ label: "", kind: "stdoutEquals", value: "B" }, ctx("B\n"))).toBe(true);
    expect(evalSourceRule({ label: "", kind: "stdoutEquals", value: "B" }, ctx("BB"))).toBe(false);
  });

  it("stdoutMinLines counts non-empty lines (the bug we fixed)", () => {
    expect(evalSourceRule({ label: "", kind: "stdoutMinLines", value: "3" }, ctx("3\n2\n1\n"))).toBe(true);
    // collapsed output (no newlines) must NOT satisfy a 3-line requirement
    expect(evalSourceRule({ label: "", kind: "stdoutMinLines", value: "3" }, ctx("321"))).toBe(false);
  });

  it("stdoutMatches treats value as a regex over ordered tokens", () => {
    const rule: CheckRule = { label: "", kind: "stdoutMatches", value: "3[\\s\\S]*2[\\s\\S]*1" };
    expect(evalSourceRule(rule, ctx("3\n2\n1\n"))).toBe(true);
    expect(evalSourceRule(rule, ctx("1\n2\n3\n"))).toBe(false);
  });

  it("code rules look at source, not output", () => {
    expect(evalSourceRule({ label: "", kind: "codeContains", value: "for " }, ctx("", "for i in range(5): print(i)"))).toBe(true);
    expect(evalSourceRule({ label: "", kind: "codeNotContains", value: "168" }, ctx("", "print(24 * 7)"))).toBe(true);
    expect(evalSourceRule({ label: "", kind: "codeNotContains", value: "168" }, ctx("", "print(168)"))).toBe(false);
  });

  it("returns null for DOM rules (handled in the iframe)", () => {
    expect(evalSourceRule({ label: "", kind: "domExists", value: "h1" }, ctx(""))).toBeNull();
  });
});

describe("evalSourceRules", () => {
  it("evaluates a list in order", () => {
    const rules: CheckRule[] = [
      { label: "a", kind: "stdoutContains", value: "x" },
      { label: "b", kind: "codeContains", value: "print" },
    ];
    const out = evalSourceRules(rules, { stdout: "x", code: "print('x')" });
    expect(out.map((r) => r.passed)).toEqual([true, true]);
  });
});
