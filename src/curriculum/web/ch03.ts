import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "web-style",
  title: "Style It",
  glyph: "🎨",
  summary: "Plain HTML is gray and dull. CSS gives it color, type, and shape.",
  lessons: [
    {
      id: "web-colors",
      track: "web",
      title: "Color it in",
      subtitle: "Set text and background color with CSS.",
      concepts: ["css", "color", "background"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "CSS paints your page" },
        {
          type: "p",
          text: "HTML is the structure; CSS is the paint. You pick an element, then list properties inside curly braces. Each property is a name, a colon, a value, and a semicolon.",
        },
        {
          type: "code",
          lang: "css",
          text: "body {\n  background-color: black;\n}\nh1 {\n  color: white;\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "color sets the text color. background-color sets the area behind it. Don't mix them up.",
        },
        {
          type: "p",
          text: "The CSS file has two empty rules waiting. Give the body a background-color and give the h1 a color. Use any colors you like.",
        },
      ],
      starter: {
        html: '<h1>Hello, color</h1>\n<p>Style me with CSS.</p>\n',
        css: "body {\n  /* set a background-color here */\n}\n\nh1 {\n  /* set a text color here */\n}\n",
        js: "",
      },
      solution: {
        html: '<h1>Hello, color</h1>\n<p>Style me with CSS.</p>\n',
        css: "body {\n  background-color: midnightblue;\n}\n\nh1 {\n  color: gold;\n}\n",
        js: "",
      },
      checks: [
        { label: "There is an h1 heading", kind: "domExists", value: "h1" },
        { label: "Give the body a background-color", kind: "codeContains", value: "background-color:" },
        { label: "Give the h1 a text color", kind: "codeContains", value: "color:" },
      ],
      hints: [
        "Type the property name, a colon, a color word, then a semicolon.",
        "Inside body put background-color: and inside h1 put color:.",
        "For example: body { background-color: midnightblue; } and h1 { color: gold; }",
      ],
      wellDone: "Two short rules and the whole page changes mood. That is the power of CSS.",
    },
    {
      id: "web-fonts",
      track: "web",
      title: "Pick a font",
      subtitle: "Font family, size, and centering text.",
      concepts: ["font-family", "font-size", "text-align"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Type has a voice" },
        {
          type: "p",
          text: "font-family chooses the typeface. font-size makes text bigger or smaller. text-align moves text left, right, or center. List several font names so the browser falls back if the first isn't available.",
        },
        {
          type: "code",
          lang: "css",
          text: "h1 {\n  font-family: Georgia, serif;\n  font-size: 48px;\n  text-align: center;\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "Sizes need a unit. px means pixels — font-size: 32px, not just 32.",
        },
        {
          type: "p",
          text: "Style the h1: set a font-family, set a font-size, and center it with text-align: center.",
        },
      ],
      starter: {
        html: '<h1>Big and bold</h1>\n<p>The heading needs some style.</p>\n',
        css: "h1 {\n  /* font-family, font-size, and text-align go here */\n}\n",
        js: "",
      },
      solution: {
        html: '<h1>Big and bold</h1>\n<p>The heading needs some style.</p>\n',
        css: "h1 {\n  font-family: Georgia, serif;\n  font-size: 48px;\n  text-align: center;\n}\n",
        js: "",
      },
      checks: [
        { label: "Choose a font-family", kind: "codeContains", value: "font-family:" },
        { label: "Set a font-size", kind: "codeContains", value: "font-size:" },
        { label: "Center the text", kind: "codeContains", value: "text-align: center", ci: true },
      ],
      hints: [
        "You need three lines inside the h1 rule.",
        "font-family: Georgia, serif; then font-size: 48px; then text-align: center;",
        "The full rule is: h1 { font-family: Georgia, serif; font-size: 48px; text-align: center; }",
      ],
      wellDone: "A good typeface and a centered heading already look intentional, not accidental.",
    },
    {
      id: "web-box",
      track: "web",
      title: "Build a card",
      subtitle: "Padding, border, and rounded corners.",
      concepts: ["padding", "border", "border-radius"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Every element is a box" },
        {
          type: "p",
          text: "Boxes have space inside and an edge around them. padding adds breathing room inside the edge. border draws the edge. border-radius rounds the corners into a soft card.",
        },
        {
          type: "code",
          lang: "css",
          text: ".card {\n  padding: 16px;\n  border: 2px solid gray;\n  border-radius: 12px;\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "border takes three parts: a width, a style like solid, and a color.",
        },
        {
          type: "p",
          text: "The HTML has a div with class card. Style .card so it has padding, a border, and a border-radius.",
        },
      ],
      starter: {
        html: '<div class="card">\n  <h2>Profile</h2>\n  <p>A box that wants to be a card.</p>\n</div>\n',
        css: ".card {\n  /* add padding, a border, and border-radius */\n}\n",
        js: "",
      },
      solution: {
        html: '<div class="card">\n  <h2>Profile</h2>\n  <p>A box that wants to be a card.</p>\n</div>\n',
        css: ".card {\n  padding: 16px;\n  border: 2px solid gray;\n  border-radius: 12px;\n}\n",
        js: "",
      },
      checks: [
        { label: "There is a card element", kind: "domExists", value: ".card" },
        { label: "Add padding inside the card", kind: "codeContains", value: "padding:" },
        { label: "Draw a border", kind: "codeContains", value: "border:" },
        { label: "Round the corners", kind: "codeContains", value: "border-radius:" },
      ],
      hints: [
        "All four edges at once: padding: 16px; and border-radius: 12px;.",
        "A border needs width, style, and color: border: 2px solid gray;.",
        "The full rule is: .card { padding: 16px; border: 2px solid gray; border-radius: 12px; }",
      ],
      wellDone: "Padding, a border, and rounded corners — that is the recipe behind nearly every card you see online.",
    },
  ],
};
