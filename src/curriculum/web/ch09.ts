import type { Chapter } from "../types";

export const ch09: Chapter = {
  id: "web-animation",
  title: "Bring It to Life",
  glyph: "✨",
  summary:
    "Static pages feel dead. Transitions, transforms, and keyframes give your elements motion and reaction.",
  lessons: [
    {
      id: "web-transition",
      track: "web",
      title: "Ease into it",
      subtitle: "Smooth a hover change with transition.",
      concepts: ["transition", "hover"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Change takes time" },
        {
          type: "p",
          text: "A :hover rule changes a style when the pointer is over an element. Without help, that change snaps instantly. transition tells the browser to animate the change over a span of time instead.",
        },
        {
          type: "code",
          lang: "css",
          text: ".btn {\n  background: steelblue;\n  transition: background 0.3s;\n}\n.btn:hover {\n  background: tomato;\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Put transition on the resting rule, not the :hover rule. It governs the trip both ways — in and out.",
        },
        {
          type: "p",
          text: "The HTML has a button with class btn. Give .btn a transition, then add a .btn:hover rule that changes its background and color.",
        },
      ],
      starter: {
        html: '<button class="btn">Hover me</button>\n',
        css:
          ".btn {\n  background: steelblue;\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  /* add a transition here */\n}\n\n/* add a .btn:hover rule below */\n",
        js: "",
      },
      solution: {
        html: '<button class="btn">Hover me</button>\n',
        css:
          ".btn {\n  background: steelblue;\n  color: white;\n  padding: 12px 24px;\n  border: none;\n  transition: background 0.3s, color 0.3s;\n}\n\n.btn:hover {\n  background: tomato;\n  color: black;\n}\n",
        js: "",
      },
      checks: [
        { label: "There is a button", kind: "domExists", value: "button.btn" },
        { label: "Add a transition", kind: "codeContains", value: "transition:" },
        { label: "Write a :hover rule", kind: "codeContains", value: ":hover" },
      ],
      hints: [
        "transition: lists which property to animate and how long, like transition: background 0.3s;.",
        "A hover rule starts with the selector and :hover: .btn:hover { ... }.",
        "Solution: add transition: background 0.3s, color 0.3s; to .btn, then .btn:hover { background: tomato; color: black; }.",
      ],
      wellDone: "One transition line turns a jarring flip into a smooth, deliberate response.",
    },
    {
      id: "web-transform",
      track: "web",
      title: "Move and reshape",
      subtitle: "Rotate, scale, and translate on hover.",
      concepts: ["transform", "hover"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Bend space, not layout" },
        {
          type: "p",
          text: "transform reshapes an element without disturbing the elements around it. rotate spins it, scale grows or shrinks it, and translate slides it. You can combine several in one transform, separated by spaces.",
        },
        {
          type: "code",
          lang: "css",
          text: ".box {\n  transition: transform 0.3s;\n}\n.box:hover {\n  transform: scale(1.2) rotate(5deg);\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "Pair transform with transition so the motion is smooth instead of a hard jump.",
        },
        {
          type: "p",
          text: "The HTML has a div with class box. Add a .box:hover rule that applies a transform using scale, rotate, or translate.",
        },
      ],
      starter: {
        html: '<div class="box">Lift</div>\n',
        css:
          ".box {\n  width: 120px;\n  height: 120px;\n  background: mediumpurple;\n  color: white;\n  transition: transform 0.3s;\n}\n\n/* add a .box:hover rule with a transform below */\n",
        js: "",
      },
      solution: {
        html: '<div class="box">Lift</div>\n',
        css:
          ".box {\n  width: 120px;\n  height: 120px;\n  background: mediumpurple;\n  color: white;\n  transition: transform 0.3s;\n}\n\n.box:hover {\n  transform: scale(1.2) rotate(5deg) translate(10px, 0);\n}\n",
        js: "",
      },
      checks: [
        { label: "There is a box", kind: "domExists", value: ".box" },
        { label: "Use a transform", kind: "codeContains", value: "transform:" },
        { label: "Write a :hover rule", kind: "codeContains", value: ".box:hover" },
      ],
      hints: [
        "Start the rule with .box:hover { and put a transform inside.",
        "transform takes functions like scale(1.2), rotate(5deg), or translate(10px, 0).",
        "Solution: .box:hover { transform: scale(1.2) rotate(5deg) translate(10px, 0); }.",
      ],
      wellDone: "Scale, rotate, translate — three small functions that make an element feel physical.",
    },
    {
      id: "web-keyframes",
      track: "web",
      title: "Make it loop",
      subtitle: "Define keyframes and run an animation.",
      concepts: ["keyframes", "animation"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Motion without a mouse" },
        {
          type: "p",
          text: "Transitions need a trigger like hover. An animation runs on its own. First you describe the stages with @keyframes — what the element looks like at the start, middle, and end. Then you attach those keyframes to an element with the animation property.",
        },
        {
          type: "code",
          lang: "css",
          text: "@keyframes pulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.3); }\n  100% { transform: scale(1); }\n}\n.dot {\n  animation: pulse 1s infinite;\n}",
        },
        {
          type: "callout",
          tone: "warn",
          text: "The name after @keyframes and the name in the animation property must match exactly, or nothing moves.",
        },
        {
          type: "p",
          text: "The HTML has a div with class dot. Write a @keyframes block, then give .dot an animation that uses it. infinite makes it loop forever.",
        },
      ],
      starter: {
        html: '<div class="dot"></div>\n',
        css:
          ".dot {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: orangered;\n  /* add an animation here */\n}\n\n/* define your @keyframes below */\n",
        js: "",
      },
      solution: {
        html: '<div class="dot"></div>\n',
        css:
          ".dot {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: orangered;\n  animation: pulse 1s infinite;\n}\n\n@keyframes pulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.3); }\n  100% { transform: scale(1); }\n}\n",
        js: "",
      },
      checks: [
        { label: "There is a dot", kind: "domExists", value: ".dot" },
        { label: "Define keyframes", kind: "codeContains", value: "@keyframes" },
        { label: "Attach an animation", kind: "codeContains", value: "animation:" },
        { label: "Animate with a transform", kind: "codeContains", value: "transform:" },
      ],
      hints: [
        "A keyframes block looks like @keyframes pulse { 0% { ... } 100% { ... } }.",
        "The animation property names the keyframes, a duration, and infinite: animation: pulse 1s infinite;.",
        "Solution: animation: pulse 1s infinite; on .dot, plus @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }.",
      ],
      wellDone: "Keyframes plus animation give you motion that runs on its own — the heartbeat of every loading spinner and pulse.",
    },
  ],
};
