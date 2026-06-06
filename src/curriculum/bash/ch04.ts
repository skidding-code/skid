import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "bash-functions",
  title: "Functions & Args",
  glyph: "🧰",
  summary: "Bottle up a few lines of shell, give them a name, and hand them arguments.",
  lessons: [
    {
      id: "bash-function-define",
      track: "bash",
      title: "Name your noise",
      subtitle: "Define a function and call it with an argument.",
      concepts: ["functions", "arguments"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A function is a saved command" },
        {
          type: "p",
          text: "A function bundles some shell into a name you can call later. Write name() { ... } and the stuff inside the curly braces becomes the new command. Defining it does nothing on its own — you have to call the name to run it.",
        },
        {
          type: "p",
          text: "Inside the function, $1 is the first argument you passed in. So greet bob runs the body with $1 standing in for bob.",
        },
        { type: "code", lang: "bash", text: 'greet() { echo "Hi $1"; }\ngreet bob' },
        {
          type: "callout",
          tone: "tip",
          text: "Semicolons matter on one line: echo ...; then } . Or spread it over several lines like the example.",
        },
        {
          type: "p",
          text: 'Define a function called greet that echoes "Hi $1", then call it with the argument World so it prints Hi World.',
        },
      ],
      starter: '# Define greet() so it echoes "Hi $1", then call it with World\n# greet World\n',
      solution: 'greet() { echo "Hi $1"; }\ngreet World\n',
      checks: [
        { label: "Define a function named greet", kind: "codeMatches", value: "greet\\s*\\(\\s*\\)" },
        { label: "Use the first argument $1", kind: "codeContains", value: "$1" },
        { label: "Greets World", kind: "stdoutContains", value: "Hi World" },
      ],
      hints: [
        "The shape is name() { echo ...; }, then on the next line just write the name plus an argument.",
        'Inside the braces use "Hi $1" so it echoes whatever you pass in.',
        'The whole thing:\ngreet() { echo "Hi $1"; }\ngreet World',
      ],
      wellDone: "You taught the shell a new word. Now it greets on command, no copy-paste required.",
    },
    {
      id: "bash-function-return",
      track: "bash",
      title: "Catch what it echoes",
      subtitle: "Capture a function's output with $(...).",
      concepts: ["functions", "command substitution"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Functions hand back text by echoing" },
        {
          type: "p",
          text: "Bash functions do not really return values the way other languages do — their return is just an exit number. The trick: have the function echo its result, then catch that printout with $(...). Whatever the function prints becomes the value.",
        },
        {
          type: "p",
          text: "So result=$(double 4) runs double, grabs what it echoed, and stores it in result. Then you can use $result however you like.",
        },
        { type: "code", lang: "bash", text: 'double() { echo $(( $1 * 2 )); }\nresult=$(double 4)\necho "Double is $result"' },
        {
          type: "callout",
          tone: "note",
          text: "$(( )) does math; $( ) captures output. Two different sets of parentheses, two different jobs.",
        },
        {
          type: "p",
          text: 'Write a function loud that echoes "$1!!!", capture loud hey into a variable, and echo that variable so the output contains hey!!!.',
        },
      ],
      starter: '# Make loud() echo "$1!!!", then capture loud hey and echo the result\n# msg=$(loud hey)\n# echo "$msg"\n',
      solution: 'loud() { echo "$1!!!"; }\nmsg=$(loud hey)\necho "$msg"\n',
      checks: [
        { label: "Define a function named loud", kind: "codeMatches", value: "loud\\s*\\(\\s*\\)" },
        { label: "Capture the output with $( )", kind: "codeMatches", value: "\\$\\(loud" },
        { label: "Output contains hey!!!", kind: "stdoutContains", value: "hey!!!" },
      ],
      hints: [
        'Define loud() { echo "$1!!!"; } first so it prints its argument with three bangs.',
        "Use msg=$(loud hey) to run loud and stash whatever it printed in msg.",
        'The whole thing:\nloud() { echo "$1!!!"; }\nmsg=$(loud hey)\necho "$msg"',
      ],
      wellDone: "A function that echoes plus $(...) to catch it — that is the bash version of return. Sneaky and effective.",
    },
    {
      id: "bash-function-many-args",
      track: "bash",
      title: "How many did you bring?",
      subtitle: "Use $1, $2, and $# for several arguments.",
      concepts: ["arguments", "$#"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Every argument gets a number" },
        {
          type: "p",
          text: "Pass more than one argument and they line up: $1 is the first, $2 the second, $3 the third, and so on. Separate arguments with spaces when you call the function.",
        },
        {
          type: "p",
          text: "There is also $#, which counts how many arguments arrived. It does not print them — it just tells you the total. Handy when you want to react to how much got passed in.",
        },
        { type: "code", lang: "bash", text: 'info() { echo "$1 and $2, that is $# args"; }\ninfo cats dogs' },
        {
          type: "callout",
          tone: "tip",
          text: "info cats dogs sends two arguments, so $1 is cats, $2 is dogs, and $# is 2.",
        },
        {
          type: "p",
          text: 'Write a function pair that echoes "$1 + $2 = $# items" and call it with apple banana. The output should contain apple + banana = 2 items.',
        },
      ],
      starter: '# pair() should echo "$1 + $2 = $# items"; call it with apple banana\n# pair apple banana\n',
      solution: 'pair() { echo "$1 + $2 = $# items"; }\npair apple banana\n',
      checks: [
        { label: "Define a function named pair", kind: "codeMatches", value: "pair\\s*\\(\\s*\\)" },
        { label: "Use the second argument $2", kind: "codeContains", value: "$2" },
        { label: "Use the argument count $#", kind: "codeContains", value: "$#" },
        { label: "Output reads apple + banana = 2 items", kind: "stdoutContains", value: "apple + banana = 2 items" },
      ],
      hints: [
        'Inside the braces, reference all three: "$1 + $2 = $# items".',
        "Call it as pair apple banana — two space-separated arguments make $# equal 2.",
        'The whole thing:\npair() { echo "$1 + $2 = $# items"; }\npair apple banana',
      ],
      wellDone: "Numbered args and a head count — your functions can now juggle as many inputs as you throw at them.",
    },
  ],
};
