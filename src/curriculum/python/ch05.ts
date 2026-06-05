import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "py-collections",
  title: "Collections",
  glyph: "🗂️",
  summary: "Hold many values at once. Lists let you keep a whole pile of things in one place.",
  lessons: [
    {
      id: "py-make-a-list",
      track: "python",
      title: "Make a list",
      subtitle: "Keep many values under one name.",
      concepts: ["lists", "len"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "One name, many things" },
        {
          type: "p",
          text: "A variable holds one value. A list holds as many as you want. You write a list with square brackets, separating items with commas.",
        },
        { type: "code", lang: "python", text: 'colors = ["red", "green", "blue"]\nprint(colors)\nprint(len(colors))' },
        {
          type: "callout",
          tone: "tip",
          text: "len() tells you how many items are in a list. Here it would print 3.",
        },
        {
          type: "p",
          text: "Make a shopping list with exactly three items: milk, eggs, and bread. Print the whole list, then print how many items it holds using len().",
        },
      ],
      starter: "# Make a list called shopping with milk, eggs, and bread\n# Then print the list and its length\n",
      solution: 'shopping = ["milk", "eggs", "bread"]\nprint(shopping)\nprint(len(shopping))\n',
      checks: [
        { label: "Create a list with square brackets", kind: "codeContains", value: "[" },
        { label: "Include milk in the list", kind: "stdoutContains", value: "milk" },
        { label: "Include eggs in the list", kind: "stdoutContains", value: "eggs" },
        { label: "Include bread in the list", kind: "stdoutContains", value: "bread" },
        { label: "Use len() to count the items", kind: "codeContains", value: "len(" },
        { label: "Print the count 3", kind: "stdoutContains", value: "3" },
      ],
      hints: [
        "Start with shopping = [ and put each item in quotes, separated by commas.",
        "Print the list itself with print(shopping).",
        'The full answer: shopping = ["milk", "eggs", "bread"] then print(shopping) then print(len(shopping)).',
      ],
      wellDone: "One name now holds three things at once. That's the power of a list.",
    },
    {
      id: "py-loop-a-list",
      track: "python",
      title: "Loop over a list",
      subtitle: "Visit every item, one at a time.",
      concepts: ["for loop", "lists"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Do something for each item" },
        {
          type: "p",
          text: "A for loop walks through a list and hands you each item in turn. The indented line below runs once for every item.",
        },
        { type: "code", lang: "python", text: 'pets = ["cat", "dog", "fish"]\nfor pet in pets:\n    print(pet)' },
        {
          type: "callout",
          tone: "note",
          text: "The word after for is a fresh variable that holds the current item. The indentation matters — it marks what runs inside the loop.",
        },
        {
          type: "p",
          text: "A list of favorite animals is already set up. Use a for loop to print each animal on its own line.",
        },
      ],
      starter: 'animals = ["lion", "otter", "panda"]\n# Loop over animals and print each one\n',
      solution: 'animals = ["lion", "otter", "panda"]\nfor animal in animals:\n    print(animal)\n',
      checks: [
        { label: "Use a for loop", kind: "codeContains", value: "for " },
        { label: "Loop over the animals list", kind: "codeContains", value: " in animals" },
        { label: "Print lion", kind: "stdoutContains", value: "lion" },
        { label: "Print otter", kind: "stdoutContains", value: "otter" },
        { label: "Print panda", kind: "stdoutContains", value: "panda" },
        { label: "Print each on its own line", kind: "stdoutMinLines", value: "3" },
      ],
      hints: [
        "Begin the loop with: for animal in animals:",
        "On the next line, indent four spaces and print the loop variable.",
        "The body is just: print(animal) — indented under the for line.",
      ],
      wellDone: "One short loop printed every item. Add more animals and it just works.",
    },
    {
      id: "py-append-to-list",
      track: "python",
      title: "Grow a list",
      subtitle: "Start empty, then add items.",
      concepts: ["append", "lists", "len"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Add items as you go" },
        {
          type: "p",
          text: "Lists don't have to be complete from the start. Begin with an empty list, then use append() to stick a new item onto the end whenever you want.",
        },
        { type: "code", lang: "python", text: 'names = []\nnames.append("Ada")\nnames.append("Grace")\nprint(names)' },
        {
          type: "callout",
          tone: "tip",
          text: "An empty list is just []. Each append() call makes the list one item longer.",
        },
        {
          type: "p",
          text: "Start with an empty list called scores. Append three numbers to it: 10, then 20, then 30. Print the finished list, then print its length with len().",
        },
      ],
      starter: "scores = []\n# Append 10, then 20, then 30\n# Then print the list and its length\n",
      solution: "scores = []\nscores.append(10)\nscores.append(20)\nscores.append(30)\nprint(scores)\nprint(len(scores))\n",
      checks: [
        { label: "Start with an empty list", kind: "codeContains", value: "[]" },
        { label: "Use append() to add items", kind: "codeContains", value: ".append(" },
        { label: "Add the value 10", kind: "stdoutContains", value: "10" },
        { label: "Add the value 20", kind: "stdoutContains", value: "20" },
        { label: "Add the value 30", kind: "stdoutContains", value: "30" },
        { label: "Print the final length 3", kind: "stdoutMatches", value: "10[\\s\\S]*20[\\s\\S]*30[\\s\\S]*3" },
        { label: "Count the items with len()", kind: "codeContains", value: "len(" },
      ],
      hints: [
        "After scores = [], call scores.append(10) on its own line.",
        "Repeat append for 20 and 30, then print(scores).",
        "Finish with print(len(scores)) to show there are 3 items.",
      ],
      wellDone: "You built a list piece by piece — exactly how programs collect data while they run.",
    },
  ],
};
