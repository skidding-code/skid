import type { Chapter } from "../types";

export const ch11: Chapter = {
  id: "web-responsive",
  title: "Looks Great Everywhere",
  glyph: "📱",
  summary:
    "A page that looks sharp on a laptop can be a broken mess on a phone. Responsive CSS makes one layout adapt to any screen.",
  lessons: [
    {
      id: "web-fluid-sizing",
      track: "web",
      title: "Stop the overflow",
      subtitle: "Fluid widths with max-width, percentages, and relative units.",
      concepts: ["max-width", "width", "responsive"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Fixed widths break on small screens" },
        {
          type: "p",
          text: "A box set to width: 800px stays 800px wide even on a 375px phone, so it spills off the edge and forces sideways scrolling. The fix is to size things fluidly.",
        },
        {
          type: "p",
          text: "Set max-width so the box never grows past a comfortable limit, and width: 100% so it shrinks to fit anything narrower. The box takes whichever is smaller.",
        },
        {
          type: "code",
          lang: "css",
          text: ".container {\n  max-width: 640px;\n  width: 100%;\n  margin: 0 auto;\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "max-width with width: 100% is the single most useful responsive pattern. Reach for it first.",
        },
        {
          type: "p",
          text: "Style .container so it has a max-width and a width of 100%. Do not give it a fixed pixel width.",
        },
      ],
      starter: {
        html:
          '<div class="container">\n  <h1>My Wide Article</h1>\n  <p>This text should never run off the edge of a phone screen.</p>\n</div>\n',
        css:
          ".container {\n  /* add a max-width and a width of 100% so it never overflows */\n  margin: 0 auto;\n}\n",
        js: "",
      },
      solution: {
        html:
          '<div class="container">\n  <h1>My Wide Article</h1>\n  <p>This text should never run off the edge of a phone screen.</p>\n</div>\n',
        css:
          ".container {\n  max-width: 640px;\n  width: 100%;\n  margin: 0 auto;\n}\n",
        js: "",
      },
      checks: [
        { label: "There is a container", kind: "domExists", value: ".container" },
        { label: "Cap the width with max-width", kind: "codeContains", value: "max-width:" },
        { label: "Let it shrink with a percentage width", kind: "codeContains", value: "%" },
      ],
      hints: [
        "max-width sets the ceiling; a percentage width lets it shrink below that ceiling.",
        "You need two declarations: max-width: 640px; and width: 100%;.",
        "The full rule is: .container { max-width: 640px; width: 100%; margin: 0 auto; }",
      ],
      wellDone:
        "max-width plus width: 100% — the box now fits a watch and a widescreen without changing a single number.",
    },
    {
      id: "web-media-query",
      track: "web",
      title: "Rearrange on small screens",
      subtitle: "A media query that stacks a flex row when space is tight.",
      concepts: ["@media", "flex-direction", "breakpoint"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "One layout is not enough" },
        {
          type: "p",
          text: "Two columns side by side look great on a desktop and cramped on a phone. A media query lets you change the rules below a chosen width, called a breakpoint.",
        },
        {
          type: "p",
          text: "The row uses display: flex, which lays its children out horizontally by default. Inside a media query you flip flex-direction to column so they stack vertically when the screen is narrow.",
        },
        {
          type: "code",
          lang: "css",
          text: ".row {\n  display: flex;\n}\n\n@media (max-width: 600px) {\n  .row {\n    flex-direction: column;\n  }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "The rules inside @media only apply when the condition is true. Everything outside it always applies.",
        },
        {
          type: "p",
          text: "Add a media query for max-width: 600px that sets .row to flex-direction: column. Leave the default row as a flex container.",
        },
      ],
      starter: {
        html:
          '<div class="row">\n  <div class="panel">Left</div>\n  <div class="panel">Right</div>\n</div>\n',
        css:
          ".row {\n  display: flex;\n  gap: 12px;\n}\n\n.panel {\n  flex: 1;\n  padding: 16px;\n  background: #eee;\n}\n\n/* add a media query for narrow screens that stacks .row vertically */\n",
        js: "",
      },
      solution: {
        html:
          '<div class="row">\n  <div class="panel">Left</div>\n  <div class="panel">Right</div>\n</div>\n',
        css:
          ".row {\n  display: flex;\n  gap: 12px;\n}\n\n.panel {\n  flex: 1;\n  padding: 16px;\n  background: #eee;\n}\n\n@media (max-width: 600px) {\n  .row {\n    flex-direction: column;\n  }\n}\n",
        js: "",
      },
      checks: [
        { label: "There is a flex row", kind: "domExists", value: ".row" },
        { label: "Write a media query", kind: "codeContains", value: "@media" },
        { label: "Target small screens", kind: "codeContains", value: "max-width:" },
        { label: "Stack the row vertically", kind: "codeContains", value: "flex-direction" },
      ],
      hints: [
        "Start the block with @media (max-width: 600px) { ... }.",
        "Inside that block, write a .row rule that changes its direction.",
        "The full block is: @media (max-width: 600px) { .row { flex-direction: column; } }",
      ],
      wellDone:
        "Wide screens get columns, narrow screens get a stack — one breakpoint, two layouts.",
    },
    {
      id: "web-fluid-type-grid",
      track: "web",
      title: "Type and grids that flex",
      subtitle: "Scale text with clamp() and let a card grid wrap.",
      concepts: ["clamp", "flex-wrap", "@media"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Let the layout breathe" },
        {
          type: "p",
          text: "A heading sized at one fixed value is either too big on a phone or too small on a desktop. clamp() picks a size that scales with the viewport but never goes below a floor or above a ceiling.",
        },
        {
          type: "p",
          text: "Cards in a fixed row overflow when there are too many. flex-wrap: wrap lets them drop onto the next line instead of squeezing or spilling.",
        },
        {
          type: "code",
          lang: "css",
          text: "h1 {\n  font-size: clamp(1.5rem, 5vw, 3rem);\n}\n\n.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "clamp(min, preferred, max) reads left to right: never smaller than min, never larger than max, and the middle value flexes between them.",
        },
        {
          type: "p",
          text: "Give the h1 a fluid font-size using clamp(), and make .grid wrap its cards with flex-wrap: wrap.",
        },
      ],
      starter: {
        html:
          '<h1>Our Team</h1>\n<div class="grid">\n  <div class="card">Ada</div>\n  <div class="card">Grace</div>\n  <div class="card">Alan</div>\n  <div class="card">Linus</div>\n</div>\n',
        css:
          "h1 {\n  /* give this a fluid font-size with clamp() */\n}\n\n.grid {\n  display: flex;\n  gap: 16px;\n  /* let the cards wrap onto new lines */\n}\n\n.card {\n  flex: 1 1 160px;\n  padding: 24px;\n  background: #ddd;\n}\n",
        js: "",
      },
      solution: {
        html:
          '<h1>Our Team</h1>\n<div class="grid">\n  <div class="card">Ada</div>\n  <div class="card">Grace</div>\n  <div class="card">Alan</div>\n  <div class="card">Linus</div>\n</div>\n',
        css:
          "h1 {\n  font-size: clamp(1.5rem, 5vw, 3rem);\n}\n\n.grid {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.card {\n  flex: 1 1 160px;\n  padding: 24px;\n  background: #ddd;\n}\n",
        js: "",
      },
      checks: [
        { label: "There is a card grid", kind: "domExists", value: ".grid" },
        { label: "There are cards in it", kind: "domCountAtLeast", value: ".card::3" },
        { label: "Scale the heading with clamp()", kind: "codeContains", value: "clamp(" },
        { label: "Let the cards wrap", kind: "codeContains", value: "flex-wrap" },
      ],
      hints: [
        "clamp() takes three values: a minimum, a viewport-relative preferred size, and a maximum.",
        "For the h1: font-size: clamp(1.5rem, 5vw, 3rem);. For the grid: flex-wrap: wrap;.",
        "The h1 rule is font-size: clamp(1.5rem, 5vw, 3rem); and the grid needs flex-wrap: wrap;.",
      ],
      wellDone:
        "Type that scales and cards that wrap — the page reflows gracefully from phone to desktop.",
    },
  ],
};
