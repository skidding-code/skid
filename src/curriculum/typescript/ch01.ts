import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "ts-typed-basics",
  title: "Types, Finally",
  glyph: "🏷️",
  summary:
    "JavaScript will happily add a number to a string and hand you \"5apples\" with a straight face. TypeScript is the friend who taps you on the shoulder first. In this chapter you meet the basic types, learn to annotate a value, and watch the compiler catch mistakes before they ever run.",
  lessons: [
    {
      id: "ts-hello",
      track: "typescript",
      title: "Same console, new powers",
      subtitle: "Run your first TypeScript and print to the console.",
      concepts: ["console.log", "TypeScript"],
      estimatedMinutes: 3,
      intro: [
        { type: "h", text: "TypeScript is JavaScript with a spell-checker" },
        {
          type: "p",
          text: "Every line of JavaScript you already know is valid TypeScript. The difference is that TypeScript reads your code first and warns you about whole categories of bugs before it runs. Here it runs in your browser: we erase the types and execute the JavaScript underneath.",
        },
        { type: "code", lang: "typescript", text: 'console.log("Types are on.");' },
        {
          type: "callout",
          tone: "tip",
          text: "console.log works exactly like in JavaScript — whatever you pass shows up in the console below.",
        },
        {
          type: "p",
          text: "Print the exact line Hello, TypeScript! to the console.",
        },
      ],
      starter: "// Print a greeting to the console\n",
      solution: 'console.log("Hello, TypeScript!");\n',
      checks: [
        { label: "Use console.log", kind: "codeContains", value: "console.log" },
        { label: "Print Hello, TypeScript!", kind: "stdoutContains", value: "Hello, TypeScript!" },
      ],
      hints: [
        "Type console.log( ) and put your message inside.",
        "Strings go in quotes.",
        'The whole line is: console.log("Hello, TypeScript!");',
      ],
      wellDone: "Identical to JavaScript on the surface — but now there's a safety net underneath.",
    },
    {
      id: "ts-annotate",
      track: "typescript",
      title: "Labels on the boxes",
      subtitle: "Annotate variables with : string, : number, : boolean.",
      concepts: ["type annotation", "string", "number", "boolean"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Tell TypeScript what belongs in each box" },
        {
          type: "p",
          text: "You add a type to a variable with a colon: let age: number = 30. Now that box only ever holds numbers — try to put a string in it later and TypeScript stops you. The three you'll use constantly are string, number, and boolean.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'let name: string = "Ada";\nlet age: number = 36;\nlet genius: boolean = true;\nconsole.log(`${name} is ${age}, genius: ${genius}`);',
        },
        {
          type: "callout",
          tone: "note",
          text: "Types are written after the name, before the =. They vanish when the code runs — they exist purely to catch mistakes while you write.",
        },
        {
          type: "p",
          text: 'Declare planet: string set to "Mars", moons: number set to 2, and visited: boolean set to false. Then print Mars has 2 moons, visited: false using a template literal.',
        },
      ],
      starter: "// Declare three typed variables, then print them\n",
      solution:
        'let planet: string = "Mars";\nlet moons: number = 2;\nlet visited: boolean = false;\nconsole.log(`${planet} has ${moons} moons, visited: ${visited}`);\n',
      checks: [
        { label: "Annotate a string", kind: "codeContains", value: ": string" },
        { label: "Annotate a number", kind: "codeContains", value: ": number" },
        { label: "Annotate a boolean", kind: "codeContains", value: ": boolean" },
        { label: "Print the sentence", kind: "stdoutContains", value: "Mars has 2 moons, visited: false" },
      ],
      hints: [
        "Each line looks like: let planet: string = \"Mars\";",
        "Numbers and booleans have no quotes: let moons: number = 2;",
        'Print with backticks: console.log(`${planet} has ${moons} moons, visited: ${visited}`);',
      ],
      wellDone: "Every box is labelled. TypeScript will hold you to it from here on.",
    },
    {
      id: "ts-inference",
      track: "typescript",
      title: "It already knows",
      subtitle: "Let TypeScript infer types — and see why .toFixed() works on a number.",
      concepts: ["type inference", "number methods"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "You don't have to write every type" },
        {
          type: "p",
          text: "When you assign a value right away, TypeScript figures out the type for you. let price = 4.5 is already a number — no annotation needed. This is called inference, and it's why TypeScript rarely feels noisy.",
        },
        {
          type: "p",
          text: "Because it knows price is a number, it lets you call number methods like .toFixed(2) and would reject string methods. The type travels with the value.",
        },
        {
          type: "code",
          lang: "typescript",
          text: 'let price = 4.5;        // inferred: number\nconsole.log(price.toFixed(2));   // "4.50"',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Rule of thumb: let inference do the work for simple assignments; add explicit types where the value isn't obvious (like function parameters).",
        },
        {
          type: "p",
          text: "Make a variable total = 19.5 with no annotation, then print it rounded to a whole number using total.toFixed(0). The output should be 20.",
        },
      ],
      starter: "// Let TypeScript infer the type, then round it\n",
      solution: 'let total = 19.5;\nconsole.log(total.toFixed(0));\n',
      checks: [
        { label: "Assign without an annotation", kind: "codeContains", value: "total = 19.5" },
        { label: "Use the number method toFixed", kind: "codeContains", value: ".toFixed(" },
        { label: "Print the rounded result", kind: "stdoutContains", value: "20" },
      ],
      hints: [
        "No colon needed: let total = 19.5; — TypeScript sees it's a number.",
        "Round with total.toFixed(0).",
        "console.log(total.toFixed(0)); prints 20.",
      ],
      wellDone: "Inference means types without the typing. TypeScript knew it was a number all along.",
    },
    {
      id: "ts-any-vs-typed",
      track: "typescript",
      title: "The escape hatch you'll regret",
      subtitle: "See what `any` turns off — and why a real type is better.",
      concepts: ["any", "type safety"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "any means \"stop checking this\"" },
        {
          type: "p",
          text: "The any type is a trapdoor: it tells TypeScript to stop checking a value entirely, so you're back to plain JavaScript with all its sharp edges. It's occasionally useful, but reach for a real type whenever you can — that's the whole point of TypeScript.",
        },
        {
          type: "p",
          text: "Here we give a value a proper type so the methods we call are guaranteed to exist. label is a string, so .toUpperCase() is safe.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'let messy: any = "7";\nconsole.log(messy * 2);   // 14 — no warning, even though it was a string\n\nlet label: string = "ok";\nconsole.log(label.toUpperCase());   // "OK", fully checked',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Every any is a hole in your safety net. A codebase full of any is just JavaScript wearing a TypeScript hat.",
        },
        {
          type: "p",
          text: 'Declare a properly typed mood: string set to "calm" and print it uppercased with .toUpperCase(). The output should be CALM.',
        },
      ],
      starter: "// Use a real type, not any\n",
      solution: 'let mood: string = "calm";\nconsole.log(mood.toUpperCase());\n',
      checks: [
        { label: "Give it the string type", kind: "codeContains", value: ": string" },
        { label: "Don't use the any escape hatch", kind: "codeNotContains", value: ": any" },
        { label: "Call a string method", kind: "codeContains", value: ".toUpperCase()" },
        { label: "Print the uppercased mood", kind: "stdoutContains", value: "CALM" },
      ],
      hints: [
        "Annotate it as a string: let mood: string = \"calm\";",
        "Avoid : any — the goal is real type safety.",
        "Uppercase it: console.log(mood.toUpperCase());",
      ],
      wellDone: "You kept the safety net up. Save any for emergencies — there are fewer than you'd think.",
    },
  ],
};
