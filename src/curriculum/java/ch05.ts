import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "java-oop",
  title: "Classes & Objects",
  glyph: "🧩",
  summary:
    "So far your data has been loose change rattling around in main. A class is a little box with a label that bundles data and the things it can do. Make a few of those boxes and suddenly your program has nouns that actually behave.",
  lessons: [
    {
      id: "java-first-class",
      track: "java",
      title: "Build a box, then fill it",
      subtitle: "Write a class with a field, a constructor, and a method, then use it from main.",
      concepts: ["class", "constructor", "method"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "A class is a cookie cutter" },
        {
          type: "p",
          text: "A class describes a kind of thing: what it knows (fields) and what it can do (methods). An object is one actual thing stamped out from that cutter with new. The cookie cutter isn't the cookie — you have to make one.",
        },
        {
          type: "p",
          text: "A constructor is the special method that runs the moment you say new. It has the same name as the class and no return type. Its whole job is to set up the new object's fields so it shows up ready to go.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Greeter {\n    String name;\n    Greeter(String n) {\n        name = n;\n    }\n    void greet() {\n        System.out.println(\"Hi, \" + name);\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Greeter g = new Greeter(\"Sam\");\n        g.greet();\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "new Dog(\"Rex\") does two things: it builds a fresh Dog, then runs the constructor to fill it in. Skip the new and Java just hands you a null-shaped hole.",
        },
        {
          type: "p",
          text: "Write a class Dog with a String field name, a constructor Dog(String n) that sets it, and a method speak() that prints name + \" says woof\". In main, make new Dog(\"Rex\") and call speak() so it prints \"Rex says woof\".",
        },
      ],
      starter:
        "class Dog {\n    // TODO: a String field called name\n    // TODO: a constructor Dog(String n) that sets name\n    // TODO: a method speak() that prints name + \" says woof\"\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make a new Dog(\"Rex\") and call speak()\n    }\n}\n",
      solution:
        "class Dog {\n    String name;\n    Dog(String n) {\n        name = n;\n    }\n    void speak() {\n        System.out.println(name + \" says woof\");\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Dog d = new Dog(\"Rex\");\n        d.speak();\n    }\n}\n",
      checks: [
        { label: "Define a class", kind: "codeContains", value: "class" },
        { label: "Stamp one out with new", kind: "codeContains", value: "new " },
        { label: "It barks", kind: "stdoutContains", value: "Rex says woof" },
      ],
      hints: [
        "Inside Dog: a line String name; then the constructor Dog(String n) { name = n; }.",
        "The method: void speak() { System.out.println(name + \" says woof\"); }",
        "In main: Dog d = new Dog(\"Rex\"); then d.speak();",
      ],
      wellDone: "You designed a cookie cutter and baked a cookie named Rex. That's object-oriented programming starting to click.",
    },
    {
      id: "java-private-getters",
      track: "java",
      title: "Keep your fields behind glass",
      subtitle: "Make fields private and hand out getters so nobody scribbles on your data.",
      concepts: ["private", "getter", "encapsulation"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "private means hands off" },
        {
          type: "p",
          text: "Mark a field private and code outside the class can't touch it directly. Why bother? Because once anyone can reach in and change anything, your object can end up in nonsense states. private is the velvet rope; the object decides who gets in.",
        },
        {
          type: "p",
          text: "To let the outside world read a value safely, you add a getter: a small public method like getBalance() that just returns the field. Read access, granted. Vandalism, denied.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Account {\n    private int balance;\n    Account(int start) {\n        balance = start;\n    }\n    public int getBalance() {\n        return balance;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Account a = new Account(100);\n        System.out.println(a.getBalance());\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "You can make several objects from one class, and each keeps its OWN copy of the fields. Two accounts, two separate balances, no mixing.",
        },
        {
          type: "p",
          text: "Write a class Cat with a private String name and a public getName() that returns it. In main, make two cats, new Cat(\"Milo\") and new Cat(\"Luna\"), and print each one's getName() so the output shows Milo then Luna.",
        },
      ],
      starter:
        "class Cat {\n    // TODO: a private String field called name\n    // TODO: a constructor Cat(String n) that sets name\n    // TODO: a public getName() that returns name\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make two cats, Milo and Luna, and print each getName()\n    }\n}\n",
      solution:
        "class Cat {\n    private String name;\n    Cat(String n) {\n        name = n;\n    }\n    public String getName() {\n        return name;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Cat a = new Cat(\"Milo\");\n        Cat b = new Cat(\"Luna\");\n        System.out.println(a.getName());\n        System.out.println(b.getName());\n    }\n}\n",
      checks: [
        { label: "Hide the field", kind: "codeContains", value: "private" },
        { label: "Expose it with a public method", kind: "codeContains", value: "public" },
        { label: "Build objects with new", kind: "codeContains", value: "new " },
        { label: "First cat", kind: "stdoutContains", value: "Milo" },
        { label: "Second cat", kind: "stdoutContains", value: "Luna" },
      ],
      hints: [
        "The field is private String name; and the constructor Cat(String n) { name = n; }.",
        "The getter: public String getName() { return name; }",
        "In main: Cat a = new Cat(\"Milo\"); Cat b = new Cat(\"Luna\"); then println a.getName() and b.getName().",
      ],
      wellDone: "Fields locked away, getters handing out read-only peeks. That's encapsulation, the quiet superpower of clean code.",
    },
    {
      id: "java-tostring",
      track: "java",
      title: "Teach your object to introduce itself",
      subtitle: "Override toString() so printing an object shows something readable.",
      concepts: ["toString", "override"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Stop printing gibberish" },
        {
          type: "p",
          text: "Print an object you made and Java mutters something like Book@1b6d3586 — the class name and a memory address. Useful to absolutely no one. The fix is to override toString(), the method Java calls whenever it needs to turn your object into text.",
        },
        {
          type: "p",
          text: "Write public String toString() and return a friendly sentence built from the fields. Now println(myObject) prints YOUR words instead of the cryptic default.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Book {\n    private String title;\n    Book(String t) {\n        title = t;\n    }\n    public String toString() {\n        return \"Book: \" + title;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Book b = new Book(\"Dune\");\n        System.out.println(b);\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "You never call toString() yourself here — System.out.println(b) calls it for you. That's the whole trick: Java already knows to ask.",
        },
        {
          type: "p",
          text: "Write a class Robot with a private String model, a constructor that sets it, and an override public String toString() that returns \"Robot model \" + model. In main, print new Robot(\"T-800\") so the output reads \"Robot model T-800\".",
        },
      ],
      starter:
        "class Robot {\n    // TODO: a private String field called model\n    // TODO: a constructor Robot(String m) that sets model\n    // TODO: override public String toString() to return \"Robot model \" + model\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make a new Robot(\"T-800\") and println it directly\n    }\n}\n",
      solution:
        "class Robot {\n    private String model;\n    Robot(String m) {\n        model = m;\n    }\n    public String toString() {\n        return \"Robot model \" + model;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Robot r = new Robot(\"T-800\");\n        System.out.println(r);\n    }\n}\n",
      checks: [
        { label: "Override toString", kind: "codeContains", value: "toString" },
        { label: "It's a public method", kind: "codeContains", value: "public" },
        { label: "Hide the field", kind: "codeContains", value: "private" },
        { label: "Print the robot", kind: "stdoutContains", value: "Robot model T-800" },
      ],
      hints: [
        "Inside Robot: private String model; and Robot(String m) { model = m; }.",
        "The override: public String toString() { return \"Robot model \" + model; }",
        "In main: Robot r = new Robot(\"T-800\"); System.out.println(r); — printing the object calls toString() for you.",
      ],
      wellDone: "Your object can introduce itself now instead of barking a memory address. Much more polite.",
    },
    {
      id: "java-cooperating-classes",
      track: "java",
      title: "Two classes, one team",
      subtitle: "Let one class hold and use objects of another class.",
      concepts: ["composition", "objects"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "Objects can own other objects" },
        {
          type: "p",
          text: "Real programs are crowds of small objects working together. One common move: an object holds another object as a field and asks it to do its job. A Library holds Books; a Team holds Players. This is called composition, and it's how big things get built from small ones.",
        },
        {
          type: "p",
          text: "Below, an Engine knows how to start, and a Car keeps an Engine. When you start the Car, it just turns around and tells its Engine to start. Each class minds its own business.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Engine {\n    void start() {\n        System.out.println(\"Engine on\");\n    }\n}\n\nclass Car {\n    private Engine engine = new Engine();\n    void drive() {\n        engine.start();\n        System.out.println(\"Driving\");\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n        c.drive();\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "Car never reaches inside Engine to fiddle with how it works — it just calls engine.start(). Small classes that trust each other beat one giant class that does everything.",
        },
        {
          type: "p",
          text: "Make a class Oven with a method bake() that prints \"Bread is ready\", and a class Baker that holds a private Oven and has a method work() which calls the oven's bake() and then prints \"Shop is open\". In main, make a Baker and call work() so the output is \"Bread is ready\" then \"Shop is open\".",
        },
      ],
      starter:
        "class Oven {\n    // TODO: a method bake() that prints \"Bread is ready\"\n}\n\nclass Baker {\n    // TODO: a private Oven field\n    // TODO: a method work() that calls the oven's bake(), then prints \"Shop is open\"\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: make a new Baker and call work()\n    }\n}\n",
      solution:
        "class Oven {\n    void bake() {\n        System.out.println(\"Bread is ready\");\n    }\n}\n\nclass Baker {\n    private Oven oven = new Oven();\n    void work() {\n        oven.bake();\n        System.out.println(\"Shop is open\");\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Baker b = new Baker();\n        b.work();\n    }\n}\n",
      checks: [
        { label: "Define classes", kind: "codeContains", value: "class" },
        { label: "Build an object with new", kind: "codeContains", value: "new " },
        { label: "Keep the oven private", kind: "codeContains", value: "private" },
        { label: "The oven bakes", kind: "stdoutContains", value: "Bread is ready" },
        { label: "The shop opens", kind: "stdoutContains", value: "Shop is open" },
      ],
      hints: [
        "Oven gets void bake() { System.out.println(\"Bread is ready\"); }.",
        "Baker holds private Oven oven = new Oven(); and work() { oven.bake(); System.out.println(\"Shop is open\"); }.",
        "In main: Baker b = new Baker(); b.work(); — Baker delegates the baking to its Oven.",
      ],
      wellDone: "Two classes, each doing one thing, cooperating like pros. That's exactly how real programs are built.",
    },
  ],
};
