import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "swiftui-nav",
  title: "Navigation & Input",
  glyph: "🧭",
  summary:
    "Send the user somewhere new and let them type back. Push detail screens, capture text, and flip switches — the parts of an app that actually do things.",
  lessons: [
    {
      id: "swiftui-nav-stack",
      track: "swiftui",
      title: "Push to a detail screen",
      subtitle: "Tap a row, slide to a new view.",
      concepts: ["NavigationStack", "NavigationLink"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Every app needs a forward button" },
        {
          type: "p",
          text: "A NavigationStack is the container that gives you that classic push-and-pop screen flow. Inside it, a NavigationLink is a tappable thing: you hand it a label to show and a destination view to slide in. Tap the label, the destination pushes on; tap Back, it pops off. No segues, no storyboards, no tears.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'NavigationStack {\n  NavigationLink("See details") {\n    Text("The details!")\n  }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "The first argument is what the user taps. The closure is the screen they land on. Two jobs, one tidy call.",
        },
        {
          type: "p",
          text: 'Wrap a NavigationStack around a NavigationLink labeled "Open detail" whose destination is a Text view.',
        },
      ],
      starter:
        'import SwiftUI\n\nstruct MenuView: View {\n  var body: some View {\n    NavigationStack {\n      // TODO: add a NavigationLink("Open detail") that goes to a Text\n      Text("Main menu")\n    }\n  }\n}\n',
      solution:
        'import SwiftUI\n\nstruct MenuView: View {\n  var body: some View {\n    NavigationStack {\n      NavigationLink("Open detail") {\n        Text("You found the detail screen.")\n      }\n    }\n  }\n}\n',
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Declare some View body", kind: "codeContains", value: "some View" },
        { label: "Wrap it in a NavigationStack", kind: "codeContains", value: "NavigationStack" },
        { label: "Add a NavigationLink", kind: "codeContains", value: "NavigationLink" },
        {
          label: "Give the link a destination",
          kind: "codeMatches",
          value: "NavigationLink\\([\\s\\S]*\\{[\\s\\S]*Text\\(",
        },
      ],
      hints: [
        "NavigationLink takes a title and a closure: NavigationLink(\"Open detail\") { ... }.",
        "The closure is the destination — put a Text inside it so there's something to land on.",
        'NavigationLink("Open detail") { Text("You found the detail screen.") } — drop that inside the NavigationStack.',
      ],
      wellDone: "Tap, slide, back. That push-and-pop flow is the spine of almost every iOS app.",
    },
    {
      id: "swiftui-nav-textfield",
      track: "swiftui",
      title: "Let them type",
      subtitle: "A TextField bound to state.",
      concepts: ["TextField", "@State"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A box that talks back" },
        {
          type: "p",
          text: "A TextField needs somewhere to put the letters as they're typed, so you bind it to a @State string. The magic is the $ — writing $name passes a binding, a two-way wire. The field writes into name when the user types, and reads from it to show what's there. One source of truth, kept in sync for free.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'struct GreetView: View {\n  @State private var name = ""\n\n  var body: some View {\n    TextField("Your name", text: $name)\n  }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Forget the $ and Swift hands the field a plain string it can't write back into — the field just sits there, mute. The $ is the whole trick.",
        },
        {
          type: "p",
          text: 'Add a @State string called name, then a TextField("Your name", text: $name) bound to it.',
        },
      ],
      starter:
        'import SwiftUI\n\nstruct GreetView: View {\n  // TODO: add a @State string called name\n\n  var body: some View {\n    // TODO: add a TextField bound to $name\n    Text("...")\n  }\n}\n',
      solution:
        'import SwiftUI\n\nstruct GreetView: View {\n  @State private var name = ""\n\n  var body: some View {\n    TextField("Your name", text: $name)\n  }\n}\n',
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Declare some View body", kind: "codeContains", value: "some View" },
        { label: "Add a @State property", kind: "codeContains", value: "@State" },
        { label: "Add a TextField", kind: "codeContains", value: "TextField" },
        { label: "Bind it with a $ binding", kind: "codeContains", value: "$" },
        {
          label: "Bind the field to name",
          kind: "codeMatches",
          value: "TextField\\([\\s\\S]*text:\\s*\\$name",
        },
      ],
      hints: [
        'Declare the state first: @State private var name = "".',
        "TextField wants a placeholder and a binding: TextField(\"Your name\", text: $name).",
        'The $ in $name is required — it gives the field a two-way wire into your state.',
      ],
      wellDone: "Your view can hear the user now. That $ binding is exactly how input flows back into state.",
    },
    {
      id: "swiftui-nav-toggle",
      track: "swiftui",
      title: "Flip a switch",
      subtitle: "A Toggle bound to a Bool.",
      concepts: ["Toggle", "@State"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "On, off, and nothing in between" },
        {
          type: "p",
          text: "A Toggle is the little on/off switch you've flipped a thousand times in Settings. It binds to a @State Bool the same way a TextField binds to a string: hand it $isOn and it reads and writes that value as the user taps. Slide it on, your Bool becomes true; slide it off, false. The view stays in lockstep.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'struct SettingsView: View {\n  @State private var isOn = false\n\n  var body: some View {\n    Toggle("Wi-Fi", isOn: $isOn)\n  }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "Same $ trick as the TextField — Toggle takes isOn: $isOn so the switch and your Bool are one and the same.",
        },
        {
          type: "p",
          text: 'Add a @State Bool called isOn, then a Toggle("Notifications", isOn: $isOn) wired to it.',
        },
      ],
      starter:
        'import SwiftUI\n\nstruct SettingsView: View {\n  // TODO: add a @State Bool called isOn starting at false\n\n  var body: some View {\n    // TODO: add a Toggle bound to $isOn\n    Text("...")\n  }\n}\n',
      solution:
        'import SwiftUI\n\nstruct SettingsView: View {\n  @State private var isOn = false\n\n  var body: some View {\n    Toggle("Notifications", isOn: $isOn)\n  }\n}\n',
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Declare some View body", kind: "codeContains", value: "some View" },
        { label: "Add a @State property", kind: "codeContains", value: "@State" },
        { label: "Add a Toggle", kind: "codeContains", value: "Toggle" },
        { label: "Bind it with a $ binding", kind: "codeContains", value: "$" },
        {
          label: "Bind the toggle to isOn",
          kind: "codeMatches",
          value: "Toggle\\([\\s\\S]*isOn:\\s*\\$isOn",
        },
      ],
      hints: [
        "Declare the state first: @State private var isOn = false.",
        'Toggle takes a label and a Bool binding: Toggle("Notifications", isOn: $isOn).',
        "Don't drop the $ — isOn: $isOn is what keeps the switch and your Bool in sync.",
      ],
      wellDone: "Text, switches, and a way to push between screens — you can build a real settings app now.",
    },
  ],
};
