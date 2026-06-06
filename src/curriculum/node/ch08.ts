import type { Chapter } from "../types";

export const ch08: Chapter = {
  id: "node-scope",
  title: "Scope, Closures & Errors",
  glyph: "🔒",
  summary: "See where variables live, build a function that remembers, and stay calm when code throws.",
  lessons: [
    {
      id: "node-closure-counter",
      track: "node",
      title: "A function that remembers",
      subtitle: "Trap a variable inside a closure.",
      concepts: ["scope", "closures"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Variables have a hometown" },
        {
          type: "p",
          text: "A variable declared inside a function lives inside that function — the outside world can't see it. That's scope. But when a function returns another function, the inner one keeps a private little hideout where it can stash a value between calls. That hideout is a closure.",
        },
        {
          type: "code",
          lang: "javascript",
          text: "function makeGreeter(name) {\n  return function () {\n    return \"Hi \" + name;\n  };\n}\nconst greet = makeGreeter(\"Sam\");\nconsole.log(greet()); // Hi Sam",
        },
        {
          type: "callout",
          tone: "tip",
          text: "The inner function still remembers name long after makeGreeter finished running. Nobody told it to. It just hoards.",
        },
        {
          type: "p",
          text: "Write makeCounter that holds a count starting at 0 and returns a function. Each call should add 1 and return the new count. Then call it three times and print each result, so you see 1, then 2, then 3.",
        },
      ],
      starter:
        "// Write makeCounter() that returns a function which counts 1, 2, 3...\n// Then create a counter and console.log three calls to it.\n",
      solution:
        "function makeCounter() {\n  let count = 0;\n  return function () {\n    count = count + 1;\n    return count;\n  };\n}\nconst next = makeCounter();\nconsole.log(next());\nconsole.log(next());\nconsole.log(next());\n",
      checks: [
        { label: "Define a function", kind: "codeContains", value: "function" },
        { label: "Counter starts at 1", kind: "stdoutContains", value: "1" },
        { label: "Counts up in order 1, 2, 3", kind: "stdoutMatches", value: "1[\\s\\S]*2[\\s\\S]*3" },
      ],
      hints: [
        "Inside makeCounter, declare let count = 0 before the inner function.",
        "The returned function should do count = count + 1; return count;.",
        "Call const next = makeCounter(); then console.log(next()) three times — the same count survives between calls.",
      ],
      wellDone: "Your function has a memory now. That private little count is a closure doing its quiet work.",
    },
    {
      id: "node-let-const-block",
      track: "node",
      title: "Where a variable can roam",
      subtitle: "Block scope with let and const.",
      concepts: ["let/const", "block scope"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Curly braces are fences" },
        {
          type: "p",
          text: "let and const are block-scoped: a variable declared inside { } only exists inside those braces. Each turn of a loop gets its own fresh copy of a let variable, which is exactly what you want when you're keeping track of things.",
        },
        {
          type: "code",
          lang: "javascript",
          text: "for (let i = 0; i < 3; i++) {\n  console.log(\"step \" + i);\n}\n// i does not exist out here — it stayed inside the loop",
        },
        {
          type: "callout",
          tone: "note",
          text: "Use const when a value never gets reassigned, and let when it does. Reach for var basically never — it ignores these fences and causes mysteries.",
        },
        {
          type: "p",
          text: "Loop with let from 1 to 3 and print \"count: 1\", \"count: 2\", \"count: 3\". The loop variable should be declared with let right in the for statement.",
        },
      ],
      starter:
        "// Use a for loop with let to print count: 1, count: 2, count: 3\n",
      solution:
        "for (let i = 1; i <= 3; i++) {\n  console.log(\"count: \" + i);\n}\n",
      checks: [
        { label: "Declare the loop variable with let", kind: "codeContains", value: "let" },
        { label: "Print the first count", kind: "stdoutContains", value: "count: 1" },
        { label: "Counts up to three in order", kind: "stdoutMatches", value: "count: 1[\\s\\S]*count: 2[\\s\\S]*count: 3" },
      ],
      hints: [
        "Start with for (let i = 1; i <= 3; i++) { ... }.",
        "Inside the braces, console.log(\"count: \" + i).",
        "The whole thing prints count: 1, count: 2, count: 3 — and i never leaks outside the loop.",
      ],
      wellDone: "Each loop turn got its own tidy little i. Block scope keeps your variables from wandering off.",
    },
    {
      id: "node-try-catch",
      track: "node",
      title: "Catch it before it falls",
      subtitle: "Handle errors with try and catch.",
      concepts: ["try/catch", "errors"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "When code goes boom" },
        {
          type: "p",
          text: "Some operations can fail. JSON.parse on garbage text throws an error, and an unhandled error stops the whole program cold. A try/catch wraps the risky bit: try runs it, and if it throws, catch grabs the error so you can respond gracefully instead of crashing.",
        },
        {
          type: "code",
          lang: "javascript",
          text: "try {\n  JSON.parse(\"not json\");\n} catch (err) {\n  console.log(\"Caught: \" + err.message);\n}",
        },
        {
          type: "callout",
          tone: "warn",
          text: "catch receives the error object. Its .message tells you what went wrong. Without the try, that bad parse would take your program down with it.",
        },
        {
          type: "p",
          text: "Wrap JSON.parse(\"{bad}\") in a try. In the catch block, print a friendly line that contains the word Caught. The program should keep running and print Still alive afterward.",
        },
      ],
      starter:
        "// Wrap JSON.parse(\"{bad}\") in a try/catch.\n// In catch, print something containing \"Caught\". Then print \"Still alive\".\n",
      solution:
        "try {\n  JSON.parse(\"{bad}\");\n} catch (err) {\n  console.log(\"Caught: \" + err.message);\n}\nconsole.log(\"Still alive\");\n",
      checks: [
        { label: "Open a try block", kind: "codeContains", value: "try" },
        { label: "Handle it with catch", kind: "codeContains", value: "catch" },
        { label: "Report the caught error", kind: "stdoutContains", value: "Caught" },
        { label: "Program survives and continues", kind: "stdoutContains", value: "Still alive" },
      ],
      hints: [
        "Put the risky JSON.parse(\"{bad}\") inside try { ... }.",
        "Add catch (err) { console.log(\"Caught: \" + err.message); } right after.",
        "Then, outside the catch, console.log(\"Still alive\") to prove the crash was avoided.",
      ],
      wellDone: "The error tried to crash you and you caught it like a champ. Robust code stays standing.",
    },
    {
      id: "node-default-rest-params",
      track: "node",
      title: "Flexible function inputs",
      subtitle: "Default values and rest parameters.",
      concepts: ["default params", "rest params"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Functions that bend, not break" },
        {
          type: "p",
          text: "A default parameter fills in a value when the caller skips an argument. A rest parameter, written ...args, scoops up any number of extra arguments into a single array — so one function can take two inputs or twenty.",
        },
        {
          type: "code",
          lang: "javascript",
          text: "function shout(word = \"hello\", ...extras) {\n  console.log(word.toUpperCase());\n  console.log(extras.length);\n}\nshout();           // HELLO, then 0\nshout(\"hi\", 1, 2); // HI, then 2",
        },
        {
          type: "callout",
          tone: "tip",
          text: "The rest parameter must come last, and there can be only one. It's always a real array, so .length, .map, and friends all work.",
        },
        {
          type: "p",
          text: "Write sum(start = 0, ...nums) that adds start to all the rest numbers and returns the total. Print sum(10, 1, 2, 3) — it should be 16 — and print sum() on its own, which should be 0.",
        },
      ],
      starter:
        "// Write sum(start = 0, ...nums) that returns start plus all the nums.\n// console.log sum(10, 1, 2, 3) and sum().\n",
      solution:
        "function sum(start = 0, ...nums) {\n  let total = start;\n  for (const n of nums) {\n    total = total + n;\n  }\n  return total;\n}\nconsole.log(sum(10, 1, 2, 3));\nconsole.log(sum());\n",
      checks: [
        { label: "Use an arrow or function", kind: "codeContains", value: "function" },
        { label: "Collect extra args with a rest parameter", kind: "codeContains", value: "..." },
        { label: "10 + 1 + 2 + 3 is 16", kind: "stdoutContains", value: "16" },
        { label: "Default makes the empty call return 0", kind: "stdoutContains", value: "0" },
      ],
      hints: [
        "Declare it as function sum(start = 0, ...nums) { ... } so start defaults and nums catches the rest.",
        "Start total at start, then loop for (const n of nums) total = total + n.",
        "Return total, then console.log(sum(10, 1, 2, 3)) (16) and console.log(sum()) (0).",
      ],
      wellDone: "One function, any number of arguments, sensible defaults. That's a genuinely reusable tool.",
    },
  ],
};
