import type { Chapter } from "../types";

export const ch08: Chapter = {
  id: "ts-frontend",
  title: "TypeScript in the Browser",
  glyph: "🖥️",
  summary:
    "Every button, every loading spinner, every to-do list in a web app is backed by a shape: the props it takes, the events it fires, the states it can be in. These are the exact types you'd write with React or the DOM. Here we keep grading honest by logging the results instead of rendering them — same types, just printed so you can watch them work.",
  lessons: [
    {
      id: "ts-component-state",
      track: "typescript",
      title: "Props in a shape",
      subtitle: "Model a component's state with an interface, render it to a string.",
      concepts: ["interface", "component state", "render"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A component is a function from state to markup" },
        {
          type: "p",
          text: "Before a button is pixels on a screen, it's data: a label and whether it's disabled. You describe that data with an interface, and a render function turns it into markup. With React you'd return JSX; here we return a plain string so we can print it and check it.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface ButtonState {\n  label: string;\n  disabled: boolean;\n}\n\nfunction render(state: ButtonState): string {\n  return `<button disabled=${state.disabled}>${state.label}</button>`;\n}\n\nconsole.log(render({ label: "Save", disabled: false }));',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is the same ButtonState you'd type for a real React component's props. We log the markup string instead of mounting it so the result is something we can read.",
        },
        {
          type: "p",
          text: 'Define interface ButtonState with label: string and disabled: boolean, write render(state) returning that exact template, and log render({ label: "Submit", disabled: true }). The output should be <button disabled=true>Submit</button>.',
        },
      ],
      starter: "// Model a button's state, then turn it into markup text\n",
      solution:
        'interface ButtonState {\n  label: string;\n  disabled: boolean;\n}\n\nfunction render(state: ButtonState): string {\n  return `<button disabled=${state.disabled}>${state.label}</button>`;\n}\n\nconsole.log(render({ label: "Submit", disabled: true }));\n',
      checks: [
        { label: "Declare the ButtonState interface", kind: "codeContains", value: "interface ButtonState" },
        { label: "Type the label as a string", kind: "codeContains", value: "label: string" },
        { label: "Write a render function", kind: "codeContains", value: "function render" },
        {
          label: "Log the rendered markup",
          kind: "stdoutEquals",
          value: "<button disabled=true>Submit</button>",
        },
      ],
      hints: [
        "An interface lists each field and its type: interface ButtonState { label: string; disabled: boolean }",
        "render takes a ButtonState and returns a string built with a template literal.",
        'Finish with console.log(render({ label: "Submit", disabled: true }));',
      ],
      wellDone: "That's a component in miniature: state in, markup out. React just swaps the string for real DOM.",
    },
    {
      id: "ts-event-handler",
      track: "typescript",
      title: "Catching a click",
      subtitle: "Type an event handler as a function type, then call it with a modeled event.",
      concepts: ["function type", "event handler", "callback"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "An event handler is just a typed function" },
        {
          type: "p",
          text: "When a user clicks, the browser hands your handler an event object. You can give that handler a name with a type alias: a function that takes an event and returns nothing (void). Here the event is a small object we build by hand — a real click event is bigger, but it works the same way: it arrives as an argument.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type ClickHandler = (event: { x: number; y: number }) => void;\n\nconst onClick: ClickHandler = (event) => {\n  console.log(`Clicked at (${event.x}, ${event.y})`);\n};\n\nonClick({ x: 5, y: 9 });   // pretend the user clicked here',
        },
        {
          type: "callout",
          tone: "tip",
          text: "We're calling the handler ourselves with a fake event so you can see it fire. In a browser you'd attach it with button.addEventListener(\"click\", onClick) and the browser would call it for you.",
        },
        {
          type: "p",
          text: 'Define type ClickHandler taking an event with x: number and y: number, write a handler that logs Clicked at (x, y), and call it with { x: 12, y: 30 }. The output should be Clicked at (12, 30).',
        },
      ],
      starter: "// Type a click handler, then fire it with a pretend event\n",
      solution:
        'type ClickHandler = (event: { x: number; y: number }) => void;\n\nconst onClick: ClickHandler = (event) => {\n  console.log(`Clicked at (${event.x}, ${event.y})`);\n};\n\nonClick({ x: 12, y: 30 });\n',
      checks: [
        { label: "Define the ClickHandler type", kind: "codeContains", value: "type ClickHandler" },
        { label: "The handler returns void", kind: "codeContains", value: "=> void" },
        { label: "Call the handler with an event", kind: "codeContains", value: "onClick({" },
        {
          label: "Log the click position",
          kind: "stdoutEquals",
          value: "Clicked at (12, 30)",
        },
      ],
      hints: [
        "A function type names the parameters and the return: type ClickHandler = (event: { x: number; y: number }) => void;",
        "Inside the handler, read event.x and event.y and log them with a template literal.",
        "Fire it yourself: onClick({ x: 12, y: 30 });",
      ],
      wellDone: "You typed a callback. Every onClick, onChange, and onSubmit you'll write is this exact shape.",
    },
    {
      id: "ts-fetch-status",
      track: "typescript",
      title: "Loading, error, ready",
      subtitle: "Model UI status with a discriminated union and switch a view over it.",
      concepts: ["discriminated union", "generics", "UI state"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "The three states every screen lives in" },
        {
          type: "p",
          text: "Almost any data-driven screen is in one of three places: still loading, failed with a message, or holding real data. A discriminated union captures exactly those cases — each has a status field that tells the others apart. TypeScript then forces your view to handle every case, so you can't forget the spinner or the error.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type Fetch<T> =\n  | { status: "loading" }\n  | { status: "error"; message: string }\n  | { status: "ok"; data: T };\n\nfunction view(state: Fetch<string>): string {\n  switch (state.status) {\n    case "loading": return "Loading...";\n    case "error": return `Error: ${state.message}`;\n    case "ok": return `Data: ${state.data}`;\n  }\n}\n\nconsole.log(view({ status: "loading" }));\nconsole.log(view({ status: "ok", data: "hello" }));',
        },
        {
          type: "callout",
          tone: "note",
          text: "Inside each case TypeScript narrows the type: in the \"error\" branch it knows message exists; in \"ok\" it knows data exists. Reach for the wrong field in the wrong branch and it stops you.",
        },
        {
          type: "p",
          text: 'Define Fetch<T> with the three cases, write view(state) returning the strings shown, then log view for { status: "error", message: "Not found" } and { status: "ok", data: "Ada" }. Output: two lines, Error: Not found then Data: Ada.',
        },
      ],
      starter: "// Model loading / error / ok, then render a string per case\n",
      solution:
        'type Fetch<T> =\n  | { status: "loading" }\n  | { status: "error"; message: string }\n  | { status: "ok"; data: T };\n\nfunction view(state: Fetch<string>): string {\n  switch (state.status) {\n    case "loading": return "Loading...";\n    case "error": return `Error: ${state.message}`;\n    case "ok": return `Data: ${state.data}`;\n  }\n}\n\nconsole.log(view({ status: "error", message: "Not found" }));\nconsole.log(view({ status: "ok", data: "Ada" }));\n',
      checks: [
        { label: "Define the Fetch union", kind: "codeContains", value: "type Fetch" },
        { label: "Include the error case with a message", kind: "codeContains", value: 'status: "error"' },
        { label: "Switch over the status", kind: "codeContains", value: "switch (state.status)" },
        { label: "Render the error state", kind: "stdoutContains", value: "Error: Not found" },
        { label: "Render the ok state", kind: "stdoutContains", value: "Data: Ada" },
      ],
      hints: [
        'A discriminated union is several object shapes joined by |, each sharing a status field: { status: "loading" } | ...',
        "view switches on state.status and returns a different string in each case.",
        'Log both states: view({ status: "error", message: "Not found" }) then view({ status: "ok", data: "Ada" }).',
      ],
      wellDone: "Loading, error, success — handled exhaustively. This pattern is the backbone of real frontend code.",
    },
    {
      id: "ts-list-render",
      track: "typescript",
      title: "Rendering a list",
      subtitle: "Map an array of typed items into strings and join them.",
      concepts: ["array types", "map", "list rendering"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "A list is an array, mapped to markup" },
        {
          type: "p",
          text: "To show a to-do list, you take an array of typed items and turn each one into a line. In React you'd map items to elements and let it draw them; the mechanics are identical here — we map to strings and join them with newlines so the whole list prints at once.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'interface Todo {\n  text: string;\n  done: boolean;\n}\n\nconst todos: Todo[] = [\n  { text: "Buy milk", done: true },\n  { text: "Walk dog", done: false },\n];\n\nconst lines = todos.map((t) => `[${t.done ? "x" : " "}] ${t.text}`);\nconsole.log(lines.join("\\n"));',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Todo[] means \"an array of Todo\". The map callback gets a fully typed t, so t.text and t.done are checked for you — no guessing what's in each item.",
        },
        {
          type: "p",
          text: 'Build a Todo[] with { text: "Write tests", done: true } and { text: "Ship it", done: false }, map each to [x] or [ ] plus its text, and log the lines joined by newlines. Output: [x] Write tests then [ ] Ship it on two lines.',
        },
      ],
      starter: "// Turn a list of typed items into printable lines\n",
      solution:
        'interface Todo {\n  text: string;\n  done: boolean;\n}\n\nconst todos: Todo[] = [\n  { text: "Write tests", done: true },\n  { text: "Ship it", done: false },\n];\n\nconst lines = todos.map((t) => `[${t.done ? "x" : " "}] ${t.text}`);\nconsole.log(lines.join("\\n"));\n',
      checks: [
        { label: "Type the array as Todo[]", kind: "codeContains", value: "Todo[]" },
        { label: "Map over the items", kind: "codeContains", value: ".map(" },
        { label: "Render a done item", kind: "stdoutContains", value: "[x] Write tests" },
        { label: "Render an unfinished item", kind: "stdoutContains", value: "[ ] Ship it" },
        { label: "Print both lines", kind: "stdoutMinLines", value: "2" },
      ],
      hints: [
        "Declare the array as Todo[] so each item is checked.",
        'Map each todo to a line: todos.map((t) => `[${t.done ? "x" : " "}] ${t.text}`).',
        'Join with newlines before logging: console.log(lines.join("\\n"));',
      ],
      wellDone: "You rendered a list from typed data. Swap join for JSX and you've written a React list component.",
    },
    {
      id: "ts-reducer",
      track: "typescript",
      title: "State, one action at a time",
      subtitle: "Type actions as a union and fold them through a reducer.",
      concepts: ["reducer", "action union", "state transitions"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Updates as data: the reducer pattern" },
        {
          type: "p",
          text: "Instead of mutating state directly, you describe each change as an action — a small typed object — and a reduce function turns the old state plus an action into the new state. This is the mental model behind React's useReducer and Redux: predictable, typed transitions you can replay and test.",
        },
        {
          type: "code",
          lang: "typescript",
          text:
            'type Action = { type: "inc" } | { type: "add"; by: number };\n\nfunction reduce(count: number, action: Action): number {\n  switch (action.type) {\n    case "inc": return count + 1;\n    case "add": return count + action.by;\n  }\n}\n\nlet count = 0;\ncount = reduce(count, { type: "inc" });\ncount = reduce(count, { type: "add", by: 10 });\nconsole.log(count);   // 11',
        },
        {
          type: "callout",
          tone: "note",
          text: "Because Action is a union, the \"add\" branch is the only place by exists — TypeScript narrows it for you, just like in the Fetch view earlier.",
        },
        {
          type: "p",
          text: 'Define Action with type "inc" and type "add" (with by: number), write reduce(count, action), then start at 0 and apply inc, add 5, inc, add 3 in order. Log the final count. The output should be 10.',
        },
      ],
      starter: "// Describe changes as actions, then fold them into a final count\n",
      solution:
        'type Action = { type: "inc" } | { type: "add"; by: number };\n\nfunction reduce(count: number, action: Action): number {\n  switch (action.type) {\n    case "inc": return count + 1;\n    case "add": return count + action.by;\n  }\n}\n\nlet count = 0;\ncount = reduce(count, { type: "inc" });\ncount = reduce(count, { type: "add", by: 5 });\ncount = reduce(count, { type: "inc" });\ncount = reduce(count, { type: "add", by: 3 });\nconsole.log(count);\n',
      checks: [
        { label: "Define the Action union", kind: "codeContains", value: "type Action" },
        { label: "Write the reduce function", kind: "codeContains", value: "function reduce" },
        { label: "Handle the add action's by field", kind: "codeContains", value: "action.by" },
        { label: "Print the final count", kind: "stdoutEquals", value: "10" },
      ],
      hints: [
        'Action is a union of two shapes: { type: "inc" } | { type: "add"; by: number }.',
        "reduce switches on action.type: inc adds 1, add adds action.by.",
        "Apply inc, add 5, inc, add 3 starting from 0 — that's 0+1+5+1+3 = 10.",
      ],
      wellDone: "Typed actions, predictable state. That's useReducer and Redux in a nutshell — you've built the core idea.",
    },
  ],
};
