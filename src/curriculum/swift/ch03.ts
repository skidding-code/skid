import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "swift-functions",
  title: "Make Your Own",
  glyph: "🧩",
  summary:
    "Stop repeating yourself and start naming your magic. Functions are little spells you cast on demand — and this is where it all clicks.",
  lessons: [
    {
      id: "swift-func-define",
      track: "swift",
      title: "Name a chunk of work",
      subtitle: "Wrap some code in a function, then summon it.",
      concepts: ["func", "calling"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A function is a saved button" },
        {
          type: "p",
          text: "A function is a named bundle of code that sits quietly until you call it. You write the steps once, give them a name, and from then on you just say the name. Defining it does nothing on its own — like a recipe in a closed book.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'func sayHi() {\n    print("Hi from inside a function!")\n}\n\nsayHi()',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Two parts: the recipe (func sayHi { ... }) and the order (sayHi()). No call, no output. The closet stays shut.",
        },
        {
          type: "p",
          text: "Write a function named greet that prints Hello, crew!, then call it once so it actually runs.",
        },
      ],
      starter: "// Define a function named greet, then call it below\n",
      solution:
        'func greet() {\n    print("Hello, crew!")\n}\n\ngreet()\n',
      checks: [
        { label: "Define a function with func", kind: "codeContains", value: "func " },
        { label: "Actually call it (no call, no output)", kind: "stdoutContains", value: "Hello, crew!" },
      ],
      hints: [
        "Start with func greet() and a pair of braces { } for the body.",
        "Put your print line inside the braces.",
        'Below the closing brace, on its own line, write greet() to run it.',
      ],
      wellDone: "You just taught the computer a new word — and then used it. That's the whole game.",
    },
    {
      id: "swift-func-param",
      track: "swift",
      title: "Hand it an ingredient",
      subtitle: "Parameters let one function do many jobs.",
      concepts: ["parameters", "reuse"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Same function, different fillings" },
        {
          type: "p",
          text: "A parameter is a labeled slot in the parentheses. When you call the function you pass a value into that slot, and the function uses it. One recipe, infinite sandwiches.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'func cheer(team: String) {\n    print("Go \\(team)!")\n}\n\ncheer(team: "Hawks")\ncheer(team: "Owls")',
        },
        {
          type: "callout",
          tone: "note",
          text: "team: String means the slot is named team and holds text. Inside the body, \\(team) drops the value right into the string.",
        },
        {
          type: "p",
          text: "Write a function greet(name: String) that prints Hi, then the name. Call it twice with two different names.",
        },
      ],
      starter: "// Define greet(name: String), then call it twice\n",
      solution:
        'func greet(name: String) {\n    print("Hi, \\(name)!")\n}\n\ngreet(name: "Ada")\ngreet(name: "Linus")\n',
      checks: [
        { label: "Define a function with func", kind: "codeContains", value: "func " },
        { label: "Take a name parameter", kind: "codeContains", value: "name: String" },
        { label: "First name appears in output", kind: "stdoutContains", value: "Ada" },
        { label: "Second name appears in output", kind: "stdoutContains", value: "Linus" },
      ],
      hints: [
        "The header looks like func greet(name: String) { ... }.",
        'Inside, print a greeting using string interpolation: "Hi, \\(name)!".',
        'Then call it twice with different values: greet(name: "Ada") and greet(name: "Linus").',
      ],
      wellDone: "One function, two greetings. You just stopped copy-pasting forever.",
    },
    {
      id: "swift-func-return",
      track: "swift",
      title: "Get an answer back",
      subtitle: "Functions can compute a value and hand it to you.",
      concepts: ["return", "->"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Functions that report back" },
        {
          type: "p",
          text: "So far our functions just printed. But the real power is returning a value — the function does some work and hands the result back, so you can store it, print it, or feed it to more code.",
        },
        {
          type: "p",
          text: "The little arrow -> announces the type of answer the function gives, and return is how it actually delivers it.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'func add(a: Int, b: Int) -> Int {\n    return a + b\n}\n\nlet sum = add(a: 2, b: 3)\nprint(sum)   // 5',
        },
        {
          type: "callout",
          tone: "tip",
          text: "-> Int promises an Int comes back. return hands it over. Calling add(...) becomes that number, which you can park in a constant with let.",
        },
        {
          type: "p",
          text: "Write area(w: Int, h: Int) -> Int that returns w * h. Compute the area of a 4 by 6 rectangle, store it in a constant, and print it. (It's 24.)",
        },
      ],
      starter: "// Define area(w: Int, h: Int) -> Int, store the result, print it\n",
      solution:
        'func area(w: Int, h: Int) -> Int {\n    return w * h\n}\n\nlet result = area(w: 4, h: 6)\nprint(result)\n',
      checks: [
        { label: "Define a function with func", kind: "codeContains", value: "func " },
        { label: "Declare a return type with ->", kind: "codeContains", value: "->" },
        { label: "Hand a value back with return", kind: "codeContains", value: "return" },
        { label: "Print the area 24", kind: "stdoutContains", value: "24" },
      ],
      hints: [
        "The header ends with -> Int because you're giving back a whole number.",
        "Inside the body: return w * h.",
        "Call it, save the answer, print it: let result = area(w: 4, h: 6) then print(result).",
      ],
      wellDone: "Define, parameterize, return — that's the full toolkit. You can now build anything one function at a time.",
    },
  ],
};
