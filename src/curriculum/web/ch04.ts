import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "web-layout",
  title: "Arrange It",
  glyph: "📐",
  summary: "Lay out boxes the modern way. Flexbox puts things in a row, spaces them out, and keeps them tidy.",
  lessons: [
    {
      id: "web-flex-row",
      track: "web",
      title: "Boxes in a row",
      subtitle: "One line of CSS turns a stack into a row.",
      concepts: ["display: flex", "containers"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Stop stacking, start arranging" },
        {
          type: "p",
          text: "By default, block elements stack on top of each other. Set display: flex on a container and its children line up side by side instead. The container is the flex parent; the boxes inside are its items.",
        },
        {
          type: "code",
          lang: "css",
          text: ".row {\n  display: flex;\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "Flex applies to the container, not the boxes. You change the parent, and the children fall in line.",
        },
        {
          type: "p",
          text: "The HTML already has a .row div with three boxes inside. Add a rule that gives .row display: flex so the boxes sit in a row.",
        },
      ],
      starter: {
        html: '<div class="row">\n  <div class="box">A</div>\n  <div class="box">B</div>\n  <div class="box">C</div>\n</div>\n',
        css: ".box {\n  padding: 20px;\n  background: #cde;\n}\n\n/* Make .row a flex container below */\n",
        js: "",
      },
      solution: {
        html: '<div class="row">\n  <div class="box">A</div>\n  <div class="box">B</div>\n  <div class="box">C</div>\n</div>\n',
        css: ".box {\n  padding: 20px;\n  background: #cde;\n}\n\n.row {\n  display: flex;\n}\n",
        js: "",
      },
      checks: [
        { label: "Turn the container into a flex box", kind: "codeContains", value: "display: flex" },
        { label: "The .row container is actually flex", kind: "cssProp", value: ".row::display::flex" },
      ],
      hints: [
        "Write a rule for the .row selector.",
        "Inside it, set the display property.",
        "The whole rule is: .row { display: flex; }",
      ],
      wellDone: "One property flipped a vertical stack into a horizontal row. That's the heart of Flexbox.",
    },
    {
      id: "web-flex-space",
      track: "web",
      title: "Spread them out",
      subtitle: "Push boxes apart and add breathing room.",
      concepts: ["justify-content", "gap"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Control the spacing" },
        {
          type: "p",
          text: "Once a container is flex, you decide how the items share the leftover space. justify-content positions them along the row — space-between pushes the first and last to the edges and spreads the rest evenly.",
        },
        {
          type: "p",
          text: "gap adds a fixed amount of space between items, with no extra margin hacks.",
        },
        {
          type: "code",
          lang: "css",
          text: ".row {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Common justify-content values: flex-start, center, space-between, space-around.",
        },
        {
          type: "p",
          text: "Make .row a flex container, then space the boxes with justify-content: space-between and a gap of 16px.",
        },
      ],
      starter: {
        html: '<div class="row">\n  <div class="box">A</div>\n  <div class="box">B</div>\n  <div class="box">C</div>\n</div>\n',
        css: ".box {\n  padding: 20px;\n  background: #cde;\n}\n\n/* Make .row flex, then space the boxes out */\n.row {\n}\n",
        js: "",
      },
      solution: {
        html: '<div class="row">\n  <div class="box">A</div>\n  <div class="box">B</div>\n  <div class="box">C</div>\n</div>\n',
        css: ".box {\n  padding: 20px;\n  background: #cde;\n}\n\n.row {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n}\n",
        js: "",
      },
      checks: [
        { label: "Make the row a flex container", kind: "codeContains", value: "display: flex" },
        { label: "Space the items along the row", kind: "codeContains", value: "justify-content" },
        { label: "Add space between the boxes", kind: "codeContains", value: "gap" },
      ],
      hints: [
        "Start the .row rule with display: flex.",
        "Add justify-content to position items, and gap to separate them.",
        "Inside .row use: display: flex; justify-content: space-between; gap: 16px;",
      ],
      wellDone: "justify-content and gap give you precise control over spacing without a single margin.",
    },
    {
      id: "web-flex-navbar",
      track: "web",
      title: "A real navbar",
      subtitle: "Put it together into a tidy top bar.",
      concepts: ["display: flex", "justify-content", "gap"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Layout you'll use everywhere" },
        {
          type: "p",
          text: "A navbar is just a flex row: a brand on the left, links grouped on the right. Make the outer bar a flex container, push the two sides apart, and give the links a gap so they don't crowd.",
        },
        {
          type: "code",
          lang: "css",
          text: ".nav {\n  display: flex;\n  justify-content: space-between;\n}\n\n.links {\n  display: flex;\n  gap: 24px;\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Flex containers nest happily. The bar is flex, and the .links group inside it is its own little flex row.",
        },
        {
          type: "p",
          text: "Style .nav so the brand and links sit at opposite ends, and make .links a flex row with a 24px gap.",
        },
      ],
      starter: {
        html: '<nav class="nav">\n  <div class="brand">Skid</div>\n  <div class="links">\n    <a href="#">Home</a>\n    <a href="#">Docs</a>\n    <a href="#">About</a>\n  </div>\n</nav>\n',
        css: ".nav {\n  padding: 12px 20px;\n  background: #223;\n  color: white;\n}\n\n.links a {\n  color: white;\n}\n\n/* Make .nav a spaced flex bar, and .links a flex row with a gap */\n",
        js: "",
      },
      solution: {
        html: '<nav class="nav">\n  <div class="brand">Skid</div>\n  <div class="links">\n    <a href="#">Home</a>\n    <a href="#">Docs</a>\n    <a href="#">About</a>\n  </div>\n</nav>\n',
        css: ".nav {\n  padding: 12px 20px;\n  background: #223;\n  color: white;\n  display: flex;\n  justify-content: space-between;\n}\n\n.links a {\n  color: white;\n}\n\n.links {\n  display: flex;\n  gap: 24px;\n}\n",
        js: "",
      },
      checks: [
        { label: "Use flex for the layout", kind: "codeContains", value: "display: flex" },
        { label: "Push brand and links to opposite ends", kind: "codeContains", value: "justify-content" },
        { label: "Space the links with a gap", kind: "codeContains", value: "gap" },
        { label: "The nav bar is actually flex", kind: "cssProp", value: ".nav::display::flex" },
      ],
      hints: [
        "Add display: flex and justify-content: space-between to .nav.",
        "Give .links its own rule with display: flex and gap: 24px.",
        ".nav { display: flex; justify-content: space-between; } and .links { display: flex; gap: 24px; }",
      ],
      wellDone: "You just built the same navbar pattern that ships on real websites everywhere.",
    },
  ],
};
