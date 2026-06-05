import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "py-variables",
  title: "Remember Things",
  glyph: "📦",
  summary: "Store values in variables so your program can hold onto them and reuse them.",
  lessons: [
    {
      id: "py-make-a-variable",
      track: "python",
      title: "Give it a name",
      subtitle: "Save a value in a variable, then use it.",
      concepts: ["variables", "print"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A box with a label" },
        {
          type: "p",
          text: "A variable is a name you stick on a value so you can use it again later. You make one with an equals sign: the name on the left, the value on the right.",
        },
        {
          type: "p",
          text: "Once it has a name, you can print the name instead of the value. Python looks inside the box and prints what it finds.",
        },
        { type: "code", lang: "python", text: 'pet = "cat"\nprint(pet)' },
        {
          type: "callout",
          tone: "tip",
          text: "No quotes around a variable name when you use it. Quotes are for the text itself, not for the label.",
        },
        {
          type: "p",
          text: "Make a variable called color and set it to your favourite colour. Then print the variable.",
        },
      ],
      starter: "# Make a variable named color, then print it\n",
      solution: 'color = "blue"\nprint(color)\n',
      checks: [
        { label: "Create a variable named color", kind: "codeMatches", value: "color\\s*=" },
        { label: "Print the variable, not the raw text", kind: "codeMatches", value: "print\\(\\s*color\\s*\\)" },
        { label: "Something gets printed", kind: "stdoutMinLines", value: "1" },
      ],
      hints: [
        "Pick a name, then an equals sign, then the value in quotes.",
        "To show it, put the variable name inside print( ) with no quotes.",
        'For example: color = "blue" then on the next line print(color).',
      ],
      wellDone: "You taught the program to remember a value and hand it back. That's a variable.",
    },
    {
      id: "py-text-and-numbers",
      track: "python",
      title: "Words and numbers",
      subtitle: "Some values are text, some are numbers — and you can mix them.",
      concepts: ["str", "int", "f-strings"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Two kinds of value" },
        {
          type: "p",
          text: "Text values are called strings (str) and always wear quotes. Numbers come as whole numbers (int) or decimals (float) and never wear quotes, so Python can do math with them.",
        },
        {
          type: "p",
          text: "If you try to glue text and a number together with +, Python complains — they're different types. The easy fix is an f-string: put an f before the opening quote and drop variables inside curly braces.",
        },
        { type: "code", lang: "python", text: 'name = "Sam"\nage = 9\nprint(f"{name} is {age}")' },
        {
          type: "callout",
          tone: "note",
          text: "You could also write str(age) to turn the number into text, but f-strings handle that for you.",
        },
        {
          type: "p",
          text: "Make a variable apples set to the number 5. Then print the sentence: I have 5 apples — using the variable, not by typing 5 again in the text.",
        },
      ],
      starter: "# Make a number variable apples = 5\n# Then print: I have 5 apples\n",
      solution: 'apples = 5\nprint(f"I have {apples} apples")\n',
      checks: [
        { label: "Store the number 5 in apples", kind: "codeMatches", value: "apples\\s*=\\s*5" },
        { label: "Use the variable inside the text", kind: "codeContains", value: "{apples}" },
        { label: "Print the full sentence", kind: "stdoutContains", value: "I have 5 apples" },
      ],
      hints: [
        "First line: apples = 5 with no quotes, because it's a number.",
        "Use an f-string: start the quote with f and put {apples} where the number goes.",
        'The print line is: print(f"I have {apples} apples").',
      ],
      wellDone: "You slipped a number into a sentence without breaking it. That's the f-string trick.",
    },
    {
      id: "py-build-a-sentence",
      track: "python",
      title: "Build a greeting",
      subtitle: "Combine several variables into one sentence.",
      concepts: ["f-strings", "variables"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "One sentence, many variables" },
        {
          type: "p",
          text: "An f-string can hold as many variables as you want. Each one goes in its own pair of curly braces, and Python drops the value in at exactly that spot.",
        },
        { type: "code", lang: "python", text: 'city = "Oslo"\ntemp = 12\nprint(f"It is {temp} degrees in {city}")' },
        {
          type: "callout",
          tone: "tip",
          text: "Everything outside the braces is printed exactly as written, so spaces and punctuation are up to you.",
        },
        {
          type: "p",
          text: "Make two variables: name set to your name (text) and age set to your age (a number). Then print a greeting like: Hi, I am Ada and I am 36 — using both variables.",
        },
      ],
      starter: "# Make name (text) and age (a number)\n# Then print a greeting using both, like: Hi, I am Ada and I am 36\n",
      solution: 'name = "Ada"\nage = 36\nprint(f"Hi, I am {name} and I am {age}")\n',
      checks: [
        { label: "Create a name variable", kind: "codeMatches", value: "name\\s*=\\s*[\"']" },
        { label: "Create an age number variable", kind: "codeMatches", value: "age\\s*=\\s*\\d" },
        { label: "Put both variables in the f-string", kind: "codeMatches", value: "\\{name\\}[\\s\\S]*\\{age\\}" },
        { label: "Greeting mentions a name and an age", kind: "stdoutMatches", value: "Hi, I am [\\s\\S]*and I am \\d" },
      ],
      hints: [
        "Make name in quotes and age as a plain number on two separate lines.",
        "Use one f-string with both {name} and {age} inside it.",
        'For example: print(f"Hi, I am {name} and I am {age}").',
      ],
      wellDone: "You wove two variables into a single sentence — the heart of how programs build text.",
    },
  ],
};
