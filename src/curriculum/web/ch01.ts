import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "web-firstpage",
  title: "Your First Page",
  glyph: "📄",
  summary: "Build a web page from scratch with HTML tags. Headings, paragraphs, and emphasis.",
  lessons: [
    {
      id: "web-heading-paragraph",
      track: "web",
      title: "Heading and paragraph",
      subtitle: "The two tags every page is built from.",
      concepts: ["html", "h1", "p"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Tags wrap your content" },
        {
          type: "p",
          text: "HTML marks up text with tags. A tag has an opening part like <h1> and a closing part like </h1>, and your content goes between them. The browser reads those tags to decide how the page looks.",
        },
        {
          type: "p",
          text: "An <h1> is the big top heading of a page. A <p> is a paragraph of normal text.",
        },
        { type: "code", lang: "html", text: "<h1>My Blog</h1>\n<p>This is where I write things.</p>" },
        {
          type: "callout",
          tone: "tip",
          text: "Forget the closing slash and the browser keeps applying the tag to everything after it. Always close what you open.",
        },
        {
          type: "p",
          text: "Make an <h1> that says Welcome, then a <p> with any sentence you like underneath it.",
        },
      ],
      starter: { html: "<!-- Add your heading and paragraph below -->\n", css: "", js: "" },
      solution: {
        html: "<h1>Welcome</h1>\n<p>Glad you found my page.</p>\n",
        css: "",
        js: "",
      },
      checks: [
        { label: "Add an h1 heading", kind: "domExists", value: "h1" },
        { label: "The heading says Welcome", kind: "domTextContains", value: "h1::Welcome", ci: true },
        { label: "Add a paragraph", kind: "domExists", value: "p" },
      ],
      hints: [
        "Open with <h1> and close with </h1>.",
        "Put the word Welcome between the two h1 tags.",
        "Like this: <h1>Welcome</h1> on one line, then <p>Any sentence.</p> below.",
      ],
      wellDone: "That heading and paragraph are the bones of every page on the web.",
    },
    {
      id: "web-text-structure",
      track: "web",
      title: "More structure",
      subtitle: "Subheadings and several paragraphs.",
      concepts: ["h2", "p", "structure"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Break text into sections" },
        {
          type: "p",
          text: "Real pages have more than one heading. An <h2> is a subheading — smaller than <h1>, used to start a new section below the main title.",
        },
        {
          type: "p",
          text: "You can also stack as many <p> tags as you want. Each one is its own paragraph with space around it.",
        },
        { type: "code", lang: "html", text: "<h1>My Recipes</h1>\n<h2>Breakfast</h2>\n<p>Eggs, fast.</p>\n<p>Toast, faster.</p>" },
        {
          type: "callout",
          tone: "note",
          text: "Headings go h1, h2, h3 in order of importance — not by how big they look. Pick by meaning.",
        },
        {
          type: "p",
          text: "Add an <h2> subheading and at least two <p> paragraphs to the page below.",
        },
      ],
      starter: {
        html: "<h1>My Page</h1>\n<!-- Add an h2 and two paragraphs below -->\n",
        css: "",
        js: "",
      },
      solution: {
        html: "<h1>My Page</h1>\n<h2>About</h2>\n<p>I like building things.</p>\n<p>I am learning to code.</p>\n",
        css: "",
        js: "",
      },
      checks: [
        { label: "Add an h2 subheading", kind: "domExists", value: "h2" },
        { label: "Have at least two paragraphs", kind: "domCountAtLeast", value: "p::2" },
      ],
      hints: [
        "Add a line with <h2>...</h2> under the h1.",
        "A paragraph is <p>some text</p> — write two of them.",
        "Try: <h2>About</h2> then <p>First line.</p> and <p>Second line.</p>.",
      ],
      wellDone: "Headings and paragraphs together give a page real structure a reader can follow.",
    },
    {
      id: "web-about-me",
      track: "web",
      title: "An about me page",
      subtitle: "Put the pieces together and add emphasis.",
      concepts: ["page", "strong", "em"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Make it yours" },
        {
          type: "p",
          text: "You now have every tag you need for a small page: a heading, paragraphs, and a subheading. One more tool — emphasis tags that highlight words inside a paragraph.",
        },
        {
          type: "p",
          text: "Wrap a word in <strong> to make it bold and important, or <em> to make it italic and stressed. They sit inside a paragraph, around just the words you want to stand out.",
        },
        { type: "code", lang: "html", text: "<p>I <strong>love</strong> building pages.</p>\n<p>This is <em>really</em> fun.</p>" },
        {
          type: "callout",
          tone: "tip",
          text: "An emphasis tag wraps part of a sentence, not the whole thing. Open it, type the word, close it, keep going.",
        },
        {
          type: "p",
          text: "Build a tiny about-me page: an <h1> with your name (or any name), at least two <p> paragraphs about yourself, and one word wrapped in <strong> or <em>.",
        },
      ],
      starter: { html: "<!-- Build your about me page below -->\n", css: "", js: "" },
      solution: {
        html: "<h1>About Me</h1>\n<p>My name is Sam and I am <strong>learning</strong> to code.</p>\n<p>I want to build my own website one day.</p>\n",
        css: "",
        js: "",
      },
      checks: [
        { label: "Add a top heading", kind: "domExists", value: "h1" },
        { label: "Have at least two paragraphs", kind: "domCountAtLeast", value: "p::2" },
        { label: "Emphasize a word with strong or em", kind: "codeMatches", value: "<(strong|em)>" },
      ],
      hints: [
        "Start with <h1>About Me</h1>, then write two <p> paragraphs.",
        "Inside one paragraph, wrap a single word like <strong>learning</strong>.",
        "Example: <p>I am <strong>learning</strong> to code.</p> next to a second paragraph.",
      ],
      wellDone: "That is a complete page you wrote by hand — heading, paragraphs, and emphasis, all your own.",
    },
  ],
};
