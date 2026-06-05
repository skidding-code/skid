import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "rust-match",
  title: "Match & Maybe",
  glyph: "🧭",
  summary:
    "match is Rust's overachieving cousin of the if/else chain — it checks every case and won't let you forget one. Plus Option, Rust's polite way of saying \"there might be nothing here, brace yourself.\"",
  lessons: [
    {
      id: "rust-match-number",
      track: "rust",
      title: "match: the ultimate sorting hat",
      subtitle: "One value in, the right branch out.",
      concepts: ["match", "patterns"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Pick a branch, any branch" },
        {
          type: "p",
          text: "A match expression looks at a value and runs the first arm whose pattern fits. Each arm is pattern => code. It reads like a stack of polite little doors: knock on each, take the one that opens.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let n = 2;\n    match n {\n        1 => println!("one"),\n        2 => println!("two"),\n        _ => println!("lots"),\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The _ arm is the catch-all — \"anything else lands here.\" Rust insists match covers every possibility, and _ is how you promise it does.",
        },
        {
          type: "p",
          text: "Match the number 3 to a word: 1 prints one, 2 prints two, 3 prints three, and anything else prints many. With n = 3, your program should print three.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let n = 3;\n    match n {\n        1 => println!("one"),\n        2 => println!("two"),\n        3 => println!("three"),\n        _ => println!("many"),\n    }\n}\n',
      checks: [
        { label: "Use a match expression", kind: "codeContains", value: "match" },
        { label: "Write at least one arm with =>", kind: "codeContains", value: "=>" },
        { label: "Include a _ catch-all arm", kind: "codeContains", value: "_ =>" },
        { label: "Print three for n = 3", kind: "stdoutContains", value: "three" },
      ],
      hints: [
        "Start with let n = 3; then match n { ... } with one arm per number.",
        "Each arm is a pattern, then =>, then the code, e.g. 3 => println!(\"three\"),.",
        'Full answer: fn main() {\n    let n = 3;\n    match n {\n        1 => println!("one"),\n        2 => println!("two"),\n        3 => println!("three"),\n        _ => println!("many"),\n    }\n}',
      ],
      wellDone: "You just taught Rust to sort numbers into cubbyholes. The sorting hat is jealous.",
    },
    {
      id: "rust-option-some-none",
      track: "rust",
      title: "Option: maybe a value, maybe not",
      subtitle: "Some holds a thing; None holds a shrug.",
      concepts: ["Option", "Some", "None"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Rust's honest \"I dunno\"" },
        {
          type: "p",
          text: "Some languages let a value secretly be null and surprise you later. Rust makes the maybe-ness official with Option: a value is either Some(x) (here's a thing!) or None (nothing here). To use it, you match both cases — no surprises allowed.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let maybe: Option<i32> = Some(7);\n    match maybe {\n        Some(x) => println!("Got {}", x),\n        None => println!("Empty"),\n    }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "Some(x) doesn't just match — it unwraps. The x is now the value tucked inside, ready to use in that arm. None has nothing to unwrap, so it takes no parentheses.",
        },
        {
          type: "p",
          text: "Make an Option<i32> set to Some(42) and match it: the Some arm prints Found 42, the None arm prints Nothing. Your program should print Found 42.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let value: Option<i32> = Some(42);\n    match value {\n        Some(x) => println!("Found {}", x),\n        None => println!("Nothing"),\n    }\n}\n',
      checks: [
        { label: "Wrap a value in Some", kind: "codeContains", value: "Some" },
        { label: "Handle the None case", kind: "codeContains", value: "None" },
        { label: "Match on your Option", kind: "codeContains", value: "match" },
        { label: "Print Found 42", kind: "stdoutContains", value: "Found 42" },
      ],
      hints: [
        "Declare let value: Option<i32> = Some(42); to start with a value present.",
        "Match it with two arms: Some(x) => ... and None => ..., printing the x inside Some.",
        'Full answer: fn main() {\n    let value: Option<i32> = Some(42);\n    match value {\n        Some(x) => println!("Found {}", x),\n        None => println!("Nothing"),\n    }\n}',
      ],
      wellDone: "You handled the \"maybe nothing\" case without a single crash. Null pointers, eat your heart out.",
    },
    {
      id: "rust-enum-match",
      track: "rust",
      title: "Your own enum at the crossroads",
      subtitle: "Capstone: define an enum, then match it.",
      concepts: ["enum", "match"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Build the choices, then choose" },
        {
          type: "p",
          text: "An enum is a type with a fixed set of named options — exactly the right tool when a value can only be one of a few things. Pair it with match and Rust will nag you until you've handled every variant. Annoying? No. It's your friend who double-checks you locked the door.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'enum Coin {\n    Heads,\n    Tails,\n}\n\nfn main() {\n    let flip = Coin::Heads;\n    match flip {\n        Coin::Heads => println!("Win"),\n        Coin::Tails => println!("Lose"),\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "You reach a variant through its type with double colons: Coin::Heads. No _ catch-all needed here — once every variant has an arm, match is satisfied.",
        },
        {
          type: "p",
          text: "Define enum Light { Red, Yellow, Green }, set a light to Green, then match it: Red prints Stop, Yellow prints Slow, Green prints Go. Your program should print Go.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'enum Light {\n    Red,\n    Yellow,\n    Green,\n}\n\nfn main() {\n    let light = Light::Green;\n    match light {\n        Light::Red => println!("Stop"),\n        Light::Yellow => println!("Slow"),\n        Light::Green => println!("Go"),\n    }\n}\n',
      checks: [
        { label: "Define an enum", kind: "codeContains", value: "enum " },
        { label: "Match on your enum", kind: "codeContains", value: "match" },
        { label: "Write arms with =>", kind: "codeContains", value: "=>" },
        { label: "Print Go for a green light", kind: "stdoutContains", value: "Go" },
      ],
      hints: [
        "Above main, write enum Light { Red, Yellow, Green } to list the three options.",
        "Set let light = Light::Green; then match light with an arm per variant like Light::Green => println!(\"Go\"),.",
        'Full answer: enum Light {\n    Red,\n    Yellow,\n    Green,\n}\n\nfn main() {\n    let light = Light::Green;\n    match light {\n        Light::Red => println!("Stop"),\n        Light::Yellow => println!("Slow"),\n        Light::Green => println!("Go"),\n    }\n}',
      ],
      wellDone:
        "You invented a type, listed its choices, and matched every one. That's pattern matching firing on all cylinders.",
    },
  ],
};
