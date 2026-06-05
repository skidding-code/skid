import type { Chapter } from "../types";

export const ch13: Chapter = {
  id: "py-comprehensions",
  title: "Elegant Python",
  glyph: "🧮",
  summary:
    "Say more with less. Comprehensions and tuples for concise, expressive Python.",
  lessons: [
    {
      id: "py-list-comprehension",
      track: "python",
      title: "Build a list in one line",
      subtitle: "List comprehensions turn a loop into an expression.",
      concepts: ["comprehensions", "lists"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A loop that becomes a list" },
        {
          type: "p",
          text: "A list comprehension builds a list from a sequence in a single expression. You write the value you want, then a for clause describing where it comes from.",
        },
        {
          type: "code",
          lang: "python",
          text: "doubles = [n * 2 for n in range(1, 4)]\nprint(doubles)    # [2, 4, 6]",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Read it left to right: the value first, then the for. range(1, 6) gives 1, 2, 3, 4, 5.",
        },
        {
          type: "p",
          text: "Build a list of the squares of the numbers 1 through 5 and print it. The result must be [1, 4, 9, 16, 25].",
        },
      ],
      starter: "# Build a list of squares for 1..5, then print it\nsquares = \n",
      solution: "squares = [n * n for n in range(1, 6)]\nprint(squares)\n",
      checks: [
        { label: "Use a for inside the brackets", kind: "codeContains", value: "for" },
        { label: "Iterate with in", kind: "codeContains", value: "in" },
        { label: "Open the comprehension with [", kind: "codeContains", value: "[" },
        { label: "Close the comprehension with ]", kind: "codeContains", value: "]" },
        { label: "Print the squares 1, 4, 9, 16, 25", kind: "stdoutContains", value: "[1, 4, 9, 16, 25]" },
      ],
      hints: [
        "The shape is [VALUE for n in range(1, 6)].",
        "The value of each item is n times itself: n * n.",
        "Full line: squares = [n * n for n in range(1, 6)]",
      ],
      wellDone: "One line did the work of a whole loop. That is the comprehension's promise.",
    },
    {
      id: "py-comprehension-filter",
      track: "python",
      title: "Keep only what you want",
      subtitle: "Add an if to filter as you build.",
      concepts: ["comprehensions", "conditions"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Filter with if" },
        {
          type: "p",
          text: "A trailing if clause keeps an item only when its condition is true. Everything that fails the test is skipped.",
        },
        {
          type: "code",
          lang: "python",
          text: "small = [n for n in range(10) if n < 3]\nprint(small)    # [0, 1, 2]",
        },
        {
          type: "callout",
          tone: "note",
          text: "n % 2 == 0 is true when n is even. The % operator gives the remainder after division.",
        },
        {
          type: "p",
          text: "Build a list of the even numbers from 0 through 9 and print it. The result must be [0, 2, 4, 6, 8].",
        },
      ],
      starter: "# Keep only the even numbers from 0..9, then print them\nevens = \n",
      solution: "evens = [n for n in range(10) if n % 2 == 0]\nprint(evens)\n",
      checks: [
        { label: "Loop with for", kind: "codeContains", value: "for" },
        { label: "Iterate with in", kind: "codeContains", value: "in" },
        { label: "Filter with if", kind: "codeContains", value: "if" },
        { label: "Use the comprehension brackets [", kind: "codeContains", value: "[" },
        { label: "Print the even numbers", kind: "stdoutContains", value: "[0, 2, 4, 6, 8]" },
      ],
      hints: [
        "Start from [n for n in range(10)].",
        "Add a test at the end: if n % 2 == 0.",
        "Full line: evens = [n for n in range(10) if n % 2 == 0]",
      ],
      wellDone: "Build and filter in the same breath. Clean and direct.",
    },
    {
      id: "py-tuples-unpacking",
      track: "python",
      title: "Tuples and unpacking",
      subtitle: "Bundle values together, then pull them apart.",
      concepts: ["tuples", "unpacking"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "A fixed bundle of values" },
        {
          type: "p",
          text: "A tuple groups a few values inside parentheses. You unpack it by assigning it to several variables at once, one per slot.",
        },
        {
          type: "code",
          lang: "python",
          text: 'point = (3, 4)\nx, y = point\nprint(x, y)    # 3 4',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Looping over a list of tuples can unpack each one in the for: for name, age in people.",
        },
        {
          type: "p",
          text: 'Make a tuple holding a name and an age, for example ("Ada", 36). Unpack it into two variables and print the sentence "Ada is 36".',
        },
      ],
      starter: "# Make a (name, age) tuple, unpack it, and print a sentence\nperson = \n",
      solution:
        'person = ("Ada", 36)\nname, age = person\nprint(name, "is", age)\n',
      checks: [
        { label: "Build a tuple with parentheses (", kind: "codeContains", value: "(" },
        { label: "Close the tuple with )", kind: "codeContains", value: ")" },
        { label: "Unpack into two variables with a comma", kind: "codeMatches", value: "\\w+\\s*,\\s*\\w+\\s*=" },
        { label: "Print the name", kind: "stdoutContains", value: "Ada" },
        { label: "Print the sentence with the age", kind: "stdoutMatches", value: "Ada[\\s\\S]*is[\\s\\S]*36" },
      ],
      hints: [
        'Write the tuple first: person = ("Ada", 36).',
        "Unpack with two names on the left: name, age = person.",
        'Then: print(name, "is", age)',
      ],
      wellDone: "Tuples in, variables out. Unpacking keeps code readable.",
    },
  ],
};
