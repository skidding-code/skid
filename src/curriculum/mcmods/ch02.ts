import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "mc-register",
  title: "Add an Item",
  glyph: "⛏️",
  summary:
    "Bolt a brand-new item onto Forge. Build a registry, register a ruby, and wire it to the mod event bus.",
  lessons: [
    {
      id: "mc-deferred-register",
      track: "mcmods",
      title: "A box to keep your stuff",
      subtitle: "Create a DeferredRegister for items.",
      concepts: ["DeferredRegister", "ForgeRegistries"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Forge wants you to wait your turn" },
        {
          type: "p",
          text: "You can't just hand Minecraft an item whenever you feel like it. Forge registers content during a specific phase of startup, and barging in early gets you a crash with a very long stack trace. The polite solution is a DeferredRegister: a holding pen where you queue things up, and Forge empties it at exactly the right moment.",
        },
        {
          type: "p",
          text: "You make one per registry type. For items you point it at ForgeRegistries.ITEMS and tag it with your mod id so two mods registering a ruby don't start a fight.",
        },
        {
          type: "code",
          lang: "java",
          text: 'public static final DeferredRegister<Item> ITEMS =\n        DeferredRegister.create(ForgeRegistries.ITEMS, MODID);',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided walkthrough — your code isn't compiled and run, it's checked for the right shape. Write it like you mean it anyway; future-you copies this into a real mod.",
        },
        {
          type: "p",
          text: "Create the ITEMS DeferredRegister for Item, pointed at ForgeRegistries.ITEMS, scoped to MODID.",
        },
      ],
      starter:
        "public class ModItems {\n    // TODO: create a DeferredRegister<Item> named ITEMS\n    // Point it at ForgeRegistries.ITEMS and pass MODID\n}\n",
      solution:
        "public class ModItems {\n    public static final DeferredRegister<Item> ITEMS =\n            DeferredRegister.create(ForgeRegistries.ITEMS, MODID);\n}\n",
      checks: [
        {
          label: "Declare a DeferredRegister",
          kind: "codeContains",
          value: "DeferredRegister",
        },
        {
          label: "Aim it at the item registry",
          kind: "codeContains",
          value: "ForgeRegistries.ITEMS",
        },
        {
          label: "Call DeferredRegister.create(...)",
          kind: "codeMatches",
          value: "DeferredRegister\\s*\\.\\s*create\\s*\\(",
        },
      ],
      hints: [
        "The type is DeferredRegister<Item>, stored in a static final field called ITEMS.",
        "Fill it using the factory: DeferredRegister.create(registry, modId).",
        "Full line: public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(ForgeRegistries.ITEMS, MODID);",
      ],
      wellDone:
        "Your holding pen is built. Nothing's in it yet, but Forge now knows where to look.",
    },
    {
      id: "mc-register-ruby",
      track: "mcmods",
      title: "Register a ruby",
      subtitle: "Queue an actual item into your DeferredRegister.",
      concepts: ["RegistryObject", "Item.Properties"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Put something in the box" },
        {
          type: "p",
          text: "Calling ITEMS.register hands Forge a name and a recipe for building the item — a little factory lambda. It doesn't build the item right now (remember, timing), so instead of an Item you get back a RegistryObject<Item>: a wrapper that promises to hold your real item once Forge gets around to it.",
        },
        {
          type: "p",
          text: "The lambda is where the item is born. A plain item with no special powers is just new Item(new Item.Properties()).",
        },
        {
          type: "code",
          lang: "java",
          text: 'public static final RegistryObject<Item> RUBY =\n        ITEMS.register("ruby", () -> new Item(new Item.Properties()));',
        },
        {
          type: "callout",
          tone: "tip",
          text: 'The string "ruby" becomes its registry path, so in-game it ends up as yourmod:ruby. Keep it lowercase with no spaces or Forge will scold you.',
        },
        {
          type: "p",
          text: "Register a RegistryObject named RUBY for an item called ruby, built from new Item with new Item.Properties.",
        },
      ],
      starter:
        'public class ModItems {\n    public static final DeferredRegister<Item> ITEMS =\n            DeferredRegister.create(ForgeRegistries.ITEMS, MODID);\n\n    // TODO: register a ruby item (the hint shows the shape)\n}\n',
      solution:
        'public class ModItems {\n    public static final DeferredRegister<Item> ITEMS =\n            DeferredRegister.create(ForgeRegistries.ITEMS, MODID);\n\n    public static final RegistryObject<Item> RUBY =\n            ITEMS.register("ruby", () -> new Item(new Item.Properties()));\n}\n',
      checks: [
        {
          label: "Hold it in a RegistryObject",
          kind: "codeContains",
          value: "RegistryObject",
        },
        {
          label: "Call .register( to queue the item",
          kind: "codeContains",
          value: ".register(",
        },
        {
          label: "Give it the path \"ruby\"",
          kind: "codeContains",
          value: '"ruby"',
        },
        {
          label: "Build it with new Item.Properties",
          kind: "codeContains",
          value: "new Item.Properties",
        },
      ],
      hints: [
        "Store the result in a static final RegistryObject<Item> named RUBY.",
        'ITEMS.register takes a name and a supplier lambda: register("ruby", () -> ...).',
        'Full line: public static final RegistryObject<Item> RUBY = ITEMS.register("ruby", () -> new Item(new Item.Properties()));',
      ],
      wellDone:
        "There's a ruby in the queue. Now you just have to remember to actually hand the queue to Forge.",
    },
    {
      id: "mc-hook-event-bus",
      track: "mcmods",
      title: "Hook up the bus",
      subtitle: "Register ITEMS on the mod event bus from your constructor.",
      concepts: ["mod event bus", "constructor"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A queue nobody empties is just a list" },
        {
          type: "p",
          text: "Your DeferredRegister is loaded, but Forge won't peek inside unless you introduce it to the mod event bus. That bus is the channel Forge uses to fire startup events, and registration rides along on it. The classic place to do the introduction is your mod's constructor.",
        },
        {
          type: "p",
          text: "Grab the bus from the FMLJavaModLoadingContext and tell your registry to attach to it.",
        },
        {
          type: "code",
          lang: "java",
          text: '@Mod(MODID)\npublic class ExampleMod {\n    public ExampleMod() {\n        IEventBus modEventBus =\n                FMLJavaModLoadingContext.get().getModEventBus();\n        ITEMS.register(modEventBus);\n    }\n}',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Forget this one line and the most baffling bug in modding appears: no errors, no item, just you wondering why /give yourmod:ruby says it doesn't exist.",
        },
        {
          type: "p",
          text: "In the constructor, get the mod event bus and call ITEMS.register on it.",
        },
      ],
      starter:
        "@Mod(MODID)\npublic class ExampleMod {\n    public ExampleMod() {\n        IEventBus modEventBus =\n                FMLJavaModLoadingContext.get().getModEventBus();\n        // TODO: attach your ITEMS registry to modEventBus\n    }\n}\n",
      solution:
        "@Mod(MODID)\npublic class ExampleMod {\n    public ExampleMod() {\n        IEventBus modEventBus =\n                FMLJavaModLoadingContext.get().getModEventBus();\n        ModItems.ITEMS.register(modEventBus);\n    }\n}\n",
      checks: [
        {
          label: "Grab the mod event bus",
          kind: "codeContains",
          value: "getModEventBus",
        },
        {
          label: "Register ITEMS onto the bus",
          kind: "codeMatches",
          value: "ITEMS\\s*\\.\\s*register\\s*\\(\\s*modEventBus\\s*\\)",
        },
        {
          label: "Still call .register( to wire it up",
          kind: "codeContains",
          value: ".register(",
        },
      ],
      hints: [
        "The starter already fetches modEventBus for you — you just have to use it.",
        "Your DeferredRegister has a register(IEventBus) overload: ITEMS.register(modEventBus).",
        "Full line: ModItems.ITEMS.register(modEventBus);",
      ],
      wellDone:
        "Bus wired, queue handed over. Load the game and yourmod:ruby is officially a real thing.",
    },
  ],
};
