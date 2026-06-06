import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "bash-control",
  title: "Loops & Choices",
  glyph: "🔁",
  summary: "Make the shell repeat itself and make up its mind. Loops and if.",
  lessons: [
    {
      id: "bash-for-loop",
      track: "bash",
      title: "Round and round",
      subtitle: "A for loop does the boring part for you.",
      concepts: ["for loop", "echo"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Say it three times" },
        {
          type: "p",
          text: "Copy-pasting the same echo over and over is how repetitive strain injuries are born. A for loop walks through a list of values and runs the same block for each one. The loop variable holds the current value, and you read it back with a dollar sign.",
        },
        {
          type: "code",
          lang: "bash",
          text: 'for fruit in apple pear plum; do\n  echo "I like $fruit"\ndone',
        },
        {
          type: "callout",
          tone: "tip",
          text: "do opens the loop body, done closes it. Forget done and the shell just sits there waiting for you, like a polite but confused waiter.",
        },
        {
          type: "p",
          text: "Loop over 1 2 3 and print a line for each number. Get the words Number 1, Number 2, and Number 3 into the output.",
        },
      ],
      starter: '# Print "Number 1", "Number 2", "Number 3" using a loop over 1 2 3\n',
      solution: 'for i in 1 2 3; do\n  echo "Number $i"\ndone\n',
      checks: [
        { label: "Start a for loop", kind: "codeContains", value: "for" },
        { label: "Open the loop body with do", kind: "codeContains", value: "do" },
        { label: "Close the loop with done", kind: "codeContains", value: "done" },
        { label: "Print Number 1", kind: "stdoutContains", value: "Number 1" },
        {
          label: "Count up 1, 2, 3 in order",
          kind: "stdoutMatches",
          value: "Number 1[\\s\\S]*Number 2[\\s\\S]*Number 3",
        },
      ],
      hints: [
        "The shape is: for i in 1 2 3; do ... done",
        "Inside the loop, echo \"Number $i\" — the $i becomes the current value.",
        'Full answer: for i in 1 2 3; do echo "Number $i"; done',
      ],
      wellDone: "One loop, three lines of output. You just made the computer do your reps.",
    },
    {
      id: "bash-if-test",
      track: "bash",
      title: "Make up your mind",
      subtitle: "if and a test bracket let the shell decide.",
      concepts: ["if", "test", "comparison"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A fork in the road" },
        {
          type: "p",
          text: "Sometimes you only want to do something when a condition holds. if checks a test, and if the test passes it runs the then branch; otherwise it runs the else branch. The test goes inside square brackets, with spaces hugging both brackets (the shell is fussy about that).",
        },
        {
          type: "code",
          lang: "bash",
          text: 'age=20\nif [ "$age" -ge 18 ]; then\n  echo "Come on in"\nelse\n  echo "Maybe later"\nfi',
        },
        {
          type: "callout",
          tone: "note",
          text: "-gt means greater than, -ge greater-or-equal, -lt less than. They compare numbers. And fi is if spelled backwards — that is how you close the block.",
        },
        {
          type: "p",
          text: 'Set a variable x to 7. If x is greater than 5, print Big number. Otherwise print Small number. Since 7 beats 5, your output should be Big number.',
        },
      ],
      starter: '# Set x to 7, then branch on whether it beats 5\nx=\n',
      solution:
        'x=7\nif [ "$x" -gt 5 ]; then\n  echo "Big number"\nelse\n  echo "Small number"\nfi\n',
      checks: [
        { label: "Use an if statement", kind: "codeContains", value: "if" },
        { label: "Use a test bracket", kind: "codeContains", value: "[" },
        { label: "Close the if with fi", kind: "codeContains", value: "fi" },
        { label: "Print Big number", kind: "stdoutContains", value: "Big number" },
        { label: "Do not print Small number", kind: "codeContains", value: "Small number" },
      ],
      hints: [
        "First set the variable: x=7 (no spaces around the =).",
        'The test is [ "$x" -gt 5 ] — keep a space inside each bracket.',
        'Full shape: if [ "$x" -gt 5 ]; then echo "Big number"; else echo "Small number"; fi',
      ],
      wellDone: "Your shell now has opinions. 7 is a big number, and it told you so.",
    },
    {
      id: "bash-while-countdown",
      track: "bash",
      title: "Countdown",
      subtitle: "A while loop keeps going until it shouldn't.",
      concepts: ["while loop", "arithmetic"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Loop while it's true" },
        {
          type: "p",
          text: "A for loop walks a fixed list. A while loop is different: it keeps running as long as a test is true, so you decide when to stop by changing a variable inside the loop. Forget to change it and the loop runs forever, which is exciting for about one second.",
        },
        {
          type: "code",
          lang: "bash",
          text: 'n=3\nwhile [ "$n" -gt 0 ]; do\n  echo "$n"\n  n=$(( n - 1 ))\ndone',
        },
        {
          type: "callout",
          tone: "tip",
          text: "$(( )) does math. n=$(( n - 1 )) subtracts one and stores it back, nudging the loop toward its end.",
        },
        {
          type: "p",
          text: 'Count down from 3 to 1 with a while loop, then print Liftoff. Your output should show 3, 2, 1, then Liftoff.',
        },
      ],
      starter: '# Start n at 3 and count it back to 1, then announce liftoff\nn=3\n',
      solution:
        'n=3\nwhile [ "$n" -gt 0 ]; do\n  echo "$n"\n  n=$(( n - 1 ))\ndone\necho "Liftoff"\n',
      checks: [
        { label: "Use a while loop", kind: "codeContains", value: "while" },
        { label: "Open the loop body with do", kind: "codeContains", value: "do" },
        { label: "Close the loop with done", kind: "codeContains", value: "done" },
        { label: "Print Liftoff", kind: "stdoutContains", value: "Liftoff" },
        {
          label: "Count down 3, 2, 1 before liftoff",
          kind: "stdoutMatches",
          value: "3[\\s\\S]*2[\\s\\S]*1[\\s\\S]*Liftoff",
        },
      ],
      hints: [
        'The test keeps the loop alive: while [ "$n" -gt 0 ]; do ... done',
        "Inside the loop, echo \"$n\" and then shrink it with n=$(( n - 1 )).",
        'Full shape: n=3; while [ "$n" -gt 0 ]; do echo "$n"; n=$(( n - 1 )); done; echo "Liftoff"',
      ],
      wellDone: "Three, two, one, liftoff. You drove a loop all the way to zero by hand.",
    },
  ],
};
