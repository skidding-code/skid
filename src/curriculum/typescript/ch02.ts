import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "ts-functions",
  title: "Functions, Typed",
  glyph: "🛠️",
  summary:
    "A function is a promise: give me these inputs and I'll hand you back that. JavaScript lets you break the promise quietly. TypeScript writes it down and holds you to it. In this chapter you learn to type a function's parameters and its return value — so a function that swears it returns a number can't sneak you a string.",
  lessons: [
    {
      id: "ts-typed-params",
      track: "typescript",
      title: "Inputs and outputs, on the record",
      subtitle: "Type a function's parameters and its return value.",
      concepts: ["function parameters", "return type"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A function is a contract" },
        {
          type: "p",
          text: "When you write a function, you're making a deal: here are the things I need, and here's what I'll give back. TypeScript lets you write that deal down. Each parameter gets a type after a colon, and the return type goes after the parentheses.",
        },
        {
          type: "p",
          text: "Now if someone calls add(\"two\", 3), TypeScript stops them before it ever runs. And inside the function, it makes sure you actually return a number like you promised.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            "function area(width: number, height: number): number {\n  return width * height;\n}\nconsole.log(area(4, 5));   // 20",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Read it left to right: name, then each (param: type), then : returnType. The return type is the part after the closing parenthesis.",
        },
        {
          type: "p",
          text: "Write a function add(a: number, b: number): number that returns a + b. Then print add(7, 8). The output should be 15.",
        },
      ],
      starter:
        "// Finish the function so it returns the sum, then print add(7, 8)\nfunction add() {\n  // Your code here\n}\n",
      solution:
        "function add(a: number, b: number): number {\n  return a + b;\n}\nconsole.log(add(7, 8));\n",
      checks: [
        { label: "Type both parameters as numbers", kind: "codeContains", value: "a: number, b: number" },
        { label: "Declare a number return type", kind: "codeContains", value: "): number" },
        { label: "Return the sum", kind: "codeContains", value: "return a + b" },
        { label: "Print 15", kind: "stdoutContains", value: "15" },
      ],
      hints: [
        "Give each parameter a type: function add(a: number, b: number) ...",
        "Add the return type after the parentheses: ): number {",
        "Inside, return a + b; then console.log(add(7, 8));",
      ],
      wellDone: "The contract is signed: two numbers in, one number out. No surprises.",
    },
    {
      id: "ts-void-return",
      track: "typescript",
      title: "Returns nothing, on purpose",
      subtitle: "Annotate a function that only logs with : void.",
      concepts: ["void", "side effects"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Some functions just do a thing" },
        {
          type: "p",
          text: "Not every function hands something back. Some just perform an action — print a line, save a file, ring a bell — and return nothing. For those, the return type is void. It's TypeScript's way of saying \"don't expect a value out of this.\"",
        },
        {
          type: "p",
          text: "If you write : void and then accidentally return a number, TypeScript flags it. The annotation documents your intent and keeps you honest.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            "function announce(name: string): void {\n  console.log(`Now boarding: ${name}`);\n}\nannounce(\"Flight 22\");   // Now boarding: Flight 22",
        },
        {
          type: "callout",
          tone: "note",
          text: "void is about the return, not the parameters. The function can still take inputs — it just doesn't give a value back.",
        },
        {
          type: "p",
          text: "Write a function alarm(label: string): void that prints BEEP: followed by the label, then call alarm(\"smoke\"). The output should be BEEP: smoke.",
        },
      ],
      starter:
        "// Make this function return nothing (void) and just log\nfunction alarm(label: string) {\n  // Your code here\n}\n",
      solution:
        "function alarm(label: string): void {\n  console.log(`BEEP: ${label}`);\n}\nalarm(\"smoke\");\n",
      checks: [
        { label: "Declare a void return type", kind: "codeContains", value: "): void" },
        { label: "Log inside the function", kind: "codeContains", value: "console.log" },
        { label: "Print the alarm line", kind: "stdoutContains", value: "BEEP: smoke" },
      ],
      hints: [
        "Add the return type after the parameter: function alarm(label: string): void {",
        "Inside, build the line with a template literal: `BEEP: ${label}`",
        "Then call it: alarm(\"smoke\");",
      ],
      wellDone: "void says it plainly: this one's here for the action, not the answer.",
    },
    {
      id: "ts-optional-default",
      track: "typescript",
      title: "Sometimes optional, sometimes assumed",
      subtitle: "Use optional (name?) and default parameters.",
      concepts: ["optional parameters", "default parameters"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Not every argument is required" },
        {
          type: "p",
          text: "A question mark after a parameter name makes it optional — the caller can leave it out, and inside it'll be undefined. A default value (param = something) goes one better: skip the argument and the function fills in a sensible fallback for you.",
        },
        {
          type: "p",
          text: "Here greeting defaults to \"Hi\". Call greet(\"Ada\") and you get the default; call greet(\"Ada\", \"Yo\") and your value wins.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            "function greet(name: string, greeting: string = \"Hi\"): string {\n  return `${greeting}, ${name}!`;\n}\nconsole.log(greet(\"Ada\"));          // Hi, Ada!\nconsole.log(greet(\"Ada\", \"Yo\"));    // Yo, Ada!",
        },
        {
          type: "callout",
          tone: "tip",
          text: "A defaulted parameter is automatically optional — you don't also need the ?. Use ? when there's no good fallback and undefined is fine.",
        },
        {
          type: "p",
          text: "Write order(item: string, size: string = \"medium\"): string returning `${size} ${item}`. Print order(\"latte\") then order(\"latte\", \"large\"). The output should include medium latte and large latte.",
        },
      ],
      starter:
        "// Give size a default of \"medium\", then call order twice\nfunction order(item: string) {\n  // Your code here\n}\n",
      solution:
        "function order(item: string, size: string = \"medium\"): string {\n  return `${size} ${item}`;\n}\nconsole.log(order(\"latte\"));\nconsole.log(order(\"latte\", \"large\"));\n",
      checks: [
        { label: "Give size a default value", kind: "codeContains", value: "size: string = \"medium\"" },
        { label: "Return the combined string", kind: "codeContains", value: "${size} ${item}" },
        { label: "Default kicks in", kind: "stdoutContains", value: "medium latte" },
        { label: "Override works", kind: "stdoutContains", value: "large latte" },
      ],
      hints: [
        "Set the default in the parameter list: size: string = \"medium\"",
        "Return `${size} ${item}` with backticks.",
        "Call it both ways: order(\"latte\") and order(\"latte\", \"large\").",
      ],
      wellDone: "One call, no size — medium. One call with a size — yours. Defaults do the quiet work.",
    },
    {
      id: "ts-arrow-typed",
      track: "typescript",
      title: "Same idea, shorter arrow",
      subtitle: "Write typed arrow functions.",
      concepts: ["arrow functions", "expression body"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Functions can travel light" },
        {
          type: "p",
          text: "Arrow functions are a compact way to write a function and store it in a variable. The types live in the same places: each parameter gets one, and the return type goes right before the =>.",
        },
        {
          type: "p",
          text: "When the body is a single expression, you can drop the braces and the return keyword entirely — the value of the expression is returned automatically. Clean and quick.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            "const double = (n: number): number => n * 2;\nconsole.log(double(21));   // 42",
        },
        {
          type: "callout",
          tone: "note",
          text: "No braces means no return keyword — the expression after => is the result. Add braces and you're back to needing an explicit return.",
        },
        {
          type: "p",
          text: "Write an arrow function square = (n: number): number => n * n, then print square(9). The output should be 81.",
        },
      ],
      starter:
        "// Write a typed arrow function that squares its input\nconst square = ;\n",
      solution:
        "const square = (n: number): number => n * n;\nconsole.log(square(9));\n",
      checks: [
        { label: "Type the arrow parameter", kind: "codeContains", value: "(n: number)" },
        { label: "Use arrow syntax", kind: "codeContains", value: "=>" },
        { label: "Declare a number return type", kind: "codeContains", value: "): number =>" },
        { label: "Print 81", kind: "stdoutContains", value: "81" },
      ],
      hints: [
        "Start with const square = (n: number) ...",
        "Add the return type and arrow: ): number => n * n;",
        "Then print it: console.log(square(9));",
      ],
      wellDone: "Same contract, fewer keystrokes. Arrows are functions with their sleeves rolled up.",
    },
    {
      id: "ts-callback-param",
      track: "typescript",
      title: "A function that takes a function",
      subtitle: "Type a callback parameter: (n: number) => number.",
      concepts: ["higher-order functions", "function types"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Functions are values too" },
        {
          type: "p",
          text: "You can pass a function into another function, just like a number or a string. A function that does this is called higher-order. The trick is typing the parameter: you describe the shape of the function it expects — its parameter types, an arrow, and its return type.",
        },
        {
          type: "p",
          text: "Here applyTwice takes a number and a function fn typed as (n: number) => number. It runs fn on the value twice. Pass in any matching function and it just works.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            "function applyTwice(x: number, fn: (n: number) => number): number {\n  return fn(fn(x));\n}\nconsole.log(applyTwice(3, (n) => n + 10));   // 23",
        },
        {
          type: "callout",
          tone: "tip",
          text: "The type (n: number) => number is a recipe, not a real function — it says \"any function taking a number and returning a number fits here.\"",
        },
        {
          type: "p",
          text: "Write transform(x: number, fn: (n: number) => number): number that returns fn(x). Then print transform(6, (n) => n * n). The output should be 36.",
        },
      ],
      starter:
        "// Type fn as a function that takes a number and returns a number\nfunction transform(x: number, fn) {\n  // Your code here\n}\n",
      solution:
        "function transform(x: number, fn: (n: number) => number): number {\n  return fn(x);\n}\nconsole.log(transform(6, (n) => n * n));\n",
      checks: [
        { label: "Type the callback parameter", kind: "codeContains", value: "fn: (n: number) => number" },
        { label: "Call the passed-in function", kind: "codeContains", value: "return fn(x)" },
        { label: "Print 36", kind: "stdoutContains", value: "36" },
        { label: "Print exactly one line", kind: "stdoutMinLines", value: "1" },
      ],
      hints: [
        "Describe fn's shape in the parameter list: fn: (n: number) => number",
        "Inside, just hand x to it: return fn(x);",
        "Call with a squaring function: transform(6, (n) => n * n);",
      ],
      wellDone: "You typed a function that eats functions. That's the gateway to map, filter, and the good stuff.",
    },
  ],
};
