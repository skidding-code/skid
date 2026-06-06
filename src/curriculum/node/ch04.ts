import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "node-strings",
  title: "Strings & Arrays",
  glyph: "🔤",
  summary: "Slice up text, build tidy messages, and boss arrays around.",
  lessons: [
    {
      id: "node-string-methods",
      track: "node",
      title: "Text has buttons on it",
      subtitle: "Shout, search, and slice a string with built-in methods.",
      concepts: ["strings", "methods"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Strings can do tricks" },
        {
          type: "p",
          text: "A string isn't just frozen text — it comes with little built-in tools. .toUpperCase() yells it, .includes() checks if some text is hiding inside, .split() chops it into pieces, and .slice() grabs a chunk.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const phrase = "hello world";\nconsole.log(phrase.toUpperCase());      // HELLO WORLD\nconsole.log(phrase.includes("world")); // true\nconsole.log(phrase.split(" "));        // [ \'hello\', \'world\' ]\nconsole.log(phrase.slice(0, 5));       // hello',
        },
        {
          type: "callout",
          tone: "tip",
          text: "None of these change the original string. They hand you a new result, like a polite vending machine.",
        },
        {
          type: "p",
          text: "There's a quiet little string below. Print it in all caps so everyone can hear it.",
        },
      ],
      starter:
        'const whisper = "speak up";\n// Print whisper in all uppercase\n',
      solution:
        'const whisper = "speak up";\nconsole.log(whisper.toUpperCase());\n',
      checks: [
        { label: "Use the .toUpperCase() method", kind: "codeContains", value: ".toUpperCase(" },
        { label: "Print the shouted text", kind: "stdoutContains", value: "SPEAK UP" },
      ],
      hints: [
        "Every string has a .toUpperCase() method — call it with the dot.",
        "Wrap it in console.log so the result actually prints.",
        "The whole thing: console.log(whisper.toUpperCase());",
      ],
      wellDone: "ONE LINE AND THE STRING IS YELLING. Strings carry their own toolbox everywhere they go.",
    },
    {
      id: "node-template-literals",
      track: "node",
      title: "Mad Libs, but for code",
      subtitle: "Drop values straight into text with template literals.",
      concepts: ["template literals", "strings"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Backticks change everything" },
        {
          type: "p",
          text: "Gluing strings together with + gets ugly fast. A template literal uses backticks ` ` instead of quotes, and lets you drop variables right inside with ${ }. Bonus: a backtick string can span multiple lines without any fuss.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const name = "Sam";\nconst pets = 3;\nconst msg = `Hi ${name},\nyou own ${pets} pets.`;\nconsole.log(msg);',
        },
        {
          type: "callout",
          tone: "note",
          text: "The backtick ` lives next to the 1 key, not the apostrophe. ${ } evaluates whatever is inside, so ${pets} becomes 3.",
        },
        {
          type: "p",
          text: "Use the city and temp below to build a two-line forecast in one backtick string, then print it.",
        },
      ],
      starter:
        'const city = "Reykjavik";\nconst temp = 4;\n// Build a multi-line message using a backtick template literal, then print it\n',
      solution:
        'const city = "Reykjavik";\nconst temp = 4;\nconst report = `Forecast for ${city}:\nA brisk ${temp} degrees today.`;\nconsole.log(report);\n',
      checks: [
        { label: "Use a backtick template literal", kind: "codeContains", value: "`" },
        { label: "Insert a value with ${ }", kind: "codeContains", value: "${" },
        { label: "Print the city name", kind: "stdoutContains", value: "Reykjavik" },
        { label: "Print the temperature", kind: "stdoutContains", value: "4" },
      ],
      hints: [
        "Wrap your message in backticks ` ` instead of quotes.",
        "Insert variables with ${city} and ${temp}, and press Enter mid-string for a second line.",
        "Try: const report = `Forecast for ${city}:\\nA brisk ${temp} degrees today.`; then log it.",
      ],
      wellDone: "Clean, readable, multi-line text with zero plus signs. Backticks are a quiet superpower.",
    },
    {
      id: "node-array-push-join",
      track: "node",
      title: "Stacking the shelf",
      subtitle: "Add items, find them, and squish a list into text.",
      concepts: ["arrays", "methods"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Arrays are bossable" },
        {
          type: "p",
          text: ".push() adds an item to the end. .indexOf() tells you where something sits (or -1 if it ghosted you). .join() melts the whole list into one string with a separator you choose. .slice() copies out a section without touching the original.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const cart = ["milk", "eggs"];\ncart.push("bread");\nconsole.log(cart.indexOf("eggs")); // 1\nconsole.log(cart.join(", "));      // milk, eggs, bread\nconsole.log(cart.slice(0, 2));     // [ \'milk\', \'eggs\' ]',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Indexes start at 0, so the first item is position 0. .join(\", \") is the classic way to print a list as a neat comma-separated line.",
        },
        {
          type: "p",
          text: "The snack list below is missing chips. Push chips onto it, then print the whole list joined with commas.",
        },
      ],
      starter:
        'const snacks = ["popcorn", "pretzels"];\n// Push "chips" onto snacks, then print the list joined with ", "\n',
      solution:
        'const snacks = ["popcorn", "pretzels"];\nsnacks.push("chips");\nconsole.log(snacks.join(", "));\n',
      checks: [
        { label: "Add an item with .push(", kind: "codeContains", value: ".push(" },
        { label: "Combine the list with .join(", kind: "codeContains", value: ".join(" },
        { label: "Print the new chips item", kind: "stdoutContains", value: "chips" },
        { label: "All three snacks appear in order", kind: "stdoutMatches", value: "popcorn[\\s\\S]*pretzels[\\s\\S]*chips" },
      ],
      hints: [
        "Call snacks.push(\"chips\") to tack it onto the end.",
        "Then console.log(snacks.join(\", \")) to print them as one line.",
        'Two lines: snacks.push("chips"); console.log(snacks.join(", "));',
      ],
      wellDone: "You grew the list and printed it cleanly. Real apps shuffle arrays exactly like this.",
    },
    {
      id: "node-sort-reverse",
      track: "node",
      title: "Put it in order (then ruin it)",
      subtitle: "Sort an array, flip it around, and print the result.",
      concepts: ["arrays", "sort", "reverse"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Order and chaos, on demand" },
        {
          type: "p",
          text: ".sort() arranges items (alphabetically by default), and .reverse() flips the whole array end to end. Chain them and you can sort a list, then turn it upside down.",
        },
        {
          type: "code",
          lang: "javascript",
          text: 'const letters = ["c", "a", "b"];\nletters.sort();\nconsole.log(letters.join("")); // abc\nletters.reverse();\nconsole.log(letters.join("")); // cba',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Heads up: .sort() and .reverse() change the original array in place, unlike map or slice. Handy, but it means the old order is gone.",
        },
        {
          type: "p",
          text: "Take the names below, sort them alphabetically, then reverse them. Print the final list joined with commas.",
        },
      ],
      starter:
        'const names = ["Mia", "Ada", "Leo"];\n// Sort names alphabetically, reverse them, then print joined with ", "\n',
      solution:
        'const names = ["Mia", "Ada", "Leo"];\nnames.sort();\nnames.reverse();\nconsole.log(names.join(", "));\n',
      checks: [
        { label: "Sort the array with .sort(", kind: "codeContains", value: ".sort(" },
        { label: "Flip it with .reverse(", kind: "codeContains", value: ".reverse(" },
        { label: "Print the reversed-sorted list", kind: "stdoutContains", value: "Mia, Leo, Ada" },
      ],
      hints: [
        "Call names.sort() first to get Ada, Leo, Mia.",
        "Then names.reverse() flips it to Mia, Leo, Ada.",
        'Finish with console.log(names.join(", ")) to print the final order.',
      ],
      wellDone: "Sorted, reversed, printed. You can now wrangle a list into any order you like.",
    },
  ],
};
