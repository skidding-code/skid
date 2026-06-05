import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { useResolvedTheme } from "../hooks/useTheme";

export type EditorLang = "python" | "html" | "css" | "javascript";

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
      EditorView.theme({
        "&": { fontSize: "15px", height: "100%" },
        ".cm-content": { fontFamily: "var(--font-mono)", padding: "12px 0" },
        ".cm-gutters": { background: "transparent", border: "none" },
        ".cm-scroller": { lineHeight: "1.7" },
        "&.cm-focused": { outline: "none" },
      }),
    ],
    [language],
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
