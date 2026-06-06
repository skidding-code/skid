import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "mc-modclass",
  title: "Your First Mod",
  glyph: "🧱",
  summary:
    "Stand up a Minecraft Forge mod from nothing: the main class, the event bus, and your first setup hook.",
  lessons: [
    {
      id: "mc-mod-annotation",
      track: "mcmods",
      title: "Claim your mod id",
      subtitle: "The @Mod class that tells Forge you exist.",
      concepts: ["@Mod", "mod id"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Forge needs a front door" },
        {
          type: "p",
          text: "Every Forge mod has one main class marked with the @Mod annotation. The string inside is your mod id — a short, all-lowercase name Forge uses to keep your stuff separate from everyone else's. Get this wrong and the game loads to a sad red error screen instead of your masterpiece.",
        },
        {
          type: "code",
          lang: "java",
          text: '@Mod("examplemod")\npublic class ExampleMod {\n    public ExampleMod() {\n        // wiring goes here later\n    }\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided walkthrough — your code is checked, not run. We grade what you write, so write the real thing.",
        },
        {
          type: "p",
          text: 'Finish the main class: annotate it with @Mod using the id "examplemod".',
        },
      ],
      starter:
        '// TODO: mark the class below as a Forge mod (see the hint)\npublic class ExampleMod {\n    public ExampleMod() {\n    }\n}\n',
      solution:
        '@Mod("examplemod")\npublic class ExampleMod {\n    public ExampleMod() {\n    }\n}\n',
      checks: [
        { label: "Use the @Mod annotation", kind: "codeContains", value: "@Mod" },
        {
          label: 'Set the mod id to "examplemod"',
          kind: "codeContains",
          value: '@Mod("examplemod")',
        },
        { label: "Keep the main class", kind: "codeContains", value: "class ExampleMod" },
      ],
      hints: [
        "The annotation goes on its own line, directly above public class ExampleMod.",
        'Annotations start with @ and take their argument in parentheses, like @Mod("...").',
        'The whole line is: @Mod("examplemod")',
      ],
      wellDone: "Forge now knows your mod by name. That little string is your whole identity in the load order.",
    },
    {
      id: "mc-event-bus",
      track: "mcmods",
      title: "Grab the event bus",
      subtitle: "Plug your constructor into Forge's loading events.",
      concepts: ["mod event bus", "addListener"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "How your code gets invited to the party" },
        {
          type: "p",
          text: "Forge fires loading events — setup, registration, all of it — on the mod event bus. Your constructor is where you grab that bus and tell Forge which method to call. You get the bus from FMLJavaModLoadingContext.get().getModEventBus(), then hand it a method reference with addListener.",
        },
        {
          type: "code",
          lang: "java",
          text: "public ExampleMod() {\n    IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();\n    bus.addListener(this::commonSetup);\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "this::commonSetup is a method reference — it points at a method without calling it yet. Forge calls it for you when the right event fires.",
        },
        {
          type: "p",
          text: "In the constructor, get the mod event bus and register this::commonSetup as a listener.",
        },
      ],
      starter:
        '@Mod("examplemod")\npublic class ExampleMod {\n    public ExampleMod() {\n        // TODO: get the mod event bus and addListener(this::commonSetup)\n    }\n\n    private void commonSetup(final FMLCommonSetupEvent event) {\n    }\n}\n',
      solution:
        '@Mod("examplemod")\npublic class ExampleMod {\n    public ExampleMod() {\n        IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();\n        bus.addListener(this::commonSetup);\n    }\n\n    private void commonSetup(final FMLCommonSetupEvent event) {\n    }\n}\n',
      checks: [
        {
          label: "Fetch the mod event bus",
          kind: "codeContains",
          value: "FMLJavaModLoadingContext.get().getModEventBus()",
        },
        { label: "Register a listener", kind: "codeContains", value: "addListener" },
        {
          label: "Point it at commonSetup with a method reference",
          kind: "codeMatches",
          value: "addListener\\(\\s*this::commonSetup\\s*\\)",
        },
      ],
      hints: [
        "First store the bus: IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();",
        "Then subscribe: bus.addListener(...).",
        "Pass the method reference this::commonSetup so Forge can call it later.",
      ],
      wellDone: "Your mod is now listening. When Forge starts setting things up, your method gets the call.",
    },
    {
      id: "mc-common-setup",
      track: "mcmods",
      title: "Write the setup hook",
      subtitle: "The method Forge calls during common setup.",
      concepts: ["FMLCommonSetupEvent", "setup"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Where your one-time wiring lives" },
        {
          type: "p",
          text: "Common setup runs once, on both client and server, after everything is registered. It's the spot for one-time initialization — networking, capabilities, compatibility checks. The method takes an FMLCommonSetupEvent and, by convention, marks it final because you're not meant to reassign it.",
        },
        {
          type: "code",
          lang: "java",
          text: "private void commonSetup(final FMLCommonSetupEvent event) {\n    // one-time setup goes here\n}",
        },
        {
          type: "callout",
          tone: "warn",
          text: "Don't touch other mods' content here without event.enqueueWork(...) — common setup runs in parallel and mutable state hates company.",
        },
        {
          type: "p",
          text: "Write the commonSetup method: private, returns void, takes a final FMLCommonSetupEvent named event.",
        },
      ],
      starter:
        '@Mod("examplemod")\npublic class ExampleMod {\n    public ExampleMod() {\n        IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();\n        bus.addListener(this::commonSetup);\n    }\n\n    // TODO: add the one-time setup method the listener points to\n}\n',
      solution:
        '@Mod("examplemod")\npublic class ExampleMod {\n    public ExampleMod() {\n        IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();\n        bus.addListener(this::commonSetup);\n    }\n\n    private void commonSetup(final FMLCommonSetupEvent event) {\n        // one-time setup goes here\n    }\n}\n',
      checks: [
        {
          label: "Declare the commonSetup method signature",
          kind: "codeContains",
          value: "private void commonSetup(final FMLCommonSetupEvent event)",
        },
        {
          label: "Take an FMLCommonSetupEvent parameter",
          kind: "codeContains",
          value: "FMLCommonSetupEvent",
        },
        {
          label: "Wire it up with a method reference",
          kind: "codeContains",
          value: "::",
        },
      ],
      hints: [
        "Add a new method below the constructor.",
        "The signature is: private void commonSetup(final FMLCommonSetupEvent event)",
        "Leave the body empty (or drop a comment in) — having the method is enough for now.",
      ],
      wellDone: "That's a complete, idiomatic Forge mod skeleton. From here you register blocks, items, and entities onto the same bus.",
    },
  ],
};
