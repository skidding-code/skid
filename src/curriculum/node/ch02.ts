import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "node-functions",
  title: "Functions & Arrays",
  glyph: "🔧",
  summary:
    "Bottle up code in functions, shrink them into arrows, and march through arrays.",
  lessons: [
    {
      id: "node-define-function",
      track: "node",
      title: "Bottle it up",
      subtitle: "Write a function once, call it whenever.",
      concepts: ["function", "return"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A function is a reusable recipe" },
        {
          type: "p",
          text: "Copy-pasting the same lines over and over is how bugs throw a party. A function bundles some work under a name. You write it once, then call it as many times as you like.",
        },
        {
          type: "p",
          text: "Use the function keyword, give it a name, list any inputs in the parentheses, and hand a value back with return.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'function shout(word) {\n  return word + "!!!";\n}\n\nconsole.log(shout("pizza"));',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Defining a function does nothing on its own. The work happens when you call it, like shout(\"pizza\").",
        },
        {
          type: "p",
          text: "Write a function called double that takes a number and returns it times two. Then call it and log the result so the console shows 42.",
        },
      ],
      starter:
        "// 1. Write a function `double` that returns its argument times 2\n// 2. Call it with 21 and console.log the result\n",
      solution:
        "function double(n) {\n  return n * 2;\n}\n\nconsole.log(double(21));\n",
      checks: [
        {
          label: "Define a function with the function keyword",
          kind: "codeContains",
          value: "function",
        },
        {
          label: "Hand a value back with return",
          kind: "codeContains",
          value: "return",
        },
        {
          label: "The console shows 42",
          kind: "stdoutContains",
          value: "42",
        },
      ],
      hints: [
        "Start with: function double(n) { ... }",
        "Inside, write return n * 2; to send the answer back.",
        "Then below the function: console.log(double(21));",
      ],
      wellDone:
        "You just built a tiny machine and pulled its lever. Functions are 90% of programming.",
    },
    {
      id: "node-arrow-functions",
      track: "node",
      title: "Skinny arrows",
      subtitle: "The same idea, dressed in fewer characters.",
      concepts: ["arrow function", "=>"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A shorter way to write a function" },
        {
          type: "p",
          text: "Arrow functions do the same job with less ceremony. You store one in a variable, list inputs on the left of =>, and put the result on the right. No function keyword, often no return.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const yell = (word) => word.toUpperCase();\n\nconsole.log(yell("hello"));',
        },
        {
          type: "callout",
          tone: "note",
          text: "Read => as goes to: word goes to word.toUpperCase(). When the body is one expression, its value is returned automatically.",
        },
        {
          type: "p",
          text: "Write an arrow function named greet that takes a name and returns the string Hi, plus that name plus an exclamation mark. Call it with your name and log it.",
        },
      ],
      starter:
        "// Write an arrow function `greet` using =>\n// It should return \"Hi, \" + name + \"!\"\n// Then call it and console.log the result\n",
      solution:
        'const greet = (name) => "Hi, " + name + "!";\n\nconsole.log(greet("Ada"));\n',
      checks: [
        {
          label: "Use an arrow => to define the function",
          kind: "codeContains",
          value: "=>",
        },
        {
          label: "Greet someone in the output",
          kind: "stdoutContains",
          value: "Hi,",
        },
      ],
      hints: [
        "Begin with: const greet = (name) =>",
        'After the arrow, write the value to return: "Hi, " + name + "!"',
        'Then call it: console.log(greet("Ada"));',
      ],
      wellDone:
        "Arrows everywhere from here on out. You will see them in real code constantly.",
    },
    {
      id: "node-arrays-loop",
      track: "node",
      title: "March the list",
      subtitle: "Hold many things in a row, then walk through them.",
      concepts: ["array", "loop", ".length"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "An array is a numbered shelf" },
        {
          type: "p",
          text: "An array holds a list of values inside square brackets, separated by commas. To visit each item in order, a for...of loop hands you one element at a time.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const pets = ["cat", "dog", "newt"];\n\nfor (const pet of pets) {\n  console.log(pet);\n}\n\nconsole.log("Total pets: " + pets.length);',
        },
        {
          type: "callout",
          tone: "tip",
          text: "pets.length tells you how many items are in the array. It counts for you, so you never have to.",
        },
        {
          type: "p",
          text: "Make an array of at least three snacks. Loop over it and log each snack on its own line. Then log how many snacks there are using .length.",
        },
      ],
      starter:
        "// 1. Make an array `snacks` with at least 3 items in [ ]\n// 2. Loop over it and console.log each one\n// 3. console.log the count using snacks.length\n",
      solution:
        'const snacks = ["chips", "salsa", "soda"];\n\nfor (const snack of snacks) {\n  console.log(snack);\n}\n\nconsole.log("Snack count: " + snacks.length);\n',
      checks: [
        {
          label: "Create an array with square brackets",
          kind: "codeContains",
          value: "[",
        },
        {
          label: "Ask the array for its size with .length",
          kind: "codeContains",
          value: ".length",
        },
        {
          label: "Each item is printed (chips appears)",
          kind: "stdoutContains",
          value: "chips",
        },
        {
          label: "The count of 3 shows in the output",
          kind: "stdoutContains",
          value: "3",
        },
      ],
      hints: [
        'Start the array: const snacks = ["chips", "salsa", "soda"];',
        "Loop with: for (const snack of snacks) { console.log(snack); }",
        'Finish with: console.log("Snack count: " + snacks.length);',
      ],
      wellDone:
        "Arrays plus loops let you do the same thing to a thousand items without breaking a sweat.",
    },
  ],
};
