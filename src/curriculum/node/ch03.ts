import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "node-objects",
  title: "Objects & Logic",
  glyph: "📦",
  summary: "Bundle facts into objects, make decisions, and reshape arrays.",
  lessons: [
    {
      id: "node-object-literal",
      track: "node",
      title: "A box with labels",
      subtitle: "Group related facts into one object.",
      concepts: ["objects", "properties"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "One thing, many facts" },
        {
          type: "p",
          text: "A variable holds one value. But a dog isn't one value — it's a name, an age, and a deeply held belief that the mail carrier is evil. An object packs all of that into a single labelled box.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const cat = { name: "Mittens", lives: 9 };\nconsole.log(cat.name); // Mittens',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The curly braces { } make an object. Each label:value pair is a property, and you read one back with a dot, like cat.name.",
        },
        {
          type: "p",
          text: "Make a dog object with a name property and a goodBoy property, then print just the dog's name.",
        },
      ],
      starter: "// Build a dog object, then print its name property\n",
      solution:
        'const dog = { name: "Rex", goodBoy: true };\nconsole.log(dog.name);\n',
      checks: [
        { label: "Create an object with { }", kind: "codeContains", value: "{" },
        { label: "Read a property with a dot", kind: "codeContains", value: "." },
        { label: "Print the dog's name", kind: "stdoutContains", value: "Rex" },
      ],
      hints: [
        "Start with const dog = { ... } and put name and goodBoy inside.",
        "Separate properties with a comma: name: \"Rex\", goodBoy: true.",
        'The whole thing: const dog = { name: "Rex", goodBoy: true }; console.log(dog.name);',
      ],
      wellDone: "One box, neatly labelled. That's how real programs keep facts together.",
    },
    {
      id: "node-if-else",
      track: "node",
      title: "Choose your own message",
      subtitle: "Run different code depending on a value.",
      concepts: ["if/else", "comparison"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Programs that make decisions" },
        {
          type: "p",
          text: "Code usually runs top to bottom, no questions asked. An if statement adds a fork in the road: do this when something is true, otherwise do that.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const temp = 35;\nif (temp > 30) {\n  console.log("Hot! Find shade.");\n} else {\n  console.log("Pleasant out.");\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "Use > < to compare, and === to check equality. Note the triple equals — JavaScript is fussy and one = means something totally different.",
        },
        {
          type: "p",
          text: "There's a coffee count below. If it's more than 3, print a warning about the jitters. Otherwise, print that you're fine.",
        },
      ],
      starter:
        "const cups = 5;\n// If cups is more than 3, warn about jitters; otherwise say you're fine\n",
      solution:
        'const cups = 5;\nif (cups > 3) {\n  console.log("Too much coffee! Jitters incoming.");\n} else {\n  console.log("All fine, perfectly calm.");\n}\n',
      checks: [
        { label: "Use an if statement", kind: "codeContains", value: "if" },
        { label: "Handle the other case with else", kind: "codeContains", value: "else" },
        { label: "Warn about the jitters", kind: "stdoutContains", value: "Jitters", ci: true },
      ],
      hints: [
        "Write if (cups > 3) { ... } else { ... }.",
        "Put a console.log inside each branch.",
        'Since cups is 5, only the if branch runs — so its message must contain the word Jitters.',
      ],
      wellDone: "Your program now reacts to its data instead of doing the same thing every time.",
    },
    {
      id: "node-array-map",
      track: "node",
      title: "Reshape a whole list",
      subtitle: "Transform every item with map.",
      concepts: ["arrays", "map"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Do it to all of them at once" },
        {
          type: "p",
          text: "An array is a list, like [1, 2, 3]. Instead of looping by hand, map walks the list for you and returns a brand-new array built from whatever you return for each item.",
        },
        {
          type: "code",
          lang: "javascript",
          text: "const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled); // [ 2, 4, 6 ]",
        },
        {
          type: "callout",
          tone: "tip",
          text: "map never changes the original array — it hands you a fresh one. JSON.stringify(...) turns that array into clean text for printing.",
        },
        {
          type: "p",
          text: "Take the prices below and add 1 (a dollar of tax) to each. Map them into a new array and print it.",
        },
      ],
      starter:
        "const prices = [4, 9, 12];\n// Map prices into a new array with 1 added to each, then print it\n",
      solution:
        "const prices = [4, 9, 12];\nconst withTax = prices.map(p => p + 1);\nconsole.log(JSON.stringify(withTax));\n",
      checks: [
        { label: "Use .map( to build a new array", kind: "codeContains", value: ".map(" },
        { label: "Print the taxed prices", kind: "stdoutContains", value: "5" },
        { label: "All three taxed values appear in order", kind: "stdoutMatches", value: "5[\\s\\S]*10[\\s\\S]*13" },
      ],
      hints: [
        "Call prices.map(p => ...) and return p + 1 for each price.",
        "Save the result in a new variable, then console.log it.",
        "console.log(JSON.stringify(prices.map(p => p + 1))) prints [5,10,13].",
      ],
      wellDone: "You transformed an entire list with one line. That's the power of map.",
    },
  ],
};
