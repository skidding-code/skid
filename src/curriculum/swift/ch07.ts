import type { Chapter } from "../types";

export const ch07: Chapter = {
  id: "swift-protocols",
  title: "Protocols & Extensions",
  glyph: "📐",
  summary:
    "A protocol is a promise: \"anything wearing this badge can do X.\" An extension lets you bolt new tricks onto types that already exist — even ones you didn't write. Together they let unrelated things behave the same and let old types learn new moves.",
  lessons: [
    {
      id: "swift-protocol-basics",
      track: "swift",
      title: "Sign here, please",
      subtitle: "Define a protocol and make a struct sign the contract.",
      concepts: ["protocol", "conformance"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A contract, not a thing" },
        {
          type: "p",
          text: "A protocol doesn't do anything by itself. It's a checklist: \"to count as an Identifiable, you must have an id.\" Any type that promises to provide everything on the list gets to wear the badge.",
        },
        {
          type: "p",
          text: "A struct conforms by writing the protocol name after a colon, then actually delivering what was promised. Skip a requirement and the compiler politely refuses to let you leave.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'protocol Named {\n    var name: String { get }\n}\n\nstruct Dog: Named {\n    var name: String\n}\n\nlet rex = Dog(name: "Rex")\nprint("Meet \\(rex.name)")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The colon in struct Dog: Named is the signature on the contract. { get } just means \"readable\" — the struct must supply that property.",
        },
        {
          type: "p",
          text: "Define a protocol Greeter that requires a String property greeting. Make a struct Robot conform to it, create one with greeting \"BEEP BOOP\", and print Robot says: BEEP BOOP.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'protocol Greeter {\n    var greeting: String { get }\n}\n\nstruct Robot: Greeter {\n    var greeting: String\n}\n\nlet bot = Robot(greeting: "BEEP BOOP")\nprint("Robot says: \\(bot.greeting)")\n',
      checks: [
        { label: "Define a protocol", kind: "codeContains", value: "protocol" },
        { label: "Conform to it with a colon", kind: "codeContains", value: ": " },
        { label: "Print the robot's greeting", kind: "stdoutContains", value: "Robot says: BEEP BOOP" },
      ],
      hints: [
        "Start the contract: protocol Greeter { var greeting: String { get } }.",
        "Make a struct sign it: struct Robot: Greeter { var greeting: String }.",
        'Build one and print it: let bot = Robot(greeting: "BEEP BOOP"); print("Robot says: \\(bot.greeting)").',
      ],
      wellDone: "You wrote a contract and got a struct to sign it. The compiler is now your enforcer.",
    },
    {
      id: "swift-protocol-polymorphism",
      track: "swift",
      title: "Everybody speaks",
      subtitle: "Put different conformers in one array and call the same method.",
      concepts: ["protocol method", "polymorphism"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Different animals, same command" },
        {
          type: "p",
          text: "When a protocol requires a method, every conformer must provide its own version. The magic: you can store a Cat and a Cow in the same [Animal] array, loop over them, and call speak() on each — and each does its own thing.",
        },
        {
          type: "p",
          text: "This is polymorphism: one call, many behaviors. You don't ask \"are you a cat or a cow?\" You just say speak() and trust the badge.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'protocol Animal {\n    func speak() -> String\n}\n\nstruct Cat: Animal {\n    func speak() -> String { "Meow" }\n}\nstruct Cow: Animal {\n    func speak() -> String { "Moo" }\n}\n\nlet zoo: [Animal] = [Cat(), Cow()]\nfor a in zoo {\n    print(a.speak())\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "The array type is [Animal], not [Cat]. Swift only knows each item is some Animal — which is exactly enough to call speak().",
        },
        {
          type: "p",
          text: "Define a protocol Noisy with func noise() -> String. Make Duck return \"Quack\" and Dog return \"Woof\". Put one of each in a [Noisy] array, loop, and print each noise (so the output includes Quack and Woof).",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'protocol Noisy {\n    func noise() -> String\n}\n\nstruct Duck: Noisy {\n    func noise() -> String { "Quack" }\n}\nstruct Dog: Noisy {\n    func noise() -> String { "Woof" }\n}\n\nlet pack: [Noisy] = [Duck(), Dog()]\nfor thing in pack {\n    print(thing.noise())\n}\n',
      checks: [
        { label: "Define a protocol", kind: "codeContains", value: "protocol" },
        { label: "Conform with a colon", kind: "codeContains", value: ": " },
        { label: "The duck speaks", kind: "stdoutContains", value: "Quack" },
        { label: "The dog speaks", kind: "stdoutContains", value: "Woof" },
      ],
      hints: [
        "Require a method: protocol Noisy { func noise() -> String }.",
        'Give each struct its own version: struct Duck: Noisy { func noise() -> String { "Quack" } }, and a Dog returning "Woof".',
        "Store them together and loop: let pack: [Noisy] = [Duck(), Dog()]; for thing in pack { print(thing.noise()) }.",
      ],
      wellDone: "One loop, two voices. You called the same method on different types and let each be itself.",
    },
    {
      id: "swift-extensions",
      track: "swift",
      title: "Teaching old types new tricks",
      subtitle: "Use an extension to add a method to a type you didn't write.",
      concepts: ["extension", "methods"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Bolt-on abilities" },
        {
          type: "p",
          text: "You can't edit Apple's source for Int, but you can extend it. An extension adds new methods or computed properties to an existing type — yours, the standard library's, anyone's — without subclassing or asking permission.",
        },
        {
          type: "p",
          text: "Inside an extension, self is the value itself. So Int can suddenly answer questions like \"are you even?\" as if it always could.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'extension Int {\n    func doubled() -> Int {\n        self * 2\n    }\n}\n\nprint("Twice 21 is \\(21.doubled())")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "After this extension, every Int everywhere has doubled(). You're not creating a new type — you're upgrading the one that exists.",
        },
        {
          type: "p",
          text: "Write an extension on String that adds a method shout() returning the string in UPPERCASE (use self.uppercased()). Then print \"hello\".shout() so the output contains HELLO.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'extension String {\n    func shout() -> String {\n        self.uppercased()\n    }\n}\n\nprint("hello".shout())\n',
      checks: [
        { label: "Add an extension", kind: "codeContains", value: "extension" },
        { label: "Uppercase the value", kind: "codeContains", value: "uppercased" },
        { label: "Print the shout", kind: "stdoutContains", value: "HELLO" },
      ],
      hints: [
        "Open an extension on the type: extension String { ... }.",
        "Add a method that returns the loud version: func shout() -> String { self.uppercased() }.",
        'Then call it: print("hello".shout()) — the output should be HELLO.',
      ],
      wellDone: "You gave String a new ability without owning String. Extensions are how everyone shares the toolbox.",
    },
    {
      id: "swift-protocol-oriented",
      track: "swift",
      title: "Batteries included",
      subtitle: "Give a protocol a default method via an extension.",
      concepts: ["protocol", "extension", "default methods"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "Free behavior for every conformer" },
        {
          type: "p",
          text: "Here's the move that makes Swift \"protocol-oriented\": you can extend a protocol itself and give it a default implementation. Now every conformer gets that method for free, while still only having to provide the bare requirement.",
        },
        {
          type: "p",
          text: "Require one small thing (a name), then hand out a shared method (a greeting) built on top of it. Conformers stay tiny; the shared logic lives in one place.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'protocol Hero {\n    var name: String { get }\n}\n\nextension Hero {\n    func intro() -> String {\n        "I am \\(name)!"\n    }\n}\n\nstruct Knight: Hero {\n    var name: String\n}\n\nprint(Knight(name: "Gwen").intro())',
        },
        {
          type: "callout",
          tone: "note",
          text: "Knight only declares name — yet it can call intro(), because the protocol extension supplied that method to every Hero automatically.",
        },
        {
          type: "p",
          text: "Make a protocol Plant requiring a String species. Extend Plant with a method describe() returning A plant: <species>. Make a struct Cactus: Plant with species \"cactus\", and print Cactus(species: \"cactus\").describe() so the output contains A plant: cactus.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'protocol Plant {\n    var species: String { get }\n}\n\nextension Plant {\n    func describe() -> String {\n        "A plant: \\(species)"\n    }\n}\n\nstruct Cactus: Plant {\n    var species: String\n}\n\nprint(Cactus(species: "cactus").describe())\n',
      checks: [
        { label: "Define a protocol", kind: "codeContains", value: "protocol" },
        { label: "Extend the protocol", kind: "codeContains", value: "extension" },
        { label: "Conform with a colon", kind: "codeContains", value: ": " },
        { label: "Print the description", kind: "stdoutContains", value: "A plant: cactus" },
      ],
      hints: [
        "Require the property: protocol Plant { var species: String { get } }.",
        'Add the shared method on the protocol: extension Plant { func describe() -> String { "A plant: \\(species)" } }.',
        'Conform and call it: struct Cactus: Plant { var species: String }; print(Cactus(species: "cactus").describe()).',
      ],
      wellDone: "You required one property and handed out free behavior to every conformer. That's protocol-oriented programming in a nutshell.",
    },
  ],
};
