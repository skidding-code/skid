import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "swiftui-views",
  title: "Your First View",
  glyph: "📱",
  summary:
    "Put words on a screen with SwiftUI. Views, the body, and the modifiers that make them look like you meant it.",
  lessons: [
    {
      id: "swiftui-hello-view",
      track: "swiftui",
      title: "Hello, View",
      subtitle: "A struct, a body, and a single line of text.",
      concepts: ["View", "body", "Text"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Everything on screen is a View" },
        {
          type: "p",
          text: "In SwiftUI, the things you see — text, buttons, images — are all Views. You build your own by making a struct that conforms to the View protocol and describing what it shows inside a body property.",
        },
        {
          type: "p",
          text: "The some View part is Swift's way of saying \"this returns a view, and I'll figure out exactly which kind for you.\" Trust it. It's good at its job.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Hello, world!")\n    }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided track — your code isn't run, it's read. Write it like you mean it and the checks will see real SwiftUI.",
        },
        {
          type: "p",
          text: 'Build a ContentView that shows the text Hello, SwiftUI! — and don\'t forget to import SwiftUI at the top, or the whole party never starts.',
        },
      ],
      starter:
        "import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        // TODO: show a Text view that says Hello, SwiftUI!\n    }\n}\n",
      solution:
        'import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Hello, SwiftUI!")\n    }\n}\n',
      checks: [
        { label: "Import the SwiftUI framework", kind: "codeContains", value: "import SwiftUI" },
        { label: "Define a struct", kind: "codeContains", value: "struct" },
        { label: "Conform to the View protocol", kind: "codeContains", value: "View" },
        { label: "Give it a body of some View", kind: "codeContains", value: "some View" },
        { label: "Show a Text view", kind: "codeContains", value: "Text(" },
        {
          label: "Make the Text say Hello, SwiftUI!",
          kind: "codeContains",
          value: "Hello, SwiftUI!",
        },
      ],
      hints: [
        "Inside body, return a Text(...) instead of leaving the TODO comment.",
        'Text takes a string in quotes: Text("...").',
        'The full line is: Text("Hello, SwiftUI!")',
      ],
      wellDone: "That's a real SwiftUI view. Apple ships entire apps that start exactly like this.",
    },
    {
      id: "swiftui-modifiers",
      track: "swiftui",
      title: "Dress it up",
      subtitle: "Modifiers change how a view looks and feels.",
      concepts: ["modifiers", "font", "padding"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A view, but make it nice" },
        {
          type: "p",
          text: "Plain text is fine, but SwiftUI lets you chain modifiers — little methods that return a tweaked version of your view. You attach them with a dot, and you can stack as many as you like.",
        },
        {
          type: "p",
          text: ".font(.title) makes the text big and headline-y. .padding() adds breathing room around it so it isn't squished against the edges.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'Text("I am important")\n    .font(.title)\n    .padding()',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Order matters with modifiers, but for font and padding you can read it top to bottom: style the text, then give it space.",
        },
        {
          type: "p",
          text: "Take your Hello, SwiftUI! text and add both .font(.title) and .padding() to it.",
        },
      ],
      starter:
        'import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Hello, SwiftUI!")\n        // TODO: give the Text a big title font and some padding\n    }\n}\n',
      solution:
        'import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Hello, SwiftUI!")\n            .font(.title)\n            .padding()\n    }\n}\n',
      checks: [
        { label: "Still importing SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Still showing a Text view", kind: "codeContains", value: "Text(" },
        { label: "Apply a font modifier", kind: "codeContains", value: ".font(" },
        { label: "Use the .title font", kind: "codeContains", value: ".font(.title)" },
        { label: "Add some padding", kind: "codeContains", value: ".padding()" },
      ],
      hints: [
        "Modifiers attach to the Text with a dot, one per line.",
        "Replace the TODO with .font(.title) on one line.",
        "Then add .padding() on the next line, both indented under the Text.",
      ],
      wellDone: "Bigger and roomier in two lines. That's the modifier pattern you'll use forever.",
    },
    {
      id: "swiftui-color",
      track: "swiftui",
      title: "Add a splash of color",
      subtitle: "One more modifier, now with feeling.",
      concepts: ["modifiers", "color", "styling"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Black text is so last decade" },
        {
          type: "p",
          text: "You can keep stacking modifiers. To recolor text, add .foregroundColor(.blue) — or the newer .foregroundStyle(.blue), which does the same thing and is what Apple nudges you toward these days.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'Text("Feeling blue")\n    .font(.title)\n    .padding()\n    .foregroundColor(.blue)',
        },
        {
          type: "callout",
          tone: "note",
          text: "SwiftUI ships named colors like .blue, .red, and .green, so you don't have to memorize hex codes to make something pretty.",
        },
        {
          type: "p",
          text: "Keep your font and padding, then turn the text blue with .foregroundColor(.blue) (or .foregroundStyle(.blue) — either one counts).",
        },
      ],
      starter:
        'import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Hello, SwiftUI!")\n            .font(.title)\n            .padding()\n        // TODO: turn the text blue with a color modifier\n    }\n}\n',
      solution:
        'import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Hello, SwiftUI!")\n            .font(.title)\n            .padding()\n            .foregroundColor(.blue)\n    }\n}\n',
      checks: [
        { label: "Still importing SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Still a View struct", kind: "codeContains", value: "some View" },
        { label: "Still showing Text", kind: "codeContains", value: "Text(" },
        { label: "Kept the .title font", kind: "codeContains", value: ".font(" },
        { label: "Kept the padding", kind: "codeContains", value: ".padding()" },
        {
          label: "Color the text blue",
          kind: "codeMatches",
          value: "\\.foreground(?:Color|Style)\\(\\.blue\\)",
        },
      ],
      hints: [
        "Add one more modifier line under .padding().",
        "Use .foregroundColor(.blue) (or .foregroundStyle(.blue)) and replace the TODO.",
        "The line is: .foregroundColor(.blue)",
      ],
      wellDone: "Styled, spaced, and colored — that's a view with a personality. Ship it.",
    },
  ],
};
