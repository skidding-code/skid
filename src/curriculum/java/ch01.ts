import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "java-basics",
  title: "Hello, Java",
  glyph: "☕",
  summary:
    "Java asks you to write a little ceremony before it'll say a single word. Learn the magic spell, then make it print, count, and talk.",
  lessons: [
    {
      id: "java-hello",
      track: "java",
      title: "The magic spell",
      subtitle: "Java's famous boilerplate, demystified.",
      concepts: ["println", "main method"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Every Java program needs a stage" },
        {
          type: "p",
          text: "Java won't run a loose line of code the way some languages do. It wants a class to live in and a main method to start from. Think of it as the program clearing its throat before speaking.",
        },
        {
          type: "p",
          text: "You print things with System.out.println — a delightfully long way to say \"say this out loud, then go to a new line.\"",
        },
        {
          type: "code",
          lang: "java",
          text: 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Hi there!");\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The scaffold (class Main and the main method) is already written for you. You only fill in the line where the TODO is.",
        },
        {
          type: "p",
          text: "Replace the TODO so the program prints Hello, world! exactly.",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        // TODO: print Hello, world!\n    }\n}\n",
      solution:
        'class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}\n',
      checks: [
        { label: "Use System.out.println", kind: "codeContains", value: "System.out.println" },
        { label: "Print the text Hello, world!", kind: "stdoutContains", value: "Hello, world!" },
      ],
      hints: [
        "Put your line inside main, where the TODO is.",
        "Wrap your message in double quotes and end the line with a semicolon.",
        'The full line is: System.out.println("Hello, world!");',
      ],
      wellDone: "You survived Java's opening ceremony and made it speak. The hard part is behind you.",
    },
    {
      id: "java-variables",
      track: "java",
      title: "Boxes with labels",
      subtitle: "An int and a String, then print them.",
      concepts: ["variables", "types"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Java likes to know what's in the box" },
        {
          type: "p",
          text: "A variable is a named box that holds a value. Java is picky: you must tell it the type of value going in. A whole number is an int. A piece of text is a String.",
        },
        {
          type: "code",
          lang: "java",
          text: 'int score = 9001;\nString player = "Ada";\nSystem.out.println(score);\nSystem.out.println(player);',
        },
        {
          type: "callout",
          tone: "note",
          text: "int is lowercase, String is capitalized. Java will frown (and refuse to compile) if you mix that up.",
        },
        {
          type: "p",
          text: "Make an int called age set to 21 and a String called name set to Sam. Print each one on its own line.",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        // TODO: make an int age and a String name, then print both\n    }\n}\n",
      solution:
        'class Main {\n    public static void main(String[] args) {\n        int age = 21;\n        String name = "Sam";\n        System.out.println(age);\n        System.out.println(name);\n    }\n}\n',
      checks: [
        { label: "Declare an int variable", kind: "codeContains", value: "int " },
        { label: "Declare a String variable", kind: "codeContains", value: "String " },
        { label: "Print the age 21", kind: "stdoutContains", value: "21" },
        { label: "Print the name Sam", kind: "stdoutContains", value: "Sam" },
      ],
      hints: [
        "Start each variable line with its type: int for the number, String for the text.",
        'Text needs quotes: String name = "Sam"; — numbers don\'t: int age = 21;',
        'Then print both: System.out.println(age); and System.out.println(name);',
      ],
      wellDone: "Two boxes, two types, two printed values. You're speaking Java's language now.",
    },
    {
      id: "java-concat",
      track: "java",
      title: "Gluing words and numbers",
      subtitle: "Build one sentence with the + sign.",
      concepts: ["concatenation", "strings"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "The + sign does double duty" },
        {
          type: "p",
          text: "Between numbers, + adds. But when a String is involved, + glues things together into one bigger String. Even a number happily joins on — Java turns it into text for you.",
        },
        {
          type: "code",
          lang: "java",
          text: 'String name = "Ada";\nint wins = 3;\nSystem.out.println(name + " has " + wins + " wins");',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Mind the spaces inside your quotes. \"has\" + 3 becomes has3, which reads like a robot. \" has \" gives it breathing room.",
        },
        {
          type: "p",
          text: "Make a String name set to Sam and an int score set to 100. Print one sentence: Sam scored 100 points.",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        // TODO: combine a name and a number into one printed sentence\n    }\n}\n",
      solution:
        'class Main {\n    public static void main(String[] args) {\n        String name = "Sam";\n        int score = 100;\n        System.out.println(name + " scored " + score + " points");\n    }\n}\n',
      checks: [
        { label: "Declare a String variable", kind: "codeContains", value: "String " },
        { label: "Declare an int variable", kind: "codeContains", value: "int " },
        { label: "Join pieces with +", kind: "codeContains", value: "+" },
        { label: "Print the full sentence", kind: "stdoutContains", value: "Sam scored 100 points" },
      ],
      hints: [
        "Make your two variables first: a String name and an int score.",
        'Build the sentence in one println using + between the pieces: name + " scored " + score + " points".',
        'Full line: System.out.println(name + " scored " + score + " points");',
      ],
      wellDone: "You stitched text and a number into one clean sentence. That's the heart of most output you'll ever write.",
    },
  ],
};
