import type { Chapter } from "../types";

export const ch06: Chapter = {
  id: "ts-classes-enums",
  title: "Classes & Enums",
  glyph: "🏛️",
  summary:
    "A class is a blueprint: describe the shape of a thing once, then stamp out as many copies as you like. TypeScript adds types to every field and method, plus access modifiers to keep the wrong hands off your data. In this chapter you'll build typed classes, hide their internals, take a shorthand for constructors, fit a class to an interface, and name your magic numbers with enums.",
  lessons: [
    {
      id: "ts-class-basics",
      track: "typescript",
      title: "Blueprints for things",
      subtitle: "Write a class with typed fields, a constructor, and a method.",
      concepts: ["class", "constructor", "method"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "A class describes a kind of thing" },
        {
          type: "p",
          text: "A class is a template. You list the fields each instance will have (with types), write a constructor that sets them up when you build one, and add methods — functions that belong to the object. You make an instance with new.",
        },
        {
          type: "p",
          text: "Inside a method, this refers to the particular instance you're working with, so this.name is that object's own name.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'class Dog {\n  name: string;\n  constructor(name: string) {\n    this.name = name;\n  }\n  speak(): string {\n    return `${this.name} says woof`;\n  }\n}\n\nconst rex = new Dog("Rex");\nconsole.log(rex.speak());   // Rex says woof',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The constructor runs once, automatically, the moment you call new. Its job is to fill in the fields.",
        },
        {
          type: "p",
          text: 'Write a class Cat with a string field name, a constructor that sets it, and a method speak() that returns `${this.name} says meow`. Make a Cat called "Mittens" and print speak(). The output should be Mittens says meow.',
        },
      ],
      starter: "// Define a blueprint, then build one and make it speak\n",
      solution:
        'class Cat {\n  name: string;\n  constructor(name: string) {\n    this.name = name;\n  }\n  speak(): string {\n    return `${this.name} says meow`;\n  }\n}\n\nconst mittens = new Cat("Mittens");\nconsole.log(mittens.speak());\n',
      checks: [
        { label: "Declare a class", kind: "codeContains", value: "class Cat" },
        { label: "Give it a constructor", kind: "codeContains", value: "constructor(" },
        { label: "Build one with new", kind: "codeContains", value: "new Cat(" },
        { label: "Print the greeting", kind: "stdoutContains", value: "Mittens says meow" },
      ],
      hints: [
        "Start with class Cat { name: string; ... } and a constructor(name: string) that does this.name = name.",
        "speak(): string { return `${this.name} says meow`; }",
        'Then: const mittens = new Cat("Mittens"); console.log(mittens.speak());',
      ],
      wellDone: "One blueprint, as many cats as you like. That's the whole appeal of classes.",
    },
    {
      id: "ts-access-modifiers",
      track: "typescript",
      title: "Keep your hands off",
      subtitle: "Use private and readonly to protect a field from the outside.",
      concepts: ["private", "readonly", "encapsulation"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Some fields are nobody else's business" },
        {
          type: "p",
          text: "Mark a field private and it can only be touched from inside the class. Code outside can't read or change it directly — it has to go through the methods you provide. This is how you stop a balance from being set to a million by accident.",
        },
        {
          type: "p",
          text: "Fields are public by default. readonly means a field can be set once (in the constructor) and never reassigned after.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'class Counter {\n  private count: number = 0;\n  tick(): void {\n    this.count += 1;\n  }\n  value(): number {\n    return this.count;\n  }\n}\n\nconst c = new Counter();\nc.tick();\nc.tick();\nconsole.log(c.value());   // 2\n// c.count = 99;  // TypeScript would reject this: count is private',
        },
        {
          type: "callout",
          tone: "note",
          text: "private is a TypeScript-time guard. It disappears when the code runs, but while you're writing it stops the outside world from reaching in.",
        },
        {
          type: "p",
          text: "Build a class BankAccount with a private number field balance starting at 100, a method deposit(amount: number) that adds to it, and getBalance(): number that returns it. Deposit 50, then 25, then print the balance. The output should be 175.",
        },
      ],
      starter: "// Hide the balance; change it only through methods\n",
      solution:
        'class BankAccount {\n  private balance: number = 100;\n  deposit(amount: number): void {\n    this.balance += amount;\n  }\n  getBalance(): number {\n    return this.balance;\n  }\n}\n\nconst acct = new BankAccount();\nacct.deposit(50);\nacct.deposit(25);\nconsole.log(acct.getBalance());\n',
      checks: [
        { label: "Make the field private", kind: "codeContains", value: "private balance" },
        { label: "Provide a deposit method", kind: "codeContains", value: "deposit(" },
        { label: "Don't reach in from outside", kind: "codeNotContains", value: "acct.balance" },
        { label: "Print the final balance", kind: "stdoutEquals", value: "175" },
      ],
      hints: [
        "Declare private balance: number = 100; inside the class.",
        "deposit(amount: number): void { this.balance += amount; } and getBalance(): number { return this.balance; }",
        "Outside, use acct.deposit(50) and acct.getBalance() — never touch acct.balance directly.",
      ],
      wellDone: "The balance is sealed off. The only way in is the door you built — that's encapsulation.",
    },
    {
      id: "ts-param-properties",
      track: "typescript",
      title: "The constructor shortcut",
      subtitle: "Declare and assign fields right in the constructor parameters.",
      concepts: ["parameter properties", "constructor", "private"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Less typing for the same class" },
        {
          type: "p",
          text: "Writing a field, then a constructor parameter, then this.x = x for each field gets repetitive fast. TypeScript offers a shortcut: put an access modifier (public, private, or readonly) on a constructor parameter and it becomes a field automatically — declared and assigned in one go.",
        },
        {
          type: "p",
          text: "constructor(public name: string, private age: number) {} is the whole thing. No field declarations, no this.name = name needed.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'class Person {\n  constructor(public name: string, private age: number) {}\n  intro(): string {\n    return `${this.name} is ${this.age}`;\n  }\n}\n\nconst p = new Person("Ada", 36);\nconsole.log(p.intro());   // Ada is 36\nconsole.log(p.name);      // Ada — public, readable from outside',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Parameter properties are real, emitted JavaScript — they aren't just types. The modifier tells TypeScript both \"make a field\" and \"how visible it is\".",
        },
        {
          type: "p",
          text: 'Write a class Product whose constructor is constructor(public title: string, private price: number). Add a method label(): string returning `${this.title}: $${this.price}`. Build a Product "Mug" priced 12 and print its label. The output should be Mug: $12.',
        },
      ],
      starter: "// Use parameter properties to skip the boilerplate\n",
      solution:
        'class Product {\n  constructor(public title: string, private price: number) {}\n  label(): string {\n    return `${this.title}: $${this.price}`;\n  }\n}\n\nconst mug = new Product("Mug", 12);\nconsole.log(mug.label());\n',
      checks: [
        { label: "Use a public parameter property", kind: "codeContains", value: "public title" },
        { label: "Use a private parameter property", kind: "codeContains", value: "private price" },
        { label: "Don't write this.title = title", kind: "codeNotContains", value: "this.title =" },
        { label: "Print the label", kind: "stdoutContains", value: "Mug: $12" },
      ],
      hints: [
        "Put the modifiers right in the parameters: constructor(public title: string, private price: number) {}.",
        "No field declarations and no assignments — the modifiers do that for you.",
        'label(): string { return `${this.title}: $${this.price}`; }, then new Product("Mug", 12).',
      ],
      wellDone: "Same class, half the lines. Parameter properties are one of TypeScript's nicest conveniences.",
    },
    {
      id: "ts-implements-interface",
      track: "typescript",
      title: "Fitting the contract",
      subtitle: "Make a class implement an interface and promise its methods.",
      concepts: ["interface", "implements", "method"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "An interface is a promise a class can keep" },
        {
          type: "p",
          text: "An interface lists the methods and fields a thing must have. When a class says implements Shape, TypeScript checks that the class actually provides everything Shape requires — and complains if you forget one. It's a contract enforced while you write.",
        },
        {
          type: "p",
          text: "This lets many different classes share one shape. Anything that implements Shape is guaranteed to have an area() method, so code can call it without knowing which shape it is.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface Shape {\n  area(): number;\n}\n\nclass Square implements Shape {\n  constructor(private side: number) {}\n  area(): number {\n    return this.side * this.side;\n  }\n}\n\nconst sq = new Square(5);\nconsole.log(sq.area());   // 25',
        },
        {
          type: "callout",
          tone: "note",
          text: "implements doesn't give the class any code — it only checks that the class supplies everything the interface demands. You still write the methods yourself.",
        },
        {
          type: "p",
          text: "Define an interface Shape requiring area(): number. Write class Circle implements Shape with constructor(private radius: number) and an area() returning 3 * this.radius * this.radius. Build a Circle of radius 4 and print its area. The output should be 48.",
        },
      ],
      starter: "// Declare a contract, then build a class that satisfies it\n",
      solution:
        'interface Shape {\n  area(): number;\n}\n\nclass Circle implements Shape {\n  constructor(private radius: number) {}\n  area(): number {\n    return 3 * this.radius * this.radius;\n  }\n}\n\nconst c = new Circle(4);\nconsole.log(c.area());\n',
      checks: [
        { label: "Declare the interface", kind: "codeContains", value: "interface Shape" },
        { label: "Implement it on the class", kind: "codeContains", value: "implements Shape" },
        { label: "Provide an area method", kind: "codeMatches", value: "area\\(\\)\\s*:\\s*number" },
        { label: "Print the area", kind: "stdoutEquals", value: "48" },
      ],
      hints: [
        "interface Shape { area(): number; } sets the contract.",
        "class Circle implements Shape { constructor(private radius: number) {} ... } — TypeScript will require an area() method.",
        "area(): number { return 3 * this.radius * this.radius; }, then new Circle(4) gives 48.",
      ],
      wellDone: "The class signed the contract and kept it. Interfaces let unrelated classes share one reliable shape.",
    },
    {
      id: "ts-enums",
      track: "typescript",
      title: "Naming the magic numbers",
      subtitle: "Use numeric and string enums to give constants real names.",
      concepts: ["enum", "numeric enum", "string enum"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Enums turn mystery values into names" },
        {
          type: "p",
          text: "An enum is a set of named constants. A numeric enum auto-numbers its members from 0: in enum Status { Active, Done }, Active is 0 and Done is 1. A string enum gives each member an explicit string, like enum Color { Red = \"red\" } where Color.Red is \"red\".",
        },
        {
          type: "p",
          text: "Enums are real, emitted JavaScript — the names exist at runtime, so logging an enum member prints its value: a number for numeric enums, the string for string enums.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'enum Status { Active, Done }\nenum Color { Red = "red", Green = "green" }\n\nconsole.log(Status.Active);   // 0\nconsole.log(Status.Done);     // 1\nconsole.log(Color.Green);     // green',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Reach for an enum when a value can only be one of a small fixed set. The names make your code read like sentences instead of guessing what 0 means.",
        },
        {
          type: "p",
          text: 'Make a numeric enum Level { Low, Medium, High } and a string enum Fruit { Apple = "apple", Banana = "banana" }. Print Level.Medium (should be 1) and Fruit.Banana (should be banana), each on its own line.',
        },
      ],
      starter: "// Define one numeric enum and one string enum, then log members\n",
      solution:
        'enum Level { Low, Medium, High }\nenum Fruit { Apple = "apple", Banana = "banana" }\n\nconsole.log(Level.Medium);\nconsole.log(Fruit.Banana);\n',
      checks: [
        { label: "Declare a numeric enum", kind: "codeContains", value: "enum Level" },
        { label: "Declare a string enum", kind: "codeContains", value: 'enum Fruit' },
        { label: "Print the numeric member value", kind: "stdoutContains", value: "1" },
        { label: "Print the string member value", kind: "stdoutContains", value: "banana" },
        { label: "Two lines of output", kind: "stdoutMinLines", value: "2" },
      ],
      hints: [
        "enum Level { Low, Medium, High } — Low is 0, Medium is 1, High is 2.",
        'enum Fruit { Apple = "apple", Banana = "banana" } gives each member an explicit string.',
        "Then console.log(Level.Medium); prints 1 and console.log(Fruit.Banana); prints banana.",
      ],
      wellDone: "No more mystery numbers floating around. Enums give your fixed sets honest names.",
    },
  ],
};
