import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "bash-basics",
  title: "Hello, Terminal",
  glyph: "💻",
  summary: "Boss the shell around. Printing text, holding values, and crunching numbers with echo.",
  lessons: [
    {
      id: "bash-echo",
      track: "bash",
      title: "Make it talk",
      subtitle: "echo is the shell shouting whatever you hand it.",
      concepts: ["echo", "strings"],
      estimatedMinutes: 3,
      intro: [
        { type: "h", text: "The shell repeats after you" },
        {
          type: "p",
          text: "The terminal is just a program waiting for orders. The simplest order is echo: it prints back whatever words you give it, then moves to a new line. No ceremony, no parentheses.",
        },
        { type: "code", lang: "bash", text: 'echo "Howdy, shell!"' },
        {
          type: "callout",
          tone: "tip",
          text: "Quotes keep your whole message in one piece. Without them the shell still works, but spaces get squashed and special characters get weird — quotes are the safe habit.",
        },
        {
          type: "p",
          text: "Your turn. Make the terminal print the greeting Hello, terminal! exactly.",
        },
      ],
      starter: "# Echo a friendly greeting on the line below\n",
      solution: 'echo "Hello, terminal!"\n',
      checks: [
        { label: "Use the echo command", kind: "codeContains", value: "echo" },
        { label: "Print Hello, terminal!", kind: "stdoutContains", value: "Hello, terminal!" },
      ],
      hints: [
        "Start the line with the word echo.",
        "Put your message in double quotes after echo.",
        'The full line is: echo "Hello, terminal!"',
      ],
      wellDone: "That's your first command. The shell will say anything you tell it to — use this power responsibly.",
    },
    {
      id: "bash-variables",
      track: "bash",
      title: "Boxes that hold words",
      subtitle: "Stash a value in a variable, then echo it back out.",
      concepts: ["variables", "$expansion"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Name it once, reuse it" },
        {
          type: "p",
          text: "A variable is a labelled box. You fill it with name=value (no spaces around the = — the shell is fussy about that). To get the value back out, you put a $ in front of the name.",
        },
        { type: "code", lang: "bash", text: 'pet="otter"\necho "I have a pet $pet"' },
        {
          type: "callout",
          tone: "note",
          text: "name=value with NO spaces stores the value. $name reads it back. Forget the $ and you just print the literal word name.",
        },
        {
          type: "p",
          text: "Make a variable called name holding Ada, then echo a sentence that uses $name. The output should contain the word Ada.",
        },
      ],
      starter: "# Put a name in a variable, then echo it using $name\n",
      solution: 'name="Ada"\necho "Hello, $name!"\n',
      checks: [
        { label: "Create a variable with name=...", kind: "codeContains", value: 'name="' },
        { label: "Read it back with a $", kind: "codeContains", value: "$" },
        { label: "Print the value Ada", kind: "stdoutContains", value: "Ada" },
      ],
      hints: [
        "Set the box first: name=\"Ada\" with no spaces around the =.",
        "Read the box back by writing $name inside your echo.",
        'Two lines: name="Ada"  then  echo "Hello, $name!"',
      ],
      wellDone: "You just taught the shell to remember things. Variables are how every script stops repeating itself.",
    },
    {
      id: "bash-arithmetic",
      track: "bash",
      title: "Shell does the sums",
      subtitle: "Wrap math in $(( )) and let the terminal count.",
      concepts: ["arithmetic", "$(( ))"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Numbers, not text" },
        {
          type: "p",
          text: "By default the shell treats everything as words, so echo 2 + 2 just prints 2 + 2 like a parrot. To actually do math, wrap the sum in $(( )). Inside those double parentheses the shell adds, subtracts (-), multiplies (*), and divides (/).",
        },
        { type: "code", lang: "bash", text: 'echo $(( 2 + 3 ))     # 5\necho $(( 10 * 4 ))    # 40' },
        {
          type: "callout",
          tone: "warn",
          text: "No $(( )) means no math. echo 6 * 7 prints the symbols (and * may even list your files). Always wrap arithmetic in $(( )).",
        },
        {
          type: "p",
          text: "A week has 7 days and each day has 24 hours. Echo how many hours are in one week — let the shell multiply it for you.",
        },
      ],
      starter: "# Echo the number of hours in a week, using $(( ))\n",
      solution: "echo $(( 24 * 7 ))\n",
      checks: [
        { label: "Use arithmetic with $(( ))", kind: "codeContains", value: "$((" },
        { label: "Echo the result", kind: "codeContains", value: "echo" },
        { label: "Print the answer 168", kind: "stdoutContains", value: "168" },
      ],
      hints: [
        "Multiply hours per day by days per week: 24 and 7.",
        "Wrap the multiplication in $(( )) so the shell computes it.",
        "echo $(( 24 * 7 )) — let the shell do the math instead of typing 168.",
      ],
      wellDone: "The terminal is now your calculator. $(( )) is the gateway to loops, counters, and real scripts.",
    },
  ],
};
