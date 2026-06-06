import type { Chapter } from "../types";

export const ch06: Chapter = {
  id: "mc-fabric-events",
  title: "Fabric: Events",
  glyph: "🪝",
  summary:
    "Forge likes annotations; Fabric likes lambdas. In Fabric you hook into the game by handing a little function to an event and saying register. Same idea, fewer ceremonies.",
  lessons: [
    {
      id: "mc-fabric-join-callback",
      track: "mcmods",
      title: "Hook the player-join event",
      subtitle: "Hand Fabric a lambda with .register(...).",
      concepts: ["Fabric API", "events", "lambdas"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Fabric doesn't scan — you hand it a function" },
        {
          type: "p",
          text: "Forge finds your handlers by reading annotations. Fabric is blunter: every event is just an object with a register method, and you give it a lambda to run when the event fires. No @SubscribeEvent, no event bus to discover — you wire it up yourself, in plain code.",
        },
        {
          type: "p",
          text: "ServerPlayConnectionEvents.JOIN fires the instant a player finishes connecting. Its lambda hands you three things: the player's network handler, a packet sender, and the server. You usually do this from your mod's onInitialize method so it runs once at startup.",
        },
        {
          type: "code",
          lang: "java",
          text: 'ServerPlayConnectionEvents.JOIN.register((handler, sender, server) -> {\n    // runs every time someone joins\n});',
        },
        {
          type: "callout",
          tone: "note",
          text: "Guided walkthrough: your Java is checked for the right shape, not compiled into an actual Minecraft. Write it like you mean it anyway.",
        },
        {
          type: "p",
          text: "Replace the TODO with a real ServerPlayConnectionEvents.JOIN.register(...) call that takes the (handler, sender, server) lambda.",
        },
      ],
      starter:
        'public class ExampleModInit implements ModInitializer {\n    @Override\n    public void onInitialize() {\n        // TODO: ServerPlayConnectionEvents.JOIN .register a lambda\n        //       with the parameters (handler, sender, server)\n    }\n}\n',
      solution:
        'public class ExampleModInit implements ModInitializer {\n    @Override\n    public void onInitialize() {\n        ServerPlayConnectionEvents.JOIN.register((handler, sender, server) -> {\n            // a fresh player just walked in\n        });\n    }\n}\n',
      checks: [
        {
          label: "Hook the JOIN event from Fabric's events API",
          kind: "codeContains",
          value: "ServerPlayConnectionEvents",
        },
        {
          label: "Register a callback with .register(",
          kind: "codeContains",
          value: ".register(",
        },
        {
          label: "Use a lambda (->) as the callback",
          kind: "codeContains",
          value: "->",
        },
        {
          label: "Register on the JOIN event specifically",
          kind: "codeMatches",
          value: "JOIN\\s*\\.register\\s*\\(",
        },
        {
          label: "Take the (handler, sender, server) parameters",
          kind: "codeMatches",
          value:
            "\\(\\s*handler\\s*,\\s*sender\\s*,\\s*server\\s*\\)\\s*->",
        },
      ],
      hints: [
        "The TODO is inside onInitialize — that's where Fabric wants your registration to run.",
        "Start with the event object, ServerPlayConnectionEvents.JOIN, then call .register(...) on it.",
        "Pass a lambda: ServerPlayConnectionEvents.JOIN.register((handler, sender, server) -> { });",
      ],
      wellDone:
        "Fabric is now holding your function and will call it every time someone joins. Next, make it actually say something.",
    },
    {
      id: "mc-fabric-join-message",
      track: "mcmods",
      title: "Say hi on join",
      subtitle: "Send the joining player a message from inside the lambda.",
      concepts: ["sendMessage", "Text", "player"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "An empty lambda is a polite shrug" },
        {
          type: "p",
          text: "Right now your JOIN handler fires and does nothing. The connection handler you were given has a .player field — the actual ServerPlayerEntity who just joined. Call sendMessage on them with a Text and they get a greeting in chat.",
        },
        {
          type: "p",
          text: "In Fabric you build chat text with Text.literal(\"...\"). It's the same role Component.literal plays in Forge — just a different name for the same friendly string-into-chat helper.",
        },
        {
          type: "code",
          lang: "java",
          text: 'ServerPlayConnectionEvents.JOIN.register((handler, sender, server) -> {\n    handler.player.sendMessage(Text.literal("Welcome to the server!"));\n});',
        },
        {
          type: "callout",
          tone: "tip",
          text: "handler.getPlayer() works too, but handler.player is the field most Fabric examples reach for. Either is fine.",
        },
        {
          type: "p",
          text: "Fill in the lambda body: grab handler.player and sendMessage them a Text.literal welcome.",
        },
      ],
      starter:
        'public class ExampleModInit implements ModInitializer {\n    @Override\n    public void onInitialize() {\n        ServerPlayConnectionEvents.JOIN.register((handler, sender, server) -> {\n            // TODO: send handler.player a Text.literal welcome message\n        });\n    }\n}\n',
      solution:
        'public class ExampleModInit implements ModInitializer {\n    @Override\n    public void onInitialize() {\n        ServerPlayConnectionEvents.JOIN.register((handler, sender, server) -> {\n            handler.player.sendMessage(Text.literal("Welcome to the server!"));\n        });\n    }\n}\n',
      checks: [
        {
          label: "Keep the JOIN registration",
          kind: "codeContains",
          value: "ServerPlayConnectionEvents",
        },
        {
          label: "Still register a lambda with .register(",
          kind: "codeContains",
          value: ".register(",
        },
        {
          label: "Keep using a lambda (->)",
          kind: "codeContains",
          value: "->",
        },
        {
          label: "Send the joining player a message",
          kind: "codeContains",
          value: "sendMessage",
        },
        {
          label: "Build the greeting with Text.literal",
          kind: "codeMatches",
          value: "Text\\.literal\\(",
        },
      ],
      hints: [
        "The player who just joined is handler.player.",
        "Call .sendMessage(...) on that player.",
        'Pass a Text: handler.player.sendMessage(Text.literal("Welcome to the server!"));',
      ],
      wellDone:
        "Every new arrival gets a wave from your mod. That's a complete Fabric event, from hook to greeting.",
    },
    {
      id: "mc-fabric-lifecycle-event",
      track: "mcmods",
      title: "Same pattern, different event",
      subtitle: "Run code when the server starts, with ServerLifecycleEvents.",
      concepts: ["ServerLifecycleEvents", "lambda pattern"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Learn one Fabric event, learn them all" },
        {
          type: "p",
          text: "The shape never changes: SomeEvents.SOMETHING.register(lambda). Once you've seen JOIN, every other Fabric event is the same move with a different name and different lambda parameters. There's no new machinery to memorize.",
        },
        {
          type: "p",
          text: "ServerLifecycleEvents.SERVER_STARTED fires once when the server has finished loading. Its lambda gets a single argument — the server — which makes it a tidy spot to print a startup line or kick off setup that needs a live world.",
        },
        {
          type: "code",
          lang: "java",
          text: 'ServerLifecycleEvents.SERVER_STARTED.register(server -> {\n    System.out.println("Server is up!");\n});',
        },
        {
          type: "callout",
          tone: "note",
          text: "Different events hand you different parameters — JOIN gave you three, SERVER_STARTED gives you one. The lambda's job is to name and use whatever that event provides.",
        },
        {
          type: "p",
          text: "Prove the pattern transfers: replace the TODO with a ServerLifecycleEvents.SERVER_STARTED.register(...) call using a single-argument server lambda.",
        },
      ],
      starter:
        'public class ExampleModInit implements ModInitializer {\n    @Override\n    public void onInitialize() {\n        // TODO: ServerLifecycleEvents.SERVER_STARTED .register a\n        //       single-argument (server) lambda that runs at startup\n    }\n}\n',
      solution:
        'public class ExampleModInit implements ModInitializer {\n    @Override\n    public void onInitialize() {\n        ServerLifecycleEvents.SERVER_STARTED.register(server -> {\n            System.out.println("Server is up and listening!");\n        });\n    }\n}\n',
      checks: [
        {
          label: "Use the ServerLifecycleEvents events API",
          kind: "codeContains",
          value: "ServerLifecycleEvents",
        },
        {
          label: "Register a callback with .register(",
          kind: "codeContains",
          value: ".register(",
        },
        {
          label: "Use a lambda (->)",
          kind: "codeContains",
          value: "->",
        },
        {
          label: "Hook SERVER_STARTED with a single server lambda",
          kind: "codeMatches",
          value: "SERVER_STARTED\\s*\\.register\\s*\\(\\s*server\\s*->",
        },
      ],
      hints: [
        "It's the same shape as JOIN: EventsClass.EVENT.register(lambda).",
        "The event is ServerLifecycleEvents.SERVER_STARTED.",
        "This one's lambda takes just the server: ServerLifecycleEvents.SERVER_STARTED.register(server -> { ... });",
      ],
      wellDone:
        "One pattern, any event. You can now reach for any Fabric callback and wire it up on instinct.",
    },
  ],
};
