import type { Chapter } from "../types";

export const ch10: Chapter = {
  id: "py-classes",
  title: "Build Your Own Types",
  glyph: "🏗️",
  summary: "Stop borrowing other people's types. Build your own with classes — bundle data and behavior into one thing.",
  lessons: [
    {
      id: "py-class-init",
      track: "python",
      title: "Blueprint for a thing",
      subtitle: "Define a class and give each instance its own data.",
      concepts: ["class", "__init__", "attributes"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "A class is a blueprint" },
        {
          type: "p",
          text: "A class describes a kind of thing. The __init__ method runs the moment you build one, and it stores the data that belongs to that instance. The first parameter is always self — the specific instance being built.",
        },
        {
          type: "code",
          lang: "python",
          text: 'class Cat:\n    def __init__(self, name):\n        self.name = name\n\nc = Cat("Mittens")\nprint(c.name)',
        },
        {
          type: "callout",
          tone: "note",
          text: "self.name = name stores the name onto this instance. Two cats can have two different names.",
        },
        {
          type: "p",
          text: "Define a class Dog whose __init__ stores a name. Create one Dog named Rex, then print its name.",
        },
      ],
      starter: "# Define class Dog, store a name in __init__\n# Then make a Dog named Rex and print its name\n",
      solution: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog("Rex")\nprint(d.name)\n',
      checks: [
        { label: "Define a class", kind: "codeContains", value: "class " },
        { label: "Write an __init__ method", kind: "codeContains", value: "def __init__" },
        { label: "Store data on the instance with self", kind: "codeContains", value: "self" },
        { label: "Print the name Rex", kind: "stdoutContains", value: "Rex" },
      ],
      hints: [
        "Start with class Dog: then an indented def __init__(self, name):.",
        "Inside __init__, write self.name = name.",
        'Build it: d = Dog("Rex"), then print(d.name).',
      ],
      wellDone: "You defined your own type. Python now knows what a Dog is.",
    },
    {
      id: "py-class-method",
      track: "python",
      title: "Teach it to do something",
      subtitle: "Add a method that uses the instance's own data.",
      concepts: ["class", "methods", "self"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Methods are functions that live on a class" },
        {
          type: "p",
          text: "Attributes are what a thing has. Methods are what a thing does. A method is just a function defined inside the class, and it can reach the instance's data through self.",
        },
        {
          type: "code",
          lang: "python",
          text: 'class Cat:\n    def __init__(self, name):\n        self.name = name\n    def meow(self):\n        print(self.name + " says meow")\n\nCat("Mittens").meow()',
        },
        {
          type: "callout",
          tone: "tip",
          text: "You call a method with a dot: c.meow(). Python passes the instance in as self automatically.",
        },
        {
          type: "p",
          text: "Give your Dog a speak method that prints a message using self.name. Build a Dog named Rex and call speak.",
        },
      ],
      starter: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    # Add a speak method that prints something using self.name\n\n# Build a Dog named Rex and call speak()\n',
      solution: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(self.name + " says woof")\n\nDog("Rex").speak()\n',
      checks: [
        { label: "Define a class", kind: "codeContains", value: "class " },
        { label: "Keep your __init__", kind: "codeContains", value: "def __init__" },
        { label: "Define a second method", kind: "codeMatches", value: "def __init__[\\s\\S]*def " },
        { label: "Use self inside the method", kind: "codeContains", value: "self.name" },
        { label: "Print the dog's name", kind: "stdoutContains", value: "Rex" },
        { label: "Print the speak sound", kind: "stdoutContains", value: "woof" },
      ],
      hints: [
        "Add another def inside the class, after __init__: def speak(self):.",
        "Inside speak, print using self.name, e.g. print(self.name + \" says woof\").",
        'Then call it: Dog("Rex").speak().',
      ],
      wellDone: "Data plus behavior in one bundle — that's what makes objects useful.",
    },
    {
      id: "py-class-capstone",
      track: "python",
      title: "Capstone: a working account",
      subtitle: "Combine attributes, a method that changes state, and a returned value.",
      concepts: ["class", "methods", "return"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "Put it all together" },
        {
          type: "p",
          text: "Real objects hold state and change it over time. A method can update an attribute, and another can return a value instead of printing — the caller decides what to do with it.",
        },
        {
          type: "code",
          lang: "python",
          text: "class Counter:\n    def __init__(self):\n        self.count = 0\n    def tick(self):\n        self.count = self.count + 1\n    def value(self):\n        return self.count",
        },
        {
          type: "callout",
          tone: "warn",
          text: "return hands a value back; it does not print. To see it, print what the method returns.",
        },
        {
          type: "p",
          text: "Build a BankAccount. __init__ starts the balance at 0. deposit(amount) adds to the balance. get_balance() returns the balance. Make an account, deposit 50 then 30, and print get_balance().",
        },
      ],
      starter: "# Build a BankAccount class:\n#  - __init__ starts self.balance at 0\n#  - deposit(amount) adds to self.balance\n#  - get_balance() returns self.balance\n# Then deposit 50 and 30 and print the balance.\n",
      solution: "class BankAccount:\n    def __init__(self):\n        self.balance = 0\n    def deposit(self, amount):\n        self.balance = self.balance + amount\n    def get_balance(self):\n        return self.balance\n\na = BankAccount()\na.deposit(50)\na.deposit(30)\nprint(a.get_balance())\n",
      checks: [
        { label: "Define a class", kind: "codeContains", value: "class " },
        { label: "Write an __init__ method", kind: "codeContains", value: "def __init__" },
        { label: "Use self to hold state", kind: "codeContains", value: "self" },
        { label: "A method must return a value", kind: "codeContains", value: "return" },
        { label: "Print the final balance 80", kind: "stdoutContains", value: "80" },
      ],
      hints: [
        "In __init__ set self.balance = 0. deposit should do self.balance = self.balance + amount.",
        "get_balance should return self.balance, not print it.",
        "Build it, a.deposit(50), a.deposit(30), then print(a.get_balance()).",
      ],
      wellDone: "You built a small type that holds state, changes it, and reports it. That's the heart of object-oriented code.",
    },
  ],
};
