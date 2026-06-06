import type { Chapter } from "../types";

export const ch09: Chapter = {
  id: "java-records-enums",
  title: "Records, Enums & Switch",
  glyph: "🏷️",
  summary:
    "Some values only come in a few flavors, and some objects are just a tidy bag of fields. Java has purpose-built tools for both: enums for the fixed-list values and records for the tidy bags. Throw in the modern switch and your code gets short, clear, and a little bit smug about it.",
  lessons: [
    {
      id: "java-enum-basics",
      track: "java",
      title: "A short list of allowed answers",
      subtitle: "Define an enum of fixed values and react to one with a switch.",
      concepts: ["enum", "switch"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "When there are only so many options" },
        {
          type: "p",
          text: "Some things come in a fixed set: directions are NORTH, SOUTH, EAST, WEST and that's the whole list. You COULD use Strings, but then \"nrth\" sneaks in and ruins your afternoon. An enum is a custom type whose values are spelled out up front, so the compiler refuses anything off the menu.",
        },
        {
          type: "p",
          text: "Write enum Name { A, B, C } and now Name.A is a real, typo-proof value. A switch is the natural way to branch on which one you got.",
        },
        {
          type: "code",
          lang: "java",
          text: "enum Light { RED, YELLOW, GREEN }\n\nclass Main {\n    public static void main(String[] args) {\n        Light l = Light.RED;\n        switch (l) {\n            case RED:\n                System.out.println(\"Stop\");\n                break;\n            case GREEN:\n                System.out.println(\"Go\");\n                break;\n            default:\n                System.out.println(\"Slow down\");\n        }\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Inside a switch on an enum you write just RED, not Light.RED — Java already knows which enum you mean. And don't forget break, or cases fall through into each other like dominoes.",
        },
        {
          type: "p",
          text: "Define enum Day { MON, SAT } and in main set a Day to SAT. Switch on it: print \"Sleep in\" for SAT and \"Work\" for MON. With SAT, the output should be \"Sleep in\".",
        },
      ],
      starter:
        "enum Day {\n    // TODO: list two values, MON and SAT\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: set a Day to SAT, then switch on it\n        // SAT prints \"Sleep in\", MON prints \"Work\"\n    }\n}\n",
      solution:
        "enum Day {\n    MON, SAT\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Day d = Day.SAT;\n        switch (d) {\n            case SAT:\n                System.out.println(\"Sleep in\");\n                break;\n            case MON:\n                System.out.println(\"Work\");\n                break;\n        }\n    }\n}\n",
      checks: [
        { label: "Declare an enum", kind: "codeContains", value: "enum" },
        { label: "Branch with a switch", kind: "codeContains", value: "switch" },
        { label: "Saturday wins", kind: "stdoutContains", value: "Sleep in" },
      ],
      hints: [
        "An enum body is just the names: enum Day { MON, SAT }.",
        "Pick a value with Day d = Day.SAT; then switch (d) { ... }.",
        "Inside: case SAT: System.out.println(\"Sleep in\"); break; and a case MON: for \"Work\".",
      ],
      wellDone: "You gave Java a tiny menu and it served exactly the right answer. Typos officially uninvited.",
    },
    {
      id: "java-record-basics",
      track: "java",
      title: "A data bag that writes its own boilerplate",
      subtitle: "Declare a record and use the accessors Java generates for free.",
      concepts: ["record", "accessor"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "One line, fully furnished" },
        {
          type: "p",
          text: "Sometimes a class is just a few values stuck together — a Point has an x and a y, and that's it. Writing the fields, the constructor, and a getter for each is a lot of typing for a glorified pair of numbers. A record (Java 16 and up) does all that for you in a single line.",
        },
        {
          type: "p",
          text: "Write record Point(int x, int y) {} and Java quietly builds the fields, a constructor Point(x, y), and accessor methods named x() and y(). Note the accessor is x(), not getX() — records keep it short.",
        },
        {
          type: "code",
          lang: "java",
          text: "record Pair(int a, int b) {}\n\nclass Main {\n    public static void main(String[] args) {\n        Pair p = new Pair(3, 4);\n        System.out.println(p.a() + p.b());\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "A record's data is immutable: once you say new Point(2, 5), its x stays 2 forever. That's a feature — no surprise edits behind your back.",
        },
        {
          type: "p",
          text: "Declare record Point(int x, int y) {}. In main make new Point(2, 5) and print x() then y(), each on its own line, so the output shows 2 then 5.",
        },
      ],
      starter:
        "// TODO: declare record Point(int x, int y) {}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make a new Point(2, 5)\n        // TODO: print its x() and its y(), each on its own line\n    }\n}\n",
      solution:
        "record Point(int x, int y) {}\n\nclass Main {\n    public static void main(String[] args) {\n        Point p = new Point(2, 5);\n        System.out.println(p.x());\n        System.out.println(p.y());\n    }\n}\n",
      checks: [
        { label: "Use a record", kind: "codeContains", value: "record" },
        { label: "Build one with new", kind: "codeContains", value: "new " },
        { label: "Print the x", kind: "stdoutContains", value: "2" },
        { label: "Print the y", kind: "stdoutContains", value: "5" },
      ],
      hints: [
        "The whole type is one line: record Point(int x, int y) {}.",
        "Make one with Point p = new Point(2, 5);.",
        "The accessors are p.x() and p.y() — println each one.",
      ],
      wellDone: "One line of record replaced a whole page of boilerplate. Future-you says thanks.",
    },
    {
      id: "java-switch-arrow",
      track: "java",
      title: "Switch, but it actually returns something",
      subtitle: "Use the arrow switch expression with no break in sight.",
      concepts: ["switch", "expression"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "The switch that grew up" },
        {
          type: "p",
          text: "The old switch made you scatter break statements everywhere and pray you didn't forget one. The modern arrow form fixes that: each case uses -> and only that branch runs, no fall-through, no break. Even better, the whole switch can be an expression that produces a value you can assign or print.",
        },
        {
          type: "p",
          text: "Write switch (x) { case 1 -> \"one\"; default -> \"many\"; } and the matching arm's value pops right out. Right of the arrow goes a single expression.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Main {\n    public static void main(String[] args) {\n        int n = 2;\n        String word = switch (n) {\n            case 1 -> \"one\";\n            case 2 -> \"two\";\n            default -> \"lots\";\n        };\n        System.out.println(word);\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "See the semicolon after the closing brace? When a switch produces a value you're assigning, the whole thing is one statement, so it ends with ; just like any assignment.",
        },
        {
          type: "p",
          text: "Set int score = 3. Use an arrow switch to turn it into a String grade: 1 -> \"bronze\", 2 -> \"silver\", 3 -> \"gold\", default -> \"none\". Print the grade so the output is \"gold\".",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        int score = 3;\n        // TODO: arrow switch to a String: 1->bronze, 2->silver, 3->gold, default->none\n        // TODO: print the result\n    }\n}\n",
      solution:
        "class Main {\n    public static void main(String[] args) {\n        int score = 3;\n        String grade = switch (score) {\n            case 1 -> \"bronze\";\n            case 2 -> \"silver\";\n            case 3 -> \"gold\";\n            default -> \"none\";\n        };\n        System.out.println(grade);\n    }\n}\n",
      checks: [
        { label: "Use a switch", kind: "codeContains", value: "switch" },
        { label: "Use the arrow form", kind: "codeContains", value: "->" },
        { label: "Gold medal", kind: "stdoutContains", value: "gold" },
      ],
      hints: [
        "Start with String grade = switch (score) { ... };.",
        "Each arm is case 3 -> \"gold\"; with an arrow, not a colon, and no break.",
        "Finish the list with default -> \"none\"; then System.out.println(grade);.",
      ],
      wellDone: "No breaks, no fall-through bugs, and it hands you a value. The arrow switch earns its keep.",
    },
    {
      id: "java-enum-fields",
      track: "java",
      title: "Enums that carry their own facts",
      subtitle: "Give an enum a field and a method so each value knows something.",
      concepts: ["enum", "method"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Enums are objects too" },
        {
          type: "p",
          text: "An enum value isn't just a label — it can carry data and behavior. Give the enum a field, a little constructor, and a method, and now each value knows a fact about itself. Planet.EARTH can know its gravity; Coin.QUARTER can know it's worth 25.",
        },
        {
          type: "p",
          text: "List the values WITH their data, like QUARTER(25), then add a private field, a constructor that stores it, and a public method that returns it. Each value runs the constructor once with its own number.",
        },
        {
          type: "code",
          lang: "java",
          text: "enum Coin {\n    DIME(10), QUARTER(25);\n\n    private final int cents;\n\n    Coin(int c) {\n        cents = c;\n    }\n\n    public int value() {\n        return cents;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println(Coin.QUARTER.value());\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "Notice the semicolon right after the list of values (DIME(10), QUARTER(25);). When an enum has fields and methods below it, that semicolon marks the end of the value list.",
        },
        {
          type: "p",
          text: "Make enum Planet { EARTH(1), JUPITER(3) } with a private int field for gravity, a constructor that stores it, and a public method gravity() that returns it. In main, print Planet.JUPITER.gravity() so the output is 3.",
        },
      ],
      starter:
        "enum Planet {\n    // TODO: list EARTH(1), JUPITER(3); (note the semicolon)\n    // TODO: a private int field for gravity\n    // TODO: a constructor that stores it\n    // TODO: a public method gravity() that returns it\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: print Planet.JUPITER.gravity()\n    }\n}\n",
      solution:
        "enum Planet {\n    EARTH(1), JUPITER(3);\n\n    private final int gravity;\n\n    Planet(int g) {\n        gravity = g;\n    }\n\n    public int gravity() {\n        return gravity;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println(Planet.JUPITER.gravity());\n    }\n}\n",
      checks: [
        { label: "Declare an enum", kind: "codeContains", value: "enum" },
        { label: "Give it a method", kind: "codeContains", value: "gravity()" },
        { label: "Jupiter's gravity", kind: "stdoutContains", value: "3" },
      ],
      hints: [
        "Values carry data: EARTH(1), JUPITER(3); — keep that semicolon at the end of the list.",
        "Add private final int gravity; and a constructor Planet(int g) { gravity = g; }.",
        "Add public int gravity() { return gravity; } then println Planet.JUPITER.gravity().",
      ],
      wellDone: "Each enum value now carries its own facts and knows how to share them. Enums with superpowers.",
    },
  ],
};
