import type { Chapter } from "../types";

export const ch06: Chapter = {
  id: "py-functions",
  title: "Make Your Own",
  glyph: "🧩",
  summary: "Bundle code into reusable functions you can call by name, again and again.",
  lessons: [
    {
      id: "py-define-function",
      track: "python",
      title: "Define and call",
      subtitle: "Teach the computer a new word.",
      concepts: ["def", "calling"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A function is a named block of code" },
        {
          type: "p",
          text: "When you find yourself repeating the same lines, you can package them up and give them a name. That package is a function. You build it once with def, then run it whenever you want by calling its name.",
        },
        {
          type: "code",
          lang: "python",
          text: 'def say_hello():\n    print("Hello!")\n\nsay_hello()',
        },
        {
          type: "callout",
          tone: "note",
          text: "Defining a function does not run it. The indented lines only happen when you call the name with parentheses, like say_hello().",
        },
        {
          type: "p",
          text: "Define a function named greet that prints Hi, friend! — then call it once so the message actually appears.",
        },
      ],
      starter: "# Define a function called greet, then call it\n",
      solution: 'def greet():\n    print("Hi, friend!")\n\ngreet()\n',
      checks: [
        { label: "Define a function with def", kind: "codeContains", value: "def " },
        { label: "Name the function greet", kind: "codeMatches", value: "def\\s+greet\\s*\\(" },
        { label: "Call greet so it runs", kind: "codeMatches", value: "greet\\s*\\(\\s*\\)" },
        { label: "Print the greeting", kind: "stdoutContains", value: "Hi, friend!" },
      ],
      hints: [
        "Start the definition with def greet(): and indent the print on the next line.",
        "Defining alone prints nothing — you must call greet() on its own line.",
        'Full answer:\ndef greet():\n    print("Hi, friend!")\n\ngreet()',
      ],
      wellDone: "You taught the computer a brand-new command and then used it. That is the core of every function.",
    },
    {
      id: "py-function-parameter",
      track: "python",
      title: "Pass it something",
      subtitle: "One function, many inputs.",
      concepts: ["parameters", "arguments"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Parameters make a function flexible" },
        {
          type: "p",
          text: "A function gets powerful when you feed it different values. You add a parameter inside the parentheses — a placeholder name. Whatever you hand the function when you call it slots into that name.",
        },
        {
          type: "code",
          lang: "python",
          text: 'def greet(name):\n    print("Hello, " + name + "!")\n\ngreet("Sam")\ngreet("Mia")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "name is the parameter. The value you pass in the call — like \"Sam\" — is the argument. Same machine, different input, different output.",
        },
        {
          type: "p",
          text: "Write a function greet(name) that prints Hello, followed by the name. Call it three times with three different names.",
        },
      ],
      starter: "# Define greet(name), then call it three times\n",
      solution:
        'def greet(name):\n    print("Hello, " + name + "!")\n\ngreet("Ada")\ngreet("Leo")\ngreet("Zoe")\n',
      checks: [
        { label: "Define greet with a parameter", kind: "codeMatches", value: "def\\s+greet\\s*\\(\\s*\\w+\\s*\\)" },
        { label: "Greet the first name", kind: "stdoutContains", value: "Hello, Ada" },
        { label: "Greet the second name", kind: "stdoutContains", value: "Hello, Leo" },
        { label: "Print at least three lines", kind: "stdoutMinLines", value: "3" },
      ],
      hints: [
        "Put a name inside the parentheses of your def: def greet(name):.",
        "Inside, print(\"Hello, \" + name + \"!\") so the name is used.",
        'Full answer:\ndef greet(name):\n    print("Hello, " + name + "!")\n\ngreet("Ada")\ngreet("Leo")\ngreet("Zoe")',
      ],
      wellDone: "One definition, three different greetings. That is why functions beat copy-paste.",
    },
    {
      id: "py-function-return",
      track: "python",
      title: "Hand back an answer",
      subtitle: "Variables, a function, and return — together.",
      concepts: ["return", "variables", "functions"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "return sends a value back" },
        {
          type: "p",
          text: "Printing shows a value on screen. Returning gives a value back to the code that called the function, so you can store it in a variable and use it later. A function that does math should return its result, not print it.",
        },
        {
          type: "code",
          lang: "python",
          text: "def double(n):\n    return n * 2\n\nresult = double(6)\nprint(result)",
        },
        {
          type: "callout",
          tone: "warn",
          text: "return and print are not the same. return hands the value out so you can keep working with it; print just displays text.",
        },
        {
          type: "p",
          text: "Write a function area(width, height) that returns width * height. Store the area of a 5 by 3 rectangle in a variable, then print that variable.",
        },
      ],
      starter: "# Define area(width, height) that returns width * height\n# Then store the result and print it\n",
      solution:
        "def area(width, height):\n    return width * height\n\nrect = area(5, 3)\nprint(rect)\n",
      checks: [
        { label: "Define a function with def", kind: "codeContains", value: "def " },
        { label: "Name the function area", kind: "codeMatches", value: "def\\s+area\\s*\\(" },
        { label: "Use return to hand back the result", kind: "codeContains", value: "return" },
        { label: "Multiply width by height", kind: "codeContains", value: "*" },
        { label: "Store the result in a variable, then print it", kind: "codeMatches", value: "\\w+\\s*=\\s*area\\s*\\([\\s\\S]*print\\s*\\(" },
        { label: "Print the area 15", kind: "stdoutContains", value: "15" },
      ],
      hints: [
        "Define def area(width, height): and inside it write return width * height.",
        "Call it and save the answer: rect = area(5, 3).",
        "Full answer:\ndef area(width, height):\n    return width * height\n\nrect = area(5, 3)\nprint(rect)",
      ],
      wellDone: "You combined a variable, a function, and return into one clean program — exactly how real code is built.",
    },
  ],
};
