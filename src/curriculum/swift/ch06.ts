import type { Chapter } from "../types";

export const ch06: Chapter = {
  id: "swift-types",
  title: "Structs & Classes",
  glyph: "🏗️",
  summary:
    "Time to build your own types. A struct is a tidy box that bundles related data and behavior together; a class is its rowdier cousin that everyone shares. Learn to make both, give them properties that compute themselves, and finally feel the deep difference between a copy and a shared reference.",
  lessons: [
    {
      id: "swift-struct-basics",
      track: "swift",
      title: "Build your own box",
      subtitle: "Bundle data and a method together with a struct.",
      concepts: ["struct", "init", "method"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Stop juggling loose variables" },
        {
          type: "p",
          text: "A struct lets you glue related values into one named type instead of carrying ten lonely variables around. You list the stored properties it holds, give it an init to set them up, and add methods (functions that live inside) so the type knows how to do things, not just hold things.",
        },
        {
          type: "p",
          text: "Inside a method, self means \"this particular instance,\" so self.name is whatever name THIS dog was made with.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'struct Dog {\n    var name: String\n    var age: Int\n\n    init(name: String, age: Int) {\n        self.name = name\n        self.age = age\n    }\n\n    func bark() {\n        print("\\(name) says woof!")\n    }\n}\n\nlet rex = Dog(name: "Rex", age: 4)\nrex.bark()',
        },
        {
          type: "callout",
          tone: "tip",
          text: "You make an instance by calling the type like a function: Dog(name: \"Rex\", age: 4). That call runs init. Then dot into it to use a property or call a method.",
        },
        {
          type: "p",
          text: "Make a struct Robot with stored properties name (String) and battery (Int), an init that fills both, and a method greet() that prints Beep, I am <name>. Then create one named Bolt with battery 100 and call greet().",
        },
      ],
      starter: "// Build a Robot struct, then make one and greet.\n// Your code here\n",
      solution:
        'struct Robot {\n    var name: String\n    var battery: Int\n\n    init(name: String, battery: Int) {\n        self.name = name\n        self.battery = battery\n    }\n\n    func greet() {\n        print("Beep, I am \\(name)")\n    }\n}\n\nlet bolt = Robot(name: "Bolt", battery: 100)\nbolt.greet()\n',
      checks: [
        { label: "Define a struct", kind: "codeContains", value: "struct" },
        { label: "Give it a method with func", kind: "codeContains", value: "func" },
        { label: "Store a property with var", kind: "codeContains", value: "var" },
        { label: "Greet with the robot's name", kind: "stdoutContains", value: "Beep, I am Bolt" },
      ],
      hints: [
        "Start the type with struct Robot { var name: String; var battery: Int }, each on its own line.",
        "Add init(name: String, battery: Int) and set self.name = name and self.battery = battery inside it.",
        'Add func greet() { print("Beep, I am \\(name)") }, then let bolt = Robot(name: "Bolt", battery: 100); bolt.greet().',
      ],
      wellDone: "You designed a brand-new type from scratch. Loose variables everywhere just got jealous.",
    },
    {
      id: "swift-computed-properties",
      track: "swift",
      title: "Properties that do the math for you",
      subtitle: "Add a computed property that calculates on demand.",
      concepts: ["computed property", "struct"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Some properties are lazy geniuses" },
        {
          type: "p",
          text: "A stored property holds a value. A computed property doesn't store anything — it figures out its value every time you ask, from the other properties. It's perfect for things that should always stay in sync, like an area that depends on width and height.",
        },
        {
          type: "p",
          text: "You write it like a property, but give it a { } block that returns a value. No parentheses when you use it — area looks like a field, but it's quietly running code.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'struct Rectangle {\n    var width: Int\n    var height: Int\n\n    var area: Int {\n        return width * height\n    }\n}\n\nlet box = Rectangle(width: 3, height: 4)\nprint("Area is \\(box.area)")',
        },
        {
          type: "callout",
          tone: "note",
          text: "No init needed here: a struct with only stored properties gets a free memberwise init, so Rectangle(width: 3, height: 4) just works.",
        },
        {
          type: "p",
          text: "Make a struct Square with a stored property side (Int) and a computed property perimeter that returns side times 4. Create one with side 5 and print Perimeter is 20.",
        },
      ],
      starter: "// Make a Square with a computed perimeter.\n// Your code here\n",
      solution:
        'struct Square {\n    var side: Int\n\n    var perimeter: Int {\n        return side * 4\n    }\n}\n\nlet s = Square(side: 5)\nprint("Perimeter is \\(s.perimeter)")\n',
      checks: [
        { label: "Define a struct", kind: "codeContains", value: "struct" },
        { label: "Store side with var", kind: "codeContains", value: "var" },
        { label: "Compute the perimeter", kind: "codeContains", value: "return" },
        { label: "Print the computed perimeter", kind: "stdoutContains", value: "Perimeter is 20" },
      ],
      hints: [
        "Start with struct Square { var side: Int }.",
        "Add a computed property: var perimeter: Int { return side * 4 }.",
        'Then let s = Square(side: 5); print("Perimeter is \\(s.perimeter)").',
      ],
      wellDone: "Your property does its own homework now. Change side and the perimeter updates itself, free of charge.",
    },
    {
      id: "swift-class-reference",
      track: "swift",
      title: "Copy vs. share: the big reveal",
      subtitle: "Meet classes and feel why references aren't values.",
      concepts: ["class", "reference vs value"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "Same word, two very different worlds" },
        {
          type: "p",
          text: "A class looks almost identical to a struct — properties, init, methods — but it behaves completely differently when you copy it. A struct is a value: hand it to someone and they get their own copy. A class is a reference: hand it over and you're both pointing at the exact same object.",
        },
        {
          type: "p",
          text: "So if two names refer to one class instance, a change through one name shows up through the other. Spooky action at a distance, but on purpose.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'class Counter {\n    var count = 0\n}\n\nlet a = Counter()\nlet b = a        // b points at the SAME object\nb.count = 7\nprint("a.count is \\(a.count)")  // prints 7, not 0',
        },
        {
          type: "callout",
          tone: "warn",
          text: "If Counter were a struct, a.count would still be 0 here, because b would be a separate copy. That single difference is the whole point of this lesson.",
        },
        {
          type: "p",
          text: "Make a class Score with var points = 0. Create one called game, point a second name copy at it (let copy = game), set copy.points = 99, then print Points: 99 by reading game.points.",
        },
      ],
      starter:
        "// Make a class Score, share it through two names, and prove\n// that changing one changes the other.\n// Your code here\n",
      solution:
        'class Score {\n    var points = 0\n}\n\nlet game = Score()\nlet copy = game\ncopy.points = 99\nprint("Points: \\(game.points)")\n',
      checks: [
        { label: "Define a class", kind: "codeContains", value: "class" },
        { label: "Store points with var", kind: "codeContains", value: "var" },
        { label: "Reading the original shows the shared change", kind: "stdoutContains", value: "Points: 99" },
      ],
      hints: [
        "Use class, not struct: class Score { var points = 0 }.",
        "Make one and alias it: let game = Score(); let copy = game. Both names point at the same object.",
        'Set copy.points = 99, then print("Points: \\(game.points)") — reading game still shows 99.',
      ],
      wellDone: "You just felt the difference between a copy and a share in your bones. This trips up pros; you've got it.",
    },
    {
      id: "swift-types-program",
      track: "swift",
      title: "Put it all together",
      subtitle: "A tiny program using a struct, a class, and a computed property.",
      concepts: ["struct", "class", "computed property"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "One small machine, all the parts" },
        {
          type: "p",
          text: "Time to combine everything. You'll build a struct for plain data (a value you copy), a class for something shared (a running total), and a computed property so a value stays in sync without you nagging it.",
        },
        {
          type: "p",
          text: "The plan: a Player struct holds a name and a score, with a computed label that formats them. A class Team keeps a totalScore that everyone adds into. Because Team is a class, every add accumulates on the one shared object.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'struct Player {\n    var name: String\n    var score: Int\n    var label: String {\n        return "\\(name): \\(score)"\n    }\n}\n\nclass Team {\n    var totalScore = 0\n    func add(_ player: Player) {\n        totalScore += player.score\n        print(player.label)\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "func add(_ player: Player) uses _ so you call it as team.add(p) with no label. Inside, totalScore += player.score keeps a running sum on the shared Team object.",
        },
        {
          type: "p",
          text: "Build Player and Team as above. Make a Team, add a Player Ada with score 10 and a Player Linus with score 5, then print Total: 15 from team.totalScore.",
        },
      ],
      starter:
        "// Build a Player struct (with a computed label) and a Team class.\n// Add two players, then print the shared total.\n// Your code here\n",
      solution:
        'struct Player {\n    var name: String\n    var score: Int\n    var label: String {\n        return "\\(name): \\(score)"\n    }\n}\n\nclass Team {\n    var totalScore = 0\n    func add(_ player: Player) {\n        totalScore += player.score\n        print(player.label)\n    }\n}\n\nlet team = Team()\nteam.add(Player(name: "Ada", score: 10))\nteam.add(Player(name: "Linus", score: 5))\nprint("Total: \\(team.totalScore)")\n',
      checks: [
        { label: "Define a struct", kind: "codeContains", value: "struct" },
        { label: "Define a class", kind: "codeContains", value: "class" },
        { label: "Add behavior with func", kind: "codeContains", value: "func" },
        { label: "Print the first player", kind: "stdoutContains", value: "Ada: 10" },
        { label: "Print the shared total", kind: "stdoutContains", value: "Total: 15" },
      ],
      hints: [
        'Give Player a computed property: var label: String { return "\\(name): \\(score)" }.',
        "In Team, write func add(_ player: Player) { totalScore += player.score; print(player.label) }.",
        'Then let team = Team(); team.add(Player(name: "Ada", score: 10)); team.add(Player(name: "Linus", score: 5)); print("Total: \\(team.totalScore)").',
      ],
      wellDone: "Struct, class, and a computed property working as one. That's a real program — you're building with the grown-up tools now.",
    },
  ],
};
