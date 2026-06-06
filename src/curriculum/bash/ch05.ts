import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "bash-data",
  title: "Arrays & Case",
  glyph: "🗃️",
  summary: "Stash a bunch of things in one variable and branch on what you find.",
  lessons: [
    {
      id: "bash-array-basics",
      track: "bash",
      title: "A box of things",
      subtitle: "One variable, many values.",
      concepts: ["arrays", "length"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "An array holds a list" },
        {
          type: "p",
          text: "A plain variable holds one value. An array holds a whole row of them. You build one by listing values inside parentheses, separated by spaces: arr=(a b c). No commas, the shell hates commas here.",
        },
        {
          type: "p",
          text: "To read element number 0 you write ${arr[0]} (counting starts at zero, as is tradition). To ask how many things are inside, write ${#arr[@]} — the @ means all of them, the # means count them.",
        },
        { type: "code", lang: "bash", text: 'pets=(cat dog fish)\necho "${pets[0]}"\necho "${#pets[@]}"' },
        {
          type: "callout",
          tone: "tip",
          text: "Those curly braces matter. ${pets[0]} works, $pets[0] just prints the first pet followed by a confused [0].",
        },
        {
          type: "p",
          text: 'Make an array fruits=(apple banana cherry). Echo the first fruit, then echo how many fruits there are. You should see apple on one line and 3 on the next.',
        },
      ],
      starter: '# Make an array, print its first item and its length\nfruits=apple\n',
      solution: 'fruits=(apple banana cherry)\necho "${fruits[0]}"\necho "${#fruits[@]}"\n',
      checks: [
        { label: "Open the array with (", kind: "codeContains", value: "(" },
        { label: "Close the array with )", kind: "codeContains", value: ")" },
        { label: "Ask for the length with ${#...[@]}", kind: "codeContains", value: "[@]" },
        { label: "First fruit is apple", kind: "stdoutContains", value: "apple" },
        { label: "Length is 3", kind: "stdoutContains", value: "3" },
      ],
      hints: [
        "Wrap the three fruits in parentheses: fruits=(apple banana cherry).",
        "Element zero is ${fruits[0]}; the count is ${#fruits[@]}.",
        'The whole thing:\nfruits=(apple banana cherry)\necho "${fruits[0]}"\necho "${#fruits[@]}"',
      ],
      wellDone: "One variable, three fruits, zero commas. The box is packed.",
    },
    {
      id: "bash-array-loop",
      track: "bash",
      title: "Walk the row",
      subtitle: "Loop over every element.",
      concepts: ["arrays", "for"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A for loop visits each item" },
        {
          type: "p",
          text: 'To touch every value in an array, loop over "${arr[@]}". The [@] hands the loop all the elements, and the quotes keep each one intact even if it has spaces.',
        },
        {
          type: "p",
          text: "Each trip around the loop, the loop variable becomes the next element. Print it, do math on it, whatever you like — bash does the bookkeeping.",
        },
        { type: "code", lang: "bash", text: 'colors=(red green blue)\nfor c in "${colors[@]}"; do\n  echo "color: $c"\ndone' },
        {
          type: "callout",
          tone: "note",
          text: "do and done are the bookends of the loop body. Forget done and the shell waits forever for you to finish your sentence.",
        },
        {
          type: "p",
          text: 'Make an array nums=(1 2 3) and loop over it, echoing each number on its own line. Output: 1, then 2, then 3.',
        },
      ],
      starter: '# Loop over an array and echo each element\nnums=(1 2 3)\n# add your for loop here\n',
      solution: 'nums=(1 2 3)\nfor n in "${nums[@]}"; do\n  echo "$n"\ndone\n',
      checks: [
        { label: "Open the array with (", kind: "codeContains", value: "(" },
        { label: "Close the array with )", kind: "codeContains", value: ")" },
        { label: "Loop with for", kind: "codeContains", value: "for" },
        { label: "Expand all elements with [@]", kind: "codeContains", value: "[@]" },
        { label: "Prints 1, 2, 3 in order", kind: "stdoutMatches", value: "1[\\s\\S]*2[\\s\\S]*3" },
      ],
      hints: [
        'Start the loop with: for n in "${nums[@]}"; do',
        "Inside the loop, echo \"$n\". End the loop with done on its own line.",
        'The whole loop:\nfor n in "${nums[@]}"; do\n  echo "$n"\ndone',
      ],
      wellDone: "You walked the whole row without tripping over a single done. Nicely paced.",
    },
    {
      id: "bash-case-branch",
      track: "bash",
      title: "Pick a door",
      subtitle: "case matches a value against patterns.",
      concepts: ["case", "branching"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "case is a tidy stack of ifs" },
        {
          type: "p",
          text: "When a variable could be one of several values, a pile of if/elif gets ugly fast. case takes one value and checks it against patterns. The first pattern that matches runs, then case stops looking.",
        },
        {
          type: "p",
          text: "Each pattern ends with ) and each branch ends with ;;. The pattern * is the catch-all default. The whole block opens with case and closes with esac — that is case spelled backwards, the shell's idea of a joke.",
        },
        { type: "code", lang: "bash", text: 'fruit="apple"\ncase "$fruit" in\n  apple) echo "crunchy" ;;\n  banana) echo "squishy" ;;\n  *) echo "unknown" ;;\nesac' },
        {
          type: "callout",
          tone: "warn",
          text: "Those double semicolons ;; are not optional. One semicolon is a syntax error waiting to ruin your afternoon.",
        },
        {
          type: "p",
          text: 'Set pet="dog" and use a case that echoes "woof" for dog, "meow" for cat, and "???" for anything else. With dog, it should print woof.',
        },
      ],
      starter: '# Use a case statement to bark for dog\npet="dog"\necho "$pet"\n',
      solution: 'pet="dog"\ncase "$pet" in\n  dog) echo "woof" ;;\n  cat) echo "meow" ;;\n  *) echo "???" ;;\nesac\n',
      checks: [
        { label: "Open with case", kind: "codeContains", value: "case" },
        { label: "Close with esac", kind: "codeContains", value: "esac" },
        { label: "Patterns end with )", kind: "codeContains", value: ")" },
        { label: "Dog says woof", kind: "stdoutContains", value: "woof" },
      ],
      hints: [
        'Start with: case "$pet" in',
        "Each branch looks like: dog) echo \"woof\" ;; — note the close paren and the double semicolon.",
        'The whole block:\ncase "$pet" in\n  dog) echo "woof" ;;\n  cat) echo "meow" ;;\n  *) echo "???" ;;\nesac',
      ],
      wellDone: "One value, three doors, and case picked the right one. No elif pileup in sight.",
    },
    {
      id: "bash-string-transform",
      track: "bash",
      title: "Reshape a word",
      subtitle: "Uppercase and measure without leaving bash.",
      concepts: ["parameter expansion", "strings"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Bash can reshape strings on its own" },
        {
          type: "p",
          text: "You already piped text through tr to shout. Bash can do it without a pipe at all. ${var^^} gives you the value in ALL CAPS, and ${var,,} gives it back in lowercase.",
        },
        {
          type: "p",
          text: "Need a length? ${#var} counts the characters in the string — same # trick as array counting, just pointed at a plain variable this time.",
        },
        { type: "code", lang: "bash", text: 'word="hello"\necho "${word^^}"\necho "${#word}"' },
        {
          type: "callout",
          tone: "tip",
          text: "${word^^} shouts the whole word; a single ${word^} would only capitalize the first letter. Two carets, full volume.",
        },
        {
          type: "p",
          text: 'Set name="bash" and echo it uppercased, then echo its length. You should see BASH, then 4.',
        },
      ],
      starter: '# Uppercase the word and print its length\nname="bash"\necho "$name"\n',
      solution: 'name="bash"\necho "${name^^}"\necho "${#name}"\n',
      checks: [
        { label: "Uppercase with ^^", kind: "codeContains", value: "^^" },
        { label: "Measure length with ${#...}", kind: "codeContains", value: "${#name}" },
        { label: "Shouts BASH", kind: "stdoutContains", value: "BASH" },
        { label: "Length is 4", kind: "stdoutContains", value: "4" },
      ],
      hints: [
        "Uppercase is ${name^^} — two carets after the variable name.",
        "Length is ${#name} — a hash right after the opening brace.",
        'The whole thing:\nname="bash"\necho "${name^^}"\necho "${#name}"',
      ],
      wellDone: "No pipe, no tr, just bash flexing on the string by itself. Show-off.",
    },
  ],
};
