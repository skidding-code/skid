import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "swiftui-stacks",
  title: "Stacks & Layout",
  glyph: "🧱",
  summary: "Stack views like Lego bricks — vertically, horizontally — then give them room to breathe with spacing and padding.",
  lessons: [
    {
      id: "swiftui-vstack",
      track: "swiftui",
      title: "Stack 'em up",
      subtitle: "Put two Texts in a VStack so they sit one above the other.",
      concepts: ["VStack", "Text", "some View"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "One view is lonely" },
        {
          type: "p",
          text: "A SwiftUI body can only hand back a single view. So how do you show two lines of text? You wrap them in a container, and the simplest one is VStack — a Vertical Stack. Everything inside it gets stacked top to bottom.",
        },
        {
          type: "p",
          text: "The body returns some View — Swift's way of saying \"some specific view, I'll figure out the exact type for you.\" You never have to spell it out.",
        },
        {
          type: "code",
          lang: "swift",
          text: "struct WelcomeView: View {\n    var body: some View {\n        VStack {\n            Text(\"Hello\")\n            Text(\"World\")\n        }\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "Guided walkthrough: your Swift isn't run, it's read. So write it like Xcode is watching.",
        },
        {
          type: "p",
          text: "Build a VStack containing two Text views — give them any two short strings you like.",
        },
      ],
      starter:
        "import SwiftUI\n\nstruct WelcomeView: View {\n    var body: some View {\n        // TODO: return a VStack holding two Text views\n    }\n}\n",
      solution:
        "import SwiftUI\n\nstruct WelcomeView: View {\n    var body: some View {\n        VStack {\n            Text(\"Hello\")\n            Text(\"World\")\n        }\n    }\n}\n",
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Return some View", kind: "codeContains", value: "some View" },
        { label: "Use a vertical stack", kind: "codeContains", value: "VStack" },
        { label: "Add at least two Texts", kind: "codeMatches", value: "Text\\([\\s\\S]*Text\\(" },
      ],
      hints: [
        "A VStack { } wraps everything that should stack vertically.",
        "Inside the braces, list each Text on its own line — no commas needed.",
        "VStack {\n    Text(\"Hello\")\n    Text(\"World\")\n}",
      ],
      wellDone: "Two lines, one stack. You just out-engineered the lonely single view.",
    },
    {
      id: "swiftui-hstack",
      track: "swiftui",
      title: "Side by side",
      subtitle: "Use an HStack to put an icon next to a label.",
      concepts: ["HStack", "Image(systemName:)", "Text"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Turn the stack sideways" },
        {
          type: "p",
          text: "HStack is VStack's horizontal twin — its children line up left to right. That's exactly what you want for an icon sitting next to its label.",
        },
        {
          type: "p",
          text: "For the icon, reach for SF Symbols: thousands of built-in icons you summon by name with Image(systemName:). \"star.fill\" gets you a filled star, no asset files required.",
        },
        {
          type: "code",
          lang: "swift",
          text: "struct RatingView: View {\n    var body: some View {\n        HStack {\n            Image(systemName: \"star.fill\")\n            Text(\"Five stars\")\n        }\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "SF Symbol names use dots, like heart.fill or bolt.circle. Apple's SF Symbols app lets you browse every one of them.",
        },
        {
          type: "p",
          text: "Make an HStack with an Image(systemName:) of your choice followed by a Text label.",
        },
      ],
      starter:
        "import SwiftUI\n\nstruct RatingView: View {\n    var body: some View {\n        // TODO: return an HStack with an SF Symbol Image and a Text\n    }\n}\n",
      solution:
        "import SwiftUI\n\nstruct RatingView: View {\n    var body: some View {\n        HStack {\n            Image(systemName: \"star.fill\")\n            Text(\"Five stars\")\n        }\n    }\n}\n",
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Return some View", kind: "codeContains", value: "some View" },
        { label: "Use a horizontal stack", kind: "codeContains", value: "HStack" },
        { label: "Add an SF Symbol image", kind: "codeContains", value: "Image(systemName:" },
        { label: "Add a Text label", kind: "codeContains", value: "Text(" },
      ],
      hints: [
        "HStack lays its children out horizontally instead of vertically.",
        "Image(systemName: \"star.fill\") pulls in a built-in star icon.",
        "HStack {\n    Image(systemName: \"star.fill\")\n    Text(\"Five stars\")\n}",
      ],
      wellDone: "Icon, then label, shoulder to shoulder. That's the whole row UI of half the apps on your phone.",
    },
    {
      id: "swiftui-spacing-padding",
      track: "swiftui",
      title: "Give it some air",
      subtitle: "Add spacing between stacked views and padding around the whole thing.",
      concepts: ["VStack(spacing:)", ".padding()", "layout"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Cramped views are sad views" },
        {
          type: "p",
          text: "By default a VStack packs its children snugly together. Pass a spacing: value and SwiftUI inserts that many points of gap between each child — instant breathing room.",
        },
        {
          type: "p",
          text: "Spacing handles the gaps inside the stack. To keep the stack from hugging the edges of the screen, add .padding() — a modifier that pushes empty space around the whole view.",
        },
        {
          type: "code",
          lang: "swift",
          text: "struct AiryView: View {\n    var body: some View {\n        VStack(spacing: 16) {\n            Text(\"Top\")\n            Text(\"Bottom\")\n        }\n        .padding()\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "Modifiers like .padding() attach to the view they follow and hand back a new, modified view — so you can chain them all day.",
        },
        {
          type: "p",
          text: "Give your VStack a spacing value, then add .padding() to the stack itself.",
        },
      ],
      starter:
        "import SwiftUI\n\nstruct AiryView: View {\n    var body: some View {\n        // TODO: VStack(spacing:) with two Texts, then .padding() the stack\n    }\n}\n",
      solution:
        "import SwiftUI\n\nstruct AiryView: View {\n    var body: some View {\n        VStack(spacing: 16) {\n            Text(\"Top\")\n            Text(\"Bottom\")\n        }\n        .padding()\n    }\n}\n",
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Return some View", kind: "codeContains", value: "some View" },
        { label: "Use a vertical stack", kind: "codeContains", value: "VStack" },
        { label: "Set the stack spacing", kind: "codeMatches", value: "VStack\\(\\s*spacing:" },
        { label: "Keep at least two Texts", kind: "codeMatches", value: "Text\\([\\s\\S]*Text\\(" },
        { label: "Add padding around it", kind: "codeContains", value: ".padding()" },
      ],
      hints: [
        "VStack takes an argument: VStack(spacing: 16) { ... }.",
        ".padding() goes on its own line right after the stack's closing brace.",
        "VStack(spacing: 16) {\n    Text(\"Top\")\n    Text(\"Bottom\")\n}\n.padding()",
      ],
      wellDone: "Spacing inside, padding outside — your layout finally has room to stretch. Designers everywhere nod approvingly.",
    },
  ],
};
