import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "mc-fabric-items",
  title: "Fabric: Add an Item",
  glyph: "💎",
  summary:
    "Forge isn't the only club in town. Fabric does mods too — and it makes adding a shiny new item feel almost too easy. Let's mint a ruby.",
  lessons: [
    {
      id: "mc-fabric-create-item",
      track: "mcmods",
      title: "Mint a brand-new item",
      subtitle: "An Item instance, configured with FabricItemSettings.",
      concepts: ["Item", "FabricItemSettings"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Every item starts as one object" },
        {
          type: "p",
          text: "In Fabric, an item is just an Item object. You create one and hand it a settings bundle that describes how it behaves — stack size, durability, which creative tab it belongs to. For a plain shiny rock, the defaults are perfect.",
        },
        {
          type: "p",
          text: "FabricItemSettings is Fabric's friendly version of item settings. Empty parentheses means 'I'm happy with the defaults' — a max stack of 64 and nothing fancy. Store the result in a static final field so the rest of your mod can reach it.",
        },
        {
          type: "code",
          lang: "java",
          text: "public static final Item RUBY = new Item(new FabricItemSettings());",
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided walkthrough — your Java is checked for the right shape, not compiled and launched into a real Minecraft.",
        },
        {
          type: "p",
          text: "Replace the TODO: create the RUBY item by constructing a new Item with a new FabricItemSettings.",
        },
      ],
      starter:
        "public class ModItems {\n    // TODO: create RUBY as a new Item that takes a fresh settings bundle\n    public static final Item RUBY = ;\n}\n",
      solution:
        "public class ModItems {\n    public static final Item RUBY = new Item(new FabricItemSettings());\n}\n",
      checks: [
        {
          label: "Construct a new Item",
          kind: "codeContains",
          value: "new Item(",
        },
        {
          label: "Give it a FabricItemSettings",
          kind: "codeContains",
          value: "FabricItemSettings",
        },
        {
          label: "Store it in the RUBY field",
          kind: "codeMatches",
          value: "RUBY\\s*=\\s*new\\s+Item\\s*\\(",
        },
      ],
      hints: [
        "The value goes after the = on the RUBY line.",
        "An item is built with new Item(...), and inside the parentheses goes its settings.",
        "Write: new Item(new FabricItemSettings()); — defaults all the way down.",
      ],
      wellDone:
        "RUBY exists now — a real item object sitting in memory. The game doesn't know about it yet, but you do.",
    },
    {
      id: "mc-fabric-register-item",
      track: "mcmods",
      title: "Tell the game it exists",
      subtitle: "Registering RUBY into the item registry with an Identifier.",
      concepts: ["Registry.register", "Identifier"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "An unregistered item is a ghost" },
        {
          type: "p",
          text: "Creating the Item object isn't enough — Minecraft keeps a giant catalog of everything that exists, and your ruby isn't in it yet. Until you register it, the game can't save it, show it, or even name it. It's a ghost.",
        },
        {
          type: "p",
          text: "Registry.register puts your item into the right catalog. You pass three things: which registry (Registries.ITEM), a unique Identifier built from your mod id and a name, and the item itself. The Identifier is the item's permanent address — modid:ruby.",
        },
        {
          type: "code",
          lang: "java",
          text: 'Registry.register(Registries.ITEM, new Identifier("modid", "ruby"), RUBY);',
        },
        {
          type: "callout",
          tone: "tip",
          text: "The first half of the Identifier is YOUR mod id — that namespace is what stops two mods from fighting over the name \"ruby\".",
        },
        {
          type: "p",
          text: "Fill in the TODO: register RUBY into Registries.ITEM under the Identifier modid:ruby.",
        },
      ],
      starter:
        "public class ModItems {\n    public static final Item RUBY = new Item(new FabricItemSettings());\n\n    public static void registerItems() {\n        // TODO: register RUBY into the item registry under the id modid:ruby\n    }\n}\n",
      solution:
        'public class ModItems {\n    public static final Item RUBY = new Item(new FabricItemSettings());\n\n    public static void registerItems() {\n        Registry.register(Registries.ITEM, new Identifier("modid", "ruby"), RUBY);\n    }\n}\n',
      checks: [
        {
          label: "Call Registry.register",
          kind: "codeContains",
          value: "Registry.register",
        },
        {
          label: "Target the item registry",
          kind: "codeContains",
          value: "Registries.ITEM",
        },
        {
          label: "Build an Identifier for the item",
          kind: "codeContains",
          value: "Identifier",
        },
        {
          label: "Use the modid:ruby identifier and pass RUBY",
          kind: "codeMatches",
          value:
            'new\\s+Identifier\\(\\s*"modid"\\s*,\\s*"ruby"\\s*\\)\\s*,\\s*RUBY',
        },
      ],
      hints: [
        "Registration is one call: Registry.register(which registry, id, the item).",
        'The registry is Registries.ITEM and the id is new Identifier("modid", "ruby").',
        'Write: Registry.register(Registries.ITEM, new Identifier("modid", "ruby"), RUBY);',
      ],
      wellDone:
        "Your ruby is in the catalog. The game can now save it, render it, and reference it by name — it's officially a thing.",
    },
    {
      id: "mc-fabric-item-group",
      track: "mcmods",
      title: "Put it in the creative menu",
      subtitle: "Adding RUBY to an item group with ItemGroupEvents.",
      concepts: ["ItemGroupEvents", "creative tab"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Registered, but still hiding" },
        {
          type: "p",
          text: "Your item exists and is registered, yet a player browsing the creative inventory won't find it anywhere. Items don't auto-join a tab. You opt in by listening for the moment a creative tab is being filled and dropping your item into it.",
        },
        {
          type: "p",
          text: "ItemGroupEvents.modifyEntriesEvent gives you a hook for a specific group — here the ingredients tab. When it fires, you get an entries object and call add with your item. One line, and RUBY appears on the shelf.",
        },
        {
          type: "code",
          lang: "java",
          text: "ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)\n    .register(entries -> entries.add(RUBY));",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Pick a tab that fits — a crafting gem belongs in INGREDIENTS, not TOOLS. Players will thank you for it.",
        },
        {
          type: "p",
          text: "Replace the TODO: register a modifyEntriesEvent for the INGREDIENTS group that adds RUBY to the tab.",
        },
      ],
      starter:
        "public class ModItems {\n    public static final Item RUBY = new Item(new FabricItemSettings());\n\n    public static void addToGroup() {\n        // TODO: hook modifyEntriesEvent for INGREDIENTS and add RUBY to the entries\n    }\n}\n",
      solution:
        "public class ModItems {\n    public static final Item RUBY = new Item(new FabricItemSettings());\n\n    public static void addToGroup() {\n        ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS)\n            .register(entries -> entries.add(RUBY));\n    }\n}\n",
      checks: [
        {
          label: "Use ItemGroupEvents to modify a tab",
          kind: "codeContains",
          value: "ItemGroupEvents.modifyEntriesEvent",
        },
        {
          label: "Add RUBY to the group's entries",
          kind: "codeContains",
          value: "entries.add(RUBY)",
        },
        {
          label: "Wire it up with .register and add the item",
          kind: "codeMatches",
          value: "\\.register\\(\\s*entries\\s*->\\s*entries\\.add\\(\\s*RUBY\\s*\\)",
        },
      ],
      hints: [
        "Start with ItemGroupEvents.modifyEntriesEvent(...) and pass the tab you want, like ItemGroups.INGREDIENTS.",
        "Chain .register(...) onto it and give it a lambda that receives entries.",
        "Inside the lambda: entries -> entries.add(RUBY). Full line: ItemGroupEvents.modifyEntriesEvent(ItemGroups.INGREDIENTS).register(entries -> entries.add(RUBY));",
      ],
      wellDone:
        "Open the creative menu and there it is, glittering in the ingredients tab. From empty field to in-game item — that's a complete Fabric item, start to finish.",
    },
  ],
};
