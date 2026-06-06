import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "swift-collections",
  title: "Collections Deep",
  glyph: "🗂️",
  summary:
    "Past plain arrays lies a whole filing cabinet: dictionaries that remember who's who, sets that refuse duplicates like a good bouncer, tuples that hand back more than one thing at once, and collections nested inside collections. Time to organize the junk drawer.",
  lessons: [
    {
      id: "swift-dict-crud",
      track: "swift",
      title: "The address book that talks back",
      subtitle: "Create, read, update, and walk a dictionary.",
      concepts: ["dictionary", "for-in"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Keys go in, values come out" },
        {
          type: "p",
          text: "A dictionary stores pairs: a key and the value it points to. Think of a phone's contacts — type a name (the key), get a number (the value). You write the type as [String: Int]: String keys, Int values.",
        },
        {
          type: "p",
          text: "You read with subscripts (scores[\"Ada\"]), you add or update by assigning to a key (scores[\"Sam\"] = 7), and you can walk every pair with a for-in loop. Heads up: dictionaries do NOT keep a guaranteed order, so to get deterministic output we'll print specific keys instead of dumping the whole thing.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'var scores = ["Ada": 10, "Sam": 5]\nscores["Sam"] = 8        // update\nscores["Lin"] = 3        // add\nprint("Sam has \\(scores["Sam"] ?? 0)")\nprint("Lin has \\(scores["Lin"] ?? 0)")',
        },
        {
          type: "callout",
          tone: "note",
          text: "scores[\"Sam\"] is an Int? (the key might be missing), so we use ?? 0 to get a plain number out. var, not let, because we're changing the dictionary.",
        },
        {
          type: "p",
          text: "Make a var dictionary stock with \"apples\": 3 and \"pears\": 1. Update apples to 5, add \"plums\": 2, then print Apples: 5 and Plums: 2.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'var stock = ["apples": 3, "pears": 1]\nstock["apples"] = 5\nstock["plums"] = 2\nprint("Apples: \\(stock["apples"] ?? 0)")\nprint("Plums: \\(stock["plums"] ?? 0)")\n',
      checks: [
        { label: "Make a mutable dictionary with var", kind: "codeContains", value: "var stock" },
        { label: "Assign to a key to add/update", kind: "codeContains", value: 'stock["plums"]' },
        { label: "Print the updated apples count", kind: "stdoutContains", value: "Apples: 5" },
        { label: "Print the newly added plums", kind: "stdoutContains", value: "Plums: 2" },
      ],
      hints: [
        'Start mutable: var stock = ["apples": 3, "pears": 1].',
        'Update by assigning to a key: stock["apples"] = 5, and add the same way: stock["plums"] = 2.',
        'Read with ?? so it never crashes: print("Apples: \\(stock["apples"] ?? 0)").',
      ],
      wellDone: "Add, update, read — your dictionary does everything but remember birthdays.",
    },
    {
      id: "swift-sets",
      track: "swift",
      title: "The bouncer that hates doubles",
      subtitle: "Build a Set, insert, check membership, and combine.",
      concepts: ["set", "union/intersection"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "No duplicates allowed past this rope" },
        {
          type: "p",
          text: "A Set is a bag of unique values — try to add the same thing twice and the second one just bounces off. Great for \"have I seen this already?\" questions. You ask membership with contains, which is fast and reads like English.",
        },
        {
          type: "p",
          text: "Two sets can mingle: union gives you everything in either one, intersection gives you only what's in both. Since a Set has no order, we'll check fixed facts (counts and contains) instead of printing the raw set, so the output stays deterministic.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'var seen: Set<String> = ["cat", "dog"]\nseen.insert("cat")          // already there, ignored\nseen.insert("fox")          // new\nprint("Have fox? \\(seen.contains("fox"))")\n\nlet a: Set = [1, 2, 3]\nlet b: Set = [2, 3, 4]\nprint("Shared: \\(a.intersection(b).count)")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Write Set<String> (or annotate with : Set) so Swift knows it's a set, not an array. .union(other) and .intersection(other) both return brand-new sets.",
        },
        {
          type: "p",
          text: "Make a Set<String> pets with \"cat\" and \"dog\". Insert \"cat\" again (it won't grow) and \"bird\" (it will). Print Pets: 3 using pets.count, and Has bird: true using pets.contains(\"bird\").",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'var pets: Set<String> = ["cat", "dog"]\npets.insert("cat")\npets.insert("bird")\nprint("Pets: \\(pets.count)")\nprint("Has bird: \\(pets.contains("bird"))")\n',
      checks: [
        { label: "Declare it as a Set", kind: "codeContains", value: "Set<String>" },
        { label: "Add elements with insert", kind: "codeContains", value: ".insert(" },
        { label: "Duplicates don't count — size is 3", kind: "stdoutContains", value: "Pets: 3" },
        { label: "Check membership with contains", kind: "stdoutContains", value: "Has bird: true" },
      ],
      hints: [
        'Annotate the type so it is a set, not an array: var pets: Set<String> = ["cat", "dog"].',
        'Add with insert — adding "cat" again does nothing, "bird" makes it 3: pets.insert("bird").',
        'Print the size and a membership check: print("Pets: \\(pets.count)") and print("Has bird: \\(pets.contains("bird"))").',
      ],
      wellDone: "Duplicates bounced, membership checked, sets combined. That bouncer never lets a copy slip through.",
    },
    {
      id: "swift-tuples",
      track: "swift",
      title: "Two for the price of one return",
      subtitle: "Bundle values in a tuple and return several at once.",
      concepts: ["tuples", "multiple returns"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Why return one thing when you can return three?" },
        {
          type: "p",
          text: "A tuple glues a few values into one little package: (3, \"apples\") or even named ones like (count: 3, fruit: \"apples\"). Functions love tuples because they let you hand back more than one result without inventing a whole new type.",
        },
        {
          type: "p",
          text: "You pull values out by name (result.fruit) or by position (result.0). Named is friendlier to read, so we'll lean on names.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'func minMax(_ nums: [Int]) -> (lo: Int, hi: Int) {\n    return (nums.min() ?? 0, nums.max() ?? 0)\n}\n\nlet range = minMax([4, 1, 9, 2])\nprint("Low \\(range.lo), High \\(range.hi)")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The return type (lo: Int, hi: Int) is a named tuple. At the call site you read range.lo and range.hi — no struct required.",
        },
        {
          type: "p",
          text: "Write a function divide(_ a: Int, _ b: Int) that returns a named tuple (quotient: Int, remainder: Int). Call divide(17, 5) and print Quotient 3, Remainder 2.",
        },
      ],
      starter:
        "func divide(_ a: Int, _ b: Int) -> (quotient: Int, remainder: Int) {\n    // Your code here\n}\n",
      solution:
        'func divide(_ a: Int, _ b: Int) -> (quotient: Int, remainder: Int) {\n    return (a / b, a % b)\n}\n\nlet result = divide(17, 5)\nprint("Quotient \\(result.quotient), Remainder \\(result.remainder)")\n',
      checks: [
        { label: "Return a named tuple type", kind: "codeContains", value: "(quotient: Int, remainder: Int)" },
        { label: "Actually return two values", kind: "codeContains", value: "return (" },
        { label: "Print the quotient and remainder", kind: "stdoutContains", value: "Quotient 3, Remainder 2" },
      ],
      hints: [
        "Inside the function, return both results at once: return (a / b, a % b).",
        "Call it and keep the result: let result = divide(17, 5).",
        'Read fields by name: print("Quotient \\(result.quotient), Remainder \\(result.remainder)").',
      ],
      wellDone: "One call, two answers, zero extra types. Tuples are the carpool lane of return values.",
    },
    {
      id: "swift-nested-collections",
      track: "swift",
      title: "A box of boxes",
      subtitle: "An array of dictionaries: a tiny menu in code.",
      concepts: ["nested collections", "for-in"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "Collections, all the way down" },
        {
          type: "p",
          text: "Real data is rarely flat. A menu is a list of dishes, and each dish has a name and a price — so it's an array of dictionaries: [[String: String]]. Each element is one dictionary describing one item.",
        },
        {
          type: "p",
          text: "Loop over the array with for-in to visit each dish, then look up keys inside that dish. Arrays keep their order, so if you print in loop order the output is perfectly predictable.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let menu = [\n    ["name": "Soup", "price": "4"],\n    ["name": "Bread", "price": "2"],\n]\n\nfor dish in menu {\n    let name = dish["name"] ?? "?"\n    let price = dish["price"] ?? "?"\n    print("\\(name): $\\(price)")\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "dish[\"name\"] is still an optional (the key might be missing), so ?? gives a fallback. We keep prices as strings here just to keep the dictionary one simple type.",
        },
        {
          type: "p",
          text: "Build an array team of two dictionaries, each with \"name\" and \"role\": Ada/Captain and Sam/Cook. Loop over it and print Ada is the Captain then Sam is the Cook, in that order.",
        },
      ],
      starter: "// Your code here\n",
      solution:
        'let team = [\n    ["name": "Ada", "role": "Captain"],\n    ["name": "Sam", "role": "Cook"],\n]\n\nfor member in team {\n    let name = member["name"] ?? "?"\n    let role = member["role"] ?? "?"\n    print("\\(name) is the \\(role)")\n}\n',
      checks: [
        { label: "Look up a key inside the inner dictionary", kind: "codeContains", value: '["name"]' },
        { label: "Loop over the outer array", kind: "codeContains", value: "for " },
        { label: "Print the first member", kind: "stdoutContains", value: "Ada is the Captain" },
        { label: "Print the second member", kind: "stdoutContains", value: "Sam is the Cook" },
      ],
      hints: [
        'Make the array literal hold two dictionaries: let team = [["name": "Ada", "role": "Captain"], ["name": "Sam", "role": "Cook"]].',
        "Loop the outer array: for member in team { ... }, then read member[\"name\"] and member[\"role\"] with ?? fallbacks.",
        'Print each line in order: print("\\(name) is the \\(role)").',
      ],
      wellDone: "Array of dictionaries, looped and unpacked — you just modeled real-world data like a pro.",
    },
  ],
};
