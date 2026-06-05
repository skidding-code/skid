import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "swift-optionals",
  title: "Maybes & Maps",
  glyph: "🎁",
  summary:
    "Some boxes have a gift inside, some are empty — that's an optional. And a dictionary is just a coat-check: hand it a key, get your stuff back. Open boxes safely, look things up, and never crash on a maybe.",
  lessons: [
    {
      id: "swift-optional-iflet",
      track: "swift",
      title: "Maybe a value, maybe nothing",
      subtitle: "Unwrap an optional with if let, with a backup plan.",
      concepts: ["optionals", "if let"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "A box that might be empty" },
        {
          type: "p",
          text: "An optional is a wrapped value that might be there... or might be nothing (nil). Swift writes that maybe with a ? on the type. You can't just use the value directly — first you have to peek inside the box and check it's not empty.",
        },
        {
          type: "p",
          text: "if let does exactly that: it opens the box, and if there's something inside, it hands you the unwrapped value for the lines that follow. If the box is empty, the else runs instead.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let nickname: String? = "Sparky"\n\nif let name = nickname {\n    print("Hello, \\(name)!")\n} else {\n    print("Hello, stranger!")\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "String? means \"a String, or nil\". The ? is the part that says maybe. if let only enters the block when the box actually has something.",
        },
        {
          type: "p",
          text: "Make an optional Int? named score holding 42. Use if let to print Your score is 42 when it has a value, and No score yet otherwise.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'let score: Int? = 42\n\nif let value = score {\n    print("Your score is \\(value)")\n} else {\n    print("No score yet")\n}\n',
      checks: [
        { label: "Mark the value as optional with ?", kind: "codeContains", value: "?" },
        { label: "Unwrap it safely with if let", kind: "codeContains", value: "if let" },
        { label: "Print the unwrapped score", kind: "stdoutContains", value: "Your score is 42" },
      ],
      hints: [
        "Declare the optional by putting ? after the type: let score: Int? = 42.",
        "Open the box with if let value = score { ... } else { ... }.",
        'Inside the if, print using the unwrapped name: print("Your score is \\(value)").',
      ],
      wellDone: "You opened a maybe-box without crashing. That's the whole point of optionals.",
    },
    {
      id: "swift-dict-lookup",
      track: "swift",
      title: "The coat-check counter",
      subtitle: "Look something up in a dictionary by its key.",
      concepts: ["dictionary", "?? default"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Hand it a key, get a value" },
        {
          type: "p",
          text: "A dictionary maps keys to values, like a coat-check: give it a ticket (the key) and it returns your coat (the value). You write the type as [String: Int] — String keys, Int values.",
        },
        {
          type: "p",
          text: "Here's the twist: a lookup might miss, so the result is an optional. If you don't feel like unwrapping, the ?? operator supplies a default when the key isn't found — \"give me the value, or this backup if it's missing.\"",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let prices: [String: Int] = ["coffee": 3, "tea": 2]\n\nlet cost = prices["coffee"] ?? 0\nprint("Coffee costs \\(cost)")',
        },
        {
          type: "callout",
          tone: "note",
          text: "prices[\"coffee\"] is an Int? because the key might not exist. ?? 0 turns that maybe into a definite number by handing you 0 if it's nil.",
        },
        {
          type: "p",
          text: "Build a dictionary ages with \"Ada\": 36 and \"Linus\": 24. Look up \"Ada\" (she's there, so the output is fixed) and print Ada is 36, using if let or ?? so it never crashes.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'let ages: [String: Int] = ["Ada": 36, "Linus": 24]\n\nlet age = ages["Ada"] ?? 0\nprint("Ada is \\(age)")\n',
      checks: [
        { label: "Make a dictionary with [ ]", kind: "codeContains", value: "[" },
        { label: "Provide a default with ??", kind: "codeContains", value: "??" },
        { label: "Print the looked-up age", kind: "stdoutContains", value: "Ada is 36" },
      ],
      hints: [
        'Type the dictionary as [String: Int]: let ages: [String: Int] = ["Ada": 36, "Linus": 24].',
        'Look up a key and fall back with ??: let age = ages["Ada"] ?? 0.',
        'Then print it: print("Ada is \\(age)").',
      ],
      wellDone: "Key in, value out, default ready just in case. You can survive any missing coat-check ticket now.",
    },
    {
      id: "swift-dict-loop",
      track: "swift",
      title: "Take attendance",
      subtitle: "Loop over a collection and print a tidy summary.",
      concepts: ["for-in", "collections"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Walk the whole list, one stop at a time" },
        {
          type: "p",
          text: "Looking things up one by one is fine, but sometimes you want to greet everyone. A for-in loop visits each item in a collection and runs the same lines for each, so you write the summary once and it repeats automatically.",
        },
        {
          type: "p",
          text: "An array keeps its order, which makes the output predictable — first item first, last item last. Perfect for a deterministic little roll call.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let crew = ["Pilot", "Engineer", "Cook"]\n\nfor role in crew {\n    print("On board: \\(role)")\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "for role in crew gives you each element in turn as role. The body runs once per item, top to bottom, in array order.",
        },
        {
          type: "p",
          text: "Make an array fruits = [\"apple\", \"banana\", \"cherry\"]. Loop over it and print a line like I packed apple for each one, in order.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'let fruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits {\n    print("I packed \\(fruit)")\n}\n',
      checks: [
        { label: "Make an array with [ ]", kind: "codeContains", value: "[" },
        { label: "Walk it with a for-in loop", kind: "codeContains", value: "for " },
        { label: "Print the first item", kind: "stdoutContains", value: "I packed apple" },
        { label: "Print the last item", kind: "stdoutContains", value: "I packed cherry" },
      ],
      hints: [
        'Start with the array: let fruits = ["apple", "banana", "cherry"].',
        "Loop with for fruit in fruits { ... }.",
        'Inside the braces, print each one: print("I packed \\(fruit)").',
      ],
      wellDone: "One loop, three lines of output, zero copy-paste. That's how you summarize a whole collection.",
    },
  ],
};
