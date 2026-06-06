import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "ts-unions-narrowing",
  title: "Unions & Narrowing",
  glyph: "🔀",
  summary:
    "Sometimes a value could be one of a few things — a string or a number, \"up\" or \"down\", a shape or another shape. A union type says \"it's one of these.\" But before you can use it, you have to prove which one it is. That proving is called narrowing, and it's how TypeScript keeps you honest right up to the moment your code runs.",
  lessons: [
    {
      id: "ts-union-basics",
      track: "typescript",
      title: "One box, two types",
      subtitle: "Declare a union with `string | number` and assign each kind.",
      concepts: ["union type", "string | number"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A value that can be more than one type" },
        {
          type: "p",
          text: "Most boxes hold one type. But sometimes a value is legitimately either of two things — an id might come in as the number 42 or the string \"42\". You write that with a vertical bar: let id: string | number. Now TypeScript accepts both, and rejects anything that isn't one of them.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'let id: string | number = 42;\nconsole.log(id);     // 42\nid = "x9f";\nconsole.log(id);     // x9f',
        },
        {
          type: "callout",
          tone: "note",
          text: "The bar | reads as \"or\". string | number means \"a string or a number\" — and only those two.",
        },
        {
          type: "p",
          text: 'Declare token: string | number, set it to 7 and print it, then reassign it to "abc" and print it again. The console should show 7 on the first line and abc on the second.',
        },
      ],
      starter: "// Declare a value that can be either type, and print both\n",
      solution:
        'let token: string | number = 7;\nconsole.log(token);\ntoken = "abc";\nconsole.log(token);\n',
      checks: [
        { label: "Declare a union type", kind: "codeContains", value: "string | number" },
        { label: "Print the number first", kind: "stdoutContains", value: "7" },
        { label: "Print the string second", kind: "stdoutContains", value: "abc" },
        { label: "Two lines of output", kind: "stdoutMinLines", value: "2" },
      ],
      hints: [
        "Write the type with a bar: let token: string | number = 7;",
        "Reassign with a string: token = \"abc\";",
        "Print after each assignment: console.log(token);",
      ],
      wellDone: "One box, two allowed types. TypeScript let both through because you said it could.",
    },
    {
      id: "ts-literal-union",
      track: "typescript",
      title: "Only these exact words",
      subtitle: "Build a literal union `\"up\" | \"down\"` and use it in a function.",
      concepts: ["literal union", "type alias"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Unions of exact values, not just types" },
        {
          type: "p",
          text: "A union doesn't have to be whole types like string or number — it can be specific values. type Dir = \"up\" | \"down\" creates a type that allows only those two exact strings. Pass \"left\" and TypeScript stops you cold. It's like an enum made of plain strings.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type Dir = "up" | "down";\nfunction step(d: Dir): string {\n  return `going ${d}`;\n}\nconsole.log(step("up"));     // going up',
        },
        {
          type: "callout",
          tone: "tip",
          text: "type Name = ... gives a union a name you can reuse. \"up\" here is a literal type: the only value it accepts is the string up.",
        },
        {
          type: "p",
          text: 'Define type Light = "red" | "green" and a function go(l: Light) that returns `signal: ${l}`. Call it with "green" and print the result. The output should be signal: green.',
        },
      ],
      starter: "// Define a literal union type, then a function that takes it\n",
      solution:
        'type Light = "red" | "green";\nfunction go(l: Light): string {\n  return `signal: ${l}`;\n}\nconsole.log(go("green"));\n',
      checks: [
        { label: "Define the literal union", kind: "codeContains", value: '"red" | "green"' },
        { label: "Use a type alias", kind: "codeContains", value: "type Light" },
        { label: "Print the result", kind: "stdoutContains", value: "signal: green" },
      ],
      hints: [
        "Name the union: type Light = \"red\" | \"green\";",
        "The function returns a template literal: return `signal: ${l}`;",
        "Call it with one of the allowed strings: console.log(go(\"green\"));",
      ],
      wellDone: "Only the words you listed are allowed. Typos become compile errors instead of bugs.",
    },
    {
      id: "ts-typeof-narrowing",
      track: "typescript",
      title: "Proving which one",
      subtitle: "Narrow a `string | number` with `typeof` and branch.",
      concepts: ["narrowing", "typeof", "control flow"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "typeof tells you what you're holding" },
        {
          type: "p",
          text: "Inside a union you can't call number methods on a string, or vice versa — TypeScript only allows what's safe for both. To unlock the rest, you prove which type you have. The classic tool is typeof x === \"number\": inside that if, TypeScript knows x is a number and lets you treat it like one.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'function describe(x: string | number): string {\n  if (typeof x === "number") {\n    return `number: ${x.toFixed(1)}`;\n  }\n  return `string: ${x.toUpperCase()}`;\n}\nconsole.log(describe(3));      // number: 3.0\nconsole.log(describe("hi"));   // string: HI',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is narrowing: the union starts wide, and each check shrinks it. In the else branch, the only thing left is string.",
        },
        {
          type: "p",
          text: 'Write format(x: string | number) that returns `${x * 2}` when typeof x is "number", otherwise `${x}!`. Print format(5) and format("hey"). The output should be 10 then hey!.',
        },
      ],
      starter: "// Branch on the type, then handle each case\n",
      solution:
        'function format(x: string | number): string {\n  if (typeof x === "number") {\n    return `${x * 2}`;\n  }\n  return `${x}!`;\n}\nconsole.log(format(5));\nconsole.log(format("hey"));\n',
      checks: [
        { label: "Check the type with typeof", kind: "codeContains", value: 'typeof x === "number"' },
        { label: "Handle the number input", kind: "stdoutContains", value: "10" },
        { label: "Handle the string input", kind: "stdoutContains", value: "hey!" },
        { label: "Two lines of output", kind: "stdoutMinLines", value: "2" },
      ],
      hints: [
        "Guard with: if (typeof x === \"number\") { ... }",
        "In the number branch, double it: return `${x * 2}`;",
        "After the if, x must be a string: return `${x}!`;",
      ],
      wellDone: "You proved the type, and TypeScript handed you the matching methods. That's narrowing.",
    },
    {
      id: "ts-null-narrowing",
      track: "typescript",
      title: "Mind the gap",
      subtitle: "Guard a `string | null` before you touch it.",
      concepts: ["null", "truthiness narrowing", "guard"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Some values might not be there at all" },
        {
          type: "p",
          text: "A common union is something | null — the value is present, or it's missing. Calling a string method on null crashes, and TypeScript knows it, so it blocks you until you check. A plain if (x) does the job: inside it, x can't be null, so its methods are safe to call.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'function greet(name: string | null): string {\n  if (name) {\n    return `Hi, ${name.toUpperCase()}`;\n  }\n  return "Hi, stranger";\n}\nconsole.log(greet("ada"));   // Hi, ADA\nconsole.log(greet(null));    // Hi, stranger',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Skip the guard and TypeScript complains that name might be null. The check isn't busywork — it's what makes .toUpperCase() safe.",
        },
        {
          type: "p",
          text: 'Write label(s: string | null) that returns `[${s}]` when s is present, otherwise "[empty]". Print label("ok") and label(null). The output should be [ok] then [empty].',
        },
      ],
      starter: "// Check the value is present before using it\n",
      solution:
        'function label(s: string | null): string {\n  if (s) {\n    return `[${s}]`;\n  }\n  return "[empty]";\n}\nconsole.log(label("ok"));\nconsole.log(label(null));\n',
      checks: [
        { label: "Accept a nullable string", kind: "codeContains", value: "string | null" },
        { label: "Guard before using it", kind: "codeContains", value: "if (s)" },
        { label: "Handle the present value", kind: "stdoutContains", value: "[ok]" },
        { label: "Handle the missing value", kind: "stdoutContains", value: "[empty]" },
      ],
      hints: [
        "Take the union: function label(s: string | null)",
        "Guard with truthiness: if (s) { return `[${s}]`; }",
        "Fall through for the missing case: return \"[empty]\";",
      ],
      wellDone: "No null ever reached a method call. The guard turned a possible crash into a safe path.",
    },
    {
      id: "ts-discriminated-union",
      track: "typescript",
      title: "Tagged shapes",
      subtitle: "Switch on a `kind` field to handle each variant safely.",
      concepts: ["discriminated union", "switch", "narrowing"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Give each variant a tag" },
        {
          type: "p",
          text: "The most powerful union gives every option a shared label field — a discriminant. type Shape = { kind: \"circle\"; r: number } | { kind: \"square\"; s: number }. Switch on shape.kind and inside each case TypeScript knows exactly which shape you have, so circle gives you r and square gives you s.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type Box = { kind: "open"; items: number } | { kind: "sealed" };\nfunction count(b: Box): number {\n  switch (b.kind) {\n    case "open": return b.items;\n    case "sealed": return 0;\n  }\n}\nconsole.log(count({ kind: "open", items: 4 }));   // 4',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The shared kind field is the key. Switching on it narrows the union to one variant per case — no casting, no guessing.",
        },
        {
          type: "p",
          text: 'Define Shape as { kind: "circle"; r: number } | { kind: "square"; s: number }. Write area(shape) that returns 3 * shape.r * shape.r for a circle and shape.s * shape.s for a square. Print the area of a circle with r 2 and a square with s 5. The output should be 12 then 25.',
        },
      ],
      starter: "// Define the tagged union, then switch on its kind\n",
      solution:
        'type Shape =\n  | { kind: "circle"; r: number }\n  | { kind: "square"; s: number };\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle": return 3 * shape.r * shape.r;\n    case "square": return shape.s * shape.s;\n  }\n}\nconsole.log(area({ kind: "circle", r: 2 }));\nconsole.log(area({ kind: "square", s: 5 }));\n',
      checks: [
        { label: "Tag the variants with kind", kind: "codeContains", value: 'kind: "circle"' },
        { label: "Switch on the discriminant", kind: "codeContains", value: "switch (shape.kind)" },
        { label: "Circle area is 12", kind: "stdoutContains", value: "12" },
        { label: "Square area is 25", kind: "stdoutContains", value: "25" },
        { label: "Two lines of output", kind: "stdoutMinLines", value: "2" },
      ],
      hints: [
        "Each variant carries its tag: { kind: \"circle\"; r: number }",
        "Switch on the shared field: switch (shape.kind) { case \"circle\": ... }",
        "Circle uses 3 * shape.r * shape.r; square uses shape.s * shape.s.",
      ],
      wellDone: "Every case knew exactly which shape it had. Discriminated unions make impossible states unrepresentable.",
    },
  ],
};
