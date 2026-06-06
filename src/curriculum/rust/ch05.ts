import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "rust-ownership",
  title: "Ownership & Borrowing",
  glyph: "🔑",
  summary:
    "Rust's headline trick: every value has exactly one owner, and Rust tracks who's holding it at all times. It sounds strict, but it's just a librarian making sure nobody walks off with the only copy of a book.",
  lessons: [
    {
      id: "rust-ownership-move",
      track: "rust",
      title: "Move it or lose it",
      subtitle: "Hand off a String, and you no longer own it.",
      concepts: ["ownership", "move"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "One owner at a time" },
        {
          type: "p",
          text: "When you pass a String into a function, Rust doesn't copy it — it moves it. The function becomes the new owner, and your old variable is left holding nothing. It's like lending your only pen: until you get it back, you can't write with it.",
        },
        {
          type: "p",
          text: "The fix is just as simple: a function can take ownership and then return it, handing the pen back when it's done.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn shout(s: String) -> String {\n    println!("inside: {}", s);\n    s\n}\n\nfn main() {\n    let msg = String::from("hello");\n    let msg = shout(msg);\n    println!("back: {}", msg);\n}',
        },
        {
          type: "callout",
          tone: "warn",
          text: "If shout did NOT return s, the line after the call would fail to compile — msg would have been moved away and gone for good. Returning it hands ownership back.",
        },
        {
          type: "p",
          text: "Write a function keep(s: String) -> String that prints holding: <s> and returns s. In main, make a String \"treasure\", pass it to keep, catch the result back into a variable, and print returned: <it>. The output should contain returned: treasure.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn keep(s: String) -> String {\n    println!("holding: {}", s);\n    s\n}\n\nfn main() {\n    let item = String::from("treasure");\n    let item = keep(item);\n    println!("returned: {}", item);\n}\n',
      checks: [
        { label: "Define a function", kind: "codeContains", value: "fn " },
        { label: "Return the String to hand ownership back", kind: "codeContains", value: "-> String" },
        { label: "Print the returned value", kind: "stdoutContains", value: "returned: treasure" },
      ],
      hints: [
        "A function that takes ownership and gives it back looks like fn keep(s: String) -> String { ... s }.",
        "The last line of the function is just s (no semicolon) — that returns ownership of the String.",
        'Full answer: fn keep(s: String) -> String {\n    println!("holding: {}", s);\n    s\n}\n\nfn main() {\n    let item = String::from("treasure");\n    let item = keep(item);\n    println!("returned: {}", item);\n}',
      ],
      wellDone: "You moved a String out and caught it on the way back. Smooth handoff, no fumbles.",
    },
    {
      id: "rust-ownership-borrow",
      track: "rust",
      title: "Borrow with &, don't steal",
      subtitle: "Pass a reference and you keep your value.",
      concepts: ["borrowing", "references"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Look, but don't take" },
        {
          type: "p",
          text: "Returning your value every time gets tiring. So Rust lets you borrow instead: put an & in front and you pass a reference — the function gets to peek at the value without owning it. When the function returns, you still have your value, untouched.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn measure(s: &String) -> usize {\n    s.len()\n}\n\nfn main() {\n    let name = String::from("ferris");\n    let n = measure(&name);\n    println!("{} has {} letters", name, n);\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The & means \"a reference to,\" both where you call (&name) and in the type (&String). Because measure only borrows, name is still yours to use on the very next line.",
        },
        {
          type: "p",
          text: "Write a function first_char(s: &String) -> char that returns the first character (use s.chars().next().unwrap()). In main, make a String \"rocket\", borrow it into the function, and print first: <char> then full: <the original string>. Output should contain first: r and full: rocket.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn first_char(s: &String) -> char {\n    s.chars().next().unwrap()\n}\n\nfn main() {\n    let word = String::from("rocket");\n    let c = first_char(&word);\n    println!("first: {}", c);\n    println!("full: {}", word);\n}\n',
      checks: [
        { label: "Borrow with a reference", kind: "codeContains", value: "&" },
        { label: "Define a function", kind: "codeContains", value: "fn " },
        { label: "Print the first character", kind: "stdoutContains", value: "first: r" },
        { label: "Original String is still usable", kind: "stdoutContains", value: "full: rocket" },
      ],
      hints: [
        "Take the parameter as a reference: fn first_char(s: &String) -> char, and call it with first_char(&word).",
        "Grab the first char with s.chars().next().unwrap().",
        'Full answer: fn first_char(s: &String) -> char {\n    s.chars().next().unwrap()\n}\n\nfn main() {\n    let word = String::from("rocket");\n    let c = first_char(&word);\n    println!("first: {}", c);\n    println!("full: {}", word);\n}',
      ],
      wellDone: "You lent your String, got a peek back, and kept the original. That's borrowing done right.",
    },
    {
      id: "rust-ownership-mut-borrow",
      track: "rust",
      title: "&mut: borrow and rearrange the furniture",
      subtitle: "A mutable reference lets a function change your value.",
      concepts: ["mutable references", "&mut"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Borrowing with edit rights" },
        {
          type: "p",
          text: "A plain & lets a function look. A &mut lets it reach in and change things. The value stays yours — you just handed over a reference with editing permission. Two rules of the house: the value must be mut, and you can only hand out one &mut at a time (no fighting over the remote).",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn add_bang(s: &mut String) {\n    s.push(\'!\');\n}\n\nfn main() {\n    let mut shout = String::from("wow");\n    add_bang(&mut shout);\n    println!("{}", shout);\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "Notice the matching mut everywhere: let mut shout, the &mut shout at the call, and &mut String in the parameter. Drop any one of them and Rust refuses to compile.",
        },
        {
          type: "p",
          text: "Write a function grow(s: &mut String) that pushes the string \" rust\" onto s using s.push_str(\" rust\"). In main, make a mutable String \"i love\", pass a mutable borrow to grow, then print it. Output should contain i love rust.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn grow(s: &mut String) {\n    s.push_str(" rust");\n}\n\nfn main() {\n    let mut phrase = String::from("i love");\n    grow(&mut phrase);\n    println!("{}", phrase);\n}\n',
      checks: [
        { label: "Use mut", kind: "codeContains", value: "mut" },
        { label: "Take a mutable reference", kind: "codeContains", value: "&mut" },
        { label: "Define a function", kind: "codeContains", value: "fn " },
        { label: "Print the grown string", kind: "stdoutContains", value: "i love rust" },
      ],
      hints: [
        "Declare the variable as let mut phrase = ... and take the parameter as s: &mut String.",
        "Call it as grow(&mut phrase); and inside use s.push_str(\" rust\");.",
        'Full answer: fn grow(s: &mut String) {\n    s.push_str(" rust");\n}\n\nfn main() {\n    let mut phrase = String::from("i love");\n    grow(&mut phrase);\n    println!("{}", phrase);\n}',
      ],
      wellDone: "You handed out edit rights, the function rearranged your String, and you kept ownership the whole time.",
    },
    {
      id: "rust-ownership-combo",
      track: "rust",
      title: "Capstone: the whole pen-lending saga",
      subtitle: "Move, borrow, and mutably borrow — all in one program.",
      concepts: ["ownership", "borrowing", "&mut"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "All three moves in one breath" },
        {
          type: "p",
          text: "Time to put the trio together. One function borrows to read, another borrows mutably to change, and ownership stays put in main the whole time. Watch how & and &mut let you share a value around without ever giving it away.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn length(s: &String) -> usize {\n    s.len()\n}\n\nfn upper_bang(s: &mut String) {\n    s.push(\'!\');\n}\n\nfn main() {\n    let mut note = String::from("hi");\n    println!("len before: {}", length(&note));\n    upper_bang(&mut note);\n    println!("after: {}", note);\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "length(&note) borrows to read; upper_bang(&mut note) borrows to write. After both, note is still owned by main — borrowing always gives the value back.",
        },
        {
          type: "p",
          text: "Build a program with two functions: count(s: &String) -> usize returns s.len(), and excite(s: &mut String) does s.push_str(\"!!!\"). In main, make a mutable String \"go\", print size: <count of it>, call excite on a mutable borrow, then print final: <the string>. Output should contain size: 2 and final: go!!!.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn count(s: &String) -> usize {\n    s.len()\n}\n\nfn excite(s: &mut String) {\n    s.push_str("!!!");\n}\n\nfn main() {\n    let mut word = String::from("go");\n    println!("size: {}", count(&word));\n    excite(&mut word);\n    println!("final: {}", word);\n}\n',
      checks: [
        { label: "Borrow somewhere with &", kind: "codeContains", value: "&" },
        { label: "Mutably borrow with &mut", kind: "codeContains", value: "&mut" },
        { label: "Use mut", kind: "codeContains", value: "mut" },
        { label: "Define functions", kind: "codeContains", value: "fn " },
        { label: "Print the borrowed length", kind: "stdoutContains", value: "size: 2" },
        { label: "Print the mutated string", kind: "stdoutContains", value: "final: go!!!" },
      ],
      hints: [
        "You need two functions: count(s: &String) -> usize and excite(s: &mut String).",
        "In main, the variable must be let mut word; pass &word to count and &mut word to excite.",
        'Full answer: fn count(s: &String) -> usize {\n    s.len()\n}\n\nfn excite(s: &mut String) {\n    s.push_str("!!!");\n}\n\nfn main() {\n    let mut word = String::from("go");\n    println!("size: {}", count(&word));\n    excite(&mut word);\n    println!("final: {}", word);\n}',
      ],
      wellDone: "Move, borrow, mutate — you ran the whole ownership playbook and nothing leaked. Rust is proud.",
    },
  ],
};
