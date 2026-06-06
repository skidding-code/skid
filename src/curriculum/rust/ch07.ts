import type { Chapter } from "../types";

export const ch07: Chapter = {
  id: "rust-traits",
  title: "Traits & Generics",
  glyph: "🧬",
  summary:
    "A trait is a promise: \"I can do this thing.\" Implement it and your struct keeps that promise. Generics then let one function work with anything that made the same promise — write once, reuse forever, no copy-paste shame.",
  lessons: [
    {
      id: "rust-traits-define",
      track: "rust",
      title: "A trait is a promise in writing",
      subtitle: "Declare a behavior, then make a struct keep it.",
      concepts: ["trait", "impl"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Define the promise, then deliver" },
        {
          type: "p",
          text: "A trait names a behavior without saying who does it. \"Anything that can be greeted has a greet method.\" Then you implement that trait for a specific type, filling in what greet actually does. The trait is the job posting; impl is the hire.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'trait Speak {\n    fn speak(&self) -> String;\n}\n\nstruct Cat;\n\nimpl Speak for Cat {\n    fn speak(&self) -> String {\n        String::from("Meow")\n    }\n}\n\nfn main() {\n    let c = Cat;\n    println!("{}", c.speak());\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "&self means \"the method borrows the thing it's called on.\" It's how c.speak() knows which value it's talking about. No &self, no method.",
        },
        {
          type: "p",
          text: "Define a trait Greet with a method hello(&self) -> String. Make a struct Robot and implement Greet for it so hello returns \"Beep boop\". Then call it in main and print the result. Your program should print Beep boop.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'trait Greet {\n    fn hello(&self) -> String;\n}\n\nstruct Robot;\n\nimpl Greet for Robot {\n    fn hello(&self) -> String {\n        String::from("Beep boop")\n    }\n}\n\nfn main() {\n    let r = Robot;\n    println!("{}", r.hello());\n}\n',
      checks: [
        { label: "Declare a trait", kind: "codeContains", value: "trait" },
        { label: "Implement it with impl", kind: "codeContains", value: "impl" },
        { label: "Print the greeting", kind: "stdoutContains", value: "Beep boop" },
      ],
      hints: [
        "Above main, write trait Greet { fn hello(&self) -> String; } to post the job.",
        "Make struct Robot; then impl Greet for Robot { fn hello(&self) -> String { String::from(\"Beep boop\") } }.",
        'Full answer: trait Greet {\n    fn hello(&self) -> String;\n}\n\nstruct Robot;\n\nimpl Greet for Robot {\n    fn hello(&self) -> String {\n        String::from("Beep boop")\n    }\n}\n\nfn main() {\n    let r = Robot;\n    println!("{}", r.hello());\n}',
      ],
      wellDone: "You wrote a promise and made a struct keep it. That's more reliable than most New Year's resolutions.",
    },
    {
      id: "rust-traits-two-types",
      track: "rust",
      title: "One trait, many keepers",
      subtitle: "Implement the same trait for two different types.",
      concepts: ["trait", "impl"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Same promise, different voices" },
        {
          type: "p",
          text: "The whole point of a trait is that many types can keep the same promise their own way. Implement it twice and each type answers in its own voice — but you call them with the exact same method name. That's the magic: shared interface, custom behavior.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'trait Speak {\n    fn speak(&self) -> String;\n}\n\nstruct Cat;\nstruct Dog;\n\nimpl Speak for Cat {\n    fn speak(&self) -> String {\n        String::from("Meow")\n    }\n}\n\nimpl Speak for Dog {\n    fn speak(&self) -> String {\n        String::from("Woof")\n    }\n}\n\nfn main() {\n    println!("{}", Cat.speak());\n    println!("{}", Dog.speak());\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "Two impl blocks, one trait. Rust figures out which speak to run from the type you call it on. No if-else, no switch — just the right method, automatically.",
        },
        {
          type: "p",
          text: "Define trait Animal with sound(&self) -> String. Make structs Duck and Cow, implement Animal for both (Duck says \"Quack\", Cow says \"Moo\"), and print both in main. Your program should print Quack and Moo.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'trait Animal {\n    fn sound(&self) -> String;\n}\n\nstruct Duck;\nstruct Cow;\n\nimpl Animal for Duck {\n    fn sound(&self) -> String {\n        String::from("Quack")\n    }\n}\n\nimpl Animal for Cow {\n    fn sound(&self) -> String {\n        String::from("Moo")\n    }\n}\n\nfn main() {\n    println!("{}", Duck.sound());\n    println!("{}", Cow.sound());\n}\n',
      checks: [
        { label: "Declare a trait", kind: "codeContains", value: "trait" },
        { label: "Implement it (at least once)", kind: "codeContains", value: "impl" },
        { label: "Print the duck's sound", kind: "stdoutContains", value: "Quack" },
        { label: "Print the cow's sound", kind: "stdoutContains", value: "Moo" },
      ],
      hints: [
        "Write trait Animal { fn sound(&self) -> String; } once, then two struct lines: Duck and Cow.",
        "Add two impl blocks: impl Animal for Duck { ... \"Quack\" ... } and impl Animal for Cow { ... \"Moo\" ... }.",
        'Full answer: trait Animal {\n    fn sound(&self) -> String;\n}\n\nstruct Duck;\nstruct Cow;\n\nimpl Animal for Duck {\n    fn sound(&self) -> String {\n        String::from("Quack")\n    }\n}\n\nimpl Animal for Cow {\n    fn sound(&self) -> String {\n        String::from("Moo")\n    }\n}\n\nfn main() {\n    println!("{}", Duck.sound());\n    println!("{}", Cow.sound());\n}',
      ],
      wellDone: "One trait, two animals, zero copy-paste. You're running a tiny well-behaved farm.",
    },
    {
      id: "rust-traits-generic-bound",
      track: "rust",
      title: "Generics: one function, any type that qualifies",
      subtitle: "Write biggest once, use it on numbers and letters.",
      concepts: ["generics", "trait bound"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Pick a winner, no matter the type" },
        {
          type: "p",
          text: "A generic function works for many types using a placeholder like T. But T could be anything, and you can't compare just anything — so you add a trait bound: T: PartialOrd means \"T must be a type that can be compared with <.\" Now the function works for every comparable type and nothing else.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn bigger<T: PartialOrd>(a: T, b: T) -> T {\n    if a > b {\n        a\n    } else {\n        b\n    }\n}\n\nfn main() {\n    println!("{}", bigger(3, 9));\n    println!("{}", bigger("apple", "pear"));\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The bound <T: PartialOrd> is a bouncer at the door: only types that know how to be ordered get in. Try it without the bound and Rust refuses to compile the comparison.",
        },
        {
          type: "p",
          text: "Write fn biggest<T: PartialOrd>(a: T, b: T) -> T that returns the larger of two values. In main, call it on numbers so it prints 42 (try biggest(42, 17)). Your program should print 42.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn biggest<T: PartialOrd>(a: T, b: T) -> T {\n    if a > b {\n        a\n    } else {\n        b\n    }\n}\n\nfn main() {\n    println!("{}", biggest(42, 17));\n}\n',
      checks: [
        { label: "Use a generic type parameter", kind: "codeContains", value: "<T" },
        { label: "Bound it with PartialOrd", kind: "codeContains", value: "PartialOrd" },
        { label: "Print the larger number", kind: "stdoutContains", value: "42" },
      ],
      hints: [
        "Signature first: fn biggest<T: PartialOrd>(a: T, b: T) -> T { ... }.",
        "Inside, return a if a > b else return b. Then call biggest(42, 17) in main and print it.",
        'Full answer: fn biggest<T: PartialOrd>(a: T, b: T) -> T {\n    if a > b {\n        a\n    } else {\n        b\n    }\n}\n\nfn main() {\n    println!("{}", biggest(42, 17));\n}',
      ],
      wellDone: "One function that picks the bigger of anything comparable. You just deleted ten copies of the same code before you wrote them.",
    },
    {
      id: "rust-traits-derive-debug",
      track: "rust",
      title: "Derive Debug and peek inside",
      subtitle: "Let Rust auto-write the printing code for you.",
      concepts: ["derive", "Debug"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Free printing, no assembly required" },
        {
          type: "p",
          text: "Normally println! can't show your struct — it doesn't know what the inside looks like. Slap #[derive(Debug)] on top and Rust writes the printing code for you. Then {:?} (the debug hole) prints the whole struct, fields and all. It's a free X-ray.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            '#[derive(Debug)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\n\nfn main() {\n    let p = Point { x: 1, y: 2 };\n    println!("{:?}", p);\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "{} is for friendly human output; {:?} is the debug view that shows structure. derive(Debug) is what unlocks {:?} for your own type — without it, the compiler politely declines.",
        },
        {
          type: "p",
          text: "Define a struct Dog with fields name: String and age: i32, put #[derive(Debug)] above it, build one (name \"Rex\", age 4), and print it with {:?}. Your output should contain Rex.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        '#[derive(Debug)]\nstruct Dog {\n    name: String,\n    age: i32,\n}\n\nfn main() {\n    let d = Dog {\n        name: String::from("Rex"),\n        age: 4,\n    };\n    println!("{:?}", d);\n}\n',
      checks: [
        { label: "Derive Debug", kind: "codeContains", value: "#[derive(Debug)]" },
        { label: "Print with the debug hole", kind: "codeContains", value: ":?" },
        { label: "Show the dog's name", kind: "stdoutContains", value: "Rex" },
        { label: "Show the age field", kind: "stdoutContains", value: "4" },
      ],
      hints: [
        "Put #[derive(Debug)] on the line directly above struct Dog { name: String, age: i32 }.",
        "Build it with Dog { name: String::from(\"Rex\"), age: 4 }, then println!(\"{:?}\", d);.",
        '#[derive(Debug)]\nstruct Dog {\n    name: String,\n    age: i32,\n}\n\nfn main() {\n    let d = Dog {\n        name: String::from("Rex"),\n        age: 4,\n    };\n    println!("{:?}", d);\n}',
      ],
      wellDone: "You got Rust to write your printing code and X-ray a whole struct with four characters. Lazy in the best way.",
    },
  ],
};
