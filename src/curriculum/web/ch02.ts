import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "web-content",
  title: "Links, Lists & Images",
  glyph: "🔗",
  summary: "Fill a page with real content: clickable links, tidy lists, and pictures.",
  lessons: [
    {
      id: "web-links",
      track: "web",
      title: "Make a link",
      subtitle: "The tag that ties the whole web together.",
      concepts: ["a tag", "href", "attributes"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A page that points somewhere else" },
        {
          type: "p",
          text: "A link is an anchor tag: <a>. The words between the tags are what people click. Where the click goes is set by an attribute called href.",
        },
        {
          type: "p",
          text: "An attribute is extra information you put inside the opening tag, written name=\"value\".",
        },
        { type: "code", lang: "html", text: '<a href="https://example.com">Visit Example</a>' },
        {
          type: "callout",
          tone: "tip",
          text: "Without an href, an <a> tag is just text — the href is what makes it a real link.",
        },
        {
          type: "p",
          text: "Add a link to https://example.com with the clickable text Visit Example.",
        },
      ],
      starter: {
        html: "<h1>My Page</h1>\n<!-- Add your link below -->\n",
        css: "",
        js: "",
      },
      solution: {
        html: '<h1>My Page</h1>\n<a href="https://example.com">Visit Example</a>\n',
        css: "",
        js: "",
      },
      checks: [
        { label: "Use an <a> tag with an href", kind: "domExists", value: "a[href]" },
        {
          label: "Point the link at example.com",
          kind: "domAttrEquals",
          value: "a::href::https://example.com",
        },
        { label: "Give the link the text Visit Example", kind: "domTextContains", value: "a::Visit Example" },
      ],
      hints: [
        "Start with an opening <a> tag and a closing </a> tag.",
        'Put the destination inside it: <a href="https://example.com">.',
        'The full line is: <a href="https://example.com">Visit Example</a>',
      ],
      wellDone: "That href is the same idea behind every link you have ever clicked.",
    },
    {
      id: "web-lists",
      track: "web",
      title: "Build a list",
      subtitle: "Stack related items so they line up neatly.",
      concepts: ["ul", "li", "nesting"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Bullets, the HTML way" },
        {
          type: "p",
          text: "An unordered list is a <ul>. Inside it, each bullet is its own <li> — a list item. The browser draws the bullets and spacing for you.",
        },
        {
          type: "code",
          lang: "html",
          text: "<ul>\n  <li>First thing</li>\n  <li>Second thing</li>\n</ul>",
        },
        {
          type: "callout",
          tone: "note",
          text: "Every <li> lives inside the <ul>. The <ul> is the container; the <li> tags are what go in it.",
        },
        {
          type: "p",
          text: "Make a <ul> with at least three <li> items — list three foods you like.",
        },
      ],
      starter: {
        html: "<h1>My Favorites</h1>\n<!-- Build your list below -->\n",
        css: "",
        js: "",
      },
      solution: {
        html:
          "<h1>My Favorites</h1>\n<ul>\n  <li>Pizza</li>\n  <li>Mango</li>\n  <li>Ramen</li>\n</ul>\n",
        css: "",
        js: "",
      },
      checks: [
        { label: "Add a <ul> container", kind: "domExists", value: "ul" },
        { label: "Put at least three <li> items inside it", kind: "domCountAtLeast", value: "li::3" },
      ],
      hints: [
        "Open a <ul> tag and close it with </ul>.",
        "Between them, add three <li>...</li> lines, one per item.",
        "Like this: <ul><li>Pizza</li><li>Mango</li><li>Ramen</li></ul>",
      ],
      wellDone: "Lists are everywhere — menus, steps, search results all lean on <ul> and <li>.",
    },
    {
      id: "web-images",
      track: "web",
      title: "Show an image",
      subtitle: "Drop a picture onto the page — and describe it.",
      concepts: ["img", "src", "alt"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A tag that stands alone" },
        {
          type: "p",
          text: "An image uses the <img> tag. It has no closing tag — everything it needs lives in its attributes. The src says which picture to load; the alt describes it in words.",
        },
        {
          type: "code",
          lang: "html",
          text: '<img src="samples/photo.svg" alt="A sunny landscape" />',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Always write alt text. If the image fails to load, or someone uses a screen reader, the alt is the only thing that describes it.",
        },
        {
          type: "p",
          text: 'Add an <img> with src "samples/photo.svg" and alt text that reads exactly: A sunny landscape.',
        },
      ],
      starter: {
        html: "<h1>Gallery</h1>\n<!-- Add your image below -->\n",
        css: "",
        js: "",
      },
      solution: {
        html:
          '<h1>Gallery</h1>\n<img src="samples/photo.svg" alt="A sunny landscape" />\n',
        css: "",
        js: "",
      },
      checks: [
        { label: "Add an <img> tag", kind: "domExists", value: "img" },
        { label: "Point its src at the picture", kind: "domAttrEquals", value: "img::src::samples/photo.svg" },
        { label: "Describe it with alt text", kind: "domAttrEquals", value: "img::alt::A sunny landscape" },
      ],
      hints: [
        "An <img> needs both a src and an alt attribute.",
        'Start with: <img src="samples/photo.svg" ...',
        'The full tag is: <img src="samples/photo.svg" alt="A sunny landscape" />',
      ],
      wellDone: "Picture on the page, words for everyone — that is how images should always be.",
    },
  ],
};
