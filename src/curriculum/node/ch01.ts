import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "node-basics",
  title: "JavaScript Basics",
  glyph: "🟨",
  summary: "Make JavaScript talk, remember things, and crunch a number or two.",
  lessons: [
    {
      id: "node-hello",
      track: "node",
      title: "Make it talk",
      subtitle: "Your first line of JavaScript.",
      concepts: ["console.log", "strings"],
      estimatedMinutes: 3,
      intro: [
        { type: "h", text: "console.log is how JavaScript speaks" },
        {
          type: "p",
          text: "JavaScript shows you things by printing them to the console. The magic words are console.log, and whatever you put in the parentheses shows up below.",
        },
        { type: "code", lang: "javascript", text: 'console.log("Beep boop, I am alive!");' },
        {
          type: "callout",
          tone: "tip",
          text: "Text in quotes is a string. The quotes just mark where your words start and stop — they don't get printed.",
        },
        {
          type: "p",
          text: "Your turn: print the exact greeting Hello, world! to the console.",
        },
      ],
      starter: "// Print a greeting to the console below\n",
      solution: 'console.log("Hello, world!");\n',
      checks: [
        { label: "Use console.log", kind: "codeContains", value: "console.log" },
        { label: "Print the text Hello, world!", kind: "stdoutContains", value: "Hello, world!" },
      ],
      hints: [
        "Type console.log followed by a pair of parentheses ().",
        "Put your message in quotes inside the parentheses.",
        'The whole line is: console.log("Hello, world!");',
      ],
      wellDone: "That's your first program. The computer literally did what you said. Power.",
    },
    {
      id: "node-variables",
      track: "node",
      title: "Boxes with names",
      subtitle: "Store values with let and const, then drop them into text.",
      concepts: ["let", "const", "template literals"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Variables remember things for you" },
        {
          type: "p",
          text: "A variable is a labeled box that holds a value. Use const for things that never change, and let for things that might. Then you can reuse the value by its name instead of retyping it.",
        },
        {
          type: "p",
          text: "To slot a variable into a string, use a template literal: backticks instead of quotes, with ${ } around the name. JavaScript swaps in the value for you.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const planet = "Earth";\nlet visitors = 8;\nconsole.log(`Welcome to ${planet}, all ${visitors} billion of you!`);',
        },
        {
          type: "callout",
          tone: "note",
          text: "Backticks ` are not the same key as regular quotes. They usually live just left of the 1 key.",
        },
        {
          type: "p",
          text: "Make a const called name holding your name, then use a template literal to print a line like Hi, my name is ___.",
        },
      ],
      starter: "// 1. Make a const called name\n// 2. Print a greeting using a `template literal`\n",
      solution:
        'const name = "Ada";\nconsole.log(`Hi, my name is ${name}!`);\n',
      checks: [
        { label: "Declare a variable with const", kind: "codeContains", value: "const" },
        { label: "Use a template literal (backticks)", kind: "codeContains", value: "`" },
        { label: "Insert a value with ${ }", kind: "codeContains", value: "${" },
        { label: "Print a greeting with your name", kind: "stdoutContains", value: "my name is", ci: true },
      ],
      hints: [
        'Start with const name = "your name";',
        "Wrap your printed text in backticks ` instead of quotes.",
        'Try: console.log(`Hi, my name is ${name}!`);',
      ],
      wellDone: "const, a template literal, and ${ } — that's three real tools in one line.",
    },
    {
      id: "node-numbers",
      track: "node",
      title: "Numbers and gluing text",
      subtitle: "Do some math, then print the result inside a sentence.",
      concepts: ["numbers", "concatenation"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Numbers without quotes are real numbers" },
        {
          type: "p",
          text: "Drop the quotes and JavaScript treats a number as a number you can do math on: + - * /. Store the result in a let so you can use it later.",
        },
        {
          type: "p",
          text: "The + sign does double duty: between numbers it adds, but between strings it glues them together. That gluing is called concatenation.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'let total = 3 * 4;\nconsole.log("Eggs in the carton: " + total);',
        },
        {
          type: "callout",
          tone: "warn",
          text: 'Watch the difference: 2 + 3 is 5, but "2" + "3" is "23". Quotes turn addition into gluing.',
        },
        {
          type: "p",
          text: "A dozen donuts cost 2 dollars each. Compute the total with multiplication, store it in a variable, and print a sentence that includes the number.",
        },
      ],
      starter: "// 1. Compute 12 * 2 and store it in a let variable\n// 2. Print a sentence that includes the total\n",
      solution:
        'let cost = 12 * 2;\nconsole.log("A dozen donuts costs $" + cost);\n',
      checks: [
        { label: "Use a let variable", kind: "codeContains", value: "let" },
        { label: "Multiply to get the total (use *)", kind: "codeContains", value: "*" },
        { label: "Print the computed value 24", kind: "stdoutContains", value: "24" },
        { label: "Glue text and number with +", kind: "codeContains", value: "+" },
      ],
      hints: [
        "Start with let cost = 12 * 2; and let JavaScript do the multiply.",
        'Build the sentence with "text " + cost.',
        'Try: console.log("A dozen donuts costs $" + cost);',
      ],
      wellDone: "You made JavaScript do the arithmetic and then narrate the answer. Nice combo.",
    },
  ],
};
