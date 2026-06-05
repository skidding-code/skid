import type { Chapter } from "../types";

export const ch10: Chapter = {
  id: "web-homepage",
  title: "Your Homepage",
  glyph: "🏠",
  summary: "The grand finale. Build a real personal homepage from scratch — structure it with HTML, style it with CSS, and bring it to life with JavaScript. Three lessons, one page, all yours.",
  lessons: [
    {
      id: "web-homepage-structure",
      track: "web",
      title: "Lay the foundation",
      subtitle: "Build the skeleton of a real homepage.",
      concepts: ["semantic HTML", "header", "section"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Every great page starts as a skeleton" },
        {
          type: "p",
          text: "You've learned the pieces. Now you build the whole thing. A real homepage isn't a pile of tags — it has structure. A header at the top with your name and a navigation menu, then sections below for the actual content.",
        },
        {
          type: "p",
          text: "Use semantic tags so the structure means something: <header> wraps the top, <nav> holds your menu links, and each <section> is a distinct block of content with its own heading.",
        },
        {
          type: "code",
          lang: "html",
          text: '<header>\n  <h1>Ada Lovelace</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#work">Work</a>\n  </nav>\n</header>\n<section>\n  <h2>About</h2>\n  <p>...</p>\n</section>',
        },
        {
          type: "callout",
          tone: "note",
          text: "Semantic tags like header, nav, and section describe what content is — not just how it looks. Screen readers and search engines rely on them.",
        },
        {
          type: "p",
          text: "Build the bones of your homepage: a <header> containing an <h1> with your name and a <nav>, then at least two <section> elements, each with its own heading.",
        },
      ],
      starter: {
        html: '<!-- TODO: wrap the top in a <header> -->\n<!--   put an <h1> with your name inside it -->\n<!--   add a <nav> with a couple of links -->\n\n<!-- TODO: add two <section> elements below the header -->\n<!--   give each one a heading and a line of text -->\n',
        css: "",
        js: "",
      },
      solution: {
        html: '<header>\n  <h1>Ada Lovelace</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n\n<section id="about">\n  <h2>About me</h2>\n  <p>I write code and dream up machines.</p>\n</section>\n\n<section id="projects">\n  <h2>Projects</h2>\n  <p>The Analytical Engine, and more to come.</p>\n</section>\n',
        css: "",
        js: "",
      },
      checks: [
        { label: "Wrap the top in a <header>", kind: "domExists", value: "header" },
        { label: "Add a <nav> for your menu", kind: "domExists", value: "nav" },
        { label: "Add at least one <section>", kind: "domExists", value: "section" },
        { label: "Include a top-level <h1>", kind: "domExists", value: "h1" },
        { label: "Use two or more sections", kind: "domCountAtLeast", value: "section::2" },
      ],
      hints: [
        "Start with <header> ... </header>. Everything for the top of the page goes between those tags.",
        "Inside the header put <h1>Your Name</h1> and a <nav> with one or two <a> links.",
        "Below the header, write two <section> blocks: <section><h2>About</h2><p>...</p></section> and a second one just like it.",
      ],
      wellDone: "That's a properly structured page — the same backbone real websites are built on.",
    },
    {
      id: "web-homepage-style",
      track: "web",
      title: "Make it yours",
      subtitle: "Style the page until it looks like something you'd ship.",
      concepts: ["flexbox", "spacing", "border-radius"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Structure is nothing without style" },
        {
          type: "p",
          text: "The skeleton works, but it looks like a wall of text. Time to fix that. Lay the navigation links out in a row with flexbox, give your content room to breathe with padding, and turn a section into a card with rounded corners.",
        },
        {
          type: "p",
          text: "display: flex on the nav puts its links side by side instead of stacked. padding pushes content away from the edges. border-radius rounds the corners so a plain box starts to feel like a card.",
        },
        {
          type: "code",
          lang: "css",
          text: "nav {\n  display: flex;\n  gap: 16px;\n}\nsection {\n  padding: 24px;\n  border-radius: 12px;\n  background: #f4f4f8;\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "gap adds even spacing between flex items without margins on each one — far cleaner than nudging each link by hand.",
        },
        {
          type: "p",
          text: "In the CSS, make the nav a flex row, give your sections padding and a border-radius so they read as cards, and add some colors. Make it feel like a page you'd put your name on.",
        },
      ],
      starter: {
        html: '<header>\n  <h1>Ada Lovelace</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n\n<section id="about">\n  <h2>About me</h2>\n  <p>I write code and dream up machines.</p>\n</section>\n\n<section id="projects">\n  <h2>Projects</h2>\n  <p>The Analytical Engine, and more to come.</p>\n</section>\n',
        css: "/* TODO: lay the nav links in a row with display: flex */\n/*   add gap between them */\n\n/* TODO: give your sections padding and a border-radius */\n/*   so each one looks like a card */\n\n/* TODO: add colors so it stops looking plain */\n",
        js: "",
      },
      solution: {
        html: '<header>\n  <h1>Ada Lovelace</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n\n<section id="about">\n  <h2>About me</h2>\n  <p>I write code and dream up machines.</p>\n</section>\n\n<section id="projects">\n  <h2>Projects</h2>\n  <p>The Analytical Engine, and more to come.</p>\n</section>\n',
        css: "body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  background: #1f2233;\n  color: #f4f4f8;\n}\n\nheader {\n  padding: 24px;\n}\n\nnav {\n  display: flex;\n  gap: 16px;\n}\n\nnav a {\n  color: #8ab4ff;\n  text-decoration: none;\n}\n\nsection {\n  margin: 16px 24px;\n  padding: 24px;\n  border-radius: 12px;\n  background: #2b2f47;\n}\n",
        js: "",
      },
      checks: [
        { label: "Lay the nav out with flexbox", kind: "codeContains", value: "display: flex" },
        { label: "Add padding for breathing room", kind: "codeContains", value: "padding" },
        { label: "Round your cards with border-radius", kind: "codeContains", value: "border-radius" },
        { label: "The nav really is a flex row", kind: "cssProp", value: "nav::display::flex" },
      ],
      hints: [
        "Write a nav { } rule and put display: flex; inside it. Add gap: 16px; to space the links.",
        "Write a section { } rule with padding: 24px; and border-radius: 12px;.",
        "Add a background color to your sections and the body, e.g. background: #2b2f47; so the cards stand out.",
      ],
      wellDone: "It went from a draft to a design. This is what shipping a page actually feels like.",
    },
    {
      id: "web-homepage-interactive",
      track: "web",
      title: "Bring it to life",
      subtitle: "Wire up a dark-mode toggle and finish the page.",
      concepts: ["addEventListener", "classList", "toggle"],
      estimatedMinutes: 8,
      intro: [
        { type: "h", text: "One button, real interactivity" },
        {
          type: "p",
          text: "Your page looks good. Now make it do something. A dark-mode toggle is the classic move: one button flips the whole page's theme. The trick is to add or remove a single class on the body, then let CSS handle the rest.",
        },
        {
          type: "p",
          text: "classList.toggle(\"dark\") adds the class if it's missing and removes it if it's there — perfect for a switch. Wire it to a button with addEventListener and you have a real feature.",
        },
        {
          type: "code",
          lang: "js",
          text: 'let button = document.querySelector("#theme");\nbutton.addEventListener("click", function () {\n  document.body.classList.toggle("dark");\n});',
        },
        {
          type: "callout",
          tone: "warn",
          text: "The class only changes when the button is clicked, so the page won't look different the instant it loads. That's expected — the wiring is what counts here.",
        },
        {
          type: "p",
          text: "Add a button with id theme to the HTML, then in the JS add a click listener that calls classList.toggle(\"dark\") on document.body. Add a body.dark rule in CSS so the toggle has a visible effect.",
        },
      ],
      starter: {
        html: '<header>\n  <h1>Ada Lovelace</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n  <!-- TODO: add a <button id="theme"> that toggles the theme -->\n</header>\n\n<section id="about">\n  <h2>About me</h2>\n  <p>I write code and dream up machines.</p>\n</section>\n\n<section id="projects">\n  <h2>Projects</h2>\n  <p>The Analytical Engine, and more to come.</p>\n</section>\n',
        css: "body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  background: #f4f4f8;\n  color: #1f2233;\n}\n\nheader {\n  padding: 24px;\n}\n\nnav {\n  display: flex;\n  gap: 16px;\n}\n\nsection {\n  margin: 16px 24px;\n  padding: 24px;\n  border-radius: 12px;\n  background: #ffffff;\n}\n\n/* TODO: add a body.dark rule so the toggle changes the colors */\n",
        js: "// TODO: select the #theme button\n// TODO: addEventListener for a click\n// TODO: inside, call classList.toggle(\"dark\") on document.body\n",
      },
      solution: {
        html: '<header>\n  <h1>Ada Lovelace</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n  <button id="theme">Toggle theme</button>\n</header>\n\n<section id="about">\n  <h2>About me</h2>\n  <p>I write code and dream up machines.</p>\n</section>\n\n<section id="projects">\n  <h2>Projects</h2>\n  <p>The Analytical Engine, and more to come.</p>\n</section>\n',
        css: "body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  background: #f4f4f8;\n  color: #1f2233;\n}\n\nheader {\n  padding: 24px;\n}\n\nnav {\n  display: flex;\n  gap: 16px;\n}\n\nsection {\n  margin: 16px 24px;\n  padding: 24px;\n  border-radius: 12px;\n  background: #ffffff;\n}\n\nbody.dark {\n  background: #1f2233;\n  color: #f4f4f8;\n}\n\nbody.dark section {\n  background: #2b2f47;\n}\n",
        js: 'let button = document.querySelector("#theme");\nbutton.addEventListener("click", function () {\n  document.body.classList.toggle("dark");\n});\n',
      },
      checks: [
        { label: "Add a button with id theme", kind: "domExists", value: "#theme" },
        { label: "Listen for the click", kind: "codeContains", value: "addEventListener" },
        { label: "Reach for classList", kind: "codeContains", value: "classList" },
        { label: "Flip the class with toggle", kind: "codeContains", value: "toggle" },
        { label: "Toggle the dark class", kind: "codeContains", value: '"dark"' },
        { label: "Style the dark theme", kind: "codeContains", value: "body.dark" },
      ],
      hints: [
        'Add <button id="theme">Toggle theme</button> inside the header.',
        'In the JS: let button = document.querySelector("#theme"); then call button.addEventListener("click", function () { ... });.',
        'Inside the function write document.body.classList.toggle("dark"); and add a body.dark { } rule in the CSS.',
      ],
      wellDone: "Structure, style, and behavior — you built a complete, interactive homepage. That's the whole craft in one page.",
    },
  ],
};
