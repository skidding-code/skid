import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "web-js",
  title: "Make It Move",
  glyph: "⚡",
  summary: "Give your page behavior with JavaScript. Log to the console, change text on the page, and react to clicks.",
  lessons: [
    {
      id: "web-js-console",
      track: "web",
      title: "Talk to the console",
      subtitle: "Run your first lines of JavaScript.",
      concepts: ["console.log", "variables"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "JavaScript runs your instructions" },
        {
          type: "p",
          text: "HTML builds the page and CSS styles it. JavaScript makes it do things. The simplest thing JavaScript can do is print a message with console.log — you pass it something inside the parentheses and it shows up in the console.",
        },
        {
          type: "p",
          text: "You can also store a value in a variable with let, give it a name, then use that name later. The console panel shows everything you log.",
        },
        { type: "code", lang: "js", text: 'let name = "Ada";\nconsole.log(name);\nconsole.log("Ready to code");' },
        {
          type: "callout",
          tone: "tip",
          text: "A variable is just a labeled box. let name = \"Ada\" puts the text Ada in a box called name so you can reuse it.",
        },
        {
          type: "p",
          text: "In the JS file, make a variable called message holding the text Hello from JS, then log it to the console.",
        },
      ],
      starter: {
        html: "<h1>Console practice</h1>\n",
        css: "",
        js: "// Make a variable and log it below\n",
      },
      solution: {
        html: "<h1>Console practice</h1>\n",
        css: "",
        js: 'let message = "Hello from JS";\nconsole.log(message);\n',
      },
      checks: [
        { label: "Make a variable with let", kind: "codeContains", value: "let" },
        { label: "Use console.log", kind: "codeContains", value: "console.log" },
        { label: "Log the text Hello from JS", kind: "stdoutContains", value: "Hello from JS" },
      ],
      hints: [
        "Start a variable with let, like let message = ...",
        "Put the text in quotes: let message = \"Hello from JS\";",
        "Then on the next line write console.log(message); to print it.",
      ],
      wellDone: "console.log is the tool you'll reach for every time you want to see what your code is doing.",
    },
    {
      id: "web-js-change-text",
      track: "web",
      title: "Change the page",
      subtitle: "Reach into the HTML and rewrite it.",
      concepts: ["querySelector", "textContent"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Find an element, then change it" },
        {
          type: "p",
          text: "JavaScript can grab any element on the page and change it. First you find the element with document.querySelector and a CSS selector — use #the-id to find an element by its id. Then you set its textContent to swap out the words inside.",
        },
        {
          type: "p",
          text: "The HTML already has a heading with id=\"title\". Your job is to find it and replace its text from JavaScript.",
        },
        { type: "code", lang: "js", text: 'let box = document.querySelector("#status");\nbox.textContent = "Updated by JavaScript";' },
        {
          type: "callout",
          tone: "note",
          text: "querySelector takes a CSS selector. An id selector starts with # — so #title matches the element whose id is title.",
        },
        {
          type: "p",
          text: "Select the element with id title and set its textContent to Changed by JS.",
        },
      ],
      starter: {
        html: '<h1 id="title">Original heading</h1>\n',
        css: "",
        js: "// Select #title and change its text below\n",
      },
      solution: {
        html: '<h1 id="title">Original heading</h1>\n',
        css: "",
        js: 'let heading = document.querySelector("#title");\nheading.textContent = "Changed by JS";\n',
      },
      checks: [
        { label: "Find the element with querySelector", kind: "codeContains", value: "querySelector" },
        { label: "Target the title by id", kind: "codeContains", value: "#title" },
        { label: "Set the new text with textContent", kind: "codeContains", value: "textContent" },
        { label: "The heading now reads Changed by JS", kind: "domTextContains", value: "#title::Changed by JS" },
      ],
      hints: [
        "Grab the element first: document.querySelector(\"#title\").",
        "Store it in a variable, then set .textContent on that variable.",
        "Full answer: let heading = document.querySelector(\"#title\"); heading.textContent = \"Changed by JS\";",
      ],
      wellDone: "querySelector plus textContent is how you rewrite anything on a page from code.",
    },
    {
      id: "web-js-click",
      track: "web",
      title: "React to a click",
      subtitle: "Run code when a button is pressed.",
      concepts: ["addEventListener", "events"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Listen for what the user does" },
        {
          type: "p",
          text: "A page gets interactive when it reacts to the user. You tell an element to watch for an event with addEventListener. You give it the event name, like 'click', and a function to run each time that event happens.",
        },
        {
          type: "p",
          text: "The HTML has a button with id=\"btn\" and a paragraph with id=\"out\". When the button is clicked, change the paragraph's text. The function inside addEventListener runs on every click.",
        },
        { type: "code", lang: "js", text: 'let button = document.querySelector("#go");\nbutton.addEventListener("click", function () {\n  document.querySelector("#out").textContent = "Clicked!";\n});' },
        {
          type: "callout",
          tone: "tip",
          text: "The function passed to addEventListener doesn't run right away. It waits, and fires only when the click happens.",
        },
        {
          type: "p",
          text: "Add a click listener to the button with id btn. When it's clicked, set the textContent of the paragraph with id out to You clicked me.",
        },
      ],
      starter: {
        html: '<button id="btn">Click me</button>\n<p id="out">Not clicked yet</p>\n',
        css: "",
        js: "// Listen for a click on #btn and change #out below\n",
      },
      solution: {
        html: '<button id="btn">Click me</button>\n<p id="out">Not clicked yet</p>\n',
        css: "",
        js: 'let button = document.querySelector("#btn");\nbutton.addEventListener("click", function () {\n  document.querySelector("#out").textContent = "You clicked me";\n});\n',
      },
      checks: [
        { label: "Select the button by id", kind: "codeContains", value: "#btn" },
        { label: "Listen for the click event", kind: "codeContains", value: "addEventListener" },
        { label: "Handle a click", kind: "codeContains", value: "click" },
        { label: "Change the output text", kind: "codeContains", value: "textContent" },
        { label: "Set the new message", kind: "codeContains", value: "You clicked me" },
      ],
      hints: [
        "Grab the button first: document.querySelector(\"#btn\").",
        "Call button.addEventListener(\"click\", function () { ... }); and put your change inside the braces.",
        "Inside the function: document.querySelector(\"#out\").textContent = \"You clicked me\";",
      ],
      wellDone: "Listening for events is the heart of every interactive page — you just wired up your first one.",
    },
  ],
};
