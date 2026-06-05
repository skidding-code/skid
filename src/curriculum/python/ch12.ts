import type { Chapter } from "../types";

export const ch12: Chapter = {
  id: "py-projects",
  title: "Put It Together",
  glyph: "🏆",
  summary:
    "The capstone. Combine print, loops, conditions, functions, lists, and dicts into real little programs that do real work.",
  lessons: [
    {
      id: "py-fizzbuzz",
      track: "python",
      title: "FizzBuzz",
      subtitle: "The classic. Loops and conditions, working as one.",
      concepts: ["loops", "conditions", "modulo"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "The rite of passage" },
        {
          type: "p",
          text: "Every programmer writes FizzBuzz once. Count from 1 to 15. For multiples of 3 print Fizz. For multiples of 5 print Buzz. For multiples of both print FizzBuzz. Otherwise print the number itself.",
        },
        {
          type: "p",
          text: "The tool that makes it work is the modulo operator %, which gives the remainder of a division. If n % 3 is 0, then n divides evenly by 3.",
        },
        {
          type: "code",
          lang: "python",
          text: "for n in range(1, 4):\n    if n % 3 == 0:\n        print(\"Fizz\")\n    else:\n        print(n)",
        },
        {
          type: "callout",
          tone: "warn",
          text: "Check the both case FIRST. If you test 3 and 5 separately before testing 15, you will never reach FizzBuzz.",
        },
        {
          type: "p",
          text: "Loop from 1 to 15 and print the FizzBuzz output, one item per line.",
        },
      ],
      starter: "# Loop from 1 to 15 and apply the FizzBuzz rules\nfor n in range(1, 16):\n    pass\n",
      solution:
        'for n in range(1, 16):\n    if n % 3 == 0 and n % 5 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)\n',
      checks: [
        { label: "Loop over the numbers", kind: "codeContains", value: "for " },
        { label: "Branch with if", kind: "codeContains", value: "if " },
        { label: "Use the modulo operator", kind: "codeContains", value: "%" },
        { label: "Print FizzBuzz for 15", kind: "stdoutContains", value: "FizzBuzz" },
        { label: "Print Fizz for multiples of 3", kind: "stdoutContains", value: "Fizz" },
        { label: "Print Buzz for multiples of 5", kind: "stdoutContains", value: "Buzz" },
        { label: "Produce all 15 lines", kind: "stdoutMinLines", value: "15" },
        {
          label: "Get the order right (1, 2, Fizz, 4, Buzz)",
          kind: "stdoutMatches",
          value: "1[\\s\\S]*2[\\s\\S]*Fizz[\\s\\S]*4[\\s\\S]*Buzz",
        },
        {
          label: "End on FizzBuzz at 15",
          kind: "stdoutMatches",
          value: "Buzz[\\s\\S]*FizzBuzz",
        },
      ],
      hints: [
        "Use range(1, 16) so the loop includes 15.",
        "Test n % 3 == 0 and n % 5 == 0 together before the single cases.",
        'The order is: if (both) print "FizzBuzz", elif (3) "Fizz", elif (5) "Buzz", else print(n).',
      ],
      wellDone: "You passed the interview question every coder dreads. Loops and conditions are yours now.",
    },
    {
      id: "py-times-table",
      track: "python",
      title: "Times table",
      subtitle: "A loop that builds a tidy table of products.",
      concepts: ["loops", "range", "f-strings"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Let the loop do the multiplying" },
        {
          type: "p",
          text: "A multiplication table is just one number times 1, 2, 3, and so on. A loop counts the second factor for you, so you write the rule once and get every row.",
        },
        {
          type: "code",
          lang: "python",
          text: 'number = 7\nfor i in range(1, 4):\n    print(f"{number} x {i} = {number * i}")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "An f-string (the f before the quotes) lets you drop values straight into text with curly braces. Clean and readable.",
        },
        {
          type: "p",
          text: "Print the full times table for 7, from 7 x 1 up to 7 x 10, one row per line.",
        },
      ],
      starter: "number = 7\n# Print the times table for number, from 1 to 10\n",
      solution:
        'number = 7\nfor i in range(1, 11):\n    print(f"{number} x {i} = {number * i}")\n',
      checks: [
        { label: "Loop over the multipliers", kind: "codeContains", value: "for " },
        { label: "Multiply inside the loop", kind: "codeContains", value: "*" },
        { label: "Show the 7 x 1 row", kind: "stdoutContains", value: "7 x 1 = 7" },
        { label: "Show the 7 x 10 row", kind: "stdoutContains", value: "7 x 10 = 70" },
        { label: "Print all 10 rows", kind: "stdoutMinLines", value: "10" },
        {
          label: "Rows climb in order",
          kind: "stdoutMatches",
          value: "7 x 1 = 7[\\s\\S]*7 x 5 = 35[\\s\\S]*7 x 10 = 70",
        },
      ],
      hints: [
        "Use range(1, 11) to count from 1 through 10.",
        "Each row is number times i; print number * i.",
        'Try: print(f"{number} x {i} = {number * i}") inside the loop.',
      ],
      wellDone: "One rule, ten rows. That leverage is exactly why loops exist.",
    },
    {
      id: "py-scoreboard",
      track: "python",
      title: "The scoreboard",
      subtitle: "A list of scores, a function for the total, and a clean summary.",
      concepts: ["functions", "lists", "loops"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "Everything you know, in one program" },
        {
          type: "p",
          text: "Real programs combine pieces. Here you will hold data in a list of dictionaries, write a function that adds up the scores, loop to print each player, and finish with a total. This is the shape of countless real programs.",
        },
        {
          type: "code",
          lang: "python",
          text: 'players = [\n    {"name": "Ada", "score": 30},\n    {"name": "Linus", "score": 20},\n]\n\ndef total(rows):\n    sum = 0\n    for row in rows:\n        sum += row["score"]\n    return sum',
        },
        {
          type: "callout",
          tone: "note",
          text: "A function that returns a value keeps the math in one place. Call it whenever you need the total instead of repeating the loop.",
        },
        {
          type: "p",
          text: 'Print a line for each player as "name: score", then print "Total: N" where N is the sum from your function. Use the three players already provided.',
        },
      ],
      starter:
        'players = [\n    {"name": "Ada", "score": 30},\n    {"name": "Linus", "score": 20},\n    {"name": "Grace", "score": 50},\n]\n\n# 1) Write a function total(rows) that returns the sum of every score\n# 2) Print each player as "name: score"\n# 3) Print "Total: N"\n',
      solution:
        'players = [\n    {"name": "Ada", "score": 30},\n    {"name": "Linus", "score": 20},\n    {"name": "Grace", "score": 50},\n]\n\n\ndef total(rows):\n    running = 0\n    for row in rows:\n        running += row["score"]\n    return running\n\n\nfor player in players:\n    print(f"{player[\'name\']}: {player[\'score\']}")\n\nprint(f"Total: {total(players)}")\n',
      checks: [
        { label: "Define a function", kind: "codeContains", value: "def " },
        { label: "Return a value from it", kind: "codeContains", value: "return" },
        { label: "Loop over the players", kind: "codeContains", value: "for " },
        { label: "List the first player", kind: "stdoutContains", value: "Ada: 30" },
        { label: "List the second player", kind: "stdoutContains", value: "Linus: 20" },
        { label: "List the third player", kind: "stdoutContains", value: "Grace: 50" },
        { label: "Print the correct total", kind: "stdoutContains", value: "Total: 100" },
        { label: "Print all four lines", kind: "stdoutMinLines", value: "4" },
        {
          label: "Players first, total last",
          kind: "stdoutMatches",
          value: "Ada: 30[\\s\\S]*Grace: 50[\\s\\S]*Total: 100",
        },
      ],
      hints: [
        "Inside total(rows), start a counter at 0 and add row[\"score\"] for each row, then return it.",
        'Loop the players and print(f"{player[\'name\']}: {player[\'score\']}").',
        'After the loop: print(f"Total: {total(players)}") — the sum of 30, 20, 50 is 100.',
      ],
      wellDone: "Data, a function, a loop, and a clean summary. That is a complete program — and you built it.",
    },
  ],
};
