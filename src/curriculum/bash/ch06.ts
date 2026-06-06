import type { Chapter } from "../types";

export const ch06: Chapter = {
  id: "bash-text",
  title: "Text Tools",
  glyph: "✂️",
  summary: "Slice, swap, and snatch columns out of text with cut, sed, and awk.",
  lessons: [
    {
      id: "bash-text-cut",
      track: "bash",
      title: "Cut to the chase",
      subtitle: "Grab one field out of delimited text.",
      concepts: ["cut", "fields"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "cut snips out columns" },
        {
          type: "p",
          text: "Lots of text is glued together with a separator: a:b:c, or name,age, or word tab word. cut pulls out the piece you want and throws the rest away.",
        },
        {
          type: "p",
          text: "Tell it the delimiter with -d (the character between fields) and which field with -f (counting from 1). So -d: -f2 means split on colons and keep the second chunk.",
        },
        { type: "code", lang: "bash", text: 'echo "a:b:c" | cut -d: -f2' },
        {
          type: "callout",
          tone: "tip",
          text: "Fields start at 1, not 0. -f2 on a:b:c hands you b and nothing else.",
        },
        {
          type: "p",
          text: 'Pipe "a:b:c" into cut and pull out the middle field so the output is just b.',
        },
      ],
      starter: '# Pipe this into cut and grab the second field (should print b)\necho "a:b:c"\n',
      solution: 'echo "a:b:c" | cut -d: -f2\n',
      checks: [
        { label: "Use a pipe", kind: "codeContains", value: "|" },
        { label: "Call cut", kind: "codeContains", value: "cut" },
        { label: "Output is the middle field b", kind: "stdoutContains", value: "b" },
      ],
      hints: [
        "Keep your echo, then add | cut after it.",
        "cut wants -d to set the delimiter (a colon here) and -f to pick the field number.",
        'The whole line: echo "a:b:c" | cut -d: -f2',
      ],
      wellDone: "Three letters in, one letter out. cut kept exactly what you asked for and tossed the rest.",
    },
    {
      id: "bash-text-sed",
      track: "bash",
      title: "Find and replace, the sequel",
      subtitle: "sed swaps characters as text flows by.",
      concepts: ["sed", "substitution"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "sed is search-and-replace in a tube" },
        {
          type: "p",
          text: "sed edits a stream of text. Its most famous trick is substitution, written s/old/new/. It finds old and writes new in its place.",
        },
        {
          type: "p",
          text: "By default it only swaps the first match on each line. Add a g on the end (s/old/new/g) and it replaces every match, greedily.",
        },
        { type: "code", lang: "bash", text: "echo \"hello\" | sed 's/l/L/g'" },
        {
          type: "callout",
          tone: "note",
          text: 'hello has two l\'s. Without the g you get heLlo; with the g you get heLLo.',
        },
        {
          type: "p",
          text: 'Pipe "hello" into sed and capitalize every l so the output reads heLLo.',
        },
      ],
      starter: "# Pipe this into sed and replace every l with L (should print heLLo)\necho \"hello\"\n",
      solution: "echo \"hello\" | sed 's/l/L/g'\n",
      checks: [
        { label: "Use a pipe", kind: "codeContains", value: "|" },
        { label: "Call sed", kind: "codeContains", value: "sed" },
        { label: "Output has both l's swapped", kind: "stdoutContains", value: "heLLo" },
      ],
      hints: [
        "Keep your echo, then add | sed after it.",
        "The pattern is s/l/L/ — and the trailing g makes it replace BOTH l's, not just the first.",
        "The whole line: echo \"hello\" | sed 's/l/L/g'",
      ],
      wellDone: "Both l's promoted to capitals in one pass. That g is the difference between one and all.",
    },
    {
      id: "bash-text-awk",
      track: "bash",
      title: "awk picks a column",
      subtitle: "Print just the field you want by number.",
      concepts: ["awk", "columns"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "awk numbers the columns for you" },
        {
          type: "p",
          text: "awk splits each line on whitespace and hands you the pieces as $1, $2, $3, and so on. $0 is the whole line. Put an action in braces and awk runs it on every line.",
        },
        {
          type: "p",
          text: "{print $2} means: print the second word. No delimiter flags needed — awk treats runs of spaces as the gap between fields.",
        },
        { type: "code", lang: "bash", text: "echo \"Ada 99\" | awk '{print $2}'" },
        {
          type: "callout",
          tone: "tip",
          text: 'On "Ada 99", $1 is Ada and $2 is 99. Print $2 to keep the score and drop the name.',
        },
        {
          type: "p",
          text: 'Pipe "Ada 99" into awk and print the second column so the output is just 99.',
        },
      ],
      starter: "# Pipe this into awk and print the second column (should print 99)\necho \"Ada 99\"\n",
      solution: "echo \"Ada 99\" | awk '{print $2}'\n",
      checks: [
        { label: "Use a pipe", kind: "codeContains", value: "|" },
        { label: "Call awk", kind: "codeContains", value: "awk" },
        { label: "Output is the second column 99", kind: "stdoutContains", value: "99" },
      ],
      hints: [
        "Keep your echo, then add | awk after it.",
        "awk wants a program in single quotes: '{print $2}' grabs the second field.",
        "The whole line: echo \"Ada 99\" | awk '{print $2}'",
      ],
      wellDone: "Name out, number in hand. awk counted the columns so you didn't have to.",
    },
  ],
};
