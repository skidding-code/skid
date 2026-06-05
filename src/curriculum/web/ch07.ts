import type { Chapter } from "../types";

export const ch07: Chapter = {
  id: "web-forms",
  title: "Forms & Input",
  glyph: "📝",
  summary: "Collect input from real people. Build labeled fields, read what someone typed, and turn their answers into output on the page.",
  lessons: [
    {
      id: "web-forms-label-input",
      track: "web",
      title: "A field worth filling in",
      subtitle: "Pair a label, an input, and a button.",
      concepts: ["input", "label", "button"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Every input needs a label" },
        {
          type: "p",
          text: "A text field on its own is a mystery box. A <label> tells the person what to type, and connecting the two makes the field easier to use and easier for screen readers to announce.",
        },
        {
          type: "p",
          text: "You connect them with matching attributes: the <label> gets for=\"name\" and the <input> gets id=\"name\". Add a <button> so there is something to press once the field is filled.",
        },
        { type: "code", lang: "html", text: '<label for="email">Email</label>\n<input id="email" type="text">\n<button>Sign up</button>' },
        {
          type: "callout",
          tone: "note",
          text: "The for on the label must match the id on the input. That link is what ties the words to the box.",
        },
        {
          type: "p",
          text: "In the HTML, build a <label> with for=\"name\", a text <input> with id=\"name\", and a <button>. No JavaScript yet — structure only.",
        },
      ],
      starter: {
        html: "<!-- Build a label, a text input, and a button -->\n",
        css: "",
        js: "",
      },
      solution: {
        html: '<label for="name">Your name</label>\n<input id="name" type="text">\n<button>Submit</button>\n',
        css: "",
        js: "",
      },
      checks: [
        { label: "Add a label", kind: "domExists", value: "label" },
        { label: "Add a text input", kind: "domExists", value: "input" },
        { label: "Add a button", kind: "domExists", value: "button" },
        { label: "Give the input an id of name", kind: "domExists", value: "#name" },
        { label: "Point the label at the input", kind: "domAttrEquals", value: "label::for::name" },
      ],
      hints: [
        "A label looks like <label for=\"name\">Your name</label>.",
        "A text field looks like <input id=\"name\" type=\"text\">.",
        "Put all three on the page: the label, then <input id=\"name\" type=\"text\">, then a <button>.",
      ],
      wellDone: "A labeled field is the smallest unit of a form, and you just built one correctly.",
    },
    {
      id: "web-forms-read-value",
      track: "web",
      title: "Read what they typed",
      subtitle: "Pull the value out of an input.",
      concepts: ["value", "addEventListener"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "An input holds a value" },
        {
          type: "p",
          text: "Whatever someone types into a text field is stored on that element as .value. Grab the input from JavaScript, read .value, and you have their answer as a string.",
        },
        {
          type: "p",
          text: "The page already has an input with id name, a button with id greet, and an empty paragraph with id out. When the button is clicked, read the input's value and write a greeting into the paragraph.",
        },
        { type: "code", lang: "js", text: 'let field = document.querySelector("#email");\nlet button = document.querySelector("#send");\nbutton.addEventListener("click", function () {\n  document.querySelector("#out").textContent = "Got: " + field.value;\n});' },
        {
          type: "callout",
          tone: "tip",
          text: "field.value is always text. Join it to other text with + to build a sentence.",
        },
        {
          type: "p",
          text: "In the JS file, listen for a click on #greet. On click, read the value of #name and set #out's textContent to a greeting that includes what they typed.",
        },
      ],
      starter: {
        html: '<label for="name">Name</label>\n<input id="name" type="text">\n<button id="greet">Greet me</button>\n<p id="out"></p>\n',
        css: "",
        js: "// On click of #greet, read #name.value and show it in #out\n",
      },
      solution: {
        html: '<label for="name">Name</label>\n<input id="name" type="text">\n<button id="greet">Greet me</button>\n<p id="out"></p>\n',
        css: "",
        js: 'let field = document.querySelector("#name");\nlet button = document.querySelector("#greet");\nbutton.addEventListener("click", function () {\n  document.querySelector("#out").textContent = "Hello, " + field.value;\n});\n',
      },
      checks: [
        { label: "Find an element by id", kind: "codeContains", value: "querySelector" },
        { label: "Listen for the click", kind: "codeContains", value: "addEventListener" },
        { label: "React to a click event", kind: "codeContains", value: "click" },
        { label: "Read the input's value", kind: "codeContains", value: ".value" },
        { label: "Write into the output paragraph", kind: "codeContains", value: "textContent" },
        { label: "Target the output element", kind: "codeContains", value: "#out" },
      ],
      hints: [
        "Grab the input first: document.querySelector(\"#name\").",
        "Inside a click listener on #greet, read field.value.",
        "Full move: button.addEventListener(\"click\", function () { document.querySelector(\"#out\").textContent = \"Hello, \" + field.value; });",
      ],
      wellDone: "Reading .value is how every form, search box, and login screen knows what you typed.",
    },
    {
      id: "web-forms-combine-inputs",
      track: "web",
      title: "Combine two answers",
      subtitle: "Read two fields and join them.",
      concepts: ["value", "string concatenation"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "More than one field" },
        {
          type: "p",
          text: "Real forms ask for several things at once. Each input carries its own .value, so you read each one separately and then stitch the pieces together however you like.",
        },
        {
          type: "p",
          text: "The page has two inputs — id first and id last — a button with id make, and a paragraph with id out. On click, read both values and combine them into a full name in #out.",
        },
        { type: "code", lang: "js", text: 'let a = document.querySelector("#city").value;\nlet b = document.querySelector("#country").value;\ndocument.querySelector("#out").textContent = a + ", " + b;' },
        {
          type: "callout",
          tone: "warn",
          text: "Read each value inside the click handler, not when the page first loads — otherwise you capture empty fields before anyone types.",
        },
        {
          type: "p",
          text: "In the JS file, listen for a click on #make. Read #first.value and #last.value, combine them with a space between, and set #out's textContent to the result.",
        },
      ],
      starter: {
        html: '<label for="first">First name</label>\n<input id="first" type="text">\n<label for="last">Last name</label>\n<input id="last" type="text">\n<button id="make">Combine</button>\n<p id="out"></p>\n',
        css: "",
        js: "// On click of #make, join #first.value and #last.value into #out\n",
      },
      solution: {
        html: '<label for="first">First name</label>\n<input id="first" type="text">\n<label for="last">Last name</label>\n<input id="last" type="text">\n<button id="make">Combine</button>\n<p id="out"></p>\n',
        css: "",
        js: 'let button = document.querySelector("#make");\nbutton.addEventListener("click", function () {\n  let first = document.querySelector("#first").value;\n  let last = document.querySelector("#last").value;\n  document.querySelector("#out").textContent = first + " " + last;\n});\n',
      },
      checks: [
        { label: "Listen for the click", kind: "codeContains", value: "addEventListener" },
        { label: "React to a click event", kind: "codeContains", value: "click" },
        { label: "Read the first input", kind: "codeContains", value: "#first" },
        { label: "Read the second input", kind: "codeContains", value: "#last" },
        { label: "Pull the typed values", kind: "codeContains", value: ".value" },
        { label: "Write the combined result", kind: "codeContains", value: "#out" },
        { label: "Set the output text", kind: "codeContains", value: "textContent" },
      ],
      hints: [
        "Read each field separately: document.querySelector(\"#first\").value and the same for #last.",
        "Join them with a space in the middle: first + \" \" + last.",
        "Inside the click handler, set document.querySelector(\"#out\").textContent = first + \" \" + last;",
      ],
      wellDone: "Two fields combined into one result — that is the core of every form you will ever build.",
    },
  ],
};
