import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "java-control",
  title: "Choices & Loops",
  glyph: "🔀",
  summary:
    "Teach your program to make decisions and to repeat itself without complaining. if/else picks a path, for does the boring stuff for you.",
  lessons: [
    {
      id: "java-if-else",
      track: "java",
      title: "When the code has to choose",
      subtitle: "if/else: a fork in the road.",
      concepts: ["if/else", "conditions"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Programs that can't decide are just calculators" },
        {
          type: "p",
          text: "An if statement checks a yes/no question. If the answer is yes, the code inside the braces runs. The optional else block is the backup plan for when the answer is no.",
        },
        {
          type: "code",
          lang: "java",
          text: 'int age = 20;\nif (age >= 18) {\n    System.out.println("Welcome in!");\n} else {\n    System.out.println("Come back later.");\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Use == to compare, not =. A single = assigns a value; a double == asks a question.",
        },
        {
          type: "p",
          text: "We set int score = 85. Print \"You passed!\" when score is 60 or more, and \"Try again\" otherwise. With 85, your program should pass.",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        // TODO: if score is 60 or more, print You passed!\n        // otherwise print Try again\n    }\n}\n",
      solution:
        'class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 60) {\n            System.out.println("You passed!");\n        } else {\n            System.out.println("Try again");\n        }\n    }\n}\n',
      checks: [
        { label: "Use an if statement", kind: "codeContains", value: "if" },
        { label: "Print You passed! for score 85", kind: "stdoutContains", value: "You passed!" },
      ],
      hints: [
        "Write if (score >= 60) { ... } and follow it with else { ... }.",
        "Inside each block, call System.out.println with the right message.",
        'Solution: if (score >= 60) { System.out.println("You passed!"); } else { System.out.println("Try again"); }',
      ],
      wellDone: "Your code can now pick a path on its own. That's real logic.",
    },
    {
      id: "java-for-loop",
      track: "java",
      title: "Let the loop do the typing",
      subtitle: "Count to five without writing five lines.",
      concepts: ["for loop", "counting"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Repeat yourself so you don't have to" },
        {
          type: "p",
          text: "A for loop has three parts: where to start, how long to keep going, and what to change each time. The body runs once per step.",
        },
        {
          type: "code",
          lang: "java",
          text: 'for (int i = 1; i <= 3; i++) {\n    System.out.println("Step " + i);\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "i++ means add one to i. It's how the loop crawls toward the finish line instead of looping forever.",
        },
        {
          type: "p",
          text: "Use a for loop that runs i from 1 to 5 and prints \"Line 1\" through \"Line 5\", each on its own line.",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        // TODO: loop i from 1 to 5 and print Line 1 ... Line 5\n    }\n}\n",
      solution:
        'class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.println("Line " + i);\n        }\n    }\n}\n',
      checks: [
        { label: "Use a for loop", kind: "codeContains", value: "for" },
        { label: "Print at least 5 lines", kind: "stdoutMinLines", value: "5" },
        { label: "Lines 1 and 5 in order", kind: "stdoutMatches", value: "Line 1[\\s\\S]*Line 5" },
      ],
      hints: [
        "Start with for (int i = 1; i <= 5; i++) { ... }.",
        'Inside the loop, print "Line " + i so the number changes each time.',
        'Solution body: for (int i = 1; i <= 5; i++) { System.out.println("Line " + i); }',
      ],
      wellDone: "One loop, five lines of output. That's leverage.",
    },
    {
      id: "java-array-loop",
      track: "java",
      title: "A loop walks an array",
      subtitle: "Visit every item in a list.",
      concepts: ["arrays", "for loop"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Many values, one name" },
        {
          type: "p",
          text: "An array holds a row of values under a single name. You reach each one by its index with square brackets, and array.length tells you how many there are.",
        },
        {
          type: "code",
          lang: "java",
          text: 'String[] pets = {"cat", "dog"};\nfor (int i = 0; i < pets.length; i++) {\n    System.out.println(pets[i]);\n}',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Indexes start at 0, so the first item is pets[0]. The last is pets[pets.length - 1].",
        },
        {
          type: "p",
          text: 'Make a String[] with the three fruits "apple", "banana", and "cherry", then loop through it and print each fruit on its own line.',
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        // TODO: make a String[] of apple, banana, cherry\n        // then loop and print each one\n    }\n}\n",
      solution:
        'class Main {\n    public static void main(String[] args) {\n        String[] fruits = {"apple", "banana", "cherry"};\n        for (int i = 0; i < fruits.length; i++) {\n            System.out.println(fruits[i]);\n        }\n    }\n}\n',
      checks: [
        { label: "Declare an array with []", kind: "codeContains", value: "[]" },
        { label: "Read items with [i]", kind: "codeContains", value: "[i]" },
        { label: "Print apple", kind: "stdoutContains", value: "apple" },
        {
          label: "Print all three fruits in order",
          kind: "stdoutMatches",
          value: "apple[\\s\\S]*banana[\\s\\S]*cherry",
        },
      ],
      hints: [
        'Declare it like String[] fruits = {"apple", "banana", "cherry"};',
        "Loop with for (int i = 0; i < fruits.length; i++) and print fruits[i].",
        'Solution: String[] fruits = {"apple", "banana", "cherry"}; for (int i = 0; i < fruits.length; i++) { System.out.println(fruits[i]); }',
      ],
      wellDone: "You combined an array and a loop — that pairing powers most real programs.",
    },
  ],
};
