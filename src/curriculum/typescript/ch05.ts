import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "ts-arrays-tuples-generics",
  title: "Arrays, Tuples & Generics",
  glyph: "📦",
  summary:
    "One value is rarely enough. You'll want lists, pairs, and code that works for any of them. In this chapter you type your arrays so the wrong thing can't sneak in, lock a fixed-shape pair into a tuple, and then write generic code — functions that stay type-safe no matter what they're handed.",
  lessons: [
    {
      id: "ts-typed-arrays",
      track: "typescript",
      title: "A box that only holds numbers",
      subtitle: "Type an array with number[] and Array<string>.",
      concepts: ["arrays", "number[]", "Array<T>"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Lists, but every item is checked" },
        {
          type: "p",
          text: "An array is an ordered list of values. In TypeScript you say what kind of values it holds: number[] is an array of numbers, string[] an array of strings. Try to push a string into a number[] and the compiler stops you on the spot.",
        },
        {
          type: "p",
          text: "There are two ways to write the same thing: number[] and Array<number> mean exactly the same. The square-bracket form is more common; the angle-bracket form is your first glimpse of the generics coming later this chapter.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'const scores: number[] = [10, 8, 9, 7];\nconst total = scores.reduce((sum, n) => sum + n, 0);\nconsole.log(total);   // 34\n\nconst names: Array<string> = ["Ada", "Alan"];\nconsole.log(names.join(" & "));   // "Ada & Alan"',
        },
        {
          type: "callout",
          tone: "tip",
          text: "reduce walks the array carrying an accumulator. Starting it at 0 and adding each number gives you the sum.",
        },
        {
          type: "p",
          text: "Make a number[] called prices with 5, 3, and 12, and print their sum (20). Then make an Array<string> called fruits with \"apple\" and \"pear\", and print them joined with a comma and space: apple, pear.",
        },
      ],
      starter: "// Make a typed list of numbers and a typed list of strings\n",
      solution:
        'const prices: number[] = [5, 3, 12];\nconst sum = prices.reduce((acc, n) => acc + n, 0);\nconsole.log(sum);\n\nconst fruits: Array<string> = ["apple", "pear"];\nconsole.log(fruits.join(", "));\n',
      checks: [
        { label: "Type an array with number[]", kind: "codeContains", value: "number[]" },
        { label: "Use the Array<string> form", kind: "codeContains", value: "Array<string>" },
        { label: "Print the sum", kind: "stdoutContains", value: "20" },
        { label: "Print the joined fruits", kind: "stdoutContains", value: "apple, pear" },
      ],
      hints: [
        "Declare it like this: const prices: number[] = [5, 3, 12];",
        "Sum with reduce: prices.reduce((acc, n) => acc + n, 0).",
        'Join strings: fruits.join(", ") gives "apple, pear".',
      ],
      wellDone: "Two ways to spell the same type, and not a stray value in either list.",
    },
    {
      id: "ts-array-of-objects",
      track: "typescript",
      title: "A list of real things",
      subtitle: "Hold objects in an array and map/filter over them.",
      concepts: ["interface", "map", "filter"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Arrays of objects are where data lives" },
        {
          type: "p",
          text: "Most real data is a list of records: users, products, tasks. Describe one record with an interface, then make an array of it. Now every item is guaranteed to have the same shape, and your editor knows every field.",
        },
        {
          type: "p",
          text: "Because the type travels with the array, map and filter stay fully typed. Inside .filter(u => u.active) TypeScript knows u is a User and u.active is a boolean — typo the field name and it complains.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface User {\n  name: string;\n  active: boolean;\n}\n\nconst users: User[] = [\n  { name: "Ada", active: true },\n  { name: "Alan", active: false },\n  { name: "Grace", active: true },\n];\n\nconst activeNames = users.filter(u => u.active).map(u => u.name);\nconsole.log(activeNames.join(", "));   // "Ada, Grace"',
        },
        {
          type: "callout",
          tone: "note",
          text: "filter keeps the items that pass the test; map transforms each item. Chaining them — filter then map — is one of the most common moves in real code.",
        },
        {
          type: "p",
          text: 'Define an interface Book with title: string and pages: number. Make a Book[] with at least three books, keep only the ones over 200 pages, and print their titles joined with ", ". With "Dune" (412), "Hatchet" (195), and "It" (1138), the output is Dune, It.',
        },
      ],
      starter: "// Describe a Book, list a few, then filter and map\n",
      solution:
        'interface Book {\n  title: string;\n  pages: number;\n}\n\nconst books: Book[] = [\n  { title: "Dune", pages: 412 },\n  { title: "Hatchet", pages: 195 },\n  { title: "It", pages: 1138 },\n];\n\nconst longTitles = books.filter(b => b.pages > 200).map(b => b.title);\nconsole.log(longTitles.join(", "));\n',
      checks: [
        { label: "Declare an interface", kind: "codeContains", value: "interface Book" },
        { label: "Filter the list", kind: "codeContains", value: ".filter(" },
        { label: "Map to titles", kind: "codeContains", value: ".map(" },
        { label: "Print the long titles", kind: "stdoutEquals", value: "Dune, It" },
      ],
      hints: [
        "Start with the shape: interface Book { title: string; pages: number; }",
        "Keep the big ones: books.filter(b => b.pages > 200).",
        'Then pull the titles: .map(b => b.title), and join with ", ".',
      ],
      wellDone: "Shaped data, typed all the way through filter and map. This is the workhorse pattern.",
    },
    {
      id: "ts-tuples",
      track: "typescript",
      title: "Pairs with a fixed shape",
      subtitle: "Use tuples for fixed-length, typed positions.",
      concepts: ["tuples", "destructuring", "return types"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "When position has meaning" },
        {
          type: "p",
          text: "A tuple is an array with a fixed length where each slot has its own type. [number, number] is exactly two numbers — a coordinate. Unlike a plain array, the order and count are part of the type, so [3, 4] fits but [3] or [3, 4, 5] does not.",
        },
        {
          type: "p",
          text: "Tuples shine as return values when a function naturally hands back two related things — a label and a count, say. You unpack them with destructuring: const [label, n] = makePair().",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'const point: [number, number] = [3, 4];\nconst [x, y] = point;\nconsole.log(`x=${x}, y=${y}`);   // "x=3, y=4"\n\nfunction status(): [string, number] {\n  return ["online", 200];\n}\nconst [state, code] = status();\nconsole.log(`${state} ${code}`);   // "online 200"',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Destructuring on the left side mirrors the tuple on the right: [x, y] pulls position 0 into x and position 1 into y.",
        },
        {
          type: "p",
          text: 'Make a point: [number, number] equal to [6, 8] and print x=6, y=8. Then write a function size() that returns a [string, number] of ["large", 42], destructure it, and print large: 42.',
        },
      ],
      starter: "// Declare a tuple, and write a function that returns one\n",
      solution:
        'const point: [number, number] = [6, 8];\nconst [x, y] = point;\nconsole.log(`x=${x}, y=${y}`);\n\nfunction size(): [string, number] {\n  return ["large", 42];\n}\nconst [label, count] = size();\nconsole.log(`${label}: ${count}`);\n',
      checks: [
        { label: "Type a number pair tuple", kind: "codeContains", value: "[number, number]" },
        { label: "Return a string/number tuple", kind: "codeContains", value: "[string, number]" },
        { label: "Print the point", kind: "stdoutContains", value: "x=6, y=8" },
        { label: "Print the size", kind: "stdoutContains", value: "large: 42" },
      ],
      hints: [
        "A coordinate tuple: const point: [number, number] = [6, 8];",
        "Unpack it: const [x, y] = point; then use ${x} and ${y}.",
        'The function annotates its return: function size(): [string, number] { return ["large", 42]; }',
      ],
      wellDone: "Fixed length, typed positions, unpacked cleanly. Tuples are perfect for tidy pairs.",
    },
    {
      id: "ts-generic-functions",
      track: "typescript",
      title: "One function, any type",
      subtitle: "Write generic functions with a type parameter <T>.",
      concepts: ["generics", "type parameter", "reuse"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "A placeholder for the type" },
        {
          type: "p",
          text: "Sometimes a function works the same way no matter the type — grabbing the first item of a list doesn't care if it's numbers or strings. Generics let you write it once. <T> is a type parameter: a stand-in that gets filled in each time you call the function.",
        },
        {
          type: "p",
          text: "first<T>(arr: T[]): T takes an array of some type T and returns one T. Call it with a number[] and T becomes number; call it with a string[] and T becomes string. You wrote one function and TypeScript keeps both calls perfectly typed.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'function identity<T>(x: T): T {\n  return x;\n}\nconsole.log(identity<number>(42));   // 42\nconsole.log(identity<string>("hi")); // "hi"\n\nfunction first<T>(arr: T[]): T {\n  return arr[0];\n}\nconsole.log(first([10, 20, 30]));     // 10',
        },
        {
          type: "callout",
          tone: "note",
          text: "You usually don't have to write the type in <angle brackets> at the call site — TypeScript infers T from the argument. The brackets are there when you want to be explicit.",
        },
        {
          type: "p",
          text: 'Write a generic function first<T>(arr: T[]): T that returns the first element. Call it once with [7, 14, 21] and print 7, then call it with ["red", "green", "blue"] and print red.',
        },
      ],
      starter: "// Write a function that returns the first item of any array\n",
      solution:
        'function first<T>(arr: T[]): T {\n  return arr[0];\n}\nconsole.log(first([7, 14, 21]));\nconsole.log(first(["red", "green", "blue"]));\n',
      checks: [
        { label: "Declare a type parameter", kind: "codeContains", value: "first<T>" },
        { label: "Accept and return that type", kind: "codeMatches", value: "arr:\\s*T\\[\\]\\s*\\)\\s*:\\s*T" },
        { label: "Print the first number", kind: "stdoutContains", value: "7" },
        { label: "Print the first string", kind: "stdoutContains", value: "red" },
      ],
      hints: [
        "Put the type parameter after the name: function first<T>(arr: T[]): T",
        "Return arr[0] — that's already of type T.",
        "Call it twice: first([7, 14, 21]) and first([\"red\", \"green\", \"blue\"]).",
      ],
      wellDone: "One function, two types, zero duplication. That's the whole promise of generics.",
    },
    {
      id: "ts-generic-constraints",
      track: "typescript",
      title: "Generics with a rule",
      subtitle: "Constrain a type parameter with extends.",
      concepts: ["generic constraints", "extends", "length"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "Any type — as long as it has a length" },
        {
          type: "p",
          text: "A bare <T> could be anything, so inside the function you can't assume it has a .length. A constraint fixes that: <T extends { length: number }> says T can be any type, provided it has a numeric length property. Now strings and arrays both qualify, and .length is safe to read.",
        },
        {
          type: "p",
          text: "This lets longest compare two values by length and return the longer one — still generic, so whatever you pass back out keeps its original type. Pass two strings, get a string; pass two arrays, get an array.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'function longest<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}\n\nconsole.log(longest("cat", "kitten"));     // "kitten"\nconsole.log(longest([1, 2], [9]).length);  // 2',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Without the extends constraint, a.length would be an error: a plain T has no guaranteed members. The constraint is what unlocks the .length access.",
        },
        {
          type: "p",
          text: 'Write longest<T extends { length: number }>(a: T, b: T): T returning whichever has the greater length. Call it with "hi" and "hello" and print hello. Then call it with [1, 2, 3] and [4, 5] and print the result\'s length, which is 3.',
        },
      ],
      starter: "// Write a generic that needs its inputs to have a length\n",
      solution:
        'function longest<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}\n\nconsole.log(longest("hi", "hello"));\nconsole.log(longest([1, 2, 3], [4, 5]).length);\n',
      checks: [
        { label: "Constrain the type parameter", kind: "codeContains", value: "extends { length: number }" },
        { label: "Compare by length", kind: "codeContains", value: ".length" },
        { label: "Print the longer string", kind: "stdoutContains", value: "hello" },
        { label: "Print the longer array's length", kind: "stdoutContains", value: "3" },
        { label: "Two lines of output", kind: "stdoutMinLines", value: "2" },
      ],
      hints: [
        "Constrain it: function longest<T extends { length: number }>(a: T, b: T): T",
        "Return the longer one: return a.length >= b.length ? a : b;",
        "Call it with strings, then with arrays — and print .length for the array case.",
      ],
      wellDone: "A generic with guardrails: works for anything with a length, and nothing else. You've got the full toolkit now.",
    },
  ],
};
