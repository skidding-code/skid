import { describe, it, expect } from "vitest";
import { buildSrcDoc, combinedSource, isDomRule, BRIDGE_SCRIPT } from "./webBundle";
import type { CheckRule, WebFiles } from "../curriculum/types";

const files: WebFiles = {
  html: "<h1>Hi</h1>",
  css: "h1 { color: red; }",
  js: "console.log('hello')",
};

describe("buildSrcDoc", () => {
  it("wraps body markup into a full document with css, js, and the bridge", () => {
    const doc = buildSrcDoc(files);
    expect(doc).toContain("<!doctype html>");
    expect(doc).toContain("<h1>Hi</h1>");
    expect(doc).toContain("color: red");
    expect(doc).toContain("console.log('hello')");
    expect(doc).toContain(BRIDGE_SCRIPT.trim().slice(0, 20));
  });

  it("respects an author-provided full document and still injects the bridge + css", () => {
    const full: WebFiles = {
      html: "<html><head></head><body><p>x</p></body></html>",
      css: ".y { margin: 0; }",
      js: "var z = 1;",
    };
    const doc = buildSrcDoc(full);
    expect(doc).toContain("<p>x</p>");
    expect(doc).toContain(".y { margin: 0; }");
    expect(doc).toContain("var z = 1;");
    // css injected before </head>, js + bridge before </body>
    expect(doc.indexOf(".y { margin: 0; }")).toBeLessThan(doc.indexOf("</head>"));
    expect(doc.indexOf("var z = 1;")).toBeLessThan(doc.lastIndexOf("</body>"));
  });
});

describe("combinedSource", () => {
  it("concatenates all three files for source-based checks", () => {
    const s = combinedSource(files);
    expect(s).toContain("<h1>Hi</h1>");
    expect(s).toContain("color: red");
    expect(s).toContain("console.log");
  });
});

describe("isDomRule", () => {
  const dom: CheckRule["kind"][] = ["domExists", "domCountAtLeast", "domTextContains", "domAttrEquals", "cssProp"];
  const src: CheckRule["kind"][] = ["stdoutContains", "codeContains", "codeMatches", "stdoutMinLines"];

  it("classifies DOM vs source rules", () => {
    for (const kind of dom) expect(isDomRule({ label: "", kind, value: "x" })).toBe(true);
    for (const kind of src) expect(isDomRule({ label: "", kind, value: "x" })).toBe(false);
  });
});
