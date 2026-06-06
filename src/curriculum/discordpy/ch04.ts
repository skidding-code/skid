import type { Chapter } from "../types";

export const ch04: Chapter = {
  id: "discord-slash",
  title: "Slash Commands",
  glyph: "⚡",
  summary:
    "Graduate from !prefix commands to the real /slash commands Discord shows in its little pop-up menu.",
  lessons: [
    {
      id: "discord-tree-sync",
      track: "discordpy",
      title: "Sync the command tree",
      subtitle: "Slash commands are invisible until you tell Discord they exist.",
      concepts: ["app commands", "tree sync"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Tell Discord what commands you have" },
        {
          type: "p",
          text: "Prefix commands like !ping just need the bot online. Slash commands are different: Discord keeps its own list of them so it can show that helpful pop-up as you type a slash. If you never hand Discord your list, your beautiful commands simply don't appear.",
        },
        {
          type: "p",
          text: "Every commands.Bot has a bot.tree that holds its app commands. Once the bot is connected, you push the whole tree up to Discord with one await call inside on_ready.",
        },
        {
          type: "code",
          lang: "python",
          text: '@bot.event\nasync def on_ready():\n    synced = await bot.tree.sync()\n    print(f"Synced {len(synced)} command(s) as {bot.user}")',
        },
        {
          type: "callout",
          tone: "note",
          text: "Syncing every restart is fine while learning. On big bots people sync only when commands actually change, because Discord rate-limits global syncs.",
        },
        {
          type: "p",
          text: "Write an on_ready event that awaits bot.tree.sync() so your slash commands register.",
        },
      ],
      starter:
        '@bot.event\nasync def on_ready():\n    # TODO: register your slash commands by awaiting the bot\'s\n    # command collection .sync() method, then print a ready message\n    pass\n',
      solution:
        '@bot.event\nasync def on_ready():\n    synced = await bot.tree.sync()\n    print(f"Synced {len(synced)} command(s) as {bot.user}")\n',
      checks: [
        { label: "Handle the on_ready event", kind: "codeContains", value: "on_ready" },
        { label: "Sync the command tree", kind: "codeContains", value: "tree.sync" },
        { label: "Await the sync (it's a coroutine)", kind: "codeMatches", value: "await\\s+bot\\.tree\\.sync\\(" },
      ],
      hints: [
        "The list of app commands lives on bot.tree.",
        "Pushing them to Discord is one call: bot.tree.sync().",
        "It's async, so write: synced = await bot.tree.sync().",
      ],
      wellDone:
        "Discord now knows your commands exist — the slash menu will finally show them.",
    },
    {
      id: "discord-slash-command",
      track: "discordpy",
      title: "Your first slash command",
      subtitle: "A @bot.tree.command() that answers an interaction.",
      concepts: ["tree.command", "interaction"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "From ctx to interaction" },
        {
          type: "p",
          text: "Prefix commands hand you a ctx and you ctx.send. Slash commands hand you an interaction instead — the object representing the user clicking your command. You reply by responding to that interaction, and you must respond within three seconds or Discord shows an angry \"this interaction failed\".",
        },
        {
          type: "p",
          text: "You declare a slash command with @bot.tree.command(), give it a name and description, and take a single interaction: discord.Interaction parameter.",
        },
        {
          type: "code",
          lang: "python",
          text: '@bot.tree.command(name="hello", description="Say hi back")\nasync def hello(interaction: discord.Interaction):\n    await interaction.response.send_message("Hi there!")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "It's interaction.response.send_message(...), not interaction.send(...). The .response is how you answer that first three-second window.",
        },
        {
          type: "p",
          text: "Write a /hello slash command that takes interaction: discord.Interaction and replies with interaction.response.send_message.",
        },
      ],
      starter:
        '@bot.tree.command(name="hello", description="Say hi back")\nasync def hello(interaction):\n    # TODO: type-annotate the interaction parameter, then reply\n    # to it using the .response object\'s message-sending method\n    pass\n',
      solution:
        '@bot.tree.command(name="hello", description="Say hi back")\nasync def hello(interaction: discord.Interaction):\n    await interaction.response.send_message("Hi there!")\n',
      checks: [
        { label: "Declare a slash command", kind: "codeContains", value: "tree.command" },
        { label: "Type the parameter as discord.Interaction", kind: "codeContains", value: "discord.Interaction" },
        { label: "Reply to the interaction", kind: "codeContains", value: "interaction.response.send_message" },
        { label: "Await the reply", kind: "codeMatches", value: "await\\s+interaction\\.response\\.send_message\\(" },
      ],
      hints: [
        "Annotate the parameter: async def hello(interaction: discord.Interaction).",
        "You answer through interaction.response, not interaction directly.",
        "Reply with: await interaction.response.send_message(\"Hi there!\").",
      ],
      wellDone: "That's a real slash command — it shows up in the menu and talks back.",
    },
    {
      id: "discord-slash-param",
      track: "discordpy",
      title: "A command that takes input",
      subtitle: "Typed parameters become Discord's own input boxes.",
      concepts: ["typed parameters", "app commands"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Discord builds the form for you" },
        {
          type: "p",
          text: "Add a typed parameter after interaction and Discord turns it into an input field in the slash UI. A str gives a text box, an int forces a number — Discord validates the type before your code ever runs. No more parsing message strings by hand.",
        },
        {
          type: "code",
          lang: "python",
          text: '@bot.tree.command(name="greet", description="Greet someone by name")\nasync def greet(interaction: discord.Interaction, name: str):\n    await interaction.response.send_message(f"Hello, {name}!")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Use app_commands.describe(name=\"who to greet\") to label each box, so users know what to type. The type annotation (str, int, bool) is what makes the field appear at all.",
        },
        {
          type: "p",
          text: "Write a /greet command with a name: str parameter and reply using that name in an f-string via interaction.response.send_message.",
        },
      ],
      starter:
        '@bot.tree.command(name="greet", description="Greet someone by name")\nasync def greet(interaction: discord.Interaction):\n    # TODO: add a name parameter typed as str, then reply to the\n    # interaction\'s .response using that name inside an f-string\n    pass\n',
      solution:
        '@bot.tree.command(name="greet", description="Greet someone by name")\nasync def greet(interaction: discord.Interaction, name: str):\n    await interaction.response.send_message(f"Hello, {name}!")\n',
      checks: [
        { label: "Declare a slash command", kind: "codeContains", value: "tree.command" },
        { label: "Keep the interaction parameter typed", kind: "codeContains", value: "discord.Interaction" },
        { label: "Add a typed name parameter", kind: "codeMatches", value: "name\\s*:\\s*str" },
        { label: "Use name in the reply", kind: "codeMatches", value: "interaction\\.response\\.send_message\\([\\s\\S]*name" },
      ],
      hints: [
        "Add a second parameter after interaction: name: str.",
        "The type annotation str is what makes Discord show a text box.",
        "Reply with: await interaction.response.send_message(f\"Hello, {name}!\").",
      ],
      wellDone: "Your command takes input now — Discord drew the text box and validated it for you.",
    },
  ],
};
