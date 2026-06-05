import type { CheckRule, WebFiles } from "../curriculum/types";

/**
 * The bridge script injected into every preview. It (a) mirrors console output
 * and uncaught errors back to the parent so we can show a real console, and
 * (b) evaluates DOM-shaped CheckRules *inside* the iframe and reports pass/fail.
 *
 * Kept as a string because it executes in the sandboxed document, not here.
 * The iframe uses `sandbox="allow-scripts"` (no allow-same-origin), so the
 * learner's code can never reach this app's origin, cookies, or storage.
 */
export const BRIDGE_SCRIPT = String.raw`
(function () {
  var send = function (m) { parent.postMessage(m, "*"); };
  function fmt(args) {
    return Array.prototype.map.call(args, function (a) {
      if (typeof a === "string") return a;
      try { return JSON.stringify(a); } catch (e) { return String(a); }
    }).join(" ");
  }
  ["log", "info", "warn", "error", "debug"].forEach(function (level) {
    var orig = console[level] ? console[level].bind(console) : function () {};
    console[level] = function () {
      send({ type: "pg-console", level: level === "debug" ? "log" : level, text: fmt(arguments) });
      orig.apply(console, arguments);
    };
  });
  window.addEventListener("error", function (e) {
    send({ type: "pg-console", level: "error", text: (e.message || "Script error") +
      (e.lineno ? " (line " + e.lineno + ")" : "") });
  });
  window.addEventListener("unhandledrejection", function (e) {
    send({ type: "pg-console", level: "error", text: "Unhandled promise rejection: " + (e.reason && e.reason.message || e.reason) });
  });

  function evalRule(rule) {
    try {
      var parts;
      switch (rule.kind) {
        case "domExists":
          return !!document.querySelector(rule.value);
        case "domCountAtLeast":
          parts = rule.value.split("::");
          return document.querySelectorAll(parts[0]).length >= Number(parts[1]);
        case "domTextContains": {
          parts = rule.value.split("::");
          var el = document.querySelector(parts[0]);
          if (!el) return false;
          var hay = el.textContent || "";
          var needle = parts.slice(1).join("::");
          return rule.ci ? hay.toLowerCase().indexOf(needle.toLowerCase()) >= 0
                         : hay.indexOf(needle) >= 0;
        }
        case "domAttrEquals": {
          parts = rule.value.split("::");
          var el2 = document.querySelector(parts[0]);
          if (!el2) return false;
          var v = el2.getAttribute(parts[1]) || "";
          return rule.ci ? v.toLowerCase() === (parts[2] || "").toLowerCase()
                         : v === (parts[2] || "");
        }
        case "cssProp": {
          parts = rule.value.split("::");
          var el3 = document.querySelector(parts[0]);
          if (!el3) return false;
          var cv = getComputedStyle(el3).getPropertyValue(parts[1]) || "";
          return cv.toLowerCase().indexOf((parts[2] || "").toLowerCase()) >= 0;
        }
        default:
          return null; // handled by the parent (source/stdout rules)
      }
    } catch (e) {
      return false;
    }
  }

  window.addEventListener("message", function (e) {
    var m = e.data;
    if (!m || m.type !== "pg-validate") return;
    var results = (m.rules || []).map(function (r) { return evalRule(r); });
    send({ type: "pg-validate-result", id: m.id, results: results });
  });

  // Give scripts a tick to run, then announce readiness.
  setTimeout(function () { send({ type: "pg-ready" }); }, 0);
})();
`;

/** Assemble a complete, runnable HTML document from the three web files. */
export function buildSrcDoc(files: WebFiles): string {
  const { html, css, js } = files;
  // If the author wrote a full document, respect it but still inject our bits.
  const looksLikeFullDoc = /<html[\s>]/i.test(html);
  if (looksLikeFullDoc) {
    let doc = html;
    if (css.trim()) doc = doc.replace(/<\/head>/i, `<style>\n${css}\n</style>\n</head>`);
    const tail = `<script>${BRIDGE_SCRIPT}</script>\n<script>\n${js}\n</script>`;
    doc = doc.replace(/<\/body>/i, `${tail}\n</body>`);
    return doc;
  }
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
:root { color-scheme: light; }
body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 16px; }
${css}
</style>
</head>
<body>
${html}
<script>${BRIDGE_SCRIPT}</script>
<script>
${js}
</script>
</body>
</html>`;
}

/** Flatten web files into one searchable string for source-based rules. */
export function combinedSource(files: WebFiles): string {
  return `${files.html}\n${files.css}\n${files.js}`;
}

/** True if a rule must be evaluated inside the iframe (needs the live DOM). */
export function isDomRule(rule: CheckRule): boolean {
  return (
    rule.kind === "domExists" ||
    rule.kind === "domCountAtLeast" ||
    rule.kind === "domTextContains" ||
    rule.kind === "domAttrEquals" ||
    rule.kind === "cssProp"
  );
}
