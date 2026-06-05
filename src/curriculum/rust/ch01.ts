import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "rust-basics",
  title: "Hello, Rust",
  glyph: "🦀",
  summary:
    "Meet the crab. Printing text, holding values in variables, and slotting them into your output — no borrow checker tears yet.",
  lessons: [
    {
      id: "rust-hello",
      track: "rust",
      title: "Greet the crab",
      subtitle: "Your first println! and the famous fn main.",
      concepts: ["println!", "strings"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Every Rust program starts at main" },
        {
          type: "p",
          text: "When Rust runs your program, it looks for one special door labelled fn main and walks through it. Everything you want to happen goes between its curly braces.",
        },
        {
          type: "p",
          text: "To print text you call println!, with text in quotes inside the parentheses. The exclamation mark means it is a macro — Rust's way of saying this is a slightly magical built-in. Don't overthink the bang; just don't forget it.",
        },
        { type: "code", lang: "rust", text: 'fn main() {\n    println!("Hi there!");\n}' },
        {
          type: "callout",
          tone: "tip",
          text: "Lines inside main end with a semicolon. Rust is picky about it, like a friend who really wants you to use a coaster.",
        },
        {
          type: "p",
          text: "Your turn: make the program print the words Hello, Rust! exactly.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution: 'fn main() {\n    println!("Hello, Rust!");\n}\n',
      checks: [
        { label: "Use the println! macro", kind: "codeContains", value: "println!" },
        { label: "Print the text Hello, Rust!", kind: "stdoutContains", value: "Hello, Rust!" },
      ],
      hints: [
        "Write your code between the curly braces of fn main.",
        "Call println! with your message in quotes, and don't forget the semicolon.",
        'The full line is: println!("Hello, Rust!");',
      ],
      wellDone: "First line of Rust, shipped. The crab approves.",
    },
    {
      id: "rust-variables",
      track: "rust",
      title: "Boxes that (sometimes) change",
      subtitle: "let is locked, let mut can be edited.",
      concepts: ["let", "let mut"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "let names a value" },
        {
          type: "p",
          text: "A variable is a name for a value. You make one with let. By default a Rust variable is immutable — once you set it, it stays put. Try to change a plain let and Rust politely refuses to compile.",
        },
        {
          type: "p",
          text: "Want something you can update later? Add mut (short for mutable). A let mut variable can be reassigned as many times as you like.",
        },
        {
          type: "code",
          lang: "rust",
          text: 'fn main() {\n    let name = "Ferris";\n    let mut mood = "sleepy";\n    println!("{}", name);\n    println!("{}", mood);\n    mood = "excited";\n    println!("{}", mood);\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "Immutable-by-default is one of Rust's favourite safety tricks: things don't change behind your back unless you said they could.",
        },
        {
          type: "p",
          text: "Make an immutable variable and a mut one, print both, then change the mut one and print it again.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let pet = "crab";\n    let mut count = "one";\n    println!("{}", pet);\n    println!("{}", count);\n    count = "two";\n    println!("{}", count);\n}\n',
      checks: [
        { label: "Make an immutable variable with let", kind: "codeContains", value: "let " },
        { label: "Make a mutable variable with let mut", kind: "codeContains", value: "let mut" },
        { label: "Use a {} hole to print", kind: "codeContains", value: "{}" },
        { label: "Show the changed value (two)", kind: "stdoutContains", value: "two" },
      ],
      hints: [
        "Start with let for the locked value and let mut for the one you'll edit.",
        "Print each with println!(\"{}\", name); then reassign the mut one without let.",
        'For example: let mut count = "one"; ... count = "two"; println!("{}", count);',
      ],
      wellDone: "You taught Rust which values are set in stone and which can grow. Mutiny avoided.",
    },
    {
      id: "rust-holes",
      track: "rust",
      title: "Fill in the blanks",
      subtitle: "Drop values into {} holes.",
      concepts: ["println!", "formatting"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Each {} grabs the next value" },
        {
          type: "p",
          text: "You don't have to glue text and values together by hand. Put {} holes in your string, then list the values after a comma — Rust fills the first hole with the first value, the second with the second, and so on.",
        },
        {
          type: "code",
          lang: "rust",
          text: 'fn main() {\n    let name = "Ferris";\n    let age = 7;\n    println!("{} is {}", name, age);\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Holes and values line up like socks and feet: one value per {}, in order. Too few values and Rust won't compile.",
        },
        {
          type: "p",
          text: "Make a name variable and an age number, then print a sentence using two {} holes — for example: Ada is 30.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let name = "Ada";\n    let age = 30;\n    println!("{} is {}", name, age);\n}\n',
      checks: [
        { label: "Use the println! macro", kind: "codeContains", value: "println!" },
        { label: "Store a value with let", kind: "codeContains", value: "let " },
        { label: "Use {} holes in the string", kind: "codeContains", value: "{}" },
        { label: "Print the name and age together", kind: "stdoutMatches", value: "Ada[\\s\\S]*30" },
      ],
      hints: [
        "Make two variables first: a name string and an age number.",
        'Put two {} holes in your text, then list the variables after a comma.',
        'Like this: println!("{} is {}", name, age);',
      ],
      wellDone: "Now your output speaks in variables, not hard-coded text. That scales.",
    },
  ],
};
