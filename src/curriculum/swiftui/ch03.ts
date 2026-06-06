import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "swiftui-state",
  title: "State & Buttons",
  glyph: "🎛️",
  summary:
    "Give your view a memory and a button to poke it. Build a counter that actually counts.",
  lessons: [
    {
      id: "swiftui-state-declare",
      track: "swiftui",
      title: "A view with a memory",
      subtitle: "Store a number and show it on screen.",
      concepts: ["@State", "Text"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Views forget everything" },
        {
          type: "p",
          text: "A SwiftUI view is rebuilt from scratch constantly, so a plain variable inside it has the memory of a goldfish. The @State property wrapper tells SwiftUI to hang onto a value between rebuilds — that value belongs to the view and survives.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'struct ScoreView: View {\n  @State private var score = 100\n\n  var body: some View {\n    Text("Score: \\(score)")\n  }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "Use \\(...) inside a string to drop a value into the text. Text(\"count: \\(count)\") becomes count: 0.",
        },
        {
          type: "p",
          text: "Add a @State property named count that starts at 0, then show it inside a Text.",
        },
      ],
      starter:
        "import SwiftUI\n\nstruct CounterView: View {\n  // TODO: add a @State property called count starting at 0\n\n  var body: some View {\n    // TODO: show the count in a Text\n    Text(\"...\")\n  }\n}\n",
      solution:
        'import SwiftUI\n\nstruct CounterView: View {\n  @State private var count = 0\n\n  var body: some View {\n    Text("Count: \\(count)")\n  }\n}\n',
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Declare some View body", kind: "codeContains", value: "some View" },
        { label: "Add a @State property", kind: "codeContains", value: "@State" },
        { label: "Name it count", kind: "codeContains", value: "count" },
        {
          label: "Start count at 0",
          kind: "codeMatches",
          value: "@State[\\s\\S]*count\\s*=\\s*0",
        },
      ],
      hints: [
        "The line looks like @State private var something = startingValue.",
        "Inside Text, write \"Count: \\(count)\" so the number shows up.",
        "@State private var count = 0, then Text(\"Count: \\(count)\").",
      ],
      wellDone: "Your view now remembers a number. Time to give it a reason to change.",
    },
    {
      id: "swiftui-state-button",
      track: "swiftui",
      title: "A button that does something",
      subtitle: "Tap to add one.",
      concepts: ["Button", "@State"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Buttons run code when tapped" },
        {
          type: "p",
          text: "A Button takes a label and a closure — the block in braces that runs on every tap. Because count is @State, changing it inside that closure makes SwiftUI redraw the view automatically. No refresh button required.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'Button("Add one") {\n  count += 1\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "count += 1 is shorthand for count = count + 1. Lazy, in the good way.",
        },
        {
          type: "p",
          text: "Give the view a Button labeled Tap me whose closure bumps count up by one.",
        },
      ],
      starter:
        'import SwiftUI\n\nstruct CounterView: View {\n  @State private var count = 0\n\n  var body: some View {\n    // TODO: make the button raise the counter\n    Button("Tap me") {\n      // TODO: add one to the counter here\n    }\n  }\n}\n',
      solution:
        'import SwiftUI\n\nstruct CounterView: View {\n  @State private var count = 0\n\n  var body: some View {\n    Button("Tap me") {\n      count += 1\n    }\n  }\n}\n',
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Declare some View body", kind: "codeContains", value: "some View" },
        { label: "Keep the @State count", kind: "codeContains", value: "@State" },
        { label: "Add a Button", kind: "codeContains", value: "Button(" },
        {
          label: "Increment count on tap",
          kind: "codeMatches",
          value: "count\\s*\\+=",
        },
      ],
      hints: [
        'Button takes a title and a closure: Button("Tap me") { ... }.',
        "Inside the braces, change the state: count += 1.",
        'Button("Tap me") { count += 1 } is the whole thing.',
      ],
      wellDone: "Tapping now changes state, and state changes redraw the view. That loop is all of SwiftUI.",
    },
    {
      id: "swiftui-state-counter",
      track: "swiftui",
      title: "The whole counter",
      subtitle: "Stack the label and the button together.",
      concepts: ["VStack", "@State", "Button"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Two views, one stack" },
        {
          type: "p",
          text: "A view's body can only hand back one view. To show both the Text and the Button you wrap them in a VStack, which lines its children up vertically. Add a little .padding() so things aren't crammed against the edge.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'VStack {\n  Text("Hello")\n  Button("Wave") { }\n}\n.padding()',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided walkthrough, so your code isn't run — the checks read your source to make sure the pieces are all there.",
        },
        {
          type: "p",
          text: "Build the full counter: a VStack holding a Text that shows count and a Button(\"Tap me\") that does count += 1.",
        },
      ],
      starter:
        'import SwiftUI\n\nstruct CounterView: View {\n  @State private var count = 0\n\n  var body: some View {\n    VStack {\n      // TODO: show the count in a Text\n      // TODO: add a Button("Tap me") that does count += 1\n    }\n    .padding()\n  }\n}\n',
      solution:
        'import SwiftUI\n\nstruct CounterView: View {\n  @State private var count = 0\n\n  var body: some View {\n    VStack {\n      Text("Count: \\(count)")\n      Button("Tap me") {\n        count += 1\n      }\n    }\n    .padding()\n  }\n}\n',
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Declare some View body", kind: "codeContains", value: "some View" },
        { label: "Keep the @State count", kind: "codeContains", value: "@State" },
        { label: "Stack the views in a VStack", kind: "codeContains", value: "VStack" },
        { label: "Show count in a Text", kind: "codeContains", value: "Text(" },
        { label: "Add a Button", kind: "codeContains", value: "Button(" },
        {
          label: "Show the live count value",
          kind: "codeMatches",
          value: "Text\\([\\s\\S]*\\\\\\(count\\)",
        },
        {
          label: "Increment count on tap",
          kind: "codeMatches",
          value: "count\\s*\\+=",
        },
      ],
      hints: [
        "Put both views inside the VStack braces, one per line.",
        'The Text shows Text("Count: \\(count)") and the Button does count += 1.',
        'VStack { Text("Count: \\(count)"); Button("Tap me") { count += 1 } } — that\'s your counter.',
      ],
      wellDone: "A real, working counter: state, a label, and a button, all wired together. That's a genuine SwiftUI screen.",
    },
  ],
};
