import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "bash-pipes",
  title: "Pipes & Text",
  glyph: "🪈",
  summary: "Send text through a pipe and let little tools chew on it.",
  lessons: [
    {
      id: "bash-pipe-uppercase",
      track: "bash",
      title: "SHOUT IT",
      subtitle: "Pipe text into another command.",
      concepts: ["pipes", "tr"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "The pipe hands text to the next tool" },
        {
          type: "p",
          text: "A pipe, written |, takes whatever the command on the left prints and feeds it as input to the command on the right. Think of it as a tube: text goes in one end and out the other.",
        },
        {
          type: "p",
          text: "The tool tr translates characters. Give it a range to swap from and a range to swap to. To shout, swap lowercase a-z for uppercase A-Z.",
        },
        { type: "code", lang: "bash", text: 'echo "quiet" | tr a-z A-Z' },
        {
          type: "callout",
          tone: "tip",
          text: "echo only knows how to print. tr only knows how to swap letters. The pipe makes them a team.",
        },
        {
          type: "p",
          text: 'Pipe the word hello into tr and turn it into HELLO.',
        },
      ],
      starter: '# Pipe an echo into tr to uppercase it\necho "hello"\n',
      solution: 'echo "hello" | tr a-z A-Z\n',
      checks: [
        { label: "Use a pipe", kind: "codeContains", value: "|" },
        { label: "Call tr", kind: "codeContains", value: "tr" },
        { label: "Output is uppercase HELLO", kind: "stdoutContains", value: "HELLO" },
      ],
      hints: [
        "Keep your echo, then add | tr after it.",
        "tr needs two arguments: the from-set and the to-set.",
        'The whole line: echo "hello" | tr a-z A-Z',
      ],
      wellDone: "One tube, two tools, zero shouting on your part. The pipe did the work.",
    },
    {
      id: "bash-pipe-wordcount",
      track: "bash",
      title: "Count the words",
      subtitle: "wc counts so you don't have to.",
      concepts: ["pipes", "wc"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Let wc do the counting" },
        {
          type: "p",
          text: "wc means word count. On its own it counts lines, words, and characters. With the flag -w it prints just the number of words. Pipe text in and it tallies for you.",
        },
        { type: "code", lang: "bash", text: 'echo "one two three" | wc -w' },
        {
          type: "callout",
          tone: "note",
          text: "Words are separated by spaces. wc -w on that example prints 3.",
        },
        {
          type: "p",
          text: 'Pipe the sentence "a b c d e" into wc -w. It should report 5 words.',
        },
      ],
      starter: '# Count the words in this sentence with wc -w\necho "a b c d e"\n',
      solution: 'echo "a b c d e" | wc -w\n',
      checks: [
        { label: "Use a pipe", kind: "codeContains", value: "|" },
        { label: "Use wc to count", kind: "codeContains", value: "wc" },
        { label: "Report 5 words", kind: "stdoutContains", value: "5" },
      ],
      hints: [
        "Add | wc -w to the end of your echo line.",
        "The -w flag tells wc to count words, not lines.",
        'The whole line: echo "a b c d e" | wc -w',
      ],
      wellDone: "You just outsourced counting to a program. That is peak laziness, the good kind.",
    },
    {
      id: "bash-pipe-grep-sort",
      track: "bash",
      title: "Sort the fruit",
      subtitle: "Chain pipes to filter and order text.",
      concepts: ["pipes", "grep", "sort"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "You can pipe more than once" },
        {
          type: "p",
          text: "Pipes chain. The output of one tool flows into the next, and the next. Two friends here: grep keeps only lines that match a pattern, and sort puts lines in alphabetical order.",
        },
        {
          type: "p",
          text: 'The -e flag on echo lets \\n create new lines, so one echo can print a whole list. Then pipe that list onward.',
        },
        { type: "code", lang: "bash", text: 'echo -e "pear\\napple\\nplum" | sort' },
        {
          type: "callout",
          tone: "tip",
          text: "sort reads every line first, then prints them in order: apple, pear, plum.",
        },
        {
          type: "p",
          text: 'Print the list banana, apple, cherry (one per line) and pipe it into sort so it comes out apple, banana, cherry.',
        },
      ],
      starter: '# Print three fruits on three lines, then pipe into sort\necho -e "banana\\napple\\ncherry"\n',
      solution: 'echo -e "banana\\napple\\ncherry" | sort\n',
      checks: [
        { label: "Use a pipe", kind: "codeContains", value: "|" },
        { label: "Sort the lines", kind: "codeContains", value: "sort" },
        {
          label: "Output is alphabetical (apple, banana, cherry)",
          kind: "stdoutMatches",
          value: "apple[\\s\\S]*banana[\\s\\S]*cherry",
        },
      ],
      hints: [
        "Keep the echo -e list, then add | sort at the end.",
        "sort needs no flags here — it alphabetizes by default.",
        'The whole line: echo -e "banana\\napple\\ncherry" | sort',
      ],
      wellDone: "You built an assembly line of tiny tools. That chaining is the heart of the shell.",
    },
  ],
};
