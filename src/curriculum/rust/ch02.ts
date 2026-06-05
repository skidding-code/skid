import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "rust-control",
  title: "Choices & Loops",
  glyph: "🔀",
  summary:
    "Teach your program to make up its mind and to repeat itself without complaining. Branches, loops, and a growable list.",
  lessons: [
    {
      id: "rust-if-else",
      track: "rust",
      title: "Make a decision",
      subtitle: "if/else: the computer's tiny crossroads.",
      concepts: ["if/else", "comparison"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Should I, or should I not?" },
        {
          type: "p",
          text: "Programs constantly hit forks in the road. if checks whether something is true and runs one block; else handles everything else. No drama, no maybe — one path or the other.",
        },
        {
          type: "code",
          lang: "rust",
          text: 'fn main() {\n    let temp = 30;\n    if temp > 25 {\n        println!("Toasty");\n    } else {\n        println!("Bring a jacket");\n    }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "Notice Rust does not need parentheses around the condition, but the { } braces are required.",
        },
        {
          type: "p",
          text: 'Make a number called score set to 80. If it is 60 or more, print "You passed!", otherwise print "Try again".',
        },
      ],
      starter: "fn main() {\n    // Define score, then decide what to print\n}\n",
      solution:
        'fn main() {\n    let score = 80;\n    if score >= 60 {\n        println!("You passed!");\n    } else {\n        println!("Try again");\n    }\n}\n',
      checks: [
        { label: "Use an if to make the decision", kind: "codeContains", value: "if " },
        { label: 'Print "You passed!" for score 80', kind: "stdoutContains", value: "You passed!" },
      ],
      hints: [
        "Start with let score = 80; so there's a number to test.",
        "Write if score >= 60 { ... } else { ... } with a println! inside each.",
        'Inside the if: println!("You passed!"); inside the else: println!("Try again");',
      ],
      wellDone: "Your program can now think for itself — at least a little.",
    },
    {
      id: "rust-for-range",
      track: "rust",
      title: "Loop the loop",
      subtitle: "Count to five without typing five lines.",
      concepts: ["for loop", "ranges"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Let the computer do the boring part" },
        {
          type: "p",
          text: "Copy-pasting the same println! over and over is a crime against keyboards. A for loop repeats a block, and a range like 1..=5 hands it the numbers 1, 2, 3, 4, 5 one at a time.",
        },
        {
          type: "code",
          lang: "rust",
          text: 'fn main() {\n    for n in 1..=3 {\n        println!("Beep {}", n);\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "1..=5 includes 5. The plain 1..5 stops at 4 — the = means \"up to and including\".",
        },
        {
          type: "p",
          text: 'Loop i from 1 to 5 (inclusive) and print "Step 1", "Step 2", and so on through "Step 5".',
        },
      ],
      starter: "fn main() {\n    // Loop i from 1 to 5 and print each step\n}\n",
      solution:
        'fn main() {\n    for i in 1..=5 {\n        println!("Step {}", i);\n    }\n}\n',
      checks: [
        { label: "Use a for loop", kind: "codeContains", value: "for " },
        { label: "Loop over each item with in", kind: "codeContains", value: "in " },
        { label: "Print the first step", kind: "stdoutContains", value: "Step 1" },
        { label: "Print the last step", kind: "stdoutContains", value: "Step 5" },
        {
          label: "Steps print in order",
          kind: "stdoutMatches",
          value: "Step 1[\\s\\S]*Step 5",
        },
      ],
      hints: [
        "The shape is: for i in 1..=5 { ... }.",
        'Inside the loop, use println! with a {} hole: println!("Step {}", i);',
        'Full body: for i in 1..=5 {\n        println!("Step {}", i);\n    }',
      ],
      wellDone: "Five lines of output, one tiny loop. That's leverage.",
    },
    {
      id: "rust-vector",
      track: "rust",
      title: "A list that grows",
      subtitle: "Vectors: push stuff in, then walk through it.",
      concepts: ["vectors", "for loop"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "When one variable isn't enough" },
        {
          type: "p",
          text: "A vector is a list that can grow. Make one with vec![...], add to the end with .push(...), and ask how many items it holds with .len(). Mark it mut because it's going to change.",
        },
        {
          type: "code",
          lang: "rust",
          text: 'fn main() {\n    let mut pets = vec!["cat", "dog"];\n    pets.push("fish");\n    println!("{}", pets.len());\n    for p in &pets {\n        println!("{}", p);\n    }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "The & in for p in &pets means \"borrow\" the vector — loop over it without taking it away, so you can still use it afterward.",
        },
        {
          type: "p",
          text: 'Make a mutable vector with "Earth" and "Mars", push "Venus", print how many planets there are, then print each one on its own line.',
        },
      ],
      starter:
        "fn main() {\n    // Make a vector, push a third item, print the count, then each item\n}\n",
      solution:
        'fn main() {\n    let mut planets = vec!["Earth", "Mars"];\n    planets.push("Venus");\n    println!("{}", planets.len());\n    for x in &planets {\n        println!("{}", x);\n    }\n}\n',
      checks: [
        { label: "Create a vector with vec!", kind: "codeContains", value: "vec!" },
        { label: "Add an item with .push(", kind: "codeContains", value: ".push(" },
        { label: "Ask for the length with .len()", kind: "codeContains", value: ".len()" },
        { label: "Walk through it with a for loop", kind: "codeContains", value: "for " },
        { label: "Borrow each item with in", kind: "codeContains", value: "in " },
        { label: "Print the count of 3 planets", kind: "stdoutContains", value: "3" },
        { label: "Print Earth", kind: "stdoutContains", value: "Earth" },
        { label: "Print the pushed planet Venus", kind: "stdoutContains", value: "Venus" },
      ],
      hints: [
        'Start with let mut planets = vec!["Earth", "Mars"]; then planets.push("Venus");',
        'Print the count with println!("{}", planets.len());',
        'Loop with for x in &planets {\n        println!("{}", x);\n    }',
      ],
      wellDone: "Vectors plus loops is most of real programming. You've got the core moves now.",
    },
  ],
};
