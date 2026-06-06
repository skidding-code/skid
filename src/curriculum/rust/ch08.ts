import type { Chapter } from "../types";

export const ch08: Chapter = {
  id: "rust-iterators",
  title: "Collections & Iterators",
  glyph: "🔗",
  summary:
    "A single value is lonely. Real programs juggle whole crowds of data — lists you push onto, maps you look things up in, and iterators that march through it all without you writing a single index. Rust makes that march fast and tidy.",
  lessons: [
    {
      id: "rust-iterators-vec",
      track: "rust",
      title: "Vec: a list that grows",
      subtitle: "push items on, then add them up with .iter().sum().",
      concepts: ["Vec", "push", "sum"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "An array that eats" },
        {
          type: "p",
          text: "An array has a fixed size — decided once, set in stone. A Vec is the array's hungrier cousin: it grows whenever you push something onto it. You start one with vec![] and feed it as you go.",
        },
        {
          type: "p",
          text: "Once it's full of numbers, you can sweep through them with .iter() and total them with .sum(). Rust just needs you to say what kind of number you want back, hence the i32 in let total: i32.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let mut scores = vec![10, 20];\n    scores.push(30);\n    let total: i32 = scores.iter().sum();\n    println!("total: {}", total);\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The vector must be let mut to push onto it — pushing changes it, and Rust wants that in writing. .iter() walks the items; .sum() folds them into one number.",
        },
        {
          type: "p",
          text: 'Make a mutable Vec starting with vec![1, 2], push 3 onto it, then sum it with let total: i32 = nums.iter().sum();. Print sum: <total>. The output should contain sum: 6.',
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let mut nums = vec![1, 2];\n    nums.push(3);\n    let total: i32 = nums.iter().sum();\n    println!("sum: {}", total);\n}\n',
      checks: [
        { label: "Make a Vec with vec!", kind: "codeContains", value: "vec!" },
        { label: "Grow it with push", kind: "codeContains", value: ".push(" },
        { label: "Walk the items with .iter()", kind: "codeContains", value: ".iter()" },
        { label: "Print the total", kind: "stdoutContains", value: "sum: 6" },
      ],
      hints: [
        "Start with let mut nums = vec![1, 2]; then nums.push(3); to grow it.",
        "Total it with let total: i32 = nums.iter().sum(); — the i32 tells Rust what to add up.",
        'Full answer: fn main() {\n    let mut nums = vec![1, 2];\n    nums.push(3);\n    let total: i32 = nums.iter().sum();\n    println!("sum: {}", total);\n}',
      ],
      wellDone: "You grew a list and summed it in one breath. Vectors never saw it coming.",
    },
    {
      id: "rust-iterators-hashmap",
      track: "rust",
      title: "HashMap: the labeled drawer",
      subtitle: "Store values under keys, then fetch them back by name.",
      concepts: ["HashMap", "insert", "get"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Look it up by name" },
        {
          type: "p",
          text: "A Vec finds things by position: item number 3. A HashMap finds things by key: the value labeled \"ferris\". It's a row of labeled drawers — you insert a value under a label, then later you get it back by that same label.",
        },
        {
          type: "p",
          text: "HashMap doesn't ride along for free, so you import it first with use std::collections::HashMap. And .get() is cautious: the key might not exist, so it hands you back an Option you unwrap.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'use std::collections::HashMap;\n\nfn main() {\n    let mut ages = HashMap::new();\n    ages.insert("ferris", 10);\n    let a = ages.get("ferris").unwrap();\n    println!("ferris is {}", a);\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "The map must be let mut to insert into it. .get(\"ferris\") returns an Option (maybe there, maybe not); .unwrap() pulls the value out when you're sure the key exists.",
        },
        {
          type: "p",
          text: 'Import HashMap, make a mutable HashMap::new(), insert "rust" with the value 2015, then get it back and unwrap it. Print born: <value>. The output should contain born: 2015.',
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'use std::collections::HashMap;\n\nfn main() {\n    let mut years = HashMap::new();\n    years.insert("rust", 2015);\n    let y = years.get("rust").unwrap();\n    println!("born: {}", y);\n}\n',
      checks: [
        { label: "Import HashMap", kind: "codeContains", value: "std::collections::HashMap" },
        { label: "Use a HashMap", kind: "codeContains", value: "HashMap" },
        { label: "Insert a key/value", kind: "codeContains", value: ".insert(" },
        { label: "Look it up with get", kind: "codeContains", value: ".get(" },
        { label: "Print the looked-up value", kind: "stdoutContains", value: "born: 2015" },
      ],
      hints: [
        "Put use std::collections::HashMap; at the very top, then let mut years = HashMap::new();.",
        'Insert with years.insert("rust", 2015); and fetch with years.get("rust").unwrap();.',
        'Full answer: use std::collections::HashMap;\n\nfn main() {\n    let mut years = HashMap::new();\n    years.insert("rust", 2015);\n    let y = years.get("rust").unwrap();\n    println!("born: {}", y);\n}',
      ],
      wellDone: "You filed a value under a label and pulled it right back. The drawers are organized.",
    },
    {
      id: "rust-iterators-map-collect",
      track: "rust",
      title: ".map(): transform the whole crowd",
      subtitle: "Run every item through a function and collect the results.",
      concepts: ["iterator", "map", "collect"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Same crowd, new outfits" },
        {
          type: "p",
          text: "Sometimes you want to change every item the same way — double them, square them, add one. Instead of a loop, you hand the iterator a recipe with .map() and it applies that recipe to each item lazily.",
        },
        {
          type: "p",
          text: "Lazily means nothing actually happens until you ask for the results. .collect() is that ask: it gathers everything into a fresh Vec. The ::<Vec<_>> tells Rust \"make me a Vec, you figure out the element type.\"",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let nums = vec![1, 2, 3];\n    let doubled: Vec<i32> = nums.iter().map(|n| n * 2).collect::<Vec<_>>();\n    println!("doubled: {:?}", doubled);\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The |n| n * 2 is a closure — a tiny inline function. {:?} prints a whole Vec in debug form like [2, 4, 6], brackets and all.",
        },
        {
          type: "p",
          text: 'Start with vec![1, 2, 3], map each item to n * 10 with .map(|n| n * 10), and collect it with .collect::<Vec<_>>(). Print tens: {:?} of the result. The output should contain tens: [10, 20, 30].',
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let nums = vec![1, 2, 3];\n    let tens: Vec<i32> = nums.iter().map(|n| n * 10).collect::<Vec<_>>();\n    println!("tens: {:?}", tens);\n}\n',
      checks: [
        { label: "Make a Vec with vec!", kind: "codeContains", value: "vec!" },
        { label: "Walk the items with .iter()", kind: "codeContains", value: ".iter()" },
        { label: "Transform with .map(", kind: "codeContains", value: ".map(" },
        { label: "Gather with .collect", kind: "codeContains", value: ".collect" },
        { label: "Print the mapped Vec", kind: "stdoutContains", value: "tens: [10, 20, 30]" },
      ],
      hints: [
        "Chain it: nums.iter().map(|n| n * 10).collect::<Vec<_>>(). The closure |n| n * 10 runs on each item.",
        "Print a whole Vec with the debug formatter: println!(\"tens: {:?}\", tens);.",
        'Full answer: fn main() {\n    let nums = vec![1, 2, 3];\n    let tens: Vec<i32> = nums.iter().map(|n| n * 10).collect::<Vec<_>>();\n    println!("tens: {:?}", tens);\n}',
      ],
      wellDone: "One .map(), one .collect(), a whole new Vec. You're thinking in pipelines now.",
    },
    {
      id: "rust-iterators-filter-max",
      track: "rust",
      title: ".filter() and .max(): pick the winners",
      subtitle: "Keep only what you want, then find the biggest.",
      concepts: ["filter", "count", "max"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Bouncer and champion" },
        {
          type: "p",
          text: ".filter() is the bouncer at the door: it only lets items through if they pass a test. Pair it with .count() and you get how many made the cut — no manual tally required.",
        },
        {
          type: "p",
          text: ".max() is the other half: it scans the crowd and hands back the biggest. Like .get() earlier, it's cautious — the list could be empty — so it returns an Option you unwrap.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let nums = vec![3, 8, 1, 9, 4];\n    let big = nums.iter().filter(|&&n| n > 4).count();\n    let top = nums.iter().max().unwrap();\n    println!("big: {}, top: {}", big, top);\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "The |&&n| looks odd: .iter() gives references, and the closure dereferences twice so n is a plain number you can compare. .max() returns Option, so unwrap() pulls out the champion.",
        },
        {
          type: "p",
          text: 'Start with vec![3, 8, 1, 9, 4]. Use .iter().filter(|&&n| n > 4).count() to count items over 4, and .iter().max().unwrap() for the biggest. Print over: <count> and biggest: <max>. The output should contain over: 3 and biggest: 9.',
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let nums = vec![3, 8, 1, 9, 4];\n    let over = nums.iter().filter(|&&n| n > 4).count();\n    let biggest = nums.iter().max().unwrap();\n    println!("over: {}", over);\n    println!("biggest: {}", biggest);\n}\n',
      checks: [
        { label: "Make a Vec with vec!", kind: "codeContains", value: "vec!" },
        { label: "Walk the items with .iter()", kind: "codeContains", value: ".iter()" },
        { label: "Keep some with .filter(", kind: "codeContains", value: ".filter(" },
        { label: "Print the filtered count", kind: "stdoutContains", value: "over: 3" },
        { label: "Print the maximum", kind: "stdoutContains", value: "biggest: 9" },
      ],
      hints: [
        "Count survivors with nums.iter().filter(|&&n| n > 4).count(); — the double && unwraps the reference.",
        "Find the biggest with nums.iter().max().unwrap(); since .max() returns an Option.",
        'Full answer: fn main() {\n    let nums = vec![3, 8, 1, 9, 4];\n    let over = nums.iter().filter(|&&n| n > 4).count();\n    let biggest = nums.iter().max().unwrap();\n    println!("over: {}", over);\n    println!("biggest: {}", biggest);\n}',
      ],
      wellDone: "You bounced the small ones and crowned the biggest. Iterators do your counting now.",
    },
  ],
};
