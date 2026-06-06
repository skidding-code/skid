import type { Chapter } from "../types";

export const ch07: Chapter = {
  id: "ts-advanced-types",
  title: "Type Wizardry",
  glyph: "🪄",
  summary:
    "By now you can describe a single value. This chapter is about building types out of other types — gluing two shapes together, deriving a smaller shape from a bigger one, looking up a field's type by its key. The types do real work here, then politely vanish at runtime, leaving plain JavaScript behind. Learn to compose, and you stop repeating yourself.",
  lessons: [
    {
      id: "ts-intersection",
      track: "typescript",
      title: "Two shapes, glued",
      subtitle: "Combine type aliases with an intersection: A & B.",
      concepts: ["type alias", "intersection"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "An intersection asks for both at once" },
        {
          type: "p",
          text: "A type alias names a shape: type Point = { x: number; y: number }. The intersection operator & welds two shapes into one — a value of type A & B must satisfy everything in A and everything in B. It's how you mix in extra fields without rewriting the original.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type Named = { name: string };\ntype Aged = { age: number };\ntype Person = Named & Aged;\n\nconst p: Person = { name: "Ada", age: 36 };\nconsole.log(p.name);   // "Ada"',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Read & as \"and\". The combined value carries every field from both sides — leave one out and TypeScript complains.",
        },
        {
          type: "p",
          text: 'Make type Engine = { horsepower: number } and type Body = { color: string }, combine them into type Car, build a car with horsepower 420 and color "red", and print just the color. The output should be red.',
        },
      ],
      starter: "// Alias two shapes, combine them, build one value, log a field\n",
      solution:
        'type Engine = { horsepower: number };\ntype Body = { color: string };\ntype Car = Engine & Body;\n\nconst car: Car = { horsepower: 420, color: "red" };\nconsole.log(car.color);\n',
      checks: [
        { label: "Declare a type alias", kind: "codeContains", value: "type " },
        { label: "Combine with an intersection", kind: "codeContains", value: "&" },
        { label: "Print the color", kind: "stdoutContains", value: "red" },
        { label: "Don't print extra lines", kind: "stdoutEquals", value: "red\n" },
      ],
      hints: [
        "Name each shape: type Engine = { horsepower: number };",
        "Glue them with &: type Car = Engine & Body;",
        "Build the value with both fields, then console.log(car.color);",
      ],
      wellDone: "Two small shapes, one combined type — no copy-paste required.",
    },
    {
      id: "ts-partial",
      track: "typescript",
      title: "Just the changes",
      subtitle: "Use Partial<T> so every field becomes optional.",
      concepts: ["Partial<T>", "spread merge"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Partial<T> makes a type where nothing is required" },
        {
          type: "p",
          text: "Sometimes you want to accept just a few fields — the ones that changed. Partial<User> takes the User type and marks every field optional, so an update can carry only what it needs. Merge it onto a base with the spread operator: later fields win.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type User = { name: string; level: number };\n\nfunction patch(base: User, updates: Partial<User>): User {\n  return { ...base, ...updates };\n}\n\nconsole.log(patch({ name: "Ada", level: 1 }, { level: 9 }));\n// {"name":"Ada","level":9}',
        },
        {
          type: "callout",
          tone: "note",
          text: "In { ...base, ...updates }, keys from updates overwrite the same keys in base. The result keeps base's insertion order.",
        },
        {
          type: "p",
          text: 'Define type Profile = { name: string; score: number }. Write a function update(base: Profile, changes: Partial<Profile>) that returns { ...base, ...changes }. Call it with base { name: "Sam", score: 10 } and changes { score: 42 }, then log the result. The output should be {"name":"Sam","score":42}.',
        },
      ],
      starter: "// Merge a base profile with a few changes\n",
      solution:
        'type Profile = { name: string; score: number };\n\nfunction update(base: Profile, changes: Partial<Profile>): Profile {\n  return { ...base, ...changes };\n}\n\nconsole.log(update({ name: "Sam", score: 10 }, { score: 42 }));\n',
      checks: [
        { label: "Accept a partial update", kind: "codeContains", value: "Partial<" },
        { label: "Merge with the spread operator", kind: "codeContains", value: "...base" },
        { label: "Print the merged object", kind: "stdoutContains", value: '{"name":"Sam","score":42}' },
      ],
      hints: [
        "Type the changes parameter as Partial<Profile> so every field is optional.",
        "Merge inside the function: return { ...base, ...changes };",
        'Then console.log(update({ name: "Sam", score: 10 }, { score: 42 }));',
      ],
      wellDone: "Partial<T> plus a spread is the cleanest update pattern in TypeScript.",
    },
    {
      id: "ts-pick",
      track: "typescript",
      title: "A smaller cut",
      subtitle: "Carve a new type out of an old one with Pick<T, K>.",
      concepts: ["Pick<T, K>", "derived type"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Pick keeps only the keys you ask for" },
        {
          type: "p",
          text: "You rarely need every field. Pick<T, K> builds a brand-new type containing just the keys K from T — perfect for a preview, a summary, a public view. The names are listed as a union of string literals: \"id\" | \"name\".",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type Account = { id: number; name: string; secret: string };\ntype PublicAccount = Pick<Account, "id" | "name">;\n\nconst a: PublicAccount = { id: 7, name: "Ada" };\nconsole.log(a);   // {"id":7,"name":"Ada"}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Pick's opposite is Omit<T, K>, which keeps everything except the listed keys. Reach for whichever names fewer fields.",
        },
        {
          type: "p",
          text: 'Start from type Book = { title: string; author: string; pages: number }. Derive type Listing = Pick<Book, "title" | "author">, build one with title "Dune" and author "Herbert", and log it. The output should be {"title":"Dune","author":"Herbert"}.',
        },
      ],
      starter: "// Derive a smaller type, build a value of it, log it\n",
      solution:
        'type Book = { title: string; author: string; pages: number };\ntype Listing = Pick<Book, "title" | "author">;\n\nconst listing: Listing = { title: "Dune", author: "Herbert" };\nconsole.log(listing);\n',
      checks: [
        { label: "Derive a type with Pick", kind: "codeContains", value: "Pick<" },
        { label: "Name the kept keys", kind: "codeContains", value: '"title"' },
        { label: "Print the listing", kind: "stdoutContains", value: '{"title":"Dune","author":"Herbert"}' },
        { label: "Just the one object", kind: "stdoutEquals", value: '{"title":"Dune","author":"Herbert"}\n' },
      ],
      hints: [
        'List the keys you want as a union: Pick<Book, "title" | "author">.',
        "Build a value of the derived type with exactly those two fields.",
        "Then console.log(listing); — the dropped field never appears.",
      ],
      wellDone: "One source of truth, many derived views. Change Book and the cut follows.",
    },
    {
      id: "ts-keyof-getter",
      track: "typescript",
      title: "Look up by key",
      subtitle: "Use keyof and indexed access to write a type-safe getter.",
      concepts: ["keyof", "indexed access", "generics"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "keyof turns an object type into its keys" },
        {
          type: "p",
          text: "keyof User produces the union of User's property names. Pair it with an indexed access type T[K] — \"the type of the value at key K\" — and you can write a generic get that returns exactly the right type for whatever key you pass. No casting, no any.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type Settings = { volume: number; muted: boolean };\n\nfunction get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst s: Settings = { volume: 8, muted: false };\nconsole.log(get(s, "volume"));   // 8',
        },
        {
          type: "callout",
          tone: "note",
          text: "K extends keyof T is the guardrail: you can only pass a key that actually exists on the object. A typo'd key won't compile.",
        },
        {
          type: "p",
          text: 'Define type Hero = { name: string; power: number }. Write a generic get<T, K extends keyof T>(obj: T, key: K): T[K]. Build a hero with name "Nova" and power 88, then call get(hero, "power") and log it. The output should be 88.',
        },
      ],
      starter: "// Write a generic getter and call it with a key\n",
      solution:
        'type Hero = { name: string; power: number };\n\nfunction get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst hero: Hero = { name: "Nova", power: 88 };\nconsole.log(get(hero, "power"));\n',
      checks: [
        { label: "Constrain the key with keyof", kind: "codeContains", value: "keyof" },
        { label: "Return the indexed access type", kind: "codeContains", value: "T[K]" },
        { label: "Print the looked-up value", kind: "stdoutContains", value: "88" },
        { label: "Exactly one line", kind: "stdoutEquals", value: "88\n" },
      ],
      hints: [
        "Two type parameters: <T, K extends keyof T>.",
        "The return type is T[K], and the body is just return obj[key];",
        'Call it with the key in quotes: get(hero, "power").',
      ],
      wellDone: "keyof plus T[K] is the backbone of every type-safe property helper you'll ever write.",
    },
    {
      id: "ts-record-const",
      track: "typescript",
      title: "Locked-in lookups",
      subtitle: "Freeze a tuple with as const and map keys with Record.",
      concepts: ["as const", "Record<K, V>"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "as const freezes values into exact literal types" },
        {
          type: "p",
          text: "Add as const to a literal and TypeScript treats it as deeply readonly with the narrowest possible type — [\"admin\", \"guest\"] as const becomes a fixed tuple of those exact strings, not just string[]. Pair that with Record<K, V>, a type for an object whose keys are K and values are V, and you get tidy, fully-typed lookup tables.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'const ROLES = ["admin", "guest"] as const;\nconst perms: Record<string, number> = { admin: 10, guest: 1 };\n\nconsole.log(ROLES[0]);          // "admin"\nconsole.log(perms[ROLES[0]]);  // 10',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Without as const, ROLES[0] would just be string. With it, TypeScript knows it's exactly \"admin\" — useful for indexing precise lookup tables.",
        },
        {
          type: "p",
          text: 'Make const TIERS = ["bronze", "gold"] as const and const points: Record<string, number> = { bronze: 100, gold: 500 }. Look up the points for TIERS[1] and log the number. The output should be 500.',
        },
      ],
      starter: "// Freeze a tuple, build a lookup table, print one value\n",
      solution:
        'const TIERS = ["bronze", "gold"] as const;\nconst points: Record<string, number> = { bronze: 100, gold: 500 };\n\nconsole.log(points[TIERS[1]]);\n',
      checks: [
        { label: "Freeze the tuple with as const", kind: "codeContains", value: "as const" },
        { label: "Type the table with Record", kind: "codeContains", value: "Record<" },
        { label: "Print the looked-up points", kind: "stdoutContains", value: "500" },
        { label: "Only the one value", kind: "stdoutEquals", value: "500\n" },
      ],
      hints: [
        'Append as const to the array: ["bronze", "gold"] as const;',
        "Type the table as Record<string, number>.",
        "Index the table with the tuple entry: points[TIERS[1]] is 500.",
      ],
      wellDone: "as const and Record turn loose objects into precise, type-checked lookup tables.",
    },
  ],
};
