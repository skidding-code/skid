import type { Chapter } from "../types";

export const ch07: Chapter = {
  id: "py-strings",
  title: "Working With Text",
  glyph: "✂️",
  summary: "Cut, reshape, and rebuild text. Strings are not fixed — bend them to your will.",
  lessons: [
    {
      id: "py-string-methods",
      track: "python",
      title: "Change the case",
      subtitle: "Strings carry tools that transform them.",
      concepts: ["methods", "len"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Strings know tricks" },
        {
          type: "p",
          text: "Every string carries built-in tools called methods. You call one by writing a dot after the string, then the method name. .upper() returns a SHOUTING copy, .lower() a quiet one. The original is never changed — you get a new string back.",
        },
        {
          type: "p",
          text: "len() is different. It is a function, not a method, and it tells you how many characters a string holds.",
        },
        {
          type: "code",
          lang: "python",
          text: 'name = "Ada"\nprint(name.upper())   # ADA\nprint(name.lower())   # ada\nprint(len(name))      # 3',
        },
        {
          type: "callout",
          tone: "tip",
          text: "A method does nothing unless you print or store its result. name.upper() on its own throws the new string away.",
        },
        {
          type: "p",
          text: "A starter word is waiting below. Print it in uppercase, print it in lowercase, then print its length.",
        },
      ],
      starter: 'word = "Python"\n# Print word in uppercase, then lowercase, then its length\n',
      solution:
        'word = "Python"\nprint(word.upper())\nprint(word.lower())\nprint(len(word))\n',
      checks: [
        { label: "Print the uppercase form", kind: "stdoutContains", value: "PYTHON" },
        { label: "Print the lowercase form", kind: "stdoutContains", value: "python" },
        { label: "Print the length 6", kind: "stdoutContains", value: "6" },
        { label: "Call the .upper() method", kind: "codeContains", value: ".upper(" },
        { label: "Use len()", kind: "codeContains", value: "len(" },
      ],
      hints: [
        "Attach the method with a dot: word.upper().",
        "len() takes the string inside its parentheses: len(word).",
        'The three lines are print(word.upper()), print(word.lower()), print(len(word)).',
      ],
      wellDone: "Three transformations, zero changes to the original. That is how methods work.",
    },
    {
      id: "py-slicing",
      track: "python",
      title: "Reach inside",
      subtitle: "Index and slice to grab pieces of a string.",
      concepts: ["indexing", "slicing"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Counting starts at zero" },
        {
          type: "p",
          text: "A string is a sequence of characters, each with a position. The first character is at index 0, not 1. Square brackets pull out one character by its index.",
        },
        {
          type: "p",
          text: "A slice grabs a range. text[0:3] returns characters at positions 0, 1, and 2 — the start is included, the stop is not.",
        },
        {
          type: "code",
          lang: "python",
          text: 'text = "Rocket"\nprint(text[0])     # R\nprint(text[0:4])   # Rock',
        },
        {
          type: "callout",
          tone: "note",
          text: "A slice never reaches its stop number. text[0:4] stops just before index 4.",
        },
        {
          type: "p",
          text: "From the starter word, print the first letter on its own, then print the first three letters as a slice.",
        },
      ],
      starter: 'word = "Galaxy"\n# Print the first letter, then the first three letters\n',
      solution: 'word = "Galaxy"\nprint(word[0])\nprint(word[0:3])\n',
      checks: [
        { label: "Print the first letter G", kind: "stdoutContains", value: "G" },
        { label: "Print the slice Gal", kind: "stdoutContains", value: "Gal" },
        { label: "Index the first character", kind: "codeContains", value: "[0]" },
        { label: "Use a slice with a colon", kind: "codeMatches", value: "\\[\\s*0\\s*:\\s*3\\s*\\]" },
      ],
      hints: [
        "The first character is word[0], because counting starts at 0.",
        "A slice uses a colon: word[start:stop].",
        "The first three letters are word[0:3] — stop before index 3.",
      ],
      wellDone: "Index for one, slice for many. You now reach into any string.",
    },
    {
      id: "py-replace-split",
      track: "python",
      title: "Rewrite a sentence",
      subtitle: "Swap words out and break text into pieces.",
      concepts: ["replace", "split"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Two ways to reshape text" },
        {
          type: "p",
          text: ".replace(old, new) returns a copy with every match of old swapped for new. It is exact and case-sensitive — \"Cat\" and \"cat\" are different.",
        },
        {
          type: "p",
          text: ".split() chops a string into a list of words, breaking on the spaces between them. The result is a list, and len() counts how many pieces you got.",
        },
        {
          type: "code",
          lang: "python",
          text: 'line = "red car"\nprint(line.replace("red", "blue"))   # blue car\nprint(line.split())                  # [\'red\', \'car\']',
        },
        {
          type: "callout",
          tone: "warn",
          text: ".replace() does not edit the sentence in place. Print its result or store it, or the new copy is lost.",
        },
        {
          type: "p",
          text: "Take the starter sentence. Print a copy with the word slow swapped for fast, then print how many words the original sentence contains.",
        },
      ],
      starter:
        'sentence = "the slow brown fox"\n# Print the sentence with "slow" replaced by "fast"\n# Then print how many words it has\n',
      solution:
        'sentence = "the slow brown fox"\nprint(sentence.replace("slow", "fast"))\nprint(len(sentence.split()))\n',
      checks: [
        { label: "Print the rewritten sentence", kind: "stdoutContains", value: "the fast brown fox" },
        { label: "Print the word count 4", kind: "stdoutContains", value: "4" },
        { label: "Use the .replace() method", kind: "codeContains", value: ".replace(" },
        { label: "Use the .split() method", kind: "codeContains", value: ".split(" },
      ],
      hints: [
        "Old word first, new word second: sentence.replace(\"slow\", \"fast\").",
        "sentence.split() gives a list of words; len() counts a list too.",
        "The two lines are print(sentence.replace(\"slow\", \"fast\")) and print(len(sentence.split())).",
      ],
      wellDone: "Replace to edit, split to count. You can now reshape any sentence.",
    },
  ],
};
