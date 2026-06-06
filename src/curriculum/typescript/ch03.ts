import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "ts-objects-interfaces",
  title: "Objects & Interfaces",
  glyph: "📦",
  summary:
    "Real programs juggle things with many parts: a user has a name and an age, a book has a title and a page count. TypeScript lets you describe the exact shape of an object and then holds every value to that shape. In this chapter you'll write inline object types, name them with interfaces, mark fields optional or read-only, and even put methods inside the contract.",
  lessons: [
    {
      id: "ts-object-inline",
      track: "typescript",
      title: "Boxes with compartments",
      subtitle: "Annotate an object with an inline { name: string; age: number } type.",
      concepts: ["object type", "property access"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Describe an object's shape on the spot" },
        {
          type: "p",
          text: "A single value can hold several named pieces — that's an object. You describe its shape with a type that lists each property and its type, separated by semicolons: { name: string; age: number }. Now TypeScript knows exactly what lives inside, and it'll complain if you forget a field or misspell one.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'const user: { name: string; age: number } = {\n  name: "Grace",\n  age: 45,\n};\nconsole.log(user.name);   // "Grace"',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Reach into an object with a dot: user.name. Misspell it as user.naem and TypeScript stops you before the code ever runs.",
        },
        {
          type: "p",
          text: 'Make a const city typed as { name: string; population: number }, set name to "Kyoto" and population to 1460000, then print just the name. The output should be Kyoto.',
        },
      ],
      starter: "// Describe an object's shape, then read one field\n",
      solution:
        'const city: { name: string; population: number } = {\n  name: "Kyoto",\n  population: 1460000,\n};\nconsole.log(city.name);\n',
      checks: [
        { label: "Type the object inline", kind: "codeContains", value: "population: number" },
        { label: "Read a property with a dot", kind: "codeContains", value: "city.name" },
        { label: "Print the city name", kind: "stdoutContains", value: "Kyoto" },
      ],
      hints: [
        "The type goes after the colon: const city: { name: string; population: number } = { ... }",
        "Inside the braces, list values: name: \"Kyoto\", population: 1460000",
        "Read a field with a dot: console.log(city.name);",
      ],
      wellDone: "One value, many labelled compartments — and TypeScript checks every one.",
    },
    {
      id: "ts-interface-basics",
      track: "typescript",
      title: "Give the shape a name",
      subtitle: "Declare an interface once and reuse it as a type.",
      concepts: ["interface", "typed value"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "An interface is a reusable shape" },
        {
          type: "p",
          text: "Writing { title: string; pages: number } every time gets old fast. An interface lets you name that shape once and then use the name as a type. It's the same idea as the inline object type — just lifted out and given a title so you can reuse it everywhere.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface Book {\n  title: string;\n  pages: number;\n}\n\nconst novel: Book = { title: "Dune", pages: 412 };\nconsole.log(`${novel.title} has ${novel.pages} pages`);',
        },
        {
          type: "callout",
          tone: "note",
          text: "Interfaces have no equals sign and no commas between fields — semicolons (or newlines) separate the properties. By convention their names start with a capital letter.",
        },
        {
          type: "p",
          text: 'Declare an interface Track with fields title: string and seconds: number. Make a const song of type Track with title "Clair de Lune" and seconds 270, then print Clair de Lune lasts 270 seconds using a template literal.',
        },
      ],
      starter: "// Declare an interface, then build a value that fits it\n",
      solution:
        'interface Track {\n  title: string;\n  seconds: number;\n}\n\nconst song: Track = { title: "Clair de Lune", seconds: 270 };\nconsole.log(`${song.title} lasts ${song.seconds} seconds`);\n',
      checks: [
        { label: "Declare the interface", kind: "codeContains", value: "interface Track" },
        { label: "Type the value with it", kind: "codeContains", value: ": Track" },
        { label: "Print the sentence", kind: "stdoutContains", value: "Clair de Lune lasts 270 seconds" },
      ],
      hints: [
        "Start with: interface Track { title: string; seconds: number; }",
        "Use the name as a type: const song: Track = { ... };",
        "Print with backticks: `${song.title} lasts ${song.seconds} seconds`",
      ],
      wellDone: "Named once, usable forever. That's the whole appeal of an interface.",
    },
    {
      id: "ts-optional-props",
      track: "typescript",
      title: "Maybe it's there, maybe it isn't",
      subtitle: "Mark a property optional with ? and supply a fallback with ??.",
      concepts: ["optional property", "nullish coalescing"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Some fields are allowed to be missing" },
        {
          type: "p",
          text: "Not every book has a subtitle. Put a ? after a property name and it becomes optional — values are allowed to leave it out. The catch: when you read an optional field, it might be undefined, so you should plan for that.",
        },
        {
          type: "p",
          text: "The ?? operator (nullish coalescing) is the tidy way to do it: book.subtitle ?? \"—\" means \"use the subtitle if it exists, otherwise use the dash.\"",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface Book {\n  title: string;\n  subtitle?: string;\n}\n\nconst a: Book = { title: "Dune", subtitle: "A Novel" };\nconst b: Book = { title: "It" };\nconsole.log(a.subtitle ?? "—");   // "A Novel"\nconsole.log(b.subtitle ?? "—");   // "—"',
        },
        {
          type: "callout",
          tone: "tip",
          text: "?? only falls back on null or undefined — not on \"\" or 0. That's what makes it safer than the older || for this job.",
        },
        {
          type: "p",
          text: 'Declare an interface Profile with name: string and a nickname?: string. Make one Profile that has a nickname ("Ada", "The Countess") and one that doesn\'t ("Charles"). Print each nickname, falling back to "(none)". The two lines should be The Countess and (none).',
        },
      ],
      starter: "// Add an optional field, then read it safely with ??\n",
      solution:
        'interface Profile {\n  name: string;\n  nickname?: string;\n}\n\nconst ada: Profile = { name: "Ada", nickname: "The Countess" };\nconst charles: Profile = { name: "Charles" };\nconsole.log(ada.nickname ?? "(none)");\nconsole.log(charles.nickname ?? "(none)");\n',
      checks: [
        { label: "Make the property optional", kind: "codeContains", value: "nickname?: string" },
        { label: "Fall back with ??", kind: "codeContains", value: "?? " },
        { label: "Print the present nickname", kind: "stdoutContains", value: "The Countess" },
        { label: "Print the fallback", kind: "stdoutContains", value: "(none)" },
      ],
      hints: [
        "Mark it optional with a question mark: nickname?: string;",
        "One value sets nickname, the other leaves it out entirely.",
        "Read safely: console.log(ada.nickname ?? \"(none)\");",
      ],
      wellDone: "Optional fields plus ?? mean missing data never crashes you — it just falls back.",
    },
    {
      id: "ts-readonly-props",
      track: "typescript",
      title: "Look, don't touch",
      subtitle: "Use readonly to freeze a property after it's set.",
      concepts: ["readonly", "immutability"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Some values should never change" },
        {
          type: "p",
          text: "An order's id, a person's date of birth, a country's founding year — these are set once and should stay put. Put readonly in front of a property and TypeScript lets you read it freely but rejects any attempt to reassign it.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface Order {\n  readonly id: number;\n  total: number;\n}\n\nconst order: Order = { id: 1001, total: 49 };\nconsole.log(order.id);     // reading is fine\norder.total = 59;          // changing total is fine\n// order.id = 2;           // ❌ type error: id is read-only',
        },
        {
          type: "callout",
          tone: "warn",
          text: "readonly is a compile-time guard only. It vanishes when the code runs, so it protects you while you write — it doesn't lock the object at runtime.",
        },
        {
          type: "p",
          text: 'Declare an interface Account with a readonly accountNumber: number and a balance: number. Build one with accountNumber 8842 and balance 300, then print just the account number. The output should be 8842. (Don\'t try to reassign accountNumber — TypeScript won\'t allow it.)',
        },
      ],
      starter: "// Freeze one field with readonly, then read it\n",
      solution:
        'interface Account {\n  readonly accountNumber: number;\n  balance: number;\n}\n\nconst account: Account = { accountNumber: 8842, balance: 300 };\nconsole.log(account.accountNumber);\n',
      checks: [
        { label: "Mark the field readonly", kind: "codeContains", value: "readonly accountNumber" },
        { label: "Read the frozen field", kind: "codeContains", value: "account.accountNumber" },
        { label: "Print the account number", kind: "stdoutContains", value: "8842" },
      ],
      hints: [
        "Put readonly before the property: readonly accountNumber: number;",
        "Set it when you build the object: { accountNumber: 8842, balance: 300 }",
        "Read it like any other field: console.log(account.accountNumber);",
      ],
      wellDone: "Reading works, reassigning doesn't. That's exactly the guarantee readonly buys you.",
    },
    {
      id: "ts-interface-methods",
      track: "typescript",
      title: "Objects that do things",
      subtitle: "Put a method signature in an interface and implement it.",
      concepts: ["method signature", "object methods"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "An interface can require behaviour too" },
        {
          type: "p",
          text: "Objects aren't just bags of data — they can carry functions, called methods. An interface can demand one: bump(): number means \"this object must have a bump method that returns a number.\" Any value claiming to be that type has to provide it.",
        },
        {
          type: "p",
          text: "Inside a method, this refers to the object the method lives on, so this.value reaches the object's own value field.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface Counter {\n  value: number;\n  bump(): number;\n}\n\nconst clicks: Counter = {\n  value: 0,\n  bump() {\n    this.value += 1;\n    return this.value;\n  },\n};\nconsole.log(clicks.bump());   // 1\nconsole.log(clicks.bump());   // 2',
        },
        {
          type: "callout",
          tone: "note",
          text: "In the interface a method is just a signature — a name, its parameters, and a return type. The actual body lives in the object that implements it.",
        },
        {
          type: "p",
          text: 'Declare an interface Score with points: number and a method add(n: number): number that adds n to points and returns the new total. Make a Score starting at 0, then log the result of add(10) followed by add(5). The two lines should be 10 and 15.',
        },
      ],
      starter: "// Describe a method in the interface, then implement it\n",
      solution:
        'interface Score {\n  points: number;\n  add(n: number): number;\n}\n\nconst score: Score = {\n  points: 0,\n  add(n: number): number {\n    this.points += n;\n    return this.points;\n  },\n};\nconsole.log(score.add(10));\nconsole.log(score.add(5));\n',
      checks: [
        { label: "Declare the method signature", kind: "codeContains", value: "add(n: number): number" },
        { label: "Use this to reach the field", kind: "codeContains", value: "this.points" },
        { label: "Print the first total", kind: "stdoutContains", value: "10" },
        { label: "Print the running total", kind: "stdoutContains", value: "15" },
      ],
      hints: [
        "In the interface, write the signature: add(n: number): number;",
        "In the object, give it a body that updates this.points and returns it.",
        "Call it twice: console.log(score.add(10)); then console.log(score.add(5));",
      ],
      wellDone: "Your interface now describes both what an object holds and what it can do.",
    },
  ],
};
