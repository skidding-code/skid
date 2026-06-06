import type { Chapter } from "../types";

export const ch09: Chapter = {
  id: "rust-closures",
  title: "Closures & Iterators",
  glyph: "🪢",
  summary:
    "Closures are little functions you can carry around in your pocket, and iterators are conveyor belts that let you transform a whole list in one tidy chain. Together they turn loops into something you can read out loud.",
  lessons: [
    {
      id: "rust-closures-store",
      track: "rust",
      title: "A function in your pocket",
      subtitle: "Store a closure in a variable and call it later.",
      concepts: ["closures"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Tiny functions, no name required" },
        {
          type: "p",
          text: "A closure is a function you can stuff into a variable. Instead of fn add_one(x: i32) you write |x| x + 1 — the bars hold the parameters, and whatever comes after is the body. Rust figures out the types from how you use it.",
        },
        {
          type: "p",
          text: "Once it lives in a variable, you call it like any function: with parentheses.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let double = |x| x * 2;\n    println!("{}", double(21));\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The |x| looks like two little walls holding the parameter. Empty bars || mean a closure that takes nothing — same idea, no inputs.",
        },
        {
          type: "p",
          text: "Make a closure named add_one that takes x and returns x + 1. Call it with 41 and print the result. The output should contain 42.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let add_one = |x| x + 1;\n    println!("{}", add_one(41));\n}\n',
      checks: [
        { label: "Use closure bars", kind: "codeContains", value: "|" },
        { label: "Add one inside the closure", kind: "codeContains", value: "x + 1" },
        { label: "Print the called result", kind: "stdoutContains", value: "42" },
      ],
      hints: [
        "A closure stored in a variable looks like let add_one = |x| x + 1;.",
        "Call it just like a function: add_one(41), then print that with println!.",
        'Full answer: fn main() {\n    let add_one = |x| x + 1;\n    println!("{}", add_one(41));\n}',
      ],
      wellDone: "You wrote a function with no name, kept it in your pocket, and pulled it out to do math. Handy.",
    },
    {
      id: "rust-closures-apply",
      track: "rust",
      title: "Hand your closure to someone else",
      subtitle: "Pass a closure into a function with a Fn bound.",
      concepts: ["closures", "generics", "Fn"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Functions that accept functions" },
        {
          type: "p",
          text: "Closures get really fun when you pass them around. A function can accept one as a parameter — but Rust needs to know what shape it has. That's what Fn(i32) -> i32 says: \"give me something callable that takes an i32 and returns an i32.\"",
        },
        {
          type: "p",
          text: "The <F: Fn(i32) -> i32> part is a generic with a rule attached: F can be any type, as long as it's callable in that exact way.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn apply<F: Fn(i32) -> i32>(f: F, n: i32) -> i32 {\n    f(n)\n}\n\nfn main() {\n    let triple = |x| x * 3;\n    println!("{}", apply(triple, 7));\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "The -> i32 arrow shows up twice for a reason: once in the Fn bound (what the closure returns) and once for apply itself (what apply returns). Same arrow, two promises.",
        },
        {
          type: "p",
          text: "Write fn apply<F: Fn(i32) -> i32>(f: F, n: i32) -> i32 that returns f(n). In main, make a closure square that returns x * x, call apply(square, 9), and print the result. The output should contain 81.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn apply<F: Fn(i32) -> i32>(f: F, n: i32) -> i32 {\n    f(n)\n}\n\nfn main() {\n    let square = |x| x * x;\n    println!("{}", apply(square, 9));\n}\n',
      checks: [
        { label: "Use the Fn trait bound", kind: "codeContains", value: "Fn(i32) -> i32" },
        { label: "Functions return with the arrow", kind: "codeContains", value: "->" },
        { label: "Use a closure", kind: "codeContains", value: "|" },
        { label: "Print the applied result", kind: "stdoutContains", value: "81" },
      ],
      hints: [
        "The receiving function needs a generic bound: fn apply<F: Fn(i32) -> i32>(f: F, n: i32) -> i32.",
        "Inside apply, just call the closure: f(n). In main, square is let square = |x| x * x;.",
        'Full answer: fn apply<F: Fn(i32) -> i32>(f: F, n: i32) -> i32 {\n    f(n)\n}\n\nfn main() {\n    let square = |x| x * x;\n    println!("{}", apply(square, 9));\n}',
      ],
      wellDone: "You taught a function to accept other functions. That's the door to a lot of Rust's power.",
    },
    {
      id: "rust-closures-iter-chain",
      track: "rust",
      title: "The conveyor belt: map, filter, sum",
      subtitle: "Transform a whole list in one readable chain.",
      concepts: ["iterators", "map", "filter"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "One chain to rule them all" },
        {
          type: "p",
          text: "An iterator walks through a collection one item at a time, and each link in the chain does one job. .iter() starts the belt, .map(|x| ...) transforms every item, .filter(...) tosses out the ones you don't want, and .sum() adds up what survives.",
        },
        {
          type: "p",
          text: "Each step hands its results to the next, so you read it top to bottom like a sentence: take these numbers, double them, keep the big ones, add them up.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let nums = [1, 2, 3, 4];\n    let total: i32 = nums.iter().map(|x| x + 10).sum();\n    println!("{}", total);\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "In .filter(|x| ...), the closure gets a reference to each item, so you compare with a * to peek inside: *x > 4. The total: i32 annotation tells .sum() what kind of number to build.",
        },
        {
          type: "p",
          text: "Start from [1, 2, 3, 4, 5, 6]. Use .iter() then .map(|x| x * x) to square each, then .filter(|x| *x > 10) to keep only squares above 10, then .sum() into total. Print it. The squares are 1, 4, 9, 16, 25, 36; the ones above 10 are 16, 25, 36, so the output should contain 77.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let nums = [1, 2, 3, 4, 5, 6];\n    let total: i32 = nums.iter().map(|x| x * x).filter(|x| *x > 10).sum();\n    println!("{}", total);\n}\n',
      checks: [
        { label: "Transform with map", kind: "codeContains", value: ".map(" },
        { label: "Keep some with filter", kind: "codeContains", value: ".filter(" },
        { label: "Use a closure", kind: "codeContains", value: "|" },
        { label: "Add them with sum", kind: "codeContains", value: ".sum(" },
        { label: "Print the filtered total", kind: "stdoutContains", value: "77" },
      ],
      hints: [
        "Begin the chain with nums.iter().map(|x| x * x) to square every number.",
        "Add .filter(|x| *x > 10) before .sum(); the * dereferences the reference filter hands you.",
        'Full answer: fn main() {\n    let nums = [1, 2, 3, 4, 5, 6];\n    let total: i32 = nums.iter().map(|x| x * x).filter(|x| *x > 10).sum();\n    println!("{}", total);\n}',
      ],
      wellDone: "You replaced a whole loop with a chain you can read like a sentence. That's idiomatic Rust.",
    },
    {
      id: "rust-closures-fold",
      track: "rust",
      title: "Numbered seats with enumerate and fold",
      subtitle: "Pair items with their index, then squash a list into one value.",
      concepts: ["iterators", "enumerate", "fold"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Two more belt attachments" },
        {
          type: "p",
          text: ".enumerate() clips a counter onto each item, handing you (index, value) pairs — perfect when you care about position. .fold() is the grand squasher: it starts with an accumulator and folds every item into it, one at a time, ending with a single value.",
        },
        {
          type: "p",
          text: "Here we use enumerate to weight each number by its position, then fold to add everything into one running total.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let xs = [10, 20, 30];\n    let total = xs.iter().enumerate().fold(0, |acc, (i, x)| acc + i as i32 * x);\n    println!("{}", total);\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "fold(0, |acc, item| ...) reads as: start at 0, and for each item update the accumulator. The closure here takes two arguments, which is why the bars hold |acc, (i, x)|.",
        },
        {
          type: "p",
          text: "Start from [5, 5, 5, 5]. Use .iter().enumerate() to get (index, value) pairs, then .fold(0, |acc, (i, x)| acc + i as i32 * x) — each value is multiplied by its index. The contributions are 0*5, 1*5, 2*5, 3*5 = 0 + 5 + 10 + 15, so print a total that contains 30.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let xs = [5, 5, 5, 5];\n    let total = xs.iter().enumerate().fold(0, |acc, (i, x)| acc + i as i32 * x);\n    println!("{}", total);\n}\n',
      checks: [
        { label: "Number the items with enumerate", kind: "codeContains", value: ".enumerate()" },
        { label: "Squash with fold", kind: "codeContains", value: ".fold(" },
        { label: "Use a closure with the bars", kind: "codeContains", value: "|" },
        { label: "Print the folded total", kind: "stdoutContains", value: "30" },
      ],
      hints: [
        "Chain .iter().enumerate() so each step gives you an (index, value) pair.",
        "Then .fold(0, |acc, (i, x)| acc + i as i32 * x) starts at 0 and weights each value by its index.",
        'Full answer: fn main() {\n    let xs = [5, 5, 5, 5];\n    let total = xs.iter().enumerate().fold(0, |acc, (i, x)| acc + i as i32 * x);\n    println!("{}", total);\n}',
      ],
      wellDone: "You numbered the seats and folded the whole list into one number. Iterators bow to you now.",
    },
  ],
};
