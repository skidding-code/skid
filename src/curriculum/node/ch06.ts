import type { Chapter } from "../types";

export const ch06: Chapter = {
  id: "node-classes",
  title: "Objects & Classes",
  glyph: "🏛️",
  summary: "Teach objects to do tricks, then stamp out as many as you like with classes.",
  lessons: [
    {
      id: "node-object-methods",
      track: "node",
      title: "Objects that do things",
      subtitle: "Give an object a function and let it talk about itself.",
      concepts: ["objects", "methods", "this"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A box that can speak" },
        {
          type: "p",
          text: "An object can hold values, but it can also hold functions. A function living inside an object is called a method, and inside it the word this means 'the object I belong to'.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const cat = {\n  name: "Mittens",\n  greet() {\n    console.log("Meow, I am " + this.name);\n  },\n};\ncat.greet(); // Meow, I am Mittens',
        },
        {
          type: "callout",
          tone: "tip",
          text: "this.name reaches back into the same object for its name property. Without this, the method has no idea whose name to use.",
        },
        {
          type: "p",
          text: "Build a robot object with a name property and a method called announce that prints \"BEEP, I am <name>\" using this.name. Then call it.",
        },
      ],
      starter:
        "// Make a robot object with a name and an announce() method that uses this.name, then call it\n",
      solution:
        'const robot = {\n  name: "Clanky",\n  announce() {\n    console.log("BEEP, I am " + this.name);\n  },\n};\nrobot.announce();\n',
      checks: [
        { label: "Read the object's own data with this.", kind: "codeContains", value: "this." },
        { label: "Announce the robot's name", kind: "stdoutContains", value: "Clanky" },
        { label: "The robot beeps", kind: "stdoutContains", value: "BEEP" },
      ],
      hints: [
        "Inside the object, write announce() { ... } as a method.",
        "Inside announce, use this.name to grab the robot's own name.",
        'Full thing: const robot = { name: "Clanky", announce() { console.log("BEEP, I am " + this.name); } }; robot.announce();',
      ],
      wellDone: "Your object can now describe itself. That self-reference, this, is the heart of everything next.",
    },
    {
      id: "node-class-basics",
      track: "node",
      title: "A cookie cutter for objects",
      subtitle: "Write a class once, then stamp out objects with new.",
      concepts: ["class", "constructor"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Stop hand-building every object" },
        {
          type: "p",
          text: "Typing out the same object shape over and over is a chore. A class is a blueprint: define the shape once, then use new to mint as many objects from it as you want. The constructor runs at birth and fills in each one's details.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'class Dog {\n  constructor(name) {\n    this.name = name;\n  }\n  bark() {\n    console.log(this.name + " says woof");\n  }\n}\nconst rex = new Dog("Rex");\nrex.bark(); // Rex says woof',
        },
        {
          type: "callout",
          tone: "note",
          text: "new Dog(\"Rex\") builds a fresh Dog and runs the constructor with \"Rex\". The constructor stashes it as this.name so the methods can find it later.",
        },
        {
          type: "p",
          text: "Write a Cat class with a constructor that stores a name, and a meow() method that prints \"<name> says meow\". Make a cat named Felix and call meow().",
        },
      ],
      starter:
        "// Write a Cat class with a constructor(name) and a meow() method.\n// Then: const felix = new Cat(\"Felix\"); felix.meow();\n",
      solution:
        'class Cat {\n  constructor(name) {\n    this.name = name;\n  }\n  meow() {\n    console.log(this.name + " says meow");\n  }\n}\nconst felix = new Cat("Felix");\nfelix.meow();\n',
      checks: [
        { label: "Define a class", kind: "codeContains", value: "class" },
        { label: "Give it a constructor", kind: "codeContains", value: "constructor" },
        { label: "Build one with new", kind: "codeContains", value: "new " },
        { label: "The cat speaks its name", kind: "stdoutContains", value: "Felix says meow" },
      ],
      hints: [
        "Start with class Cat { constructor(name) { this.name = name; } }.",
        "Add a meow() method inside the class that console.logs this.name plus \" says meow\".",
        'Then build it: const felix = new Cat("Felix"); felix.meow();',
      ],
      wellDone: "One blueprint, unlimited cats. You just unlocked the most reused idea in programming.",
    },
    {
      id: "node-class-fields",
      track: "node",
      title: "A class with more to it",
      subtitle: "Store extra data and add a second method.",
      concepts: ["class", "fields", "methods"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "More than one trick" },
        {
          type: "p",
          text: "A class isn't limited to one piece of data or one method. The constructor can set several fields on this, and you can pile on as many methods as the object needs to do its job.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'class Counter {\n  constructor() {\n    this.count = 0;\n  }\n  tick() {\n    this.count = this.count + 1;\n  }\n  report() {\n    console.log("Count is " + this.count);\n  }\n}\nconst c = new Counter();\nc.tick();\nc.tick();\nc.report(); // Count is 2',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Methods can change the object's own fields. Each tick() bumps this.count, and report() reads it back — they share the same this.",
        },
        {
          type: "p",
          text: "Write a BankAccount class whose constructor sets this.balance to 0. Add deposit(amount) that adds to the balance, and show() that prints \"Balance: <balance>\". Make one, deposit 50 then 25, and show it.",
        },
      ],
      starter:
        "// BankAccount: constructor sets this.balance = 0;\n// deposit(amount) adds to it; show() prints \"Balance: \" + this.balance.\n// Then make one, deposit 50 and 25, and call show().\n",
      solution:
        'class BankAccount {\n  constructor() {\n    this.balance = 0;\n  }\n  deposit(amount) {\n    this.balance = this.balance + amount;\n  }\n  show() {\n    console.log("Balance: " + this.balance);\n  }\n}\nconst acct = new BankAccount();\nacct.deposit(50);\nacct.deposit(25);\nacct.show();\n',
      checks: [
        { label: "Define a class", kind: "codeContains", value: "class" },
        { label: "Use a constructor to set a field", kind: "codeContains", value: "constructor" },
        { label: "Store the balance on this.", kind: "codeContains", value: "this." },
        { label: "The final balance is correct", kind: "stdoutContains", value: "Balance: 75" },
      ],
      hints: [
        "In the constructor, write this.balance = 0.",
        "deposit(amount) should do this.balance = this.balance + amount.",
        "After two deposits of 50 and 25, show() prints \"Balance: 75\".",
      ],
      wellDone: "Fields plus methods working together — your objects now have real, changing state.",
    },
    {
      id: "node-array-of-objects",
      track: "node",
      title: "A crowd of objects",
      subtitle: "Loop over a list of instances and summarize them.",
      concepts: ["class", "arrays", "loops"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Many objects, one loop" },
        {
          type: "p",
          text: "Real programs rarely have one object — they have a whole array of them. Stack your instances in an array, then loop through to ask each one its business.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'class Player {\n  constructor(name, score) {\n    this.name = name;\n    this.score = score;\n  }\n}\nconst players = [new Player("Ada", 10), new Player("Bo", 7)];\nfor (const p of players) {\n  console.log(p.name + ": " + p.score);\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "for (const p of players) hands you one player per turn. Inside the loop, p is a real instance, so p.name and p.score just work.",
        },
        {
          type: "p",
          text: "Write a Fruit class with a constructor(name, price). Build an array of three fruits, then loop and print \"<name> costs <price>\" for each.",
        },
      ],
      starter:
        "// Fruit class with constructor(name, price).\n// Make an array of three fruits, then loop and print \"<name> costs <price>\".\n",
      solution:
        'class Fruit {\n  constructor(name, price) {\n    this.name = name;\n    this.price = price;\n  }\n}\nconst fruits = [\n  new Fruit("Apple", 2),\n  new Fruit("Banana", 1),\n  new Fruit("Cherry", 5),\n];\nfor (const f of fruits) {\n  console.log(f.name + " costs " + f.price);\n}\n',
      checks: [
        { label: "Define a class", kind: "codeContains", value: "class" },
        { label: "Build instances with new", kind: "codeContains", value: "new " },
        { label: "First fruit is summarized", kind: "stdoutContains", value: "Apple costs 2" },
        { label: "All three fruits print in order", kind: "stdoutMatches", value: "Apple[\\s\\S]*Banana[\\s\\S]*Cherry" },
      ],
      hints: [
        "Give Fruit a constructor(name, price) that sets this.name and this.price.",
        'Make the array: [new Fruit("Apple", 2), new Fruit("Banana", 1), new Fruit("Cherry", 5)].',
        "Loop with for (const f of fruits) and console.log(f.name + \" costs \" + f.price).",
      ],
      wellDone: "An array of instances, summarized in a tidy loop — that's the shape of nearly every app you'll ever build.",
    },
  ],
};
