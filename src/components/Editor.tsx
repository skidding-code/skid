import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { StreamLanguage } from "@codemirror/language";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { EditorView } from "@codemirror/view";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { useResolvedTheme } from "../hooks/useTheme";

export type EditorLang = "python" | "html" | "css" | "javascript" | "typescript" | "java" | "rust" | "swift" | "bash";

interface EditorProps {
  value: string;
  language: EditorLang;
  onChange: (v: string) => void;
  readOnly?: boolean;
  ariaLabel?: string;
}

const langExtension = (l: EditorLang) => {
  switch (l) {
    case "python":
      return python();
    case "html":
      return html();
    case "css":
      return cssLang();
    case "javascript":
      return javascript();
    case "typescript":
      return javascript({ typescript: true });
    case "java":
      return java();
    case "rust":
      return rust();
    case "swift":
      return StreamLanguage.define(swift);
    case "bash":
      return StreamLanguage.define(shell);
  }
};

/** A single-language CodeMirror surface, themed to match the app and tuned for
 * touch (bigger font, comfortable line height) so it works on iPad too. */
export function Editor({ value, language, onChange, readOnly, ariaLabel }: EditorProps) {
  const theme = useResolvedTheme();
  const extensions = useMemo(
    () => [
      langExtension(language),
      EditorView.lineWrapping,
      // Give the editable surface an accessible name (axe: aria-input-field-name).
      EditorView.contentAttributes.of({ "aria-label": ariaLabel ?? "Code editor" }),
      EditorView.theme({
        "&": { fontSize: "15px", height: "100%" },
        ".cm-content": { fontFamily: "var(--font-mono)", padding: "12px 0" },
        ".cm-gutters": { background: "transparent", border: "none" },
        ".cm-scroller": { lineHeight: "1.7" },
        "&.cm-focused": { outline: "none" },
        // Keep the active-line tint off the text background so syntax tokens
        // always sit on the theme's AA-correct base colour (axe: color-contrast).
        ".cm-activeLine": { backgroundColor: "transparent" },
        ".cm-activeLineGutter": { backgroundColor: "transparent" },
      }),
    ],
    [language, ariaLabel],
  );

  return (
    <div className="editor" aria-label={ariaLabel}>
      <CodeMirror
        value={value}
        height="100%"
        theme={theme === "dark" ? githubDark : githubLight}
        extensions={extensions}
        onChange={onChange}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: !readOnly,
          highlightActiveLineGutter: !readOnly,
          foldGutter: false,
          autocompletion: true,
          closeBrackets: true,
          indentOnInput: true,
        }}
      />
    </div>
  );
}
