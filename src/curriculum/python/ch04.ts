import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "py-loops",
  title: "Again and Again",
  glyph: "🔁",
  summary: "Stop copy-pasting. Make the computer repeat work with loops.",
  lessons: [
    {
      id: "py-for-range",
      track: "python",
      title: "Count with a for loop",
      subtitle: "Repeat a line without writing it five times.",
      concepts: ["for", "range"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Let the loop do the typing" },
        {
          type: "p",
          text: "A for loop runs the same block of code over and over. Pair it with range to walk through a run of numbers. range(1, 6) hands you 1, 2, 3, 4, 5 — the start is included, the end is not.",
        },
        { type: "code", lang: "python", text: "for n in range(1, 4):\n    print(n)" },
        {
          type: "callout",
          tone: "warn",
          text: "The line under for must be indented. That indentation is what marks the body of the loop.",
        },
        {
          type: "p",
          text: "Print the numbers 1 through 5, one per line, using a for loop and range.",
        },
      ],
      starter: "# Print 1, 2, 3, 4, 5 using a for loop\n",
      solution: "for n in range(1, 6):\n    print(n)\n",
      checks: [
        { label: "Use a for loop", kind: "codeContains", value: "for" },
        { label: "Use range", kind: "codeContains", value: "range(" },
        { label: "Print 5 lines", kind: "stdoutMinLines", value: "5" },
        { label: "Count 1 through 5 in order", kind: "stdoutMatches", value: "1[\\s\\S]*2[\\s\\S]*3[\\s\\S]*4[\\s\\S]*5" },
      ],
      hints: [
        "Start with: for n in range(1, 6):",
        "On the next line, indent and print n.",
        "The full loop is: for n in range(1, 6):\\n    print(n)",
      ],
      wellDone: "One short loop replaced five print lines. That is the entire point of looping.",
    },
    {
      id: "py-accumulate",
      track: "python",
      title: "Add it all up",
      subtitle: "Keep a running total inside a loop.",
      concepts: ["loops", "accumulator", "variables"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "A bucket that fills as you loop" },
        {
          type: "p",
          text: "To total a sequence, keep a variable that grows on every pass. Start it at 0 before the loop, then add the current number each time around. After the loop ends, the variable holds the sum.",
        },
        { type: "code", lang: "python", text: "total = 0\nfor n in range(1, 4):\n    total = total + n\nprint(total)   # 6" },
        {
          type: "callout",
          tone: "note",
          text: "total = total + n means take the old total, add n, and store the result back in total.",
        },
        {
          type: "p",
          text: "Add up the numbers 1 through 10 and print the total. The answer is 55.",
        },
      ],
      starter: "# Sum the numbers 1 through 10, then print the total\ntotal = 0\n",
      solution: "total = 0\nfor n in range(1, 11):\n    total = total + n\nprint(total)\n",
      checks: [
        { label: "Use a for loop", kind: "codeContains", value: "for" },
        { label: "Use range", kind: "codeContains", value: "range(" },
        { label: "Print the total 55", kind: "stdoutContains", value: "55" },
      ],
      hints: [
        "Loop with for n in range(1, 11): — that gives you 1 through 10.",
        "Inside the loop, do total = total + n.",
        "After the loop (not indented), print(total). The result is 55.",
      ],
      wellDone: "You built an accumulator. The same pattern totals prices, scores, anything.",
    },
    {
      id: "py-while-countdown",
      track: "python",
      title: "Countdown to liftoff",
      subtitle: "Loop while a condition is still true.",
      concepts: ["while", "conditions"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Loop until you say stop" },
        {
          type: "p",
          text: "A while loop repeats as long as its condition stays true. You must change something inside the loop so the condition eventually becomes false — otherwise the loop never ends.",
        },
        { type: "code", lang: "python", text: "n = 3\nwhile n >= 1:\n    print(n)\n    n = n - 1" },
        {
          type: "callout",
          tone: "warn",
          text: "Forget to shrink n and the loop runs forever. Every while loop needs a way out.",
        },
        {
          type: "p",
          text: "Count down from 5 to 1, one per line, then print Liftoff! at the end.",
        },
      ],
      starter: "# Count down 5, 4, 3, 2, 1 with a while loop, then print Liftoff!\nn = 5\n",
      solution: 'n = 5\nwhile n >= 1:\n    print(n)\n    n = n - 1\nprint("Liftoff!")\n',
      checks: [
        { label: "Use a while loop", kind: "codeContains", value: "while" },
        { label: "Count down 5 to 1 in order", kind: "stdoutMatches", value: "5[\\s\\S]*4[\\s\\S]*3[\\s\\S]*2[\\s\\S]*1" },
        { label: "End with Liftoff!", kind: "stdoutContains", value: "Liftoff!" },
      ],
      hints: [
        "Set n = 5, then start while n >= 1:",
        "Inside the loop print n, then do n = n - 1 to shrink it.",
        'After the loop, not indented, print("Liftoff!").',
      ],
      wellDone: "You controlled exactly when a loop stops. That command keeps it finite and safe.",
    },
  ],
};
