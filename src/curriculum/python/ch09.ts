import type { Chapter } from "../types";

export const ch09: Chapter = {
  id: "py-errors",
  title: "When Things Go Wrong",
  glyph: "🛟",
  summary: "Programs break. Catch the failure, stay in control, and respond calmly.",
  lessons: [
    {
      id: "py-error-types",
      track: "python",
      title: "Why code crashes",
      subtitle: "An error is the computer refusing a bad request.",
      concepts: ["types", "int", "errors"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Some values just don't fit" },
        {
          type: "p",
          text: "Every value in Python has a type: text is a string, whole numbers are ints. int() takes text that looks like a number and turns it into a real number you can do math with.",
        },
        {
          type: "p",
          text: "It only works when the text actually contains digits. int(\"42\") gives the number 42. int(\"hello\") crashes, because there is no number hiding inside the word hello.",
        },
        { type: "code", lang: "python", text: 'age = int("42")\nprint(age + 1)   # 43' },
        {
          type: "callout",
          tone: "note",
          text: "A crash from a wrong type is a ValueError. You will learn to catch it next.",
        },
        {
          type: "p",
          text: "Convert the text \"42\" into a number with int() and print it.",
        },
      ],
      starter: '# Convert the text "42" into a real number and print it\n',
      solution: 'number = int("42")\nprint(number)\n',
      checks: [
        { label: "Use int() to convert", kind: "codeContains", value: "int(" },
        { label: "Print the number 42", kind: "stdoutContains", value: "42" },
      ],
      hints: [
        "int() takes text in quotes and hands back a number.",
        "Store the result, then print it.",
        'The line is: print(int("42")).',
      ],
      wellDone: "You turned text into a number. Now you understand the line between types.",
    },
    {
      id: "py-try-except",
      track: "python",
      title: "Catch the crash",
      subtitle: "try/except handles a failure instead of dying.",
      concepts: ["try", "except", "ValueError"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Plan for the bad case" },
        {
          type: "p",
          text: "When you know a line might fail, wrap it in a try block. If it crashes, Python jumps to the except block instead of stopping the whole program.",
        },
        {
          type: "p",
          text: "The variable value is already set to \"abc\" for you. Trying int(value) will raise a ValueError, because abc is not a number. Catch that error and print a friendly message.",
        },
        {
          type: "code",
          lang: "python",
          text: 'value = "abc"\ntry:\n    number = int(value)\n    print(number)\nexcept ValueError:\n    print("That is not a number.")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Code inside except only runs when something in try fails. No crash, no message.",
        },
        {
          type: "p",
          text: "Keep value as \"abc\". Catch the ValueError and print a clear, friendly message.",
        },
      ],
      starter: 'value = "abc"\n# Try to convert value to a number.\n# Catch the ValueError and print a friendly message.\n',
      solution:
        'value = "abc"\ntry:\n    number = int(value)\n    print(number)\nexcept ValueError:\n    print("That is not a number.")\n',
      checks: [
        { label: "Open a try block", kind: "codeContains", value: "try" },
        { label: "Catch the error with except", kind: "codeContains", value: "except" },
        { label: "Name the ValueError", kind: "codeContains", value: "ValueError" },
        { label: "Print a friendly message about a number", kind: "stdoutContains", value: "number", ci: true },
      ],
      hints: [
        "Put int(value) inside a try: block.",
        "Add except ValueError: on its own line below.",
        'Inside except, print something like "That is not a number."',
      ],
      wellDone: "Your program survived a failure and stayed polite. That is real robustness.",
    },
    {
      id: "py-safe-divide",
      track: "python",
      title: "Divide without disaster",
      subtitle: "Guard against dividing by zero.",
      concepts: ["try", "except", "ZeroDivisionError"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Zero is the trap" },
        {
          type: "p",
          text: "Dividing by zero is undefined, so Python refuses with a ZeroDivisionError. The divisor is already set for you as divisor = 0. Dividing 10 by it would crash.",
        },
        {
          type: "p",
          text: "Wrap the division in try and catch the ZeroDivisionError, or check the divisor before you divide. Either way, never let the crash through.",
        },
        {
          type: "code",
          lang: "python",
          text: 'divisor = 0\ntry:\n    print(10 / divisor)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero.")',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Catch the specific error you expect. A bare except hides real bugs.",
        },
        {
          type: "p",
          text: "Keep divisor as 0. Handle the division safely and print a message that says you cannot divide by zero.",
        },
      ],
      starter: 'divisor = 0\n# Divide 10 by divisor without crashing.\n# Catch the ZeroDivisionError and print a message.\n',
      solution:
        'divisor = 0\ntry:\n    print(10 / divisor)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero.")\n',
      checks: [
        { label: "Open a try block", kind: "codeContains", value: "try" },
        { label: "Catch the error with except", kind: "codeContains", value: "except" },
        { label: "Handle the ZeroDivisionError", kind: "codeContains", value: "ZeroDivisionError" },
        { label: "Print that you cannot divide by zero", kind: "stdoutContains", value: "zero", ci: true },
      ],
      hints: [
        "Put 10 / divisor inside a try: block.",
        "Add except ZeroDivisionError: below it.",
        'Inside except, print something like "Cannot divide by zero."',
      ],
      wellDone: "You stopped a classic crash cold. Defensive code is professional code.",
    },
  ],
};
