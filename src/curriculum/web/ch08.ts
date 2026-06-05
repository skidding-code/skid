import type { Chapter } from "../types";

export const ch08: Chapter = {
  id: "web-events",
  title: "React to the User",
  glyph: "🖱️",
  summary: "Wire your page to the person using it. Toggle styles on a click, update text live as they type, and respond to the mouse moving across an element.",
  lessons: [
    {
      id: "web-events-toggle",
      track: "web",
      title: "Toggle a class",
      subtitle: "Flip a style on and off with one click.",
      concepts: ["classList", "toggle"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "One click, two states" },
        {
          type: "p",
          text: "Every element carries a list of its CSS classes. You reach it with element.classList. The toggle method adds a class if it is missing and removes it if it is already there. That single call gives you an on/off switch with no if-statement.",
        },
        {
          type: "p",
          text: "The CSS already defines an .active class that turns the box green. The HTML has a div with class box and a button with id toggle. When the button is clicked, toggle the active class on the box.",
        },
        { type: "code", lang: "js", text: 'let target = document.querySelector("#thing");\ndocument.querySelector("#switch").addEventListener("click", function () {\n  target.classList.toggle("active");\n});' },
        {
          type: "callout",
          tone: "note",
          text: "classList.toggle(\"active\") does not change text. It only adds or removes the class, and your CSS decides what that class looks like.",
        },
        {
          type: "p",
          text: "Add a click listener to the button with id toggle. Inside it, call classList.toggle(\"active\") on the element with class box.",
        },
      ],
      starter: {
        html: '<div class="box">Watch me</div>\n<button id="toggle">Toggle</button>\n',
        css: ".box {\n  width: 120px;\n  height: 120px;\n  background: #888;\n  color: white;\n  display: grid;\n  place-items: center;\n}\n.box.active {\n  background: #2e9e4f;\n}\n",
        js: "// Toggle the active class on .box when #toggle is clicked\n",
      },
      solution: {
        html: '<div class="box">Watch me</div>\n<button id="toggle">Toggle</button>\n',
        css: ".box {\n  width: 120px;\n  height: 120px;\n  background: #888;\n  color: white;\n  display: grid;\n  place-items: center;\n}\n.box.active {\n  background: #2e9e4f;\n}\n",
        js: 'let box = document.querySelector(".box");\ndocument.querySelector("#toggle").addEventListener("click", function () {\n  box.classList.toggle("active");\n});\n',
      },
      checks: [
        { label: "There is a box to toggle", kind: "domExists", value: ".box" },
        { label: "There is a toggle button", kind: "domExists", value: "#toggle" },
        { label: "Listen for the click event", kind: "codeContains", value: "addEventListener" },
        { label: "Handle a click", kind: "codeContains", value: "click" },
        { label: "Reach the class list", kind: "codeContains", value: "classList" },
        { label: "Toggle the class", kind: "codeContains", value: "toggle" },
        { label: "Toggle the active class specifically", kind: "codeContains", value: "active" },
      ],
      hints: [
        "Grab the box: document.querySelector(\".box\").",
        "Listen on the button: document.querySelector(\"#toggle\").addEventListener(\"click\", function () { ... });",
        "Inside the function: box.classList.toggle(\"active\");",
      ],
      wellDone: "One toggle call replaces a pile of show/hide logic — you just built a real switch.",
    },
    {
      id: "web-events-input",
      track: "web",
      title: "Type and see it live",
      subtitle: "Mirror an input into the page as it changes.",
      concepts: ["input event", "value"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "The input event fires on every keystroke" },
        {
          type: "p",
          text: "A text field fires an input event each time its contents change. Listen for it, read the field's current text from its value property, and write that text somewhere on the page. The result updates instantly as the user types.",
        },
        {
          type: "p",
          text: "The HTML has a text field with id name and a paragraph with id echo. Listen for the input event on the field and copy its value into the paragraph.",
        },
        { type: "code", lang: "js", text: 'let field = document.querySelector("#name");\nfield.addEventListener("input", function () {\n  document.querySelector("#echo").textContent = field.value;\n});' },
        {
          type: "callout",
          tone: "tip",
          text: "Use the input event, not click. click only fires when the field is pressed; input fires on every change to its text.",
        },
        {
          type: "p",
          text: "Add an input listener to the field with id name. On each input, set the textContent of #echo to the field's value.",
        },
      ],
      starter: {
        html: '<input id="name" type="text" placeholder="Type here">\n<p id="echo">Nothing typed yet</p>\n',
        css: "input {\n  font-size: 16px;\n  padding: 6px;\n}\n#echo {\n  font-weight: bold;\n}\n",
        js: "// Update #echo with the field's value on every input event\n",
      },
      solution: {
        html: '<input id="name" type="text" placeholder="Type here">\n<p id="echo">Nothing typed yet</p>\n',
        css: "input {\n  font-size: 16px;\n  padding: 6px;\n}\n#echo {\n  font-weight: bold;\n}\n",
        js: 'let field = document.querySelector("#name");\nfield.addEventListener("input", function () {\n  document.querySelector("#echo").textContent = field.value;\n});\n',
      },
      checks: [
        { label: "There is a text field", kind: "domExists", value: "#name" },
        { label: "There is a place to echo text", kind: "domExists", value: "#echo" },
        { label: "Attach an event listener", kind: "codeContains", value: "addEventListener" },
        { label: "Listen for the input event", kind: "codeContains", value: "input" },
        { label: "Read the field's value", kind: "codeContains", value: "value" },
        { label: "Write the text into the page", kind: "codeContains", value: "textContent" },
      ],
      hints: [
        "Grab the field: document.querySelector(\"#name\").",
        "Listen with field.addEventListener(\"input\", function () { ... });",
        "Inside: document.querySelector(\"#echo\").textContent = field.value;",
      ],
      wellDone: "Live updates like this are what make a form feel responsive instead of dead.",
    },
    {
      id: "web-events-mouseover",
      track: "web",
      title: "Respond to the mouse",
      subtitle: "Change something when the pointer arrives.",
      concepts: ["mouseenter", "events"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "The mouse fires events too" },
        {
          type: "p",
          text: "Pointer movement triggers events you can listen for. mouseenter fires once when the pointer crosses into an element; mouseover is the closely related event for the same idea. Either one lets you react the moment the mouse arrives.",
        },
        {
          type: "p",
          text: "The HTML has a div with id card. The CSS defines a .hovered class that lifts and recolors it. Listen for mouseenter on the card and add the hovered class to its classList.",
        },
        { type: "code", lang: "js", text: 'let card = document.querySelector("#panel");\ncard.addEventListener("mouseenter", function () {\n  card.classList.add("hovered");\n});' },
        {
          type: "callout",
          tone: "note",
          text: "mouseenter fires when the pointer enters the element. mouseover does the same job here; either event name is accepted.",
        },
        {
          type: "p",
          text: "Add a mouseenter listener to the element with id card. When the mouse enters, add the hovered class to it.",
        },
      ],
      starter: {
        html: '<div id="card">Hover over me</div>\n',
        css: "#card {\n  width: 200px;\n  padding: 24px;\n  background: #ddd;\n  text-align: center;\n  transition: all 0.15s;\n}\n#card.hovered {\n  background: #4060ff;\n  color: white;\n  transform: translateY(-4px);\n}\n",
        js: "// Add the hovered class to #card on mouseenter\n",
      },
      solution: {
        html: '<div id="card">Hover over me</div>\n',
        css: "#card {\n  width: 200px;\n  padding: 24px;\n  background: #ddd;\n  text-align: center;\n  transition: all 0.15s;\n}\n#card.hovered {\n  background: #4060ff;\n  color: white;\n  transform: translateY(-4px);\n}\n",
        js: 'let card = document.querySelector("#card");\ncard.addEventListener("mouseenter", function () {\n  card.classList.add("hovered");\n});\n',
      },
      checks: [
        { label: "There is a card to hover", kind: "domExists", value: "#card" },
        { label: "Attach an event listener", kind: "codeContains", value: "addEventListener" },
        { label: "Listen for the mouse arriving", kind: "codeMatches", value: "mouseenter|mouseover" },
        { label: "Reach the class list", kind: "codeContains", value: "classList" },
        { label: "Apply the hovered class", kind: "codeContains", value: "hovered" },
      ],
      hints: [
        "Grab the card: document.querySelector(\"#card\").",
        "Listen with card.addEventListener(\"mouseenter\", function () { ... }); (mouseover works too).",
        "Inside: card.classList.add(\"hovered\");",
      ],
      wellDone: "Hover reactions are pure polish — small touches like this make a page feel alive.",
    },
  ],
};
