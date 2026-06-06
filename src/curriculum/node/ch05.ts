import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "node-higher-order",
  title: "Map, Filter, Reduce",
  glyph: "⚙️",
  summary:
    "The three power tools of arrays: reshape with map, pick with filter, and crush a whole list down to one value with reduce.",
  lessons: [
    {
      id: "node-map-transform",
      track: "node",
      title: "Make over every item",
      subtitle: "Transform a whole array with map.",
      concepts: ["arrays", "map"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "One in, one out, every time" },
        {
          type: "p",
          text: "map takes an array and hands you back a new one of the same length. You give it a little function, it runs that function on each item, and collects whatever you return. The original array is left untouched, like a polite house guest.",
        },
        {
          type: "code",
          lang: "javascript",
          text: "const sizes = [1, 2, 3];\nconst bigger = sizes.map(n => n * 10);\nconsole.log(JSON.stringify(bigger)); // [10,20,30]",
        },
        {
          type: "callout",
          tone: "tip",
          text: "JSON.stringify(array) prints a clean, predictable line of text — handy when you want to see the whole list at once.",
        },
        {
          type: "p",
          text: "The names below are shouting. Map each one to its uppercase version and print the new array.",
        },
      ],
      starter:
        'const names = ["ada", "alan", "grace"];\n// Map names to UPPERCASE, then print the new array\n',
      solution:
        'const names = ["ada", "alan", "grace"];\nconst loud = names.map(n => n.toUpperCase());\nconsole.log(JSON.stringify(loud));\n',
      checks: [
        { label: "Use .map( to build a new array", kind: "codeContains", value: ".map(" },
        { label: "Ada is now shouting", kind: "stdoutContains", value: "ADA" },
        {
          label: "All three names appear uppercased in order",
          kind: "stdoutMatches",
          value: "ADA[\\s\\S]*ALAN[\\s\\S]*GRACE",
        },
      ],
      hints: [
        "Call names.map(n => ...) and return n.toUpperCase() for each name.",
        "Save the result in a new variable, then console.log it.",
        'The full line: console.log(JSON.stringify(names.map(n => n.toUpperCase())));',
      ],
      wellDone: "One tidy line turned the whole list LOUD. That's map doing your busywork.",
    },
    {
      id: "node-filter-select",
      track: "node",
      title: "Keep the keepers",
      subtitle: "Select only the items you want with filter.",
      concepts: ["arrays", "filter"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A bouncer for your array" },
        {
          type: "p",
          text: "Where map changes every item, filter decides which items get in at all. You give it a function that returns true or false for each item. Return true, the item stays. Return false, it's politely shown the door.",
        },
        {
          type: "code",
          lang: "javascript",
          text: "const nums = [3, 8, 1, 10, 5];\nconst big = nums.filter(n => n > 4);\nconsole.log(JSON.stringify(big)); // [8,10,5]",
        },
        {
          type: "callout",
          tone: "note",
          text: "The result can be shorter than the original — that's the whole point. The items that fail the test simply don't come along.",
        },
        {
          type: "p",
          text: "Some of the ages below belong to adults. Filter the array to keep only ages of 18 or more, then print what's left.",
        },
      ],
      starter:
        "const ages = [12, 21, 17, 40, 18];\n// Filter to keep only ages of 18 or more, then print the result\n",
      solution:
        "const ages = [12, 21, 17, 40, 18];\nconst adults = ages.filter(a => a >= 18);\nconsole.log(JSON.stringify(adults));\n",
      checks: [
        { label: "Use .filter( to select items", kind: "codeContains", value: ".filter(" },
        { label: "21 made the cut", kind: "stdoutContains", value: "21" },
        {
          label: "Only adult ages survive, in order",
          kind: "stdoutMatches",
          value: "21[\\s\\S]*40[\\s\\S]*18",
        },
      ],
      hints: [
        "Call ages.filter(a => ...) and return the test a >= 18.",
        "Items where the test is false are dropped — 12 and 17 won't appear.",
        "The full line: console.log(JSON.stringify(ages.filter(a => a >= 18)));",
      ],
      wellDone: "You let the right ones in and dropped the rest. filter is your array's bouncer.",
    },
    {
      id: "node-reduce-aggregate",
      track: "node",
      title: "Squish a list into one answer",
      subtitle: "Add everything up with reduce.",
      concepts: ["arrays", "reduce"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Many values, one result" },
        {
          type: "p",
          text: "Sometimes you don't want a new list — you want a single number, like a total. reduce walks the array carrying a running value (the accumulator). For each item you return the updated running value, and at the end you get whatever you've built up.",
        },
        {
          type: "code",
          lang: "javascript",
          text: "const nums = [1, 2, 3, 4];\nconst total = nums.reduce((sum, n) => sum + n, 0);\nconsole.log(total); // 10",
        },
        {
          type: "callout",
          tone: "tip",
          text: "That 0 at the end is the starting value for the accumulator. Forget it and reduce gets grumpy on an empty array — always give it a starting point.",
        },
        {
          type: "p",
          text: "Add up the prices in the cart below with reduce, and print the grand total.",
        },
      ],
      starter:
        "const cart = [5, 12, 3, 20];\n// Use reduce to sum the cart, then print the total\n",
      solution:
        "const cart = [5, 12, 3, 20];\nconst total = cart.reduce((sum, price) => sum + price, 0);\nconsole.log(total);\n",
      checks: [
        { label: "Use .reduce( to aggregate", kind: "codeContains", value: ".reduce(" },
        { label: "Print the grand total", kind: "stdoutContains", value: "40" },
      ],
      hints: [
        "Call cart.reduce((sum, price) => ..., 0) and return sum + price.",
        "Don't forget the starting value 0 as the second argument to reduce.",
        "5 + 12 + 3 + 20 is 40 — console.log that total.",
      ],
      wellDone: "A whole cart crushed down to one number. reduce is the array's trash compactor.",
    },
    {
      id: "node-map-filter-chain",
      track: "node",
      title: "Stack the power tools",
      subtitle: "Chain filter and map on real data.",
      concepts: ["map", "filter", "chaining"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "One pipeline, real data" },
        {
          type: "p",
          text: "Each of these methods returns an array, which means you can hang the next one right off the end. Read a chain left to right like a sentence: take the people, keep the ones who are here, then grab their names.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const items = [\n  { name: "pen", price: 2 },\n  { name: "desk", price: 90 },\n  { name: "mug", price: 8 },\n];\nconst cheapNames = items\n  .filter(i => i.price < 10)\n  .map(i => i.name);\nconsole.log(JSON.stringify(cheapNames)); // ["pen","mug"]',
        },
        {
          type: "callout",
          tone: "note",
          text: "Filter first, then map. Tossing the items you don't want before transforming means map does less work — and your code reads in the order things happen.",
        },
        {
          type: "p",
          text: "Below is a list of people. Keep only the ones who are present, pull out their names, and print that array.",
        },
      ],
      starter:
        'const people = [\n  { name: "Mara", present: true },\n  { name: "Theo", present: false },\n  { name: "Lina", present: true },\n];\n// Keep only present people, map to their names, then print the array\n',
      solution:
        'const people = [\n  { name: "Mara", present: true },\n  { name: "Theo", present: false },\n  { name: "Lina", present: true },\n];\nconst hereNames = people\n  .filter(p => p.present)\n  .map(p => p.name);\nconsole.log(JSON.stringify(hereNames));\n',
      checks: [
        { label: "Filter the people", kind: "codeContains", value: ".filter(" },
        { label: "Map to their names", kind: "codeContains", value: ".map(" },
        { label: "Mara is present", kind: "stdoutContains", value: "Mara" },
        {
          label: "Only present people appear, and Theo is gone",
          kind: "stdoutMatches",
          value: "Mara[\\s\\S]*Lina",
        },
        { label: "Absent Theo is filtered out", kind: "stdoutContains", value: "Lina" },
      ],
      hints: [
        "Start with people.filter(p => p.present) to drop anyone absent.",
        "Hang .map(p => p.name) off the end of that filter to get just names.",
        'The full chain: people.filter(p => p.present).map(p => p.name) — print it with JSON.stringify.',
      ],
      wellDone:
        "Filter then map, chained into one clean pipeline — that's how real data gets reshaped every day.",
    },
  ],
};
