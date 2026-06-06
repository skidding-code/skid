import type { Chapter } from "../types";

export const ch09: Chapter = {
  id: "swift-errors",
  title: "Error Handling & Enums",
  glyph: "🧯",
  summary:
    "Code fails. Files vanish, numbers refuse to be divided by zero, and someone always types their age as 'banana'. This chapter hands you a fire extinguisher: enums to name the things that can happen, and throwing functions so a failure announces itself loudly instead of silently ruining your afternoon.",
  lessons: [
    {
      id: "swift-enum-associated",
      track: "swift",
      title: "Enums that carry luggage",
      subtitle: "An enum with associated values, unpacked by switch.",
      concepts: ["enum", "associated values", "switch"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "One word, a little baggage attached" },
        {
          type: "p",
          text: "An enum is a fixed menu of named cases — like a traffic light that is only ever .red, .yellow, or .green, never .purple. But cases can also carry extra data along for the ride. .coins(5) is the case .coins, packing the number 5 inside it.",
        },
        {
          type: "p",
          text: "To read that hidden value back out, you switch over the enum and bind it to a name with let. Each case gets its own little branch, and Swift makes you handle them all (or add a default) so nothing slips through.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'enum Reward {\n    case coins(Int)\n    case nothing\n}\n\nlet prize = Reward.coins(5)\nswitch prize {\ncase .coins(let amount):\n    print("You won \\(amount) coins")\ncase .nothing:\n    print("Better luck next time")\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "case .coins(let amount): unpacks the number stored inside that case into a constant called amount. Different cases can carry different things (or nothing at all).",
        },
        {
          type: "p",
          text: "Define an enum Weather with two cases: rainy(Int) (the Int is millimeters of rain) and sunny. Make a value Weather.rainy(12), switch over it, and print Rain: 12mm for the rainy case and Clear skies for sunny.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'enum Weather {\n    case rainy(Int)\n    case sunny\n}\n\nlet today = Weather.rainy(12)\nswitch today {\ncase .rainy(let mm):\n    print("Rain: \\(mm)mm")\ncase .sunny:\n    print("Clear skies")\n}\n',
      checks: [
        { label: "Define an enum", kind: "codeContains", value: "enum Weather" },
        { label: "Switch over the enum", kind: "codeContains", value: "switch today" },
        { label: "Bind the associated value", kind: "codeContains", value: "case .rainy(let" },
        { label: "Print the rainy case with its value", kind: "stdoutContains", value: "Rain: 12mm" },
      ],
      hints: [
        "Declare the cases inside the enum: case rainy(Int) carries a number, case sunny carries nothing.",
        "Make today = Weather.rainy(12), then switch today { ... } with a branch per case.",
        'Unpack the number in the rainy branch: case .rainy(let mm): print("Rain: \\(mm)mm").',
      ],
      wellDone: "Enums with luggage, unpacked by switch — your data finally knows what kind of thing it is.",
    },
    {
      id: "swift-throws-docatch",
      track: "swift",
      title: "Functions that can yell for help",
      subtitle: "Throw a custom error, then catch it with do/try/catch.",
      concepts: ["Error enum", "throws", "do/catch"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "When 'oops' needs to be official" },
        {
          type: "p",
          text: "Some functions can't always succeed. Dividing by zero, parsing nonsense — sometimes the honest answer is 'I can't.' In Swift you say so by marking the function throws and throwing an error when things go sideways. An error is just a value, usually an enum that conforms to Error.",
        },
        {
          type: "p",
          text: "Calling a throwing function is a contract: you wrap it in a do block, prefix the risky call with try, and add catch blocks to handle the explosion. Success runs the do body; a thrown error jumps straight to catch.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'enum MathError: Error {\n    case divideByZero\n}\n\nfunc divide(_ a: Int, by b: Int) throws -> Int {\n    if b == 0 { throw MathError.divideByZero }\n    return a / b\n}\n\ndo {\n    let result = try divide(10, by: 0)\n    print("Got \\(result)")\n} catch {\n    print("Cannot divide by zero")\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "throws goes in the signature; try goes at the call site; do/catch wraps it. A bare catch { } catches everything — the thrown error is available as the constant error if you want it.",
        },
        {
          type: "p",
          text: "Define enum AgeError: Error with a case negative. Write func check(_ age: Int) throws -> String that throws AgeError.negative when age < 0, otherwise returns \"Age \\(age)\". Call try check(-3) inside a do block and catch it, printing Bad age. (Hint: -3 should hit the catch.)",
        },
      ],
      starter:
        "// Define AgeError and check(_:), then call it with do/try/catch\n",
      solution:
        'enum AgeError: Error {\n    case negative\n}\n\nfunc check(_ age: Int) throws -> String {\n    if age < 0 { throw AgeError.negative }\n    return "Age \\(age)"\n}\n\ndo {\n    let msg = try check(-3)\n    print(msg)\n} catch {\n    print("Bad age")\n}\n',
      checks: [
        { label: "Error enum conforms to Error", kind: "codeContains", value: "enum AgeError: Error" },
        { label: "Mark the function throws", kind: "codeContains", value: "throws" },
        { label: "Wrap the call in a do block", kind: "codeContains", value: "do {" },
        { label: "try the risky call", kind: "codeContains", value: "try check(" },
        { label: "catch the error", kind: "codeContains", value: "catch" },
        { label: "The bad age lands in catch", kind: "stdoutContains", value: "Bad age" },
      ],
      hints: [
        "Make the error type first: enum AgeError: Error { case negative }.",
        "In check, guard the input: if age < 0 { throw AgeError.negative }, otherwise return the string.",
        'Call it safely: do { let msg = try check(-3); print(msg) } catch { print("Bad age") } — since -3 throws, only the catch runs.',
      ],
      wellDone: "Thrown, tried, caught. Your code now fails out loud instead of pretending everything's fine.",
    },
    {
      id: "swift-try-optional",
      track: "swift",
      title: "try? — failure, but make it chill",
      subtitle: "Turn a thrown error into a plain nil with try?.",
      concepts: ["try?", "optional"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Sometimes you just want a nil, not a drama" },
        {
          type: "p",
          text: "do/catch is great when you want to react to a failure. But sometimes you don't care why it failed — you just want 'a value if it worked, nothing if it didn't.' That's try?. It runs a throwing call and hands you an optional: the result wrapped in Some on success, or nil if anything was thrown.",
        },
        {
          type: "p",
          text: "Because the result is an optional, you unwrap it the usual ways — ?? for a fallback, or if let to branch. No do block, no catch, no fuss.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'enum ParseError: Error { case bad }\n\nfunc toNumber(_ s: String) throws -> Int {\n    guard let n = Int(s) else { throw ParseError.bad }\n    return n\n}\n\nlet good = try? toNumber("42")   // Optional(42)\nlet bad = try? toNumber("nope")  // nil\nprint("Good: \\(good ?? -1)")\nprint("Bad: \\(bad ?? -1)")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "try? swallows the specific error and gives you nil instead. Pair it with ?? to supply a default in the same breath. Use it when the reason for failure doesn't matter.",
        },
        {
          type: "p",
          text: "Reuse a throwing parser: write enum ParseError: Error { case bad } and func toNumber(_ s: String) throws -> Int that throws on non-numbers. Use try? to parse \"7\" and \"frog\", then print Parsed: 7 and Parsed: -1 (use ?? -1 for the failure).",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'enum ParseError: Error { case bad }\n\nfunc toNumber(_ s: String) throws -> Int {\n    guard let n = Int(s) else { throw ParseError.bad }\n    return n\n}\n\nlet first = try? toNumber("7")\nlet second = try? toNumber("frog")\nprint("Parsed: \\(first ?? -1)")\nprint("Parsed: \\(second ?? -1)")\n',
      checks: [
        { label: "Use try? to get an optional", kind: "codeContains", value: "try? toNumber" },
        { label: "The function still throws", kind: "codeContains", value: "throws" },
        { label: "Successful parse prints the number", kind: "stdoutContains", value: "Parsed: 7" },
        { label: "Failed parse falls back to -1", kind: "stdoutContains", value: "Parsed: -1" },
      ],
      hints: [
        "Keep the throwing function, but call it with try? — that gives back an Int? instead of throwing.",
        'Provide a fallback when you read it: first ?? -1 turns a nil into -1.',
        'print("Parsed: \\(first ?? -1)") for "7" prints 7; the same line for "frog" prints -1.',
      ],
      wellDone: "try? turns a thrown error into a calm little nil — perfect when you only care that it worked.",
    },
    {
      id: "swift-guard-let",
      track: "swift",
      title: "guard let: bounce early, breathe easy",
      subtitle: "Use guard let to exit early and keep the happy path flat.",
      concepts: ["guard let", "early exit"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "The bouncer at the top of your function" },
        {
          type: "p",
          text: "guard let checks a condition and, if it fails, you must leave — return, break, or throw. If it passes, the unwrapped value stays in scope for the rest of the function. The win: you handle the bad case once at the top, then the rest of your code runs on the happy path with no nested if-pyramids.",
        },
        {
          type: "p",
          text: "It reads almost like English: 'guard that we got a real number, else give up.' Unlike if let, the unwrapped value lives on after the guard, not just inside a brace.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'func greet(_ name: String?) -> String {\n    guard let name = name else {\n        return "Hello, stranger"\n    }\n    return "Hello, \\(name)"\n}\n\nprint(greet("Ada"))\nprint(greet(nil))',
        },
        {
          type: "callout",
          tone: "note",
          text: "The else block of a guard MUST exit the current scope (return here). After the guard, name is a non-optional String you can use freely — no extra unwrapping.",
        },
        {
          type: "p",
          text: "Write func firstChar(_ s: String) -> String that uses guard let to grab s.first. If the string is empty, return \"empty\"; otherwise return \"Starts with \\(c)\". Call it with \"Swift\" and \"\" and print Starts with S then empty.",
        },
      ],
      starter:
        "func firstChar(_ s: String) -> String {\n    // Use guard let to grab s.first, else return \"empty\"\n}\n",
      solution:
        'func firstChar(_ s: String) -> String {\n    guard let c = s.first else {\n        return "empty"\n    }\n    return "Starts with \\(c)"\n}\n\nprint(firstChar("Swift"))\nprint(firstChar(""))\n',
      checks: [
        { label: "Use guard let", kind: "codeContains", value: "guard let" },
        { label: "The else exits early", kind: "codeContains", value: "else {" },
        { label: "Non-empty string reports its first char", kind: "stdoutContains", value: "Starts with S" },
        { label: "Empty string takes the early exit", kind: "stdoutContains", value: "empty" },
      ],
      hints: [
        "Unwrap the first character at the top: guard let c = s.first else { ... }.",
        'In the else, bail out immediately: return "empty" — guard requires you to leave.',
        'After the guard, c is a real Character: return "Starts with \\(c)".',
      ],
      wellDone: "Bad case bounced at the door, happy path left flat and clean — guard let is the calmest way to fail fast.",
    },
  ],
};
