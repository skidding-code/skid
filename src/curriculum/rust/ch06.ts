import type { Chapter } from "../types";

export const ch06: Chapter = {
  id: "rust-result",
  title: "Option & Result",
  glyph: "🎯",
  summary:
    "Two of Rust's most beloved boxes. Option says \"maybe there's something in here.\" Result says \"this either worked, or here's exactly how it broke.\" No silent failures, no mystery nulls — just honest little containers you open by hand.",
  lessons: [
    {
      id: "rust-result-option-match",
      track: "rust",
      title: "Option: Schrödinger's value",
      subtitle: "Some holds a thing; None holds a polite shrug.",
      concepts: ["Option", "match"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Maybe a value, maybe a void" },
        {
          type: "p",
          text: "An Option<T> is a box that is either Some(value) or None. Rust won't let you peek without checking both — which sounds bossy until you remember how many programs have died screaming \"null pointer.\" Here, you open the box with match.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let maybe: Option<i32> = Some(7);\n    match maybe {\n        Some(x) => println!("Got {}", x),\n        None => println!("Empty"),\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Some(x) doesn't just match, it unwraps: inside that arm, x IS the value. None carries nothing, so it gets no parentheses.",
        },
        {
          type: "p",
          text: "Make an Option<i32> set to Some(99) and match it: the Some arm prints Score 99, the None arm prints No score. Your program should print Score 99.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let score: Option<i32> = Some(99);\n    match score {\n        Some(x) => println!("Score {}", x),\n        None => println!("No score"),\n    }\n}\n',
      checks: [
        { label: "Use the Option type", kind: "codeContains", value: "Option" },
        { label: "Wrap a value in Some", kind: "codeContains", value: "Some" },
        { label: "Handle the None case", kind: "codeContains", value: "None" },
        { label: "Open the box with match", kind: "codeContains", value: "match" },
        { label: "Print Score 99", kind: "stdoutContains", value: "Score 99" },
      ],
      hints: [
        "Start with let score: Option<i32> = Some(99); so the box has something in it.",
        "Match it with two arms: Some(x) => ... and None => ..., printing x inside the Some arm.",
        'Full answer: fn main() {\n    let score: Option<i32> = Some(99);\n    match score {\n        Some(x) => println!("Score {}", x),\n        None => println!("No score"),\n    }\n}',
      ],
      wellDone: "You opened the box without summoning a single null pointer. Schrödinger would be proud.",
    },
    {
      id: "rust-result-ok-err",
      track: "rust",
      title: "Result: it worked, or here's why not",
      subtitle: "Ok carries the win; Err carries the bad news.",
      concepts: ["Result", "Ok", "Err"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Two ways things go" },
        {
          type: "p",
          text: "A Result<T, E> is either Ok(value) when things go well or Err(message) when they don't. It's Rust's way of returning bad news without a dramatic crash — the failure is just another value you handle with match.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn checked_halve(n: i32) -> Result<i32, String> {\n    if n % 2 == 0 {\n        Ok(n / 2)\n    } else {\n        Err(String::from("not even"))\n    }\n}\n\nfn main() {\n    match checked_halve(10) {\n        Ok(v) => println!("Half is {}", v),\n        Err(e) => println!("Failed: {}", e),\n    }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "The return type Result<i32, String> means \"success is an i32, failure is a String.\" Both arms of the match are mandatory, so you can never forget the sad path.",
        },
        {
          type: "p",
          text: "Write a function divide(a, b) -> Result<i32, String> that returns Ok(a / b) when b isn't 0, and Err with the message \"divide by zero\" when it is. In main, match divide(20, 4): Ok prints Result 5, Err prints the message. Your program should print Result 5.",
        },
      ],
      starter:
        "fn divide(a: i32, b: i32) -> Result<i32, String> {\n    // Your code here\n}\n\nfn main() {\n    // Your code here\n}\n",
      solution:
        'fn divide(a: i32, b: i32) -> Result<i32, String> {\n    if b == 0 {\n        Err(String::from("divide by zero"))\n    } else {\n        Ok(a / b)\n    }\n}\n\nfn main() {\n    match divide(20, 4) {\n        Ok(v) => println!("Result {}", v),\n        Err(e) => println!("Error: {}", e),\n    }\n}\n',
      checks: [
        { label: "Return a Result type", kind: "codeContains", value: "Result" },
        { label: "Return Ok on success", kind: "codeContains", value: "Ok(" },
        { label: "Return Err on failure", kind: "codeContains", value: "Err(" },
        { label: "Match the outcome", kind: "codeContains", value: "match" },
        { label: "Print Result 5", kind: "stdoutContains", value: "Result 5" },
      ],
      hints: [
        "In divide, check if b == 0 first; if so return Err(String::from(\"divide by zero\")), otherwise Ok(a / b).",
        "In main, match divide(20, 4) { Ok(v) => ..., Err(e) => ... } and print v in the Ok arm.",
        'Full answer: fn divide(a: i32, b: i32) -> Result<i32, String> {\n    if b == 0 {\n        Err(String::from("divide by zero"))\n    } else {\n        Ok(a / b)\n    }\n}\n\nfn main() {\n    match divide(20, 4) {\n        Ok(v) => println!("Result {}", v),\n        Err(e) => println!("Error: {}", e),\n    }\n}',
      ],
      wellDone: "Success and failure, both handled like a pro. Your code fails gracefully, which is more than most of us manage.",
    },
    {
      id: "rust-result-question-mark",
      track: "rust",
      title: "The ? operator: lazy in the best way",
      subtitle: "One little punctuation mark does all the error-checking.",
      concepts: ["?", "Result"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Bubble up the bad news automatically" },
        {
          type: "p",
          text: "Chaining match after match to check every Result gets old fast. The ? operator is the shortcut: stick it after a Result-returning call, and if it's Ok it hands you the value, but if it's Err it instantly returns that error from your function. One character, zero boilerplate.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn parse_two(a: &str, b: &str) -> Result<i32, String> {\n    let x: i32 = a.parse().map_err(|_| String::from("bad a"))?;\n    let y: i32 = b.parse().map_err(|_| String::from("bad b"))?;\n    Ok(x + y)\n}\n\nfn main() {\n    match parse_two("3", "4") {\n        Ok(sum) => println!("Sum {}", sum),\n        Err(e) => println!("Oops: {}", e),\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "? only works inside a function that itself returns Result (or Option). It's the function quietly saying \"if this broke, I'm out, and I'm taking the error with me.\"",
        },
        {
          type: "p",
          text: "Write a helper add_strings(a, b) -> Result<i32, String> that parses both strings to i32 using ? (map the parse error to a String), then returns Ok of their sum. In main, match add_strings(\"10\", \"5\") and print Total 15 on Ok. Your program should print Total 15.",
        },
      ],
      starter:
        "fn add_strings(a: &str, b: &str) -> Result<i32, String> {\n    // Your code here\n}\n\nfn main() {\n    // Your code here\n}\n",
      solution:
        'fn add_strings(a: &str, b: &str) -> Result<i32, String> {\n    let x: i32 = a.parse().map_err(|_| String::from("bad number"))?;\n    let y: i32 = b.parse().map_err(|_| String::from("bad number"))?;\n    Ok(x + y)\n}\n\nfn main() {\n    match add_strings("10", "5") {\n        Ok(total) => println!("Total {}", total),\n        Err(e) => println!("Error: {}", e),\n    }\n}\n',
      checks: [
        { label: "Use the ? operator", kind: "codeContains", value: "?" },
        { label: "Helper returns a Result", kind: "codeContains", value: "Result" },
        { label: "Return Ok with the sum", kind: "codeContains", value: "Ok(" },
        { label: "Match the result in main", kind: "codeContains", value: "match" },
        { label: "Print Total 15", kind: "stdoutContains", value: "Total 15" },
      ],
      hints: [
        "Parse each string like let x: i32 = a.parse().map_err(|_| String::from(\"bad number\"))?; so a failure bubbles up.",
        "After both parses succeed, finish the helper with Ok(x + y).",
        'Full answer: fn add_strings(a: &str, b: &str) -> Result<i32, String> {\n    let x: i32 = a.parse().map_err(|_| String::from("bad number"))?;\n    let y: i32 = b.parse().map_err(|_| String::from("bad number"))?;\n    Ok(x + y)\n}\n\nfn main() {\n    match add_strings("10", "5") {\n        Ok(total) => println!("Total {}", total),\n        Err(e) => println!("Error: {}", e),\n    }\n}',
      ],
      wellDone: "One question mark replaced a whole staircase of error checks. That's the laziness that powers great engineering.",
    },
    {
      id: "rust-result-unwrap-or",
      track: "rust",
      title: "unwrap_or & if let: the easygoing duo",
      subtitle: "Pick a fallback, or peek at just the case you care about.",
      concepts: ["unwrap_or", "if let"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Sometimes match is overkill" },
        {
          type: "p",
          text: "Not every Option deserves a full match. unwrap_or(default) says \"give me the value, or this fallback if it's None.\" And if let lets you handle just the one case you care about and ignore the rest — a match with the boring arms trimmed off.",
        },
        {
          type: "code",
          lang: "rust",
          text:
            'fn main() {\n    let missing: Option<i32> = None;\n    let n = missing.unwrap_or(0);\n    println!("Value {}", n);\n\n    let present: Option<i32> = Some(5);\n    if let Some(x) = present {\n        println!("Found {}", x);\n    }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "unwrap_or never panics — that's its whole charm. (Plain unwrap() WILL crash on None, so save it for when you're truly certain.)",
        },
        {
          type: "p",
          text: "Take let maybe: Option<i32> = None; and use unwrap_or(7) to get a value, printing Default 7. Then with let lucky: Option<i32> = Some(13); use if let Some(x) to print Lucky 13. Your program should print Default 7 and Lucky 13.",
        },
      ],
      starter: "fn main() {\n    // Your code here\n}\n",
      solution:
        'fn main() {\n    let maybe: Option<i32> = None;\n    let value = maybe.unwrap_or(7);\n    println!("Default {}", value);\n\n    let lucky: Option<i32> = Some(13);\n    if let Some(x) = lucky {\n        println!("Lucky {}", x);\n    }\n}\n',
      checks: [
        { label: "Use the Option type", kind: "codeContains", value: "Option" },
        { label: "Fall back with unwrap_or", kind: "codeContains", value: "unwrap_or" },
        { label: "Peek with if let", kind: "codeContains", value: "if let" },
        { label: "Print the fallback", kind: "stdoutContains", value: "Default 7" },
        { label: "Print the matched value", kind: "stdoutContains", value: "Lucky 13" },
      ],
      hints: [
        "For the None case: let value = maybe.unwrap_or(7); then println!(\"Default {}\", value);.",
        "For the Some case: if let Some(x) = lucky { println!(\"Lucky {}\", x); }.",
        'Full answer: fn main() {\n    let maybe: Option<i32> = None;\n    let value = maybe.unwrap_or(7);\n    println!("Default {}", value);\n\n    let lucky: Option<i32> = Some(13);\n    if let Some(x) = lucky {\n        println!("Lucky {}", x);\n    }\n}',
      ],
      wellDone: "Fallbacks and one-armed matches — you've got the lightweight tools to handle maybes without breaking a sweat.",
    },
  ],
};
