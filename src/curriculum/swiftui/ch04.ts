import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "swiftui-lists",
  title: "Lists & Data",
  glyph: "📋",
  summary:
    "Stop hand-stacking rows. Hand SwiftUI a List, point it at your data, and let it draw the whole scrollable thing for you.",
  lessons: [
    {
      id: "swiftui-lists-static",
      track: "swiftui",
      title: "Your first List",
      subtitle: "A scrollable column of rows, for free.",
      concepts: ["List", "Text"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A VStack that scrolls and looks the part" },
        {
          type: "p",
          text: "A List is like a VStack that grew up: it scrolls, it draws neat row separators, and on iOS it gets that classic settings-screen look. Drop a few views inside and each one becomes a row.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'List {\n  Text("Milk")\n  Text("Eggs")\n  Text("A reasonable amount of cheese")\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided walkthrough, so your code isn't run — the checks read your source to make sure the pieces are there.",
        },
        {
          type: "p",
          text: "Make a List with three Text rows: \"Wake up\", \"Write SwiftUI\", and \"Snack\".",
        },
      ],
      starter:
        'import SwiftUI\n\nstruct ChoresView: View {\n  var body: some View {\n    // TODO: wrap three Text rows in a List\n    Text("...")\n  }\n}\n',
      solution:
        'import SwiftUI\n\nstruct ChoresView: View {\n  var body: some View {\n    List {\n      Text("Wake up")\n      Text("Write SwiftUI")\n      Text("Snack")\n    }\n  }\n}\n',
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Declare some View body", kind: "codeContains", value: "some View" },
        { label: "Use a List", kind: "codeContains", value: "List" },
        { label: "Add Text rows", kind: "codeContains", value: "Text(" },
        {
          label: "Put Text inside the List",
          kind: "codeMatches",
          value: "List\\s*\\{[\\s\\S]*Text\\(",
        },
      ],
      hints: [
        "List { ... } works just like VStack { ... } — each view inside is a row.",
        "Move your three Text views in between the List's braces.",
        'List {\n  Text("Wake up")\n  Text("Write SwiftUI")\n  Text("Snack")\n} is the whole body.',
      ],
      wellDone: "Three lines of data, one scrollable List. Hardcoding rows gets old fast though — next we feed it an array.",
    },
    {
      id: "swiftui-lists-foreach",
      track: "swiftui",
      title: "ForEach over an array",
      subtitle: "One row per item, no copy-paste.",
      concepts: ["ForEach", "List"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Let the data decide how many rows" },
        {
          type: "p",
          text: "Typing one Text per item is fine until you have forty items. ForEach loops over a collection and builds a view for each element. SwiftUI just needs to tell the rows apart, and for plain strings the id is the string itself: id: \\.self.",
        },
        {
          type: "code",
          lang: "swift",
          text: 'let planets = ["Mercury", "Venus", "Earth"]\n\nList {\n  ForEach(planets, id: \\.self) { planet in\n    Text(planet)\n  }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "id: \\.self means \"use the value itself as its identity.\" Works great for strings; just don't have two identical ones.",
        },
        {
          type: "p",
          text: "Given the snacks array, use a ForEach with id: \\.self to show a Text row for each snack.",
        },
      ],
      starter:
        'import SwiftUI\n\nstruct SnackList: View {\n  let snacks = ["Pretzels", "Grapes", "Cheese cubes"]\n\n  var body: some View {\n    List {\n      // TODO: loop over snacks with ForEach and id: \\.self\n      Text("...")\n    }\n  }\n}\n',
      solution:
        'import SwiftUI\n\nstruct SnackList: View {\n  let snacks = ["Pretzels", "Grapes", "Cheese cubes"]\n\n  var body: some View {\n    List {\n      ForEach(snacks, id: \\.self) { snack in\n        Text(snack)\n      }\n    }\n  }\n}\n',
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Declare some View body", kind: "codeContains", value: "some View" },
        { label: "Keep the List", kind: "codeContains", value: "List" },
        { label: "Loop with ForEach", kind: "codeContains", value: "ForEach" },
        {
          label: "Identify rows with id: \\.self",
          kind: "codeMatches",
          value: "ForEach\\([\\s\\S]*id:\\s*\\\\.self",
        },
      ],
      hints: [
        "ForEach takes the collection first: ForEach(snacks, id: \\.self) { ... }.",
        "The closure hands you one snack at a time: { snack in Text(snack) }.",
        'ForEach(snacks, id: \\.self) { snack in\n  Text(snack)\n} goes inside the List.',
      ],
      wellDone: "One loop draws every row. Add a snack to the array and the List grows by itself — that's the whole point.",
    },
    {
      id: "swiftui-lists-identifiable",
      track: "swiftui",
      title: "Rows with real identity",
      subtitle: "Make your data Identifiable and drop the id: hint.",
      concepts: ["Identifiable", "List"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Give each item its own id" },
        {
          type: "p",
          text: "Strings work until two of them match. Real data should carry its own identity. When a struct conforms to Identifiable — it just needs an id property — SwiftUI can tell rows apart on its own, so you can List the array directly with no id: \\.self needed.",
        },
        {
          type: "code",
          lang: "swift",
          text: "struct Task: Identifiable {\n  let id = UUID()\n  let title: String\n}\n\nList(tasks) { task in\n  Text(task.title)\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "UUID() hands every Task a unique id automatically, so even two tasks named \"Laundry\" stay distinct.",
        },
        {
          type: "p",
          text: "Make Movie conform to Identifiable with a UUID id and a title, then List the movies array and show each title in a Text.",
        },
      ],
      starter:
        'import SwiftUI\n\n// TODO: make Movie conform to Identifiable\nstruct Movie {\n  let id = UUID()\n  let title: String\n}\n\nstruct MovieList: View {\n  let movies = [Movie(title: "Dune"), Movie(title: "Arrival")]\n\n  var body: some View {\n    // TODO: List the movies and show each title\n    Text("...")\n  }\n}\n',
      solution:
        'import SwiftUI\n\nstruct Movie: Identifiable {\n  let id = UUID()\n  let title: String\n}\n\nstruct MovieList: View {\n  let movies = [Movie(title: "Dune"), Movie(title: "Arrival")]\n\n  var body: some View {\n    List(movies) { movie in\n      Text(movie.title)\n    }\n  }\n}\n',
      checks: [
        { label: "Import SwiftUI", kind: "codeContains", value: "import SwiftUI" },
        { label: "Declare some View body", kind: "codeContains", value: "some View" },
        { label: "Conform to Identifiable", kind: "codeContains", value: "Identifiable" },
        { label: "Use a List", kind: "codeContains", value: "List" },
        {
          label: "Make the struct Identifiable",
          kind: "codeMatches",
          value: "struct\\s+Movie\\s*:\\s*Identifiable",
        },
        {
          label: "Drive the List from the array",
          kind: "codeMatches",
          value: "List\\(\\s*movies\\s*\\)",
        },
      ],
      hints: [
        "Add the conformance to the struct line: struct Movie: Identifiable { ... }.",
        "Because it's Identifiable, you can pass the array straight in: List(movies) { movie in ... }.",
        'struct Movie: Identifiable, then List(movies) { movie in Text(movie.title) }.',
      ],
      wellDone: "Your data carries its own identity and a List renders it directly. That's exactly how real SwiftUI screens are built.",
    },
  ],
};
