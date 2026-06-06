import type { Chapter } from "../types";

export const ch07: Chapter = {
  id: "node-json",
  title: "JSON & Data",
  glyph: "🧾",
  summary: "Turn objects into text, read text back into objects, and dig through nested data.",
  lessons: [
    {
      id: "node-json-stringify",
      track: "node",
      title: "Objects, but make it text",
      subtitle: "Turn a JavaScript object into a string with JSON.stringify.",
      concepts: ["JSON", "stringify"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Flatten it into text" },
        {
          type: "p",
          text: "An object lives in memory as a tidy little box. But to save it to a file or mail it across the internet, you need plain text. JSON.stringify does exactly that — it squashes an object into a string you can print.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const cat = { name: "Mittens", lives: 9 };\nconsole.log(JSON.stringify(cat));\n// {"name":"Mittens","lives":9}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Notice the quotes around the keys in the output. That's JSON being formal — every key wears quotes, no exceptions.",
        },
        {
          type: "p",
          text: "Build a book object with a title and pages, then stringify it and print the result.",
        },
      ],
      starter: "// Make a book object with title and pages, then JSON.stringify and print it\n",
      solution:
        'const book = { title: "Clean Code", pages: 464 };\nconsole.log(JSON.stringify(book));\n',
      checks: [
        { label: "Use JSON.stringify", kind: "codeContains", value: "JSON.stringify" },
        { label: "Print the title", kind: "stdoutContains", value: "Clean Code" },
        { label: "Output looks like JSON", kind: "stdoutContains", value: '"title"' },
      ],
      hints: [
        "Start with const book = { title: \"Clean Code\", pages: 464 }.",
        "Wrap the object: JSON.stringify(book).",
        'The whole thing: const book = { title: "Clean Code", pages: 464 }; console.log(JSON.stringify(book));',
      ],
      wellDone: "Your object is now plain text — ready to save, send, or show off.",
    },
    {
      id: "node-json-parse",
      track: "node",
      title: "Text, but make it an object",
      subtitle: "Read a JSON string back into a usable object with JSON.parse.",
      concepts: ["JSON", "parse"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Unsquash the text" },
        {
          type: "p",
          text: "JSON.stringify goes one way; JSON.parse goes the other. Hand it a JSON string and it hands you back a real object whose properties you can read with a dot.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const text = \'{"name":"Mittens","lives":9}\';\nconst cat = JSON.parse(text);\nconsole.log(cat.lives); // 9',
        },
        {
          type: "callout",
          tone: "note",
          text: "The string must be valid JSON — double quotes around every key and every text value, or JSON.parse throws a tantrum.",
        },
        {
          type: "p",
          text: "There's a JSON string below describing a user. Parse it, then print just the user's name.",
        },
      ],
      starter:
        'const data = \'{"name":"Ada","role":"engineer"}\';\n// Parse data into an object, then print the name\n',
      solution:
        'const data = \'{"name":"Ada","role":"engineer"}\';\nconst user = JSON.parse(data);\nconsole.log(user.name);\n',
      checks: [
        { label: "Use JSON.parse", kind: "codeContains", value: "JSON.parse" },
        { label: "Read a property with a dot", kind: "codeContains", value: "." },
        { label: "Print the name", kind: "stdoutContains", value: "Ada" },
      ],
      hints: [
        "Call JSON.parse(data) and store the result in a variable.",
        "Read the name off that variable with a dot: user.name.",
        "const user = JSON.parse(data); console.log(user.name); prints Ada.",
      ],
      wellDone: "Text in, object out — you can now ingest data from anywhere.",
    },
    {
      id: "node-json-nested",
      track: "node",
      title: "Boxes inside boxes",
      subtitle: "Reach into nested data with dots and brackets.",
      concepts: ["nested data", "arrays"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Data within data" },
        {
          type: "p",
          text: "Real data is rarely flat. An object can hold an array, and that array can hold more objects. You navigate down with dots for keys and [index] for list positions.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const team = { name: "Rockets", players: ["Sam", "Lee"] };\nconsole.log(team.players[0]); // Sam\nconsole.log(team.players.length); // 2',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Chain as deep as you like: team.players[1] grabs the second name. Arrays start counting at 0, so [0] is the first item.",
        },
        {
          type: "p",
          text: "The playlist below has a name and a list of songs. Print the playlist name and its first song.",
        },
      ],
      starter:
        'const playlist = { name: "Focus", songs: ["Clair de Lune", "Gymnopedie"] };\n// Print the playlist name and the first song\n',
      solution:
        'const playlist = { name: "Focus", songs: ["Clair de Lune", "Gymnopedie"] };\nconsole.log(playlist.name);\nconsole.log(playlist.songs[0]);\n',
      checks: [
        { label: "Index into the array", kind: "codeContains", value: "[0]" },
        { label: "Print the playlist name", kind: "stdoutContains", value: "Focus" },
        { label: "Print the first song", kind: "stdoutContains", value: "Clair de Lune" },
      ],
      hints: [
        "Get the name with playlist.name.",
        "Get the first song with playlist.songs[0].",
        "Two prints: console.log(playlist.name); console.log(playlist.songs[0]);",
      ],
      wellDone: "Dots and brackets together let you reach any value, no matter how deep it's buried.",
    },
    {
      id: "node-object-keys",
      track: "node",
      title: "Walk the whole object",
      subtitle: "Loop over keys, values, and pairs with Object methods.",
      concepts: ["Object.entries", "loops"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Every label, every value" },
        {
          type: "p",
          text: "Sometimes you don't know an object's keys ahead of time, or you just want all of them. Object.keys lists the labels, Object.values lists the values, and Object.entries gives you matched [key, value] pairs.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const scores = { math: 90, art: 85 };\nfor (const [subject, score] of Object.entries(scores)) {\n  console.log(subject + ": " + score);\n}\n// math: 90\n// art: 85',
        },
        {
          type: "callout",
          tone: "note",
          text: "Object.entries hands each pair as a two-item array, so [subject, score] unpacks them into two handy variables in one go.",
        },
        {
          type: "p",
          text: "There's a prices object below. Loop over its entries and print each item with its price, like \"apple: 3\".",
        },
      ],
      starter:
        "const prices = { apple: 3, bread: 2, milk: 4 };\n// Loop over Object.entries(prices) and print each item: price\n",
      solution:
        'const prices = { apple: 3, bread: 2, milk: 4 };\nfor (const [item, price] of Object.entries(prices)) {\n  console.log(item + ": " + price);\n}\n',
      checks: [
        { label: "Use an Object method", kind: "codeContains", value: "Object." },
        { label: "Print the first item", kind: "stdoutContains", value: "apple: 3" },
        { label: "All three items appear in order", kind: "stdoutMatches", value: "apple[\\s\\S]*bread[\\s\\S]*milk" },
      ],
      hints: [
        "Write for (const [item, price] of Object.entries(prices)) { ... }.",
        "Inside the loop, console.log(item + \": \" + price).",
        'Full loop: for (const [item, price] of Object.entries(prices)) console.log(item + ": " + price);',
      ],
      wellDone: "You can now tour an entire object automatically — keys, values, and all.",
    },
  ],
};
