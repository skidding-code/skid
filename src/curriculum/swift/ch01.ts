import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "swift-basics",
  title: "Hello, Swift",
  glyph: "🐦",
  summary:
    "Teach a very polite bird to talk. Printing, boxes that hold stuff, and sneaking words into sentences.",
  lessons: [
    {
      id: "swift-hello",
      track: "swift",
      title: "Make the bird speak",
      subtitle: "Your first line of Swift.",
      concepts: ["print", "strings"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Say something out loud" },
        {
          type: "p",
          text: "Swift programs talk to us by printing text. You hand print some words wrapped in quotes, and it shouts them to the console. No microphone required.",
        },
        { type: "code", lang: "swift", text: 'print("Beep boop, I am a computer.")' },
        {
          type: "callout",
          tone: "tip",
          text: "Text inside quotes is a string. The quotes are just fences telling Swift where your words begin and end.",
        },
        {
          type: "p",
          text: "Your turn: make the program print the exact words Hello, Swift!",
        },
      ],
      starter: "// Print a greeting below\n",
      solution: 'print("Hello, Swift!")\n',
      checks: [
        { label: "Use the print function", kind: "codeContains", value: "print(" },
        { label: "Print the text Hello, Swift!", kind: "stdoutContains", value: "Hello, Swift!" },
      ],
      hints: [
        "Type print, then a pair of parentheses ().",
        "Put your message in quotes inside the parentheses.",
        'The whole line is: print("Hello, Swift!")',
      ],
      wellDone: "First line down. The bird has spoken, and the world is listening.",
    },
    {
      id: "swift-let-var",
      track: "swift",
      title: "Boxes that change (and ones that don't)",
      subtitle: "let is a sealed box, var is a box with a lid.",
      concepts: ["let", "var"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Two ways to keep a value" },
        {
          type: "p",
          text: "A let is a constant: once you put something in, it's sealed forever. A var is a variable: you can pop the lid and swap the value later. Use let when nothing should change, var when it should.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let speed = 88        // sealed: cannot change\nvar mood = "sleepy"   // can change later\nmood = "awake"',
        },
        {
          type: "callout",
          tone: "note",
          text: "Try changing a let after you set it and Swift will refuse with a stern error. It's not being rude — it's protecting your constant.",
        },
        {
          type: "p",
          text: "Make a constant with let and a variable with var, then print both of them (one per line).",
        },
      ],
      starter: "// Make one constant with let and one variable with var, then print both\n",
      solution: 'let planet = "Earth"\nvar visitors = 7\nprint(planet)\nprint(visitors)\n',
      checks: [
        { label: "Declare a constant with let", kind: "codeContains", value: "let " },
        { label: "Declare a variable with var", kind: "codeContains", value: "var " },
        { label: "Print at least two lines", kind: "stdoutMinLines", value: "2" },
      ],
      hints: [
        "Start one line with let and another with var.",
        "Give each a name and a value, like let planet = \"Earth\".",
        'Then print each: print(planet) and print(visitors).',
      ],
      wellDone: "let for the keepers, var for the changers. You now own both boxes.",
    },
    {
      id: "swift-interpolation",
      track: "swift",
      title: "Sneak words into sentences",
      subtitle: "String interpolation with \\(...).",
      concepts: ["strings", "interpolation"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Drop a value into a string" },
        {
          type: "p",
          text: "Gluing strings and numbers together by hand is tedious. Swift lets you slip a value straight into a string with backslash-parenthesis: write \\(name) and Swift swaps in whatever name holds.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let name = "Ada"\nlet score = 100\nprint("\\(name) scored \\(score)!")   // Ada scored 100!',
        },
        {
          type: "callout",
          tone: "tip",
          text: "It's backslash then parentheses: \\(thing). Forget the backslash and Swift prints the literal text instead of the value.",
        },
        {
          type: "p",
          text: "Store a name and a number, then print one sentence that uses both with \\( ). For example: Pip has 3 cookies.",
        },
      ],
      starter: "// Store a name and a number, then print a sentence using \\(name)\n",
      solution:
        'let name = "Pip"\nlet cookies = 3\nprint("\\(name) has \\(cookies) cookies.")\n',
      checks: [
        { label: "Use string interpolation with \\(", kind: "codeContains", value: "\\(" },
        { label: "Use the print function", kind: "codeContains", value: "print(" },
        { label: "Print the name in your sentence", kind: "stdoutContains", value: "Pip" },
        { label: "Print the number in your sentence", kind: "stdoutContains", value: "3" },
      ],
      hints: [
        "First make two values, like let name and let cookies.",
        "Inside a print string, write \\(name) where you want the name to appear.",
        'Full line: print("\\(name) has \\(cookies) cookies.")',
      ],
      wellDone: "You taught Swift to fill in the blanks. Sentences will never be the same.",
    },
  ],
};
