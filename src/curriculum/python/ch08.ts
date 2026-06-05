import type { Chapter } from "../types";

export const ch08: Chapter = {
  id: "py-dicts",
  title: "Key & Value",
  glyph: "📒",
  summary: "Store labelled data with dictionaries. Look things up by name instead of by position.",
  lessons: [
    {
      id: "py-dict-create",
      track: "python",
      title: "Look it up by name",
      subtitle: "Build a dictionary and read one value.",
      concepts: ["dict", "keys"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Pair each value with a label" },
        {
          type: "p",
          text: "A dictionary stores values behind names called keys. You write it with curly braces, and each entry is key: value. To read a value back, put the key in square brackets.",
        },
        {
          type: "code",
          lang: "python",
          text: 'book = {"title": "Dune", "pages": 412}\nprint(book["title"])    # Dune',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Unlike a list, you don't count positions. You ask for a value by its key.",
        },
        {
          type: "p",
          text: 'Make a dictionary called person with a "name" and an "age". Then print the name by its key.',
        },
      ],
      starter: "# Build a person dict, then print their name\n",
      solution: 'person = {"name": "Ada", "age": 36}\nprint(person["name"])\n',
      checks: [
        { label: "Create a dictionary with curly braces", kind: "codeMatches", value: "\\{[\\s\\S]*:[\\s\\S]*\\}" },
        { label: 'Use a "name" key', kind: "codeContains", value: '"name"' },
        { label: "Look up a value by key", kind: "codeMatches", value: "\\[[\"']name[\"']\\]" },
        { label: "Print the name", kind: "stdoutContains", value: "Ada" },
      ],
      hints: [
        'Start with person = {"name": "Ada", "age": 36}.',
        "Read a value with person[\"name\"], not person[0].",
        'The full answer is person = {"name": "Ada", "age": 36} then print(person["name"]).',
      ],
      wellDone: "Keys make your data readable. person[\"name\"] says exactly what it means.",
    },
    {
      id: "py-dict-update",
      track: "python",
      title: "Add and change",
      subtitle: "Set a key, then print it.",
      concepts: ["dict", "assignment"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Dictionaries can grow" },
        {
          type: "p",
          text: "Assign to a key to set it. If the key already exists, you overwrite it; if it doesn't, you create it. Same syntax either way.",
        },
        {
          type: "code",
          lang: "python",
          text: 'prices = {"apple": 1}\nprices["banana"] = 2    # new key\nprices["apple"] = 3     # changed\nprint(prices["banana"])',
        },
        {
          type: "callout",
          tone: "note",
          text: "There is no separate add command. Assigning to a missing key adds it.",
        },
        {
          type: "p",
          text: 'Start with prices = {"apple": 1}. Add a "banana" priced at 2, then print the banana price.',
        },
      ],
      starter: 'prices = {"apple": 1}\n# Add a banana, then print its price\n',
      solution: 'prices = {"apple": 1}\nprices["banana"] = 2\nprint(prices["banana"])\n',
      checks: [
        { label: 'Add the "banana" key', kind: "codeMatches", value: "[\"']banana[\"']\\s*\\]\\s*=" },
        { label: "Print the banana price", kind: "stdoutContains", value: "2" },
      ],
      hints: [
        'Write prices["banana"] = 2 on its own line.',
        'Then read it back with prices["banana"].',
        'Use print(prices["banana"]) to show the new value.',
      ],
      wellDone: "Adding and updating use the same move. One less rule to remember.",
    },
    {
      id: "py-dict-loop",
      track: "python",
      title: "Walk every entry",
      subtitle: "Loop with .items() to print each pair.",
      concepts: ["dict", "for", "items"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Every key and value at once" },
        {
          type: "p",
          text: "Calling .items() on a dictionary gives you each key and value together. A for loop can unpack them into two names so you can use both.",
        },
        {
          type: "code",
          lang: "python",
          text: 'prices = {"apple": 1, "pear": 2}\nfor name, price in prices.items():\n    print(name + ": " + str(price))',
        },
        {
          type: "callout",
          tone: "tip",
          text: "str(price) turns the number into text so you can join it with +. An f-string works too.",
        },
        {
          type: "p",
          text: 'Loop over scores = {"math": 90, "art": 80} and print each line as "key: value".',
        },
      ],
      starter: 'scores = {"math": 90, "art": 80}\n# Loop over the scores and print "key: value" for each\n',
      solution:
        'scores = {"math": 90, "art": 80}\nfor name, value in scores.items():\n    print(name + ": " + str(value))\n',
      checks: [
        { label: "Loop with .items()", kind: "codeContains", value: ".items()" },
        { label: "Use a for loop", kind: "codeContains", value: "for " },
        { label: "Print both subjects", kind: "stdoutMatches", value: "math[\\s\\S]*art" },
        { label: 'Format as "key: value"', kind: "stdoutMatches", value: "math:\\s*90" },
        { label: "Print one line per entry", kind: "stdoutMinLines", value: "2" },
      ],
      hints: [
        "Write for name, value in scores.items():",
        "Indent the print under the for line.",
        'Join with print(name + ": " + str(value)).',
      ],
      wellDone: "One loop handled the whole dictionary, however many entries it holds.",
    },
  ],
};
