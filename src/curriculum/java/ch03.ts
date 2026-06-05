import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "java-methods",
  title: "Methods & Classes",
  glyph: "🧩",
  summary:
    "Stop copy-pasting and start naming things. Methods are reusable verbs, classes are little machines you build — snap them together and your program suddenly looks like it knows what it's doing.",
  lessons: [
    {
      id: "java-define-method",
      track: "java",
      title: "Teach the program a new word",
      subtitle: "Write a static method, then call it.",
      concepts: ["methods", "static"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A method is a verb you invent" },
        {
          type: "p",
          text: "So far everything lived inside main. A method lets you bundle a chunk of code, give it a name, and run it whenever you say its name. Write it once, call it as often as you like.",
        },
        {
          type: "p",
          text: "static means the method belongs to the class itself, so main can call it directly without building any object first. Don't overthink it — for now, static just means callable.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Main {\n    static void wave() {\n        System.out.println(\"o/\");\n    }\n    public static void main(String[] args) {\n        wave();\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "void means the method hands nothing back — it just does its thing. The () after the name is how you call it.",
        },
        {
          type: "p",
          text: "Write a static method named greet that prints Hello from a method!, then call greet() from main.",
        },
      ],
      starter:
        "class Main {\n    // TODO: define a static void method called greet that prints a message\n\n    public static void main(String[] args) {\n        // TODO: call greet() here\n    }\n}\n",
      solution:
        "class Main {\n    static void greet() {\n        System.out.println(\"Hello from a method!\");\n    }\n\n    public static void main(String[] args) {\n        greet();\n    }\n}\n",
      checks: [
        { label: "Use static for your method", kind: "codeContains", value: "static" },
        { label: "Define a method named greet", kind: "codeContains", value: "void greet(" },
        { label: "Call greet() from main", kind: "codeContains", value: "greet();" },
        { label: "Print the greeting", kind: "stdoutContains", value: "Hello from a method!" },
      ],
      hints: [
        "Above main, write: static void greet() { ... } with a println inside.",
        "Inside main, run your method by writing its name followed by () and a semicolon.",
        "greet() { System.out.println(\"Hello from a method!\"); } then call greet(); in main.",
      ],
      wellDone: "You just taught the program a brand-new word. Naming things is half of programming.",
    },
    {
      id: "java-params-return",
      track: "java",
      title: "Feed it, get something back",
      subtitle: "A method with a parameter and a return value.",
      concepts: ["parameters", "return"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Input goes in, answer comes out" },
        {
          type: "p",
          text: "A method gets useful when you can hand it data and get an answer back. The data you pass in is a parameter. The answer it gives back is the return value.",
        },
        {
          type: "p",
          text: "The type before the method name is the type of thing it returns. int square(int n) means: give me an int called n, and I'll hand you back an int.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Main {\n    static int doubleIt(int n) {\n        return n + n;\n    }\n    public static void main(String[] args) {\n        System.out.println(doubleIt(21));\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "return immediately ends the method and ships its value back to whoever called it. No return on an int method? The compiler will complain — it wants its answer.",
        },
        {
          type: "p",
          text: "Write a static method square(int n) that returns n * n. In main, print square(7) (which is 49).",
        },
      ],
      starter:
        "class Main {\n    // TODO: write static int square(int n) that returns n * n\n\n    public static void main(String[] args) {\n        // TODO: print the result of square(7)\n    }\n}\n",
      solution:
        "class Main {\n    static int square(int n) {\n        return n * n;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(square(7));\n    }\n}\n",
      checks: [
        { label: "Define a method named square", kind: "codeContains", value: "int square(" },
        { label: "Return a value from it", kind: "codeContains", value: "return" },
        { label: "Print the squared result", kind: "stdoutContains", value: "49" },
      ],
      hints: [
        "Header: static int square(int n) — int n is the parameter going in.",
        "Inside, write: return n * n;",
        "In main: System.out.println(square(7)); — that prints 49.",
      ],
      wellDone: "Parameter in, return value out. That's the shape of basically every function you'll ever write.",
    },
    {
      id: "java-class-capstone",
      track: "java",
      title: "Build a tiny machine",
      subtitle: "A second class with a field and a method, used from main.",
      concepts: ["classes", "fields", "methods"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "A class is a blueprint for a thing" },
        {
          type: "p",
          text: "Methods are verbs; a class lets you also bundle the nouns. A class describes what a thing knows (its fields) and what it can do (its methods). From that blueprint you create objects with new.",
        },
        {
          type: "p",
          text: "Java is happy to keep several classes in one file, as long as only one is public (and ours are not). So you can pop a little helper class right next to Main.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Cat {\n    String name = \"Whiskers\";\n    String speak() {\n        return name + \" says meow\";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Cat c = new Cat();\n        System.out.println(c.speak());\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Cat c = new Cat(); builds one cat. c.name reaches its field; c.speak() runs its method. The dot means \"belonging to this object\".",
        },
        {
          type: "p",
          text: "Make a class Dog with a String field name set to \"Rex\" and a method bark() that returns name + \" says woof\". In main, create a Dog, then print Meet Rex followed by the result of bark().",
        },
      ],
      starter:
        "// TODO: define a class Dog with a String name and a bark() method\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: create a Dog, then print a two-line summary using it\n    }\n}\n",
      solution:
        "class Dog {\n    String name = \"Rex\";\n    String bark() {\n        return name + \" says woof\";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        System.out.println(\"Meet \" + d.name);\n        System.out.println(d.bark());\n    }\n}\n",
      checks: [
        { label: "Define a second class", kind: "codeContains", value: "class Dog" },
        { label: "Give the dog a method", kind: "codeContains", value: "bark(" },
        { label: "Return something from it", kind: "codeContains", value: "return" },
        { label: "Build a Dog with new", kind: "codeContains", value: "new Dog(" },
        { label: "Introduce your dog by name", kind: "stdoutContains", value: "Meet Rex" },
        { label: "Make it speak", kind: "stdoutContains", value: "Rex says woof" },
      ],
      hints: [
        "Outside Main, write class Dog { String name = \"Rex\"; ... } with a String bark() method inside.",
        "bark should: return name + \" says woof\";",
        "In main: Dog d = new Dog(); print \"Meet \" + d.name; then print d.bark();",
      ],
      wellDone: "Fields, methods, a fresh object — you just assembled a working little machine from parts you designed. That's the whole game.",
    },
  ],
};
