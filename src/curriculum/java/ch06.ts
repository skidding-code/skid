import type { Chapter } from "../types";

export const ch06: Chapter = {
  id: "java-inheritance",
  title: "Inheritance & Interfaces",
  glyph: "🌳",
  summary:
    "Some classes are just other classes with extra opinions. Inheritance lets a class borrow everything its parent has and add its own twist, while interfaces hand out a promise everyone agrees to keep. Family trees, but for code.",
  lessons: [
    {
      id: "java-extends-override",
      track: "java",
      title: "A class that inherits the family silverware",
      subtitle: "Make a subclass with extends and override a method.",
      concepts: ["extends", "@Override"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Don't repeat yourself, inherit instead" },
        {
          type: "p",
          text: "When one class is basically another class plus a little extra, you don't rewrite everything. You say it extends the original. The new class (the subclass) automatically gets all the methods of the parent (the superclass), free of charge.",
        },
        {
          type: "p",
          text: "If the subclass wants to do a method differently, it provides its own version. That's overriding. You mark it with @Override so the compiler double-checks you actually matched a real parent method and didn't just typo a new one.",
        },
        {
          type: "code",
          lang: "java",
          text: 'class Animal {\n    String speak() {\n        return "some generic noise";\n    }\n}\n\nclass Cat extends Animal {\n    @Override\n    String speak() {\n        return "meow";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Cat c = new Cat();\n        System.out.println(c.speak());\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "@Override is optional but free insurance. Misspell the method name and the compiler yells instead of silently making a brand-new method nobody calls.",
        },
        {
          type: "p",
          text: 'Make a base class Animal with a speak() method returning "..." and a Dog that extends it and overrides speak() to return "woof". In main, create a Dog and print dog.speak() (which prints woof).',
        },
      ],
      starter:
        "class Animal {\n    String speak() {\n        return \"...\";\n    }\n}\n\n// TODO: make class Dog that extends Animal and @Override speak() to return \"woof\"\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: create a Dog and print dog.speak()\n    }\n}\n",
      solution:
        "class Animal {\n    String speak() {\n        return \"...\";\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    String speak() {\n        return \"woof\";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Dog dog = new Dog();\n        System.out.println(dog.speak());\n    }\n}\n",
      checks: [
        { label: "Inherit with extends", kind: "codeContains", value: "extends" },
        { label: "Mark the override", kind: "codeContains", value: "@Override" },
        { label: "Dog says woof", kind: "stdoutContains", value: "woof" },
      ],
      hints: [
        "Start the subclass with: class Dog extends Animal { ... } so Dog inherits everything Animal has.",
        "Inside Dog, give it its own speak() with @Override on the line above it, returning \"woof\".",
        "In main: Dog dog = new Dog(); then System.out.println(dog.speak()); which prints woof.",
      ],
      wellDone: "Dog inherited the whole class and then redecorated one room. That's the spirit of subclassing.",
    },
    {
      id: "java-super-polymorphism",
      track: "java",
      title: "One array, many animals",
      subtitle: "Call super and let polymorphism pick the right method.",
      concepts: ["super", "polymorphism"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "The parent type that holds everyone" },
        {
          type: "p",
          text: "Here's the magic trick. If Dog and Cat both extend Animal, you can put both in an Animal[] array. When you loop and call speak() on each, Java runs the real object's version, not the parent's. Same call, different behavior. That's polymorphism.",
        },
        {
          type: "p",
          text: "Sometimes a subclass wants to do its own thing AND still run the parent's version. Call super.method() to reach up to the parent and grab its result, then build on it.",
        },
        {
          type: "code",
          lang: "java",
          text: 'class Animal {\n    String speak() {\n        return "noise";\n    }\n}\n\nclass Cat extends Animal {\n    @Override\n    String speak() {\n        return super.speak() + ": meow";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Animal[] zoo = { new Animal(), new Cat() };\n        for (Animal a : zoo) {\n            System.out.println(a.speak());\n        }\n    }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "super is just \"my parent\". super.speak() runs the version Animal defined, even from inside a class that overrode it.",
        },
        {
          type: "p",
          text: 'Make Animal with speak() returning "base", and Dog that overrides speak() to return super.speak() + "-woof". Put a new Animal() and a new Dog() in an Animal[] array, loop it, and print each speak(). Output should include base and base-woof.',
        },
      ],
      starter:
        "class Animal {\n    String speak() {\n        return \"base\";\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    String speak() {\n        // TODO: return the parent's speak() with \"-woof\" added on\n        return \"\";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make an Animal[] with a new Animal() and a new Dog(), loop and print each speak()\n    }\n}\n",
      solution:
        "class Animal {\n    String speak() {\n        return \"base\";\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    String speak() {\n        return super.speak() + \"-woof\";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Animal[] zoo = { new Animal(), new Dog() };\n        for (Animal a : zoo) {\n            System.out.println(a.speak());\n        }\n    }\n}\n",
      checks: [
        { label: "Inherit with extends", kind: "codeContains", value: "extends" },
        { label: "Mark the override", kind: "codeContains", value: "@Override" },
        { label: "Reach the parent with super", kind: "codeContains", value: "super." },
        { label: "Base animal speaks", kind: "stdoutContains", value: "base" },
        { label: "Polymorphism picks Dog's version", kind: "stdoutContains", value: "base-woof" },
      ],
      hints: [
        "In Dog's speak(), call the parent first: super.speak() gives you \"base\".",
        "Glue them together: return super.speak() + \"-woof\"; which makes \"base-woof\".",
        "In main: Animal[] zoo = { new Animal(), new Dog() }; then for (Animal a : zoo) { System.out.println(a.speak()); }",
      ],
      wellDone: "Same loop, same method call, two different answers. Polymorphism did the deciding so you didn't have to.",
    },
    {
      id: "java-interface-implements",
      track: "java",
      title: "A promise, signed in code",
      subtitle: "Define an interface and implement it in a class.",
      concepts: ["interface", "implements"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Less a family tree, more a contract" },
        {
          type: "p",
          text: "An interface lists methods a class promises to provide, without saying how. It's a contract: \"anything that implements me must have these methods.\" No fields, no bodies (usually) — just the promise.",
        },
        {
          type: "p",
          text: "A class signs the contract with implements. Then it must actually write each method the interface demanded, or the compiler refuses to build. Unlike extends, a class can implement many interfaces at once.",
        },
        {
          type: "code",
          lang: "java",
          text: 'interface Greeter {\n    String greet();\n}\n\nclass Robot implements Greeter {\n    @Override\n    public String greet() {\n        return "BEEP BOOP HELLO";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Robot r = new Robot();\n        System.out.println(r.greet());\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Interface methods are public, so your implementing method needs the public keyword too. Forget it and the compiler will remind you, politely yet firmly.",
        },
        {
          type: "p",
          text: 'Define an interface Greeter with a method String greet(). Make a class Human that implements Greeter and returns "hi there" from greet(). In main, create a Human and print human.greet().',
        },
      ],
      starter:
        "// TODO: define interface Greeter with a method String greet();\n\nclass Human /* TODO: implements Greeter */ {\n    // TODO: write public String greet() returning \"hi there\"\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: create a Human and print human.greet()\n    }\n}\n",
      solution:
        "interface Greeter {\n    String greet();\n}\n\nclass Human implements Greeter {\n    @Override\n    public String greet() {\n        return \"hi there\";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Human human = new Human();\n        System.out.println(human.greet());\n    }\n}\n",
      checks: [
        { label: "Define an interface", kind: "codeContains", value: "interface" },
        { label: "Sign the contract", kind: "codeContains", value: "implements" },
        { label: "Human greets", kind: "stdoutContains", value: "hi there" },
      ],
      hints: [
        "Up top: interface Greeter { String greet(); } — note the semicolon, no body.",
        "Class header: class Human implements Greeter { ... } and inside, public String greet() { return \"hi there\"; }.",
        "In main: Human human = new Human(); then System.out.println(human.greet());",
      ],
      wellDone: "You wrote a contract and a class that honored it. That's how Java teams agree on shapes without sharing code.",
    },
    {
      id: "java-interface-as-type",
      track: "java",
      title: "Different classes, same job description",
      subtitle: "Use an interface as a type so any implementer fits.",
      concepts: ["interface", "polymorphism"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "Code to the promise, not the class" },
        {
          type: "p",
          text: "The real payoff of interfaces: you can declare a variable or array using the interface as the type. Anything that implements it fits. Your code only cares about the promised method, not which exact class is keeping the promise.",
        },
        {
          type: "p",
          text: "So a Shape[] can hold a Circle and a Square as long as both implement Shape. Loop over Shape and call area() — each object runs its own version. Add a new shape next year and the loop never changes.",
        },
        {
          type: "code",
          lang: "java",
          text: 'interface Shape {\n    int area();\n}\n\nclass Square implements Shape {\n    @Override\n    public int area() {\n        return 9;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Shape s = new Square();\n        System.out.println(s.area());\n    }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "Notice s is typed Shape, not Square. You're holding it by its promise. That's why swapping in a different implementer just works.",
        },
        {
          type: "p",
          text: 'Define interface Shape with int area(). Make Square implementing it returning 16 and Circle implementing it returning 12. Put both in a Shape[] array, loop, and print each area(). Output should include 16 and 12.',
        },
      ],
      starter:
        "interface Shape {\n    int area();\n}\n\nclass Square implements Shape {\n    @Override\n    public int area() {\n        return 16;\n    }\n}\n\n// TODO: make class Circle that implements Shape and returns 12 from area()\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make a Shape[] with a Square and a Circle, loop and print each area()\n    }\n}\n",
      solution:
        "interface Shape {\n    int area();\n}\n\nclass Square implements Shape {\n    @Override\n    public int area() {\n        return 16;\n    }\n}\n\nclass Circle implements Shape {\n    @Override\n    public int area() {\n        return 12;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Shape[] shapes = { new Square(), new Circle() };\n        for (Shape s : shapes) {\n            System.out.println(s.area());\n        }\n    }\n}\n",
      checks: [
        { label: "Define an interface", kind: "codeContains", value: "interface" },
        { label: "Classes implement it", kind: "codeContains", value: "implements" },
        { label: "Use the interface as a type", kind: "codeContains", value: "Shape[]" },
        { label: "Square's area", kind: "stdoutContains", value: "16" },
        { label: "Circle's area", kind: "stdoutContains", value: "12" },
      ],
      hints: [
        "Copy Square's shape: class Circle implements Shape { @Override public int area() { return 12; } }.",
        "Declare the array by its interface: Shape[] shapes = { new Square(), new Circle() };",
        "Loop it: for (Shape s : shapes) { System.out.println(s.area()); } which prints 16 then 12.",
      ],
      wellDone: "One array typed by a promise, two classes keeping it. That's interfaces doing the heavy lifting of flexible design.",
    },
  ],
};
