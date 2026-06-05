import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "py-basics",
  title: "First Words",
  glyph: "👋",
  summary: "Make the computer talk back. Printing, text, and numbers.",
  lessons: [
    {
      id: "py-hello",
      track: "python",
      title: "Say hello",
      subtitle: "Your very first line of Python.",
      concepts: ["print", "strings"],
      estimatedMinutes: 3,
      intro: [
        { type: "h", text: "Tell the computer what to say" },
        {
          type: "p",
          text: "Programs talk to us by printing text to a console. In Python you do that with the print function. You give it something to say inside parentheses.",
        },
        { type: "code", lang: "python", text: 'print("Hi there!")' },
        {
          type: "callout",
          tone: "tip",
          text: "Text wrapped in quotes is called a string. The quotes mark where the text starts and ends.",
        },
        {
          type: "p",
          text: "Your turn. Make the program print the words Hello, world! exactly.",
        },
      ],
      starter: '# Print a greeting below\n',
      solution: 'print("Hello, world!")\n',
      checks: [
        { label: "Use the print function", kind: "codeContains", value: "print(" },
        { label: "Print the text Hello, world!", kind: "stdoutContains", value: "Hello, world!" },
      ],
      hints: [
        "Type print, then a pair of parentheses ().",
        "Put your message in quotes inside the parentheses.",
        'The full line is: print("Hello, world!")',
      ],
      wellDone: "You just ran your first program. Every coder starts exactly here.",
    },
    {
      id: "py-many-lines",
      track: "python",
      title: "One line at a time",
      subtitle: "Each print starts a new line.",
      concepts: ["print", "sequence"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Programs run top to bottom" },
        {
          type: "p",
          text: "When you write several print statements, Python runs them in order — first line first, last line last. Each print drops to a new line.",
        },
        { type: "code", lang: "python", text: 'print("Loading...")\nprint("Ready!")' },
        {
          type: "p",
          text: "Write three lines that print a tiny countdown: 3, then 2, then 1.",
        },
      ],
      starter: '# Print 3, then 2, then 1 — each on its own line\n',
      solution: 'print(3)\nprint(2)\nprint(1)\n',
      checks: [
        { label: "Print at least 3 lines", kind: "stdoutMinLines", value: "3" },
        { label: "Count down 3, 2, 1 in order", kind: "stdoutMatches", value: "3[\\s\\S]*2[\\s\\S]*1" },
      ],
      hints: [
        "You'll need three separate print lines.",
        "Numbers don't need quotes: print(3).",
        "Order matters — put 3 first, then 2, then 1.",
      ],
      wellDone: "Notice how the order of your lines became the order of the output.",
    },
    {
      id: "py-math",
      track: "python",
      title: "Python can do math",
      subtitle: "Use the console as a calculator.",
      concepts: ["numbers", "operators", "comments"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Numbers, not strings" },
        {
          type: "p",
          text: "When numbers aren't in quotes, Python treats them as real numbers and can do math: + add, - subtract, * multiply, / divide.",
        },
        { type: "code", lang: "python", text: "print(2 + 3)    # 5\nprint(10 * 4)   # 40" },
        {
          type: "callout",
          tone: "note",
          text: "Anything after a # is a comment — a note for humans that Python ignores.",
        },
        {
          type: "p",
          text: "There are 24 hours in a day and 7 days in a week. Print how many hours are in one week.",
        },
      ],
      starter: "# Print the number of hours in a week\n",
      solution: "print(24 * 7)\n",
      checks: [
        { label: "Print the answer 168", kind: "stdoutContains", value: "168" },
        { label: "Let Python do the math (use *)", kind: "codeContains", value: "*" },
      ],
      hints: [
        "Multiply hours per day by days per week.",
        "Use the * symbol for multiply.",
        "print(24 * 7) — let Python compute it, don't just type 168.",
      ],
      wellDone: "You're letting the computer do the arithmetic. That's the whole idea.",
    },
  ],
};
