import type { Chapter } from "../types";

export const ch09: Chapter = {
  id: "ts-backend",
  title: "TypeScript on the Server",
  glyph: "🛰️",
  summary:
    "On the backend, types are the contract between your code and the messy outside world: requests, JSON payloads, database rows, things that might fail. In this chapter you write the exact types a real Node/Express server would use — for users, promises, errors, config, and concurrent work — and prove they work by logging the results instead of serving HTTP.",
  lessons: [
    {
      id: "ts-model-request",
      track: "typescript",
      title: "Shape of a row",
      subtitle: "Type your data with an interface and handle a missing record.",
      concepts: ["interface", "union with undefined", "lookup"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A server is mostly shaped data" },
        {
          type: "p",
          text: "Before a backend does anything clever, it agrees on what its data looks like. An interface is that agreement: interface User { id: number; name: string } says every user has a numeric id and a string name — nothing more, nothing less. The same interface you'd write over a Postgres row or an Express response body.",
        },
        {
          type: "p",
          text: "Real lookups can fail: ask for user 99 and there may be no such row. So findUser returns User | undefined — the type itself tells callers \"this might not be here, deal with it.\"",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface User {\n  id: number;\n  name: string;\n}\n\nconst users: User[] = [\n  { id: 1, name: "Ada" },\n  { id: 2, name: "Linus" },\n];\n\nfunction findUser(id: number): User | undefined {\n  return users.find((u) => u.id === id);\n}\n\nconst found = findUser(1);\nconsole.log(found ? found.name : "not found");',
        },
        {
          type: "callout",
          tone: "note",
          text: "Returning T | undefined instead of throwing forces every caller to consider the empty case. The compiler won't let you read .name off a value that might be undefined.",
        },
        {
          type: "p",
          text: "Define the User interface and the users array above, then call findUser for id 2 and for id 99. Print the found user's name (Linus), then on the next line print not found for the missing one.",
        },
      ],
      starter: "// Model a user row and look two of them up\n",
      solution:
        'interface User {\n  id: number;\n  name: string;\n}\n\nconst users: User[] = [\n  { id: 1, name: "Ada" },\n  { id: 2, name: "Linus" },\n];\n\nfunction findUser(id: number): User | undefined {\n  return users.find((u) => u.id === id);\n}\n\nconst a = findUser(2);\nconsole.log(a ? a.name : "not found");\n\nconst b = findUser(99);\nconsole.log(b ? b.name : "not found");\n',
      checks: [
        { label: "Declare a User interface", kind: "codeContains", value: "interface User" },
        { label: "Return User | undefined", kind: "codeContains", value: "User | undefined" },
        { label: "Print the found user", kind: "stdoutContains", value: "Linus" },
        { label: "Print not found for the missing id", kind: "stdoutContains", value: "not found" },
        { label: "Two lines of output", kind: "stdoutMinLines", value: "2" },
      ],
      hints: [
        "Start with: interface User { id: number; name: string }",
        "Look up with users.find((u) => u.id === id); it returns User | undefined.",
        'Guard before reading .name: console.log(a ? a.name : "not found");',
      ],
      wellDone: "That's the core of every backend handler: a typed shape and an honest answer when the row isn't there.",
    },
    {
      id: "ts-promise-return",
      track: "typescript",
      title: "Promises with a type",
      subtitle: "Return Promise<User> and await it in an async main().",
      concepts: ["Promise<T>", "async/await"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Async work, still fully typed" },
        {
          type: "p",
          text: "Database and network calls are asynchronous, so they return a Promise. The type carries through: a function that resolves to a User has the return type Promise<User>. When you await it, you get a plain User back — TypeScript knows the field types the whole way.",
        },
        {
          type: "p",
          text: "Here there's no real database, so we resolve immediately with Promise.resolve(...). In a real server the body would be an await of your query; the signature is identical.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface User {\n  id: number;\n  name: string;\n}\n\nfunction fetchUser(id: number): Promise<User> {\n  return Promise.resolve({ id, name: "Grace" });\n}\n\nasync function main() {\n  const user = await fetchUser(7);\n  console.log(user.name);\n}\n\nmain();',
        },
        {
          type: "callout",
          tone: "tip",
          text: "await unwraps a Promise<T> into a T. The await keyword only works inside an async function — so backend code lives in async handlers.",
        },
        {
          type: "p",
          text: 'Write fetchUser returning Promise<User> that resolves to { id, name: "Grace" }. In an async main(), await fetchUser(7) and print the name. The output should be Grace. Remember to call main().',
        },
      ],
      starter: "// Resolve a typed user and await it\n",
      solution:
        'interface User {\n  id: number;\n  name: string;\n}\n\nfunction fetchUser(id: number): Promise<User> {\n  return Promise.resolve({ id, name: "Grace" });\n}\n\nasync function main() {\n  const user = await fetchUser(7);\n  console.log(user.name);\n}\n\nmain();\n',
      checks: [
        { label: "Return type is Promise<User>", kind: "codeContains", value: "Promise<User>" },
        { label: "Await the call", kind: "codeContains", value: "await fetchUser" },
        { label: "Call main()", kind: "codeContains", value: "main()" },
        { label: "Print the resolved name", kind: "stdoutEquals", value: "Grace" },
      ],
      hints: [
        "Declare it as: function fetchUser(id: number): Promise<User>",
        "Resolve immediately: return Promise.resolve({ id, name: \"Grace\" });",
        "Inside async main(): const user = await fetchUser(7); console.log(user.name); — then call main();",
      ],
      wellDone: "Promise<T> in, await it out — the shape of every async backend call you'll ever write.",
    },
    {
      id: "ts-result-type",
      track: "typescript",
      title: "Errors as values",
      subtitle: "Use a Result union to handle failure without throwing.",
      concepts: ["discriminated union", "Result type", "error handling"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Failure that the type system can see" },
        {
          type: "p",
          text: "Throwing exceptions hides failure from the type signature — callers can't tell what might blow up. A common backend pattern is to return the failure instead, as a value. A Result<T> is a union: either { ok: true; value: T } or { ok: false; error: string }.",
        },
        {
          type: "p",
          text: "Because ok is a literal true or false, TypeScript narrows the type once you check it: inside if (r.ok) you can read r.value, and in the else branch you can read r.error. This is called a discriminated union.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type Result<T> =\n  | { ok: true; value: T }\n  | { ok: false; error: string };\n\nfunction divide(a: number, b: number): Result<number> {\n  if (b === 0) return { ok: false, error: "divide by zero" };\n  return { ok: true, value: a / b };\n}\n\nconst r = divide(10, 2);\nif (r.ok) {\n  console.log("result:", r.value);\n} else {\n  console.log("error:", r.error);\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "console.log joins its arguments with a single space, so console.log(\"result:\", r.value) prints result: 5 — the number is stringified for you.",
        },
        {
          type: "p",
          text: 'Write the Result<T> type and divide. Call divide(10, 2) and handle both branches, then call divide(4, 0) and handle both. The output should be result: 5 then error: divide by zero.',
        },
      ],
      starter: "// Return failures as values, not exceptions\n",
      solution:
        'type Result<T> =\n  | { ok: true; value: T }\n  | { ok: false; error: string };\n\nfunction divide(a: number, b: number): Result<number> {\n  if (b === 0) return { ok: false, error: "divide by zero" };\n  return { ok: true, value: a / b };\n}\n\nconst r1 = divide(10, 2);\nif (r1.ok) {\n  console.log("result:", r1.value);\n} else {\n  console.log("error:", r1.error);\n}\n\nconst r2 = divide(4, 0);\nif (r2.ok) {\n  console.log("result:", r2.value);\n} else {\n  console.log("error:", r2.error);\n}\n',
      checks: [
        { label: "Define a Result<T> type", kind: "codeContains", value: "type Result<T>" },
        { label: "Return Result<number>", kind: "codeContains", value: "Result<number>" },
        { label: "Print the success branch", kind: "stdoutContains", value: "result: 5" },
        { label: "Print the error branch", kind: "stdoutContains", value: "error: divide by zero" },
      ],
      hints: [
        "The union has two members: { ok: true; value: T } and { ok: false; error: string }.",
        'In divide, return { ok: false, error: "divide by zero" } when b is 0.',
        'Check r.ok to narrow: if (r.ok) console.log("result:", r.value); else console.log("error:", r.error);',
      ],
      wellDone: "Now every caller must look at .ok before reading the value — failure can't be ignored by accident.",
    },
    {
      id: "ts-json-shape",
      track: "typescript",
      title: "Trusting the JSON",
      subtitle: "Parse a JSON string and assert its shape with an interface.",
      concepts: ["JSON.parse", "type assertion", "interface"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "JSON.parse returns any — pin it down" },
        {
          type: "p",
          text: "Config files, request bodies, and API responses all arrive as JSON strings. JSON.parse hands you back any, which throws away every guarantee. By asserting the result as a known interface, you tell TypeScript what shape to expect so the rest of your code is checked.",
        },
        {
          type: "p",
          text: "interface Config { port: number; debug: boolean } describes the shape; JSON.parse(raw) as Config attaches that type. From there, config.port is a number and config.debug is a boolean as far as the compiler is concerned.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface Config {\n  port: number;\n  debug: boolean;\n}\n\nconst raw = \'{"port":8080,"debug":true}\';\nconst config = JSON.parse(raw) as Config;\n\nconsole.log("port:", config.port);',
        },
        {
          type: "callout",
          tone: "warn",
          text: "as is a promise you make to the compiler, not a runtime check. If the real JSON doesn't match, you've lied — production code pairs this with a validator. Here the shape is guaranteed, so the assertion is safe.",
        },
        {
          type: "p",
          text: 'Define the Config interface, parse the raw string with JSON.parse(raw) as Config, then print port: 8080 and on the next line debug: true.',
        },
      ],
      starter: "// Parse external JSON and assert its shape\n",
      solution:
        'interface Config {\n  port: number;\n  debug: boolean;\n}\n\nconst raw = \'{"port":8080,"debug":true}\';\nconst config = JSON.parse(raw) as Config;\n\nconsole.log("port:", config.port);\nconsole.log("debug:", config.debug);\n',
      checks: [
        { label: "Declare a Config interface", kind: "codeContains", value: "interface Config" },
        { label: "Assert the parsed shape", kind: "codeContains", value: "as Config" },
        { label: "Print the port", kind: "stdoutContains", value: "port: 8080" },
        { label: "Print the debug flag", kind: "stdoutContains", value: "debug: true" },
      ],
      hints: [
        "Config has port: number and debug: boolean.",
        "Attach the type while parsing: const config = JSON.parse(raw) as Config;",
        'Then log both fields: console.log("port:", config.port); console.log("debug:", config.debug);',
      ],
      wellDone: "External JSON is now a typed object. The as Config line is where the untyped world becomes typed.",
    },
    {
      id: "ts-promise-all",
      track: "typescript",
      title: "Two calls at once",
      subtitle: "Run typed promises concurrently with Promise.all.",
      concepts: ["Promise.all", "tuple type", "concurrency"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Don't await in single file when you can go wide" },
        {
          type: "p",
          text: "When a handler needs two independent results — say a user's order count and their credit balance — awaiting one then the other wastes time. Promise.all starts them together and waits for both. Pass it an array of promises and it resolves to an array of their results.",
        },
        {
          type: "p",
          text: "The types line up precisely: Promise.all([Promise<number>, Promise<number>]) resolves to [number, number] — a tuple. Destructure it and each piece keeps its type.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'function getOrders(): Promise<number> {\n  return Promise.resolve(3);\n}\nfunction getBalance(): Promise<number> {\n  return Promise.resolve(50);\n}\n\nasync function main() {\n  const [orders, balance]: [number, number] = await Promise.all([\n    getOrders(),\n    getBalance(),\n  ]);\n  console.log("total:", orders + balance);\n}\n\nmain();',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Promise.all preserves order: the first promise's result is always first in the tuple, no matter which finishes first. That's why the tuple type [number, number] is safe to destructure.",
        },
        {
          type: "p",
          text: 'Write getOrders resolving to 3 and getBalance resolving to 50, both Promise<number>. In async main(), await Promise.all of the two, typed as [number, number], then print total: 53. Call main().',
        },
      ],
      starter: "// Run two typed promises together and combine them\n",
      solution:
        'function getOrders(): Promise<number> {\n  return Promise.resolve(3);\n}\nfunction getBalance(): Promise<number> {\n  return Promise.resolve(50);\n}\n\nasync function main() {\n  const [orders, balance]: [number, number] = await Promise.all([\n    getOrders(),\n    getBalance(),\n  ]);\n  console.log("total:", orders + balance);\n}\n\nmain();\n',
      checks: [
        { label: "Use Promise.all", kind: "codeContains", value: "Promise.all" },
        { label: "Type the result as a tuple", kind: "codeContains", value: "[number, number]" },
        { label: "Call main()", kind: "codeContains", value: "main()" },
        { label: "Print the combined total", kind: "stdoutEquals", value: "total: 53" },
      ],
      hints: [
        "Both functions return Promise<number> via Promise.resolve(...).",
        "Await both at once: const [orders, balance]: [number, number] = await Promise.all([getOrders(), getBalance()]);",
        'Add them: console.log("total:", orders + balance); — and don\'t forget main();',
      ],
      wellDone: "Concurrent, typed, and one line of output: the everyday shape of a fast backend handler.",
    },
  ],
};
