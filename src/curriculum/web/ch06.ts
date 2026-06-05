import type { Chapter } from "../types";

export const ch06: Chapter = {
  id: "web-capstone",
  title: "Build Something Real",
  glyph: "🚀",
  summary: "Capstone projects that combine HTML, CSS, and JavaScript into apps you actually use.",
  lessons: [
    {
      id: "web-click-counter",
      track: "web",
      title: "Click counter",
      subtitle: "A button that counts every time you press it.",
      concepts: ["addEventListener", "state", "textContent"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Your first real app" },
        {
          type: "p",
          text: "Everything you have learned so far meets here. The page already has a button and a place to show a number. Your job is the brain: a variable that remembers the count, and code that bumps it up on every click.",
        },
        {
          type: "p",
          text: "Grab the elements with querySelector, keep a count variable, then call addEventListener on the button. Inside the handler, add one to count and write the new value into the display with textContent.",
        },
        { type: "code", lang: "js", text: "let count = 0;\nconst btn = document.querySelector(\"#go\");\nbtn.addEventListener(\"click\", () => {\n  count += 1;\n  document.querySelector(\"#out\").textContent = count;\n});" },
        {
          type: "callout",
          tone: "tip",
          text: "Declare count once, outside the handler. If you put it inside, it resets to 0 on every click and never grows.",
        },
        {
          type: "p",
          text: "Wire up the button (id count-btn) so each click increases the number shown in the display (id count-value). Start the count at 0.",
        },
      ],
      starter: {
        html: '<div class="card">\n  <h1>Click Counter</h1>\n  <p class="count" id="count-value">0</p>\n  <button id="count-btn">Click me</button>\n</div>\n',
        css: "body {\n  font-family: system-ui, sans-serif;\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n  background: #0f172a;\n}\n.card {\n  background: white;\n  padding: 2rem 3rem;\n  border-radius: 16px;\n  text-align: center;\n}\n.count {\n  font-size: 4rem;\n  font-weight: bold;\n  margin: 0.5rem 0;\n  color: #2563eb;\n}\nbutton {\n  font-size: 1rem;\n  padding: 0.6rem 1.4rem;\n  border: none;\n  border-radius: 999px;\n  background: #2563eb;\n  color: white;\n  cursor: pointer;\n}\n/* TODO: add a :hover style for the button that darkens its background */\n",
        js: "// TODO: keep a count variable that starts at 0\n// TODO: addEventListener on the #count-btn button\n// TODO: on each click, add 1 and show it in #count-value\n",
      },
      solution: {
        html: '<div class="card">\n  <h1>Click Counter</h1>\n  <p class="count" id="count-value">0</p>\n  <button id="count-btn">Click me</button>\n</div>\n',
        css: "body {\n  font-family: system-ui, sans-serif;\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n  background: #0f172a;\n}\n.card {\n  background: white;\n  padding: 2rem 3rem;\n  border-radius: 16px;\n  text-align: center;\n}\n.count {\n  font-size: 4rem;\n  font-weight: bold;\n  margin: 0.5rem 0;\n  color: #2563eb;\n}\nbutton {\n  font-size: 1rem;\n  padding: 0.6rem 1.4rem;\n  border: none;\n  border-radius: 999px;\n  background: #2563eb;\n  color: white;\n  cursor: pointer;\n}\nbutton:hover {\n  background: #1d4ed8;\n}\n",
        js: "let count = 0;\nconst btn = document.querySelector(\"#count-btn\");\nconst out = document.querySelector(\"#count-value\");\n\nbtn.addEventListener(\"click\", () => {\n  count += 1;\n  out.textContent = count;\n});\n",
      },
      checks: [
        { label: "The counter button exists", kind: "domExists", value: "#count-btn" },
        { label: "The display element exists", kind: "domExists", value: "#count-value" },
        { label: "Listen for clicks with addEventListener", kind: "codeContains", value: "addEventListener" },
        { label: "React to the click event", kind: "codeContains", value: "click" },
        { label: "Increase the count", kind: "codeMatches", value: "count\\s*(\\+=|=\\s*count\\s*\\+|\\+\\+)" },
        { label: "Write the count into the page", kind: "codeContains", value: "textContent" },
        { label: "Add a hover style to the button", kind: "codeContains", value: "button:hover" },
      ],
      hints: [
        "Above the listener, write let count = 0; so the number is remembered between clicks.",
        "Use document.querySelector(\"#count-btn\").addEventListener(\"click\", () => { ... }).",
        "Inside the handler: count += 1; then document.querySelector(\"#count-value\").textContent = count; and add button:hover { background: #1d4ed8; } in the CSS.",
      ],
      wellDone: "You built a real interactive app — a variable holding state and an event handler updating the page. That pattern runs half the web.",
    },
    {
      id: "web-color-changer",
      track: "web",
      title: "Color changer",
      subtitle: "Buttons that repaint a box on the page.",
      concepts: ["addEventListener", "style", "dataset"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Make the page react" },
        {
          type: "p",
          text: "JavaScript can change CSS live. Reach an element with querySelector, then set element.style.background to any color string and the page updates instantly.",
        },
        {
          type: "p",
          text: "There are three color buttons. Each one carries its color in a data attribute (data-color). Add a click listener to each button, read the color from the button, and paint the box with it.",
        },
        { type: "code", lang: "js", text: "const box = document.querySelector(\"#box\");\nconst btn = document.querySelector(\".swatch\");\nbtn.addEventListener(\"click\", () => {\n  box.style.background = btn.dataset.color;\n});" },
        {
          type: "callout",
          tone: "note",
          text: "querySelectorAll returns every match, so you can loop over all the buttons with forEach and give each one the same kind of listener.",
        },
        {
          type: "p",
          text: "Wire up every button with class swatch so clicking it sets the background of the box (id color-box) to that button's data-color. Loop over all of them.",
        },
      ],
      starter: {
        html: '<div class="wrap">\n  <div class="box" id="color-box"></div>\n  <div class="buttons">\n    <button class="swatch" data-color="#ef4444">Red</button>\n    <button class="swatch" data-color="#22c55e">Green</button>\n    <button class="swatch" data-color="#3b82f6">Blue</button>\n  </div>\n</div>\n',
        css: "body {\n  font-family: system-ui, sans-serif;\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n  background: #f1f5f9;\n}\n.wrap {\n  text-align: center;\n}\n.box {\n  width: 220px;\n  height: 220px;\n  border-radius: 16px;\n  background: #e2e8f0;\n  margin: 0 auto 1.5rem;\n  /* TODO: add a transition so color changes fade smoothly */\n}\n.buttons {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n}\nbutton {\n  font-size: 1rem;\n  padding: 0.6rem 1.2rem;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n",
        js: "// TODO: get the box element (#color-box)\n// TODO: select every .swatch button\n// TODO: loop over them; on click, set box.style.background to the button's data-color\n",
      },
      solution: {
        html: '<div class="wrap">\n  <div class="box" id="color-box"></div>\n  <div class="buttons">\n    <button class="swatch" data-color="#ef4444">Red</button>\n    <button class="swatch" data-color="#22c55e">Green</button>\n    <button class="swatch" data-color="#3b82f6">Blue</button>\n  </div>\n</div>\n',
        css: "body {\n  font-family: system-ui, sans-serif;\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n  background: #f1f5f9;\n}\n.wrap {\n  text-align: center;\n}\n.box {\n  width: 220px;\n  height: 220px;\n  border-radius: 16px;\n  background: #e2e8f0;\n  margin: 0 auto 1.5rem;\n  transition: background 0.3s ease;\n}\n.buttons {\n  display: flex;\n  gap: 0.75rem;\n  justify-content: center;\n}\nbutton {\n  font-size: 1rem;\n  padding: 0.6rem 1.2rem;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n",
        js: "const box = document.querySelector(\"#color-box\");\nconst swatches = document.querySelectorAll(\".swatch\");\n\nswatches.forEach((btn) => {\n  btn.addEventListener(\"click\", () => {\n    box.style.background = btn.dataset.color;\n  });\n});\n",
      },
      checks: [
        { label: "The color box exists", kind: "domExists", value: "#color-box" },
        { label: "There are at least three swatch buttons", kind: "domCountAtLeast", value: ".swatch::3" },
        { label: "Select all the swatches", kind: "codeContains", value: "querySelectorAll" },
        { label: "Listen for clicks", kind: "codeContains", value: "addEventListener" },
        { label: "Loop over the buttons", kind: "codeContains", value: "forEach" },
        { label: "Set the box background from the data-color", kind: "codeMatches", value: "style\\.background\\s*=\\s*[\\s\\S]*dataset\\.color" },
        { label: "Add a transition to the box", kind: "codeContains", value: "transition" },
      ],
      hints: [
        "Start with const box = document.querySelector(\"#color-box\"); and const swatches = document.querySelectorAll(\".swatch\");.",
        "Use swatches.forEach((btn) => { ... }) so every button gets its own listener.",
        "Inside: btn.addEventListener(\"click\", () => { box.style.background = btn.dataset.color; }); and add transition: background 0.3s ease; to the .box CSS.",
      ],
      wellDone: "One loop wired up three buttons at once, and each reads its own data. That is how real interfaces stay clean as they grow.",
    },
    {
      id: "web-mood-board",
      track: "web",
      title: "Mood board",
      subtitle: "Type something, hit add, watch it appear on the page.",
      concepts: ["createElement", "appendChild", "input.value"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "The grand finale" },
        {
          type: "p",
          text: "This is the big one: reading what a user types and building new elements from it. An input box holds text in its .value. When the user clicks Add, you read that value, make a fresh list item, and attach it to the list.",
        },
        {
          type: "p",
          text: "Create an element with document.createElement, set its textContent to the typed text, then appendChild it onto the list. Clear the input afterwards so it is ready for the next mood.",
        },
        { type: "code", lang: "js", text: "const item = document.createElement(\"li\");\nitem.textContent = input.value;\nlist.appendChild(item);\ninput.value = \"\";" },
        {
          type: "callout",
          tone: "warn",
          text: "Skip empty entries. Check if (input.value === \"\") return; at the top of your handler so blank clicks do not litter the list.",
        },
        {
          type: "p",
          text: "Wire the Add button (id add-btn) so it takes the text from the input (id mood-input), builds a new <li>, and appends it to the list (id mood-list). Then clear the input.",
        },
      ],
      starter: {
        html: '<div class="board">\n  <h1>Mood Board</h1>\n  <div class="row">\n    <input id="mood-input" type="text" placeholder="How are you feeling?" />\n    <button id="add-btn">Add</button>\n  </div>\n  <ul id="mood-list"></ul>\n</div>\n',
        css: "body {\n  font-family: system-ui, sans-serif;\n  display: grid;\n  place-items: start center;\n  min-height: 100vh;\n  margin: 0;\n  padding-top: 3rem;\n  background: #fdf2f8;\n}\n.board {\n  background: white;\n  padding: 2rem;\n  border-radius: 16px;\n  width: 320px;\n}\n.row {\n  display: flex;\n  gap: 0.5rem;\n}\ninput {\n  flex: 1;\n  padding: 0.5rem;\n  border: 1px solid #f9a8d4;\n  border-radius: 8px;\n  font-size: 1rem;\n}\nbutton {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 8px;\n  background: #db2777;\n  color: white;\n  cursor: pointer;\n}\nul {\n  list-style: none;\n  padding: 0;\n}\n/* TODO: style each li with padding and a bottom border to separate items */\n",
        js: "// TODO: get the input (#mood-input), button (#add-btn), and list (#mood-list)\n// TODO: on click, read input.value; if it is empty, do nothing\n// TODO: create an <li>, set its text, append it to the list\n// TODO: clear the input so it is ready for the next mood\n",
      },
      solution: {
        html: '<div class="board">\n  <h1>Mood Board</h1>\n  <div class="row">\n    <input id="mood-input" type="text" placeholder="How are you feeling?" />\n    <button id="add-btn">Add</button>\n  </div>\n  <ul id="mood-list"></ul>\n</div>\n',
        css: "body {\n  font-family: system-ui, sans-serif;\n  display: grid;\n  place-items: start center;\n  min-height: 100vh;\n  margin: 0;\n  padding-top: 3rem;\n  background: #fdf2f8;\n}\n.board {\n  background: white;\n  padding: 2rem;\n  border-radius: 16px;\n  width: 320px;\n}\n.row {\n  display: flex;\n  gap: 0.5rem;\n}\ninput {\n  flex: 1;\n  padding: 0.5rem;\n  border: 1px solid #f9a8d4;\n  border-radius: 8px;\n  font-size: 1rem;\n}\nbutton {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 8px;\n  background: #db2777;\n  color: white;\n  cursor: pointer;\n}\nul {\n  list-style: none;\n  padding: 0;\n}\nli {\n  padding: 0.6rem 0;\n  border-bottom: 1px solid #fbcfe8;\n}\n",
        js: "const input = document.querySelector(\"#mood-input\");\nconst addBtn = document.querySelector(\"#add-btn\");\nconst list = document.querySelector(\"#mood-list\");\n\naddBtn.addEventListener(\"click\", () => {\n  if (input.value === \"\") return;\n  const item = document.createElement(\"li\");\n  item.textContent = input.value;\n  list.appendChild(item);\n  input.value = \"\";\n});\n",
      },
      checks: [
        { label: "The text input exists", kind: "domExists", value: "#mood-input" },
        { label: "The add button exists", kind: "domExists", value: "#add-btn" },
        { label: "The list exists", kind: "domExists", value: "#mood-list" },
        { label: "Listen for the add click", kind: "codeContains", value: "addEventListener" },
        { label: "Read what the user typed", kind: "codeContains", value: "input.value" },
        { label: "Build a new element", kind: "codeContains", value: "createElement" },
        { label: "Add it to the list", kind: "codeContains", value: "appendChild" },
        { label: "Clear the input afterwards", kind: "codeMatches", value: "value\\s*=\\s*\"\"" },
        { label: "Style each list item", kind: "codeMatches", value: "li\\s*\\{" },
      ],
      hints: [
        "Grab all three pieces first: const input = document.querySelector(\"#mood-input\"); the button; and const list = document.querySelector(\"#mood-list\");.",
        "In the click handler, guard against empties with if (input.value === \"\") return; then build const item = document.createElement(\"li\");.",
        "Set item.textContent = input.value;, call list.appendChild(item);, set input.value = \"\"; and add a li { padding: 0.6rem 0; border-bottom: 1px solid #fbcfe8; } rule.",
      ],
      wellDone: "You read user input, created elements on the fly, and grew the page in response. That is a complete app — and the core of nearly every tool on the web.",
    },
  ],
};
