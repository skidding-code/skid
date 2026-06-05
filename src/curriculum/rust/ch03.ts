import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "rust-functions",
  title: "Functions & Structs",
  glyph: "🧩",
  summary:
    "Stop repeating yourself. Bottle up your code into functions, then build your own types with structs — the LEGO bricks of Rust.",
  lessons: [
    {
      id: "rust-define-fn",
      track: "rust",
      title: "Bottle it in a function",
      subtitle: "Write a function once, call it whenever.",
      concepts: ["fn", "calling functions"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Your own little command" },
        {
          type: "p",
          text: "A function is a named bag of instructions. You define it once with the fn keyword, then call it by writing its name with parentheses. main() is itself a function — the one Rust runs first.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn wave() {\n    println!("\\u{1F44B} hi!");\n}\n\nfn main() {\n    wave();\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Defining a function doesn't run it — like writing a recipe doesn't cook dinner. You have to call it.",
        },
        {
          type: "p",
          text: "Write a function named greet that prints Hello from a function!, then call it from main so it actually runs.",
        },
      ],
      starter:
        "fn main() {\n    // Define a function named greet above main, then call it here\n}\n",
      solution:
        'fn greet() {\n    println!("Hello from a function!");\n}\n\nfn main() {\n    greet();\n}\n',
      checks: [
        { label: "Define a function with fn", kind: "codeContains", value: "fn " },
        { label: "Call your greet function", kind: "codeContains", value: "greet()" },
        {
          label: "Print Hello from a function!",
          kind: "stdoutContains",
          value: "Hello from a function!",
        },
      ],
      hints: [
        "Above main, write fn greet() { ... } with a println! inside.",
        "Inside main, run it by writing greet(); on its own line.",
        'Full answer: fn greet() {\n    println!("Hello from a function!");\n}\n\nfn main() {\n    greet();\n}',
      ],
      wellDone: "You just taught Rust a brand-new verb. Call it as often as you like.",
    },
    {
      id: "rust-fn-return",
      track: "rust",
      title: "Functions that hand something back",
      subtitle: "Take inputs, return a value.",
      concepts: ["parameters", "return values"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Inputs in, answer out" },
        {
          type: "p",
          text: "Functions can take parameters (values you pass in) and return a result. After the parentheses you write -> and the type of thing it gives back.",
        },
        {
          type: "code",
          lang: "rust",
          text: "fn area(w: i32, h: i32) -> i32 {\n    w * h\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "See the missing semicolon on w * h? In Rust, the last expression with NO semicolon is the value the function returns. Add a semicolon and you'd return nothing — a classic gotcha.",
        },
        {
          type: "p",
          text: "Use the area function on a 4 by 5 rectangle. Store the result in a variable and print it (it should be 20).",
        },
      ],
      starter:
        "fn area(w: i32, h: i32) -> i32 {\n    // return the area (no semicolon on the last line!)\n    0\n}\n\nfn main() {\n    // call area(4, 5), store it, and print it\n}\n",
      solution:
        'fn area(w: i32, h: i32) -> i32 {\n    w * h\n}\n\nfn main() {\n    let result = area(4, 5);\n    println!("{}", result);\n}\n',
      checks: [
        { label: "Give your function a return type with ->", kind: "codeContains", value: "->" },
        { label: "Call area(4, 5)", kind: "codeContains", value: "area(4, 5)" },
        { label: "Print the area, which is 20", kind: "stdoutContains", value: "20" },
      ],
      hints: [
        "In area, the body is just w * h with no semicolon — that's the returned value.",
        "In main: let result = area(4, 5); then println!(\"{}\", result);",
        'Full answer: fn area(w: i32, h: i32) -> i32 {\n    w * h\n}\n\nfn main() {\n    let result = area(4, 5);\n    println!("{}", result);\n}',
      ],
      wellDone: "Inputs in, answer out. That's a function earning its keep.",
    },
    {
      id: "rust-struct-impl",
      track: "rust",
      title: "Build your own type",
      subtitle: "Capstone: a struct with a method.",
      concepts: ["struct", "impl", "methods"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "When the built-in types aren't enough" },
        {
          type: "p",
          text: "A struct groups related fields into one custom type. An impl block lets you attach methods — functions that belong to that type. A method takes &self, which is the instance it's called on.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'struct Dog {\n    name: String,\n}\n\nimpl Dog {\n    fn speak(&self) {\n        println!("{} says woof!", self.name);\n    }\n}\n\nfn main() {\n    let d = Dog { name: String::from("Rex") };\n    d.speak();\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "self.name reaches inside the instance to grab its field. You call a method with a dot: d.speak().",
        },
        {
          type: "p",
          text: "Make a Robot struct with a name field and a greet method that prints <name> is online. Build a robot named Skidbot and call greet so it announces itself.",
        },
      ],
      starter:
        'struct Robot {\n    // add a name field of type String\n}\n\nimpl Robot {\n    // add a greet(&self) method that prints "<name> is online"\n}\n\nfn main() {\n    // build a Robot named "Skidbot" and call greet on it\n}\n',
      solution:
        'struct Robot {\n    name: String,\n}\n\nimpl Robot {\n    fn greet(&self) {\n        println!("{} is online", self.name);\n    }\n}\n\nfn main() {\n    let bot = Robot { name: String::from("Skidbot") };\n    bot.greet();\n}\n',
      checks: [
        { label: "Define a struct", kind: "codeContains", value: "struct " },
        { label: "Add an impl block", kind: "codeContains", value: "impl " },
        { label: "Write a method with &self", kind: "codeContains", value: "&self" },
        { label: "Announce that Skidbot is online", kind: "stdoutContains", value: "Skidbot is online" },
      ],
      hints: [
        "Give Robot a field: name: String, and an impl Robot { fn greet(&self) { ... } }.",
        'Inside greet: println!("{} is online", self.name); then in main build Robot { name: String::from("Skidbot") } and call .greet().',
        'Full answer: struct Robot {\n    name: String,\n}\n\nimpl Robot {\n    fn greet(&self) {\n        println!("{} is online", self.name);\n    }\n}\n\nfn main() {\n    let bot = Robot { name: String::from("Skidbot") };\n    bot.greet();\n}',
      ],
      wellDone:
        "You invented a type, gave it a behavior, and brought it to life. That's the heart of Rust — go build the rest.",
    },
  ],
};
