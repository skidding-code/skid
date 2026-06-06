import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "mc-fabric-setup",
  title: "Fabric: First Mod",
  glyph: "🧵",
  summary:
    "Forge isn't the only loader in town. Fabric is the lightweight rival — different annotations, different entrypoints, same goal: getting your code into Minecraft.",
  lessons: [
    {
      id: "mc-fabric-modinitializer",
      track: "mcmods",
      title: "Say hello, Fabric",
      subtitle: "A main mod class that implements ModInitializer.",
      concepts: ["ModInitializer", "onInitialize"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "No @Mod here — Fabric does it differently" },
        {
          type: "p",
          text: "Forge wants a class tagged with @Mod. Fabric wants something simpler: a class that implements the ModInitializer interface. That interface has exactly one method, onInitialize(), and Fabric calls it once while the game is loading.",
        },
        {
          type: "p",
          text: "Because onInitialize comes from an interface, you mark it with @Override. That single annotation tells the compiler (and the next human to read your code) 'yes, I meant to fulfill the interface's contract here.'",
        },
        {
          type: "code",
          lang: "java",
          text: "import net.fabricmc.api.ModInitializer;\n\npublic class ExampleMod implements ModInitializer {\n    @Override\n    public void onInitialize() {\n        // your mod wakes up here\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided walkthrough — your Java is checked for the right shape, not compiled and dropped into a real Minecraft.",
        },
        {
          type: "p",
          text: "Replace the TODO: make ExampleMod implement ModInitializer and give it an @Override-annotated onInitialize() method.",
        },
      ],
      starter:
        "import net.fabricmc.api.ModInitializer;\n\npublic class ExampleMod {\n    // TODO: implement the loader's interface and add its one required method\n}\n",
      solution:
        "import net.fabricmc.api.ModInitializer;\n\npublic class ExampleMod implements ModInitializer {\n    @Override\n    public void onInitialize() {\n        // your mod wakes up here\n    }\n}\n",
      checks: [
        {
          label: "Implement the ModInitializer interface",
          kind: "codeMatches",
          value: "class\\s+ExampleMod\\s+implements\\s+ModInitializer",
        },
        {
          label: "Override the interface method",
          kind: "codeContains",
          value: "@Override",
        },
        {
          label: "Define onInitialize()",
          kind: "codeContains",
          value: "onInitialize",
        },
        {
          label: "Make onInitialize a public void method",
          kind: "codeMatches",
          value: "public\\s+void\\s+onInitialize\\s*\\(\\s*\\)",
        },
      ],
      hints: [
        "After the class name, add: implements ModInitializer.",
        "The one required method is public void onInitialize() with no parameters.",
        "Put @Override on its own line right above public void onInitialize() { }.",
      ],
      wellDone:
        "Fabric now has an entrypoint to call. Your mod has a heartbeat — let's make it speak.",
    },
    {
      id: "mc-fabric-logger",
      track: "mcmods",
      title: "Leave a trail in the log",
      subtitle: "Wire up an SLF4J LOGGER and announce yourself on startup.",
      concepts: ["Logger", "LoggerFactory"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "println is for amateurs" },
        {
          type: "p",
          text: "When your mod loads, the polite thing to do is write a line to the log so anyone reading the console knows you showed up. Fabric ships with SLF4J, so you make a Logger once as a static field using LoggerFactory.getLogger(...), then call logger.info(...) wherever you like.",
        },
        {
          type: "p",
          text: "The natural place to say hello is inside onInitialize — that runs once at load time, which is exactly when you want your 'I'm alive' message.",
        },
        {
          type: "code",
          lang: "java",
          text: 'import net.fabricmc.api.ModInitializer;\nimport org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\n\npublic class ExampleMod implements ModInitializer {\n    public static final Logger LOGGER = LoggerFactory.getLogger("examplemod");\n\n    @Override\n    public void onInitialize() {\n        LOGGER.info("ExampleMod is loading!");\n    }\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Make the LOGGER static final so the whole mod shares one logger named after your mod id — that name shows up in brackets in the console.",
        },
        {
          type: "p",
          text: "Replace the TODOs: declare a static final Logger via LoggerFactory.getLogger, and log a message with LOGGER.info inside onInitialize.",
        },
      ],
      starter:
        "import net.fabricmc.api.ModInitializer;\nimport org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\n\npublic class ExampleMod implements ModInitializer {\n    // TODO: create a static final logger named after your mod\n\n    @Override\n    public void onInitialize() {\n        // TODO: write a startup line to the log\n    }\n}\n",
      solution:
        'import net.fabricmc.api.ModInitializer;\nimport org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\n\npublic class ExampleMod implements ModInitializer {\n    public static final Logger LOGGER = LoggerFactory.getLogger("examplemod");\n\n    @Override\n    public void onInitialize() {\n        LOGGER.info("ExampleMod is loading!");\n    }\n}\n',
      checks: [
        {
          label: "Create the logger with LoggerFactory.getLogger",
          kind: "codeContains",
          value: "LoggerFactory.getLogger",
        },
        {
          label: "Store it in a Logger field",
          kind: "codeMatches",
          value: "Logger\\s+LOGGER\\s*=",
        },
        {
          label: "Log something inside onInitialize",
          kind: "codeContains",
          value: "LOGGER.info",
        },
        {
          label: "Keep overriding onInitialize",
          kind: "codeContains",
          value: "@Override",
        },
      ],
      hints: [
        'Declare the field: public static final Logger LOGGER = LoggerFactory.getLogger("examplemod");',
        "It belongs in the class body, above onInitialize, not inside any method.",
        'Inside onInitialize, call LOGGER.info("ExampleMod is loading!");',
      ],
      wellDone:
        "Now when the game boots, your mod signs the guest book. Loggers beat println every single time.",
    },
    {
      id: "mc-fabric-entrypoint",
      track: "mcmods",
      title: "Point fabric.mod.json at your class",
      subtitle: "The entrypoint reference that connects the loader to your code.",
      concepts: ["fabric.mod.json", "entrypoints"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "How does Fabric even find ExampleMod?" },
        {
          type: "p",
          text: "Forge scans for @Mod annotations. Fabric does the opposite — it reads a config file, fabric.mod.json, and you explicitly tell it which class to load. Under the 'entrypoints' object there's a 'main' list, and each entry is the fully-qualified name of a class that implements ModInitializer.",
        },
        {
          type: "code",
          lang: "json",
          text: '{\n  "id": "examplemod",\n  "version": "1.0.0",\n  "entrypoints": {\n    "main": [\n      "com.example.ExampleMod"\n    ]\n  }\n}',
        },
        {
          type: "p",
          text: "That string is just a reference — the real class still has to exist and implement ModInitializer. So the entrypoint and the class are two halves of one handshake: the JSON names the class, the class fulfills the contract.",
        },
        {
          type: "callout",
          tone: "warn",
          text: "The entrypoint string must be the full package path (com.example.ExampleMod), not just ExampleMod — otherwise Fabric won't find the class and your mod silently does nothing.",
        },
        {
          type: "p",
          text: "Replace the TODO: write the ExampleMod class that the entrypoint above refers to — package com.example, implementing ModInitializer with an @Override onInitialize().",
        },
      ],
      starter:
        "package com.example;\n\nimport net.fabricmc.api.ModInitializer;\n\n// The fabric.mod.json entrypoint \"com.example.ExampleMod\" points here.\n// TODO: write the class it refers to so the handshake is complete\n",
      solution:
        'package com.example;\n\nimport net.fabricmc.api.ModInitializer;\n\n// The fabric.mod.json entrypoint "com.example.ExampleMod" points here.\npublic class ExampleMod implements ModInitializer {\n    @Override\n    public void onInitialize() {\n    }\n}\n',
      checks: [
        {
          label: "Keep the com.example package so the path matches the entrypoint",
          kind: "codeContains",
          value: "package com.example",
        },
        {
          label: "Declare the ExampleMod class implementing ModInitializer",
          kind: "codeMatches",
          value: "class\\s+ExampleMod\\s+implements\\s+ModInitializer",
        },
        {
          label: "Override the entrypoint method",
          kind: "codeContains",
          value: "@Override",
        },
        {
          label: "Provide onInitialize()",
          kind: "codeContains",
          value: "onInitialize",
        },
      ],
      hints: [
        "The entrypoint is com.example.ExampleMod, so the class must be named ExampleMod in package com.example.",
        "Declare it: public class ExampleMod implements ModInitializer { ... }",
        "Give it the required @Override public void onInitialize() { } method, even if the body is empty.",
      ],
      wellDone:
        "JSON names the class, the class implements the interface — handshake complete. You can build a Fabric mod from scratch now.",
    },
  ],
};
