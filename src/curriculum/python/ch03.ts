import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "py-decisions",
  title: "Make Decisions",
  glyph: "🔀",
  summary: "Teach your program to choose. Comparisons, True/False, and if statements.",
  lessons: [
    {
      id: "py-comparisons",
      track: "python",
      title: "True or False",
      subtitle: "Compare two values and get an answer.",
      concepts: ["booleans", "comparisons"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Questions with yes/no answers" },
        {
          type: "p",
          text: "Python can answer questions like is this equal to that, or is this bigger. The answer is always one of two values: True or False. These are called booleans.",
        },
        {
          type: "p",
          text: "Use == to ask are these equal, and >, <, >= to compare sizes. Watch the double equals — a single = means something different.",
        },
        { type: "code", lang: "python", text: "print(5 > 3)     # True\nprint(2 == 4)    # False\nprint(7 >= 7)    # True" },
        {
          type: "callout",
          tone: "warn",
          text: "== compares two values. A single = assigns a value to a variable. Mixing them up is a classic mistake.",
        },
        {
          type: "p",
          text: "There are two numbers below, age and limit. Print whether age is greater than or equal to limit. The answer should be True.",
        },
      ],
      starter: "age = 21\nlimit = 18\n\n# Print whether age is at least the limit\n",
      solution: "age = 21\nlimit = 18\n\nprint(age >= limit)\n",
      checks: [
        { label: "Use a comparison operator", kind: "codeMatches", value: ">=|==|<|>" },
        { label: "Compare age against limit", kind: "codeContains", value: "age" },
        { label: "Print the boolean True", kind: "stdoutContains", value: "True" },
      ],
      hints: [
        "You want to compare age with limit and print the result.",
        "Greater than or equal uses two characters: >=.",
        "The full line is: print(age >= limit)",
      ],
      wellDone: "Every decision a program makes starts with a question that answers True or False.",
    },
    {
      id: "py-if-else",
      track: "python",
      title: "If this, else that",
      subtitle: "Run different code depending on a value.",
      concepts: ["if", "else"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Pick a path" },
        {
          type: "p",
          text: "An if statement checks a question. When it is True, Python runs the indented lines underneath. When it is False, the else block runs instead. Only one of the two ever runs.",
        },
        {
          type: "p",
          text: "Notice the colon after the condition, and that the lines below are indented. The indentation is how Python knows which lines belong inside the if.",
        },
        { type: "code", lang: "python", text: 'hour = 20\nif hour < 12:\n    print("Good morning")\nelse:\n    print("Good evening")' },
        {
          type: "callout",
          tone: "tip",
          text: "Indent with four spaces. Lines at the same indent level belong to the same block.",
        },
        {
          type: "p",
          text: 'There is a temperature below. If it is above 30, print "Hot". Otherwise print "Cool". With temp set to 35 the program should print Hot.',
        },
      ],
      starter: 'temp = 35\n\n# If temp is above 30 print "Hot", otherwise print "Cool"\n',
      solution: 'temp = 35\n\nif temp > 30:\n    print("Hot")\nelse:\n    print("Cool")\n',
      checks: [
        { label: "Use an if statement", kind: "codeContains", value: "if " },
        { label: "Include an else branch", kind: "codeContains", value: "else" },
        { label: "Check temp against 30", kind: "codeContains", value: "temp" },
        { label: "Print Hot for this value", kind: "stdoutContains", value: "Hot" },
      ],
      hints: [
        "Start with: if temp > 30:  and indent the next line.",
        'The if block prints "Hot"; the else block prints "Cool".',
        'Full shape:\nif temp > 30:\n    print("Hot")\nelse:\n    print("Cool")',
      ],
      wellDone: "Your program now reacts to its input. Change temp to 20 and watch it choose the other branch.",
    },
    {
      id: "py-elif",
      track: "python",
      title: "More than two choices",
      subtitle: "Chain conditions with elif.",
      concepts: ["if", "elif", "else"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "When two paths aren't enough" },
        {
          type: "p",
          text: "Sometimes you need three or more outcomes. elif (short for else if) lets you add extra conditions between if and else. Python checks them top to bottom and stops at the first one that is True.",
        },
        { type: "code", lang: "python", text: 'light = "yellow"\nif light == "green":\n    print("Go")\nelif light == "yellow":\n    print("Slow down")\nelse:\n    print("Stop")' },
        {
          type: "callout",
          tone: "note",
          text: "Order matters. Python runs only the first matching branch and skips the rest.",
        },
        {
          type: "p",
          text: 'There is a score below. Print a grade: "A" if the score is at least 90, "B" if it is at least 80, and "C" otherwise. With score set to 85 the program should print B.',
        },
      ],
      starter: 'score = 85\n\n# Print "A" for 90+, "B" for 80+, otherwise "C"\n',
      solution: 'score = 85\n\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")\n',
      checks: [
        { label: "Use an elif branch", kind: "codeContains", value: "elif" },
        { label: "Include an else branch", kind: "codeContains", value: "else" },
        { label: "Check the score variable", kind: "codeContains", value: "score" },
        { label: "Print B for this score", kind: "stdoutEquals", value: "B" },
      ],
      hints: [
        "Start with the highest grade: if score >= 90.",
        "Add elif score >= 80 for the B case, then else for C.",
        'Full shape:\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")',
      ],
      wellDone: "if, elif, else lets your program sort any value into the right bucket.",
    },
  ],
};
