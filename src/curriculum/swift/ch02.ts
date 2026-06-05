import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "swift-control",
  title: "Choices & Repeats",
  glyph: "🔀",
  summary:
    "Teach your code to make up its mind and to do the boring stuff over and over so you don't have to.",
  lessons: [
    {
      id: "swift-if-else",
      track: "swift",
      title: "When code makes choices",
      subtitle: "if/else: a tiny fork in the road.",
      concepts: ["if/else", "conditions"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Choose your own adventure" },
        {
          type: "p",
          text: "Programs don't always do the same thing. With if/else you ask a yes-or-no question, and the code takes one path or the other. If the question is true, the first block runs; otherwise the else block does.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let score = 90\nif score >= 50 {\n    print("You passed!")\n} else {\n    print("Try again.")\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Notice >= means greater-than-or-equal. Swift checks the condition inside the if, then picks exactly one block.",
        },
        {
          type: "p",
          text: "A temperature variable is set up for you. If it's 30 or more, print Phew, it's hot! — otherwise print Grab a jacket. With temperature at 35, hot wins.",
        },
      ],
      starter:
        '// temperature is set for you — write the if/else below it\nlet temperature = 35\n// Your code here\n',
      solution:
        'let temperature = 35\nif temperature >= 30 {\n    print("Phew, it\'s hot!")\n} else {\n    print("Grab a jacket.")\n}\n',
      checks: [
        { label: "Use an if statement", kind: "codeContains", value: "if" },
        { label: "Have an else branch too", kind: "codeContains", value: "else" },
        { label: "It's 35, so print the hot message", kind: "stdoutContains", value: "Phew, it's hot!" },
      ],
      hints: [
        "Start with: if temperature >= 30 { ... } else { ... }",
        'Put print("Phew, it\'s hot!") inside the if, and the jacket message inside else.',
        'Full answer: if temperature >= 30 { print("Phew, it\'s hot!") } else { print("Grab a jacket.") }',
      ],
      wellDone: "Your code can think now. Slightly terrifying, very useful.",
    },
    {
      id: "swift-for-range",
      track: "swift",
      title: "Doing it five times",
      subtitle: "for-in over a range, without copy-paste.",
      concepts: ["for-in", "ranges"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Let the loop do the typing" },
        {
          type: "p",
          text: "Copy-pasting the same print five times is how repetitive-strain injuries are born. A for-in loop repeats a block for each value in a range. The range 1...5 means 1, 2, 3, 4, 5 — both ends included.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'for n in 1...3 {\n    print("Beep \\(n)")\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "\\(n) drops the current value into the text. So the loop above prints Beep 1, Beep 2, Beep 3.",
        },
        {
          type: "p",
          text: "Loop i from 1 through 5 and print Step 1, Step 2, ... Step 5 — one per line.",
        },
      ],
      starter: "// Loop from 1 to 5 and print each step\n// Your code here\n",
      solution: 'for i in 1...5 {\n    print("Step \\(i)")\n}\n',
      checks: [
        { label: "Use a for loop", kind: "codeContains", value: "for " },
        { label: "Loop over each value with in", kind: "codeContains", value: "in " },
        { label: "Print Step 1 first", kind: "stdoutContains", value: "Step 1" },
        { label: "Print Step 5 last", kind: "stdoutContains", value: "Step 5" },
        { label: "Steps come out in order", kind: "stdoutMatches", value: "Step 1[\\s\\S]*Step 5" },
      ],
      hints: [
        "The shape is: for i in 1...5 { ... }",
        'Inside the loop, use print("Step \\(i)") to include the current number.',
        'Full answer: for i in 1...5 { print("Step \\(i)") }',
      ],
      wellDone: "Five lines of output, one tiny loop. That's leverage.",
    },
    {
      id: "swift-arrays",
      track: "swift",
      title: "A list of things",
      subtitle: "Arrays: count them, then loop them.",
      concepts: ["arrays", "for-in", "count"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "One box, many items" },
        {
          type: "p",
          text: "An array holds a bunch of values in order, written inside square brackets. Ask an array .count to find out how many things are inside, and use for-in to visit each one.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let pets = ["cat", "dog", "fish"]\nprint(pets.count)\nfor pet in pets {\n    print(pet)\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "pets.count is just the number 3 here. The loop then prints each pet on its own line.",
        },
        {
          type: "p",
          text: "Make an array of three snacks. First print how many there are with .count, then loop and print each snack on its own line.",
        },
      ],
      starter:
        "// Make an array of 3 snacks, print the count, then loop over them\n// Your code here\n",
      solution:
        'let snacks = ["chips", "cookies", "grapes"]\nprint(snacks.count)\nfor snack in snacks {\n    print(snack)\n}\n',
      checks: [
        { label: "Build an array with []", kind: "codeContains", value: "[" },
        { label: "Print how many with .count", kind: "codeContains", value: ".count" },
        { label: "Loop over the array with for-in", kind: "codeContains", value: "for " },
        { label: "Use in to read each item", kind: "codeContains", value: "in " },
        { label: "Print the count 3", kind: "stdoutContains", value: "3" },
      ],
      hints: [
        'Start with let snacks = ["chips", "cookies", "grapes"]',
        "Print the count first: print(snacks.count)",
        "Then loop: for snack in snacks { print(snack) }",
      ],
      wellDone: "Arrays plus loops is most of programming, honestly. Nice work.",
    },
  ],
};
