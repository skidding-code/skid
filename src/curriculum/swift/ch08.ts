import type { Chapter } from "../types";

export const ch08: Chapter = {
  id: "swift-closures",
  title: "Closures & Higher-Order",
  glyph: "🧶",
  summary:
    "A closure is a chunk of code you can hand around like a sticky note: store it, pass it, run it later. Once functions accept other functions, your arrays gain superpowers — map transforms everything, filter throws out the riffraff, and sorted lines them up however you like. Pull the thread.",
  lessons: [
    {
      id: "swift-closure-variable",
      track: "swift",
      title: "Code in a jar",
      subtitle: "Store a closure in a variable and call it later.",
      concepts: ["closures", "function values"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A function with no name, kept in a box" },
        {
          type: "p",
          text: "A closure is just a little block of code you can put inside a variable. You write it between { } and call it later with parentheses, exactly like a function. It's a function that skipped the naming ceremony.",
        },
        {
          type: "p",
          text: "The shape is { (parameters) -> ReturnType in body }. The keyword in separates the inputs from the actual work. After that, greet(\"Ada\") runs it.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let greet = { (name: String) -> String in\n    return "Hi \\(name)!"\n}\n\nprint(greet("Ada"))',
        },
        {
          type: "callout",
          tone: "note",
          text: "Yes, in looks weird sitting there. Read it as \"given these inputs, here's the code.\" Everything before in is the signature; everything after is the body.",
        },
        {
          type: "p",
          text: "Store a closure in a variable double that takes an Int n and returns n * 2. Call it with 21 and print Double: 42.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'let double = { (n: Int) -> Int in\n    return n * 2\n}\n\nprint("Double: \\(double(21))")\n',
      checks: [
        { label: "Open a closure with a brace", kind: "codeContains", value: "{" },
        { label: "Use the in keyword to start the body", kind: "codeContains", value: " in" },
        { label: "Call the stored closure", kind: "codeContains", value: "double(21)" },
        { label: "Print the doubled result", kind: "stdoutContains", value: "Double: 42" },
      ],
      hints: [
        "A closure goes in a variable: let double = { ... }.",
        "The header names the input and output: { (n: Int) -> Int in ... }, then return n * 2.",
        'Call it like a function and print: print("Double: \\(double(21))").',
      ],
      wellDone: "You bottled some code and uncorked it on demand. Closures are functions you can carry in your pocket.",
    },
    {
      id: "swift-closure-as-argument",
      track: "swift",
      title: "Hand me your homework",
      subtitle: "Pass a closure into a function that runs it.",
      concepts: ["closures", "higher-order"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Functions that eat other functions" },
        {
          type: "p",
          text: "If a closure can live in a variable, it can also be passed as an argument. A function that takes a closure is called higher-order — fancy name, simple idea: you give it the behavior and it decides when to run it.",
        },
        {
          type: "p",
          text: "Here applyTwice takes a value and a closure op, and runs op on the value two times. The closure's type, (Int) -> Int, is written right in the parameter list.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'func applyTwice(_ x: Int, _ op: (Int) -> Int) -> Int {\n    return op(op(x))\n}\n\nlet result = applyTwice(3) { n in n + 10 }\nprint("Result: \\(result)")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "When the closure is the last argument you can write it AFTER the parentheses with no label — that's a trailing closure: applyTwice(3) { n in n + 10 }. Cleaner, same meaning.",
        },
        {
          type: "p",
          text: "Write a function applyTo(_ x: Int, _ op: (Int) -> Int) that returns op(x). Call it on 5 with a trailing closure that squares its input (n * n) and print Squared: 25.",
        },
      ],
      starter:
        "func applyTo(_ x: Int, _ op: (Int) -> Int) -> Int {\n    // Your code here\n}\n",
      solution:
        'func applyTo(_ x: Int, _ op: (Int) -> Int) -> Int {\n    return op(x)\n}\n\nlet squared = applyTo(5) { n in n * n }\nprint("Squared: \\(squared)")\n',
      checks: [
        { label: "Run the passed-in closure", kind: "codeContains", value: "op(x)" },
        { label: "Use the in keyword in the closure", kind: "codeContains", value: " in" },
        { label: "Pass a closure as an argument", kind: "codeContains", value: "{" },
        { label: "Print the squared result", kind: "stdoutContains", value: "Squared: 25" },
      ],
      hints: [
        "Inside applyTo, just run the closure on x: return op(x).",
        "Pass behavior in with a trailing closure: applyTo(5) { n in n * n }.",
        'Keep the result and print it: print("Squared: \\(squared)").',
      ],
      wellDone: "You handed a function some behavior and let it do the work. That's higher-order programming — delegation, but for code.",
    },
    {
      id: "swift-map-filter",
      track: "swift",
      title: "Transform, then bounce the rest",
      subtitle: "Reshape an array with map and trim it with filter.",
      concepts: ["map", "filter"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Two verbs that replace a dozen loops" },
        {
          type: "p",
          text: "map walks an array and builds a NEW array by running your closure on each element. filter walks an array and keeps only the elements where your closure returns true. Neither one touches the original — they hand you a fresh array.",
        },
        {
          type: "p",
          text: "With trailing closures they read almost like English. Inside, $0 is shorthand for \"the current element\" so you don't even have to name it.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let nums = [1, 2, 3, 4, 5, 6]\nlet evens = nums.filter { $0 % 2 == 0 }\nlet doubled = evens.map { $0 * 2 }\nprint(doubled)   // [4, 8, 12]',
        },
        {
          type: "callout",
          tone: "tip",
          text: "$0 is the first (and here, only) argument to the closure. nums.map { $0 * 2 } is just nums.map { n in n * 2 } with less typing.",
        },
        {
          type: "p",
          text: "Start from let nums = [1, 2, 3, 4, 5, 6]. Use filter to keep the even numbers, then map to triple each survivor. Print the array — it should be [6, 12, 18].",
        },
      ],
      starter: "let nums = [1, 2, 3, 4, 5, 6]\n// Your code here\n",
      solution:
        'let nums = [1, 2, 3, 4, 5, 6]\nlet evens = nums.filter { $0 % 2 == 0 }\nlet tripled = evens.map { $0 * 3 }\nprint(tripled)\n',
      checks: [
        { label: "Keep elements with filter", kind: "codeContains", value: ".filter " },
        { label: "Transform elements with map", kind: "codeContains", value: ".map " },
        { label: "Use a trailing closure", kind: "codeContains", value: "{" },
        { label: "Print the final array", kind: "stdoutContains", value: "[6, 12, 18]" },
      ],
      hints: [
        "First throw out the odds: nums.filter { $0 % 2 == 0 } keeps 2, 4, 6.",
        "Then triple each one: evens.map { $0 * 3 }.",
        "Print the result and check it's [6, 12, 18]: print(tripled).",
      ],
      wellDone: "filter to choose, map to change — you just replaced a whole loop with two tidy lines.",
    },
    {
      id: "swift-sorted-by",
      track: "swift",
      title: "Line up however you like",
      subtitle: "Sort an array your way with a comparison closure.",
      concepts: ["sorted(by:)", "closures"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "You decide who goes first" },
        {
          type: "p",
          text: "sorted() puts things in the default order. But sorted(by:) lets YOU set the rule: you give it a closure that takes two elements and returns true if the first should come before the second. Want biggest-first? Say so.",
        },
        {
          type: "p",
          text: "The closure gets two values — $0 and $1 — and you return the comparison. $0 > $1 means \"bigger goes first,\" giving you descending order. Like map and filter, it returns a brand-new sorted array.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let scores = [42, 7, 99, 13]\nlet highToLow = scores.sorted { $0 > $1 }\nprint(highToLow)   // [99, 42, 13, 7]',
        },
        {
          type: "callout",
          tone: "note",
          text: "Flip the operator to flip the order: $0 < $1 is ascending, $0 > $1 is descending. The original array is untouched.",
        },
        {
          type: "p",
          text: "Start from let ages = [30, 12, 47, 25]. Use sorted(by:) with a closure to put them in ascending order (smallest first) and print the result — it should be [12, 25, 30, 47].",
        },
      ],
      starter: "let ages = [30, 12, 47, 25]\n// Your code here\n",
      solution:
        'let ages = [30, 12, 47, 25]\nlet ranked = ages.sorted { $0 < $1 }\nprint(ranked)\n',
      checks: [
        { label: "Sort with a comparison closure", kind: "codeContains", value: ".sorted" },
        { label: "Provide the closure body", kind: "codeContains", value: "{" },
        { label: "Compare the two elements", kind: "codeContains", value: "$0 < $1" },
        { label: "Print the ascending array", kind: "stdoutContains", value: "[12, 25, 30, 47]" },
      ],
      hints: [
        "sorted takes a rule: ages.sorted { ... }.",
        "Return true when the first should come first; smallest-first is $0 < $1.",
        "Print it and confirm [12, 25, 30, 47]: print(ranked).",
      ],
      wellDone: "You taught sort your own rules. With one closure you can order anything, any way you want.",
    },
  ],
};
