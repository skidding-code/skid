import type { Chapter } from "../types";

export const ch11: Chapter = {
  id: "py-modules",
  title: "Tools & Chance",
  glyph: "🎲",
  summary: "Borrow ready-made tools with import, then roll the dice with randomness.",
  lessons: [
    {
      id: "py-import-math",
      track: "python",
      title: "Reach for the toolbox",
      subtitle: "Import the math module and use what it gives you.",
      concepts: ["import", "math"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Python ships with batteries" },
        {
          type: "p",
          text: "You don't have to build everything yourself. The standard library is full of ready-made tools, grouped into modules. To use one, you import it by name.",
        },
        {
          type: "p",
          text: "The math module holds number tools. After importing it, you reach inside with a dot: math.sqrt computes a square root, and math.pi is the constant pi.",
        },
        { type: "code", lang: "python", text: "import math\n\nprint(math.sqrt(144))\nprint(math.pi)" },
        {
          type: "callout",
          tone: "note",
          text: "The dot means \"look inside\". math.sqrt reads as \"the sqrt tool that lives inside math\".",
        },
        {
          type: "p",
          text: "Import math, then print the square root of 81. The answer is 9.",
        },
      ],
      starter: "# Import the math module, then print the square root of 81\n",
      solution: "import math\n\nprint(math.sqrt(81))\n",
      checks: [
        { label: "Import the math module", kind: "codeContains", value: "import math" },
        { label: "Use math.sqrt", kind: "codeContains", value: "math.sqrt" },
        { label: "Print the result 9", kind: "stdoutContains", value: "9.0" },
      ],
      hints: [
        "Start the file with import math on its own line.",
        "Call the tool as math.sqrt(81).",
        "The full line is: print(math.sqrt(81)) — it prints 9.0.",
      ],
      wellDone: "One import and a whole toolbox is yours. That's leverage.",
    },
    {
      id: "py-random-roll",
      track: "python",
      title: "Roll the dice",
      subtitle: "Import random and let the computer surprise you.",
      concepts: ["import", "random"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Unpredictable on purpose" },
        {
          type: "p",
          text: "The random module makes choices you can't predict. random.randint(a, b) returns a whole number between a and b, including both ends. random.choice(items) picks one item from a list.",
        },
        { type: "code", lang: "python", text: "import random\n\nprint(random.randint(1, 6))\nprint(random.choice([\"heads\", \"tails\"]))" },
        {
          type: "callout",
          tone: "warn",
          text: "Run it twice and the output changes. That is the point — your check looks for the shape of the answer, not a fixed number.",
        },
        {
          type: "p",
          text: "Import random and print a single dice roll: a number from 1 to 6 using random.randint.",
        },
      ],
      starter: "# Import random, then print a dice roll from 1 to 6\n",
      solution: "import random\n\nprint(random.randint(1, 6))\n",
      checks: [
        { label: "Import the random module", kind: "codeContains", value: "import random" },
        { label: "Use a random tool", kind: "codeContains", value: "random." },
        { label: "Roll with randint", kind: "codeContains", value: "randint" },
        { label: "Print a digit", kind: "stdoutMatches", value: "[1-6]" },
      ],
      hints: [
        "Begin with import random.",
        "randint takes two numbers: the lowest and highest possible roll.",
        "The full line is: print(random.randint(1, 6)).",
      ],
      wellDone: "You handed control to chance — and your code still does its job every time.",
    },
    {
      id: "py-random-pick",
      track: "python",
      title: "Pick a winner",
      subtitle: "Choose a random item and say something about it.",
      concepts: ["random", "lists", "strings"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Combine the tools" },
        {
          type: "p",
          text: "Real programs mix pieces together. Store some options in a list, pull one out with random.choice, and weave it into a printed sentence.",
        },
        {
          type: "code",
          lang: "python",
          text: "import random\n\nfruits = [\"apple\", \"pear\", \"plum\"]\npick = random.choice(fruits)\nprint(\"Today's fruit is \" + pick)",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Save the chosen item in a variable first. Then you can use it as many times as you like in your sentence.",
        },
        {
          type: "p",
          text: "Build a list of at least three colors, pick one at random with random.choice, and print a sentence that contains the word color and the chosen value.",
        },
      ],
      starter: "# Make a list of colors, pick one at random, and print a sentence about it\n",
      solution:
        "import random\n\ncolors = [\"red\", \"green\", \"blue\"]\npick = random.choice(colors)\nprint(\"Your color is \" + pick)\n",
      checks: [
        { label: "Import the random module", kind: "codeContains", value: "import random" },
        { label: "Pick with random.choice", kind: "codeContains", value: "random.choice" },
        { label: "Use a list literal", kind: "codeContains", value: "[" },
        { label: "Mention a color word", kind: "stdoutMatches", value: "[A-Za-z]+", ci: true },
        { label: "Print a full sentence", kind: "stdoutMatches", value: "\\w+\\s+\\w+" },
      ],
      hints: [
        "Define a list like colors = [\"red\", \"green\", \"blue\"].",
        "Grab one with pick = random.choice(colors).",
        'Print it joined into text: print("Your color is " + pick).',
      ],
      wellDone: "Lists, randomness, and strings working together — that's how real features get built.",
    },
  ],
};
