import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "mc-events",
  title: "React to Events",
  glyph: "📜",
  summary:
    "Forge fires events constantly — a player joins, a block breaks, a creeper has regrets. Subscribe to them and run your code.",
  lessons: [
    {
      id: "mc-event-bus-subscriber",
      track: "mcmods",
      title: "Open a mailbox for events",
      subtitle: "A handler class that Forge will deliver events to.",
      concepts: ["@Mod.EventBusSubscriber", "events"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Forge is shouting; you need a listener" },
        {
          type: "p",
          text: "All day long Forge announces things that happen in the game — players logging in, blocks breaking, mobs dying. These announcements are called events. To hear them, you make a class and tell Forge to scan it for handlers.",
        },
        {
          type: "p",
          text: "The @Mod.EventBusSubscriber annotation does exactly that: it marks a class as an event handler container. Point it at your mod id and the FORGE bus (the one for in-game stuff), and Forge auto-registers every handler inside.",
        },
        {
          type: "code",
          lang: "java",
          text: '@Mod.EventBusSubscriber(modid = "examplemod", bus = Mod.EventBusSubscriber.Bus.FORGE)\npublic class ModEvents {\n    // handlers go here\n}',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided walkthrough — your Java is checked for the right shape, not compiled and launched into a real Minecraft.",
        },
        {
          type: "p",
          text: "Replace the TODO: annotate the ModEvents class with @Mod.EventBusSubscriber so Forge knows to look inside it.",
        },
      ],
      starter:
        '// TODO: annotate ModEvents so Forge auto-finds its handlers\npublic class ModEvents {\n    // event handlers will live here\n}\n',
      solution:
        '@Mod.EventBusSubscriber(modid = "examplemod", bus = Mod.EventBusSubscriber.Bus.FORGE)\npublic class ModEvents {\n    // event handlers will live here\n}\n',
      checks: [
        {
          label: "Annotate the class with @Mod.EventBusSubscriber",
          kind: "codeContains",
          value: "@Mod.EventBusSubscriber",
        },
        {
          label: "Keep the ModEvents class",
          kind: "codeContains",
          value: "class ModEvents",
        },
      ],
      hints: [
        "Put the annotation on the line directly above public class ModEvents.",
        "It needs a modid and a bus — point bus at Mod.EventBusSubscriber.Bus.FORGE.",
        'Copy: @Mod.EventBusSubscriber(modid = "examplemod", bus = Mod.EventBusSubscriber.Bus.FORGE)',
      ],
      wellDone:
        "Forge will now read your class looking for handlers. The mailbox is open — let's put something in it.",
    },
    {
      id: "mc-player-login",
      track: "mcmods",
      title: "Greet players when they join",
      subtitle: "A @SubscribeEvent handler for the player login event.",
      concepts: ["@SubscribeEvent", "PlayerEvent"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "One method, one event" },
        {
          type: "p",
          text: "Inside a subscriber class, each handler is a static method tagged with @SubscribeEvent. Forge matches the handler to an event by its single parameter — name the event type you care about and Forge calls your method whenever it fires.",
        },
        {
          type: "p",
          text: "PlayerEvent.PlayerLoggedInEvent fires the moment a player joins the world. From the event you can grab the player and send them a chat message — a little welcome wagon for everyone who logs in.",
        },
        {
          type: "code",
          lang: "java",
          text: '@SubscribeEvent\npublic static void onPlayerLogin(PlayerEvent.PlayerLoggedInEvent event) {\n    event.getEntity().sendSystemMessage(Component.literal("Welcome to the server!"));\n}',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Handlers in a @Mod.EventBusSubscriber class must be public static void — Forge calls them without making an instance of your class.",
        },
        {
          type: "p",
          text: "Write onPlayerLogin: a @SubscribeEvent handler that takes a PlayerEvent.PlayerLoggedInEvent and sends the joining player a chat message.",
        },
      ],
      starter:
        '@Mod.EventBusSubscriber(modid = "examplemod", bus = Mod.EventBusSubscriber.Bus.FORGE)\npublic class ModEvents {\n    // TODO: add a @SubscribeEvent handler named onPlayerLogin that takes a\n    // PlayerEvent.PlayerLoggedInEvent and sends the player a chat message\n}\n',
      solution:
        '@Mod.EventBusSubscriber(modid = "examplemod", bus = Mod.EventBusSubscriber.Bus.FORGE)\npublic class ModEvents {\n    @SubscribeEvent\n    public static void onPlayerLogin(PlayerEvent.PlayerLoggedInEvent event) {\n        event.getEntity().sendSystemMessage(Component.literal("Welcome to the server!"));\n    }\n}\n',
      checks: [
        {
          label: "Tag the handler with @SubscribeEvent",
          kind: "codeContains",
          value: "@SubscribeEvent",
        },
        {
          label: "Make the handler public static void",
          kind: "codeContains",
          value: "public static void",
        },
        {
          label: "Listen for a PlayerEvent",
          kind: "codeContains",
          value: "PlayerEvent",
        },
        {
          label: "Name the handler onPlayerLogin and take the login event",
          kind: "codeMatches",
          value:
            "void\\s+onPlayerLogin\\s*\\(\\s*PlayerEvent\\.PlayerLoggedInEvent",
        },
        {
          label: "Send the player a message",
          kind: "codeContains",
          value: "sendSystemMessage",
        },
      ],
      hints: [
        "Start the method with @SubscribeEvent on its own line, then public static void onPlayerLogin.",
        "The single parameter is PlayerEvent.PlayerLoggedInEvent event — that's how Forge knows which event you want.",
        'Inside, call event.getEntity().sendSystemMessage(Component.literal("Welcome to the server!"));',
      ],
      wellDone:
        "Every player who logs in now gets a hello from your mod. That's a real event handler doing real work.",
    },
    {
      id: "mc-register-handler",
      track: "mcmods",
      title: "How Forge finds your handler",
      subtitle: "Registering the subscriber so it actually runs.",
      concepts: ["registration", "event bus"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "A handler nobody registered is just a method" },
        {
          type: "p",
          text: "Writing onPlayerLogin isn't enough — Forge has to be told to watch your class. With @Mod.EventBusSubscriber that registration is automatic: at startup Forge scans annotated classes and hooks up every @SubscribeEvent method to the bus you named. No extra wiring needed.",
        },
        {
          type: "p",
          text: "There's also a manual path. If a class isn't annotated, you register an instance (or the class, for static handlers) yourself by calling MinecraftForge.EVENT_BUS.register, usually from your mod's constructor.",
        },
        {
          type: "code",
          lang: "java",
          text: "// inside your @Mod main class constructor:\nMinecraftForge.EVENT_BUS.register(ModEvents.class);",
        },
        {
          type: "callout",
          tone: "warn",
          text: "Pick ONE path. If a class already has @Mod.EventBusSubscriber, also calling register on it will fire every handler twice.",
        },
        {
          type: "p",
          text: "Show the manual registration: replace the TODO with a call to MinecraftForge.EVENT_BUS.register that registers ModEvents.class.",
        },
      ],
      starter:
        "public class ExampleMod {\n    public ExampleMod() {\n        // TODO: manually register ModEvents.class on the Forge event bus\n    }\n}\n",
      solution:
        "public class ExampleMod {\n    public ExampleMod() {\n        MinecraftForge.EVENT_BUS.register(ModEvents.class);\n    }\n}\n",
      checks: [
        {
          label: "Register on the Forge event bus",
          kind: "codeContains",
          value: "MinecraftForge.EVENT_BUS.register",
        },
        {
          label: "Register the ModEvents handler class",
          kind: "codeMatches",
          value: "EVENT_BUS\\.register\\(\\s*ModEvents\\.class\\s*\\)",
        },
      ],
      hints: [
        "The Forge bus is reachable as MinecraftForge.EVENT_BUS.",
        "Call .register(...) on it and pass the handler.",
        "Since the handlers are static, pass the class itself: MinecraftForge.EVENT_BUS.register(ModEvents.class);",
      ],
      wellDone:
        "Annotated or manual, you now know both ways Forge connects an event to your code. Your mod is officially listening.",
    },
  ],
};
