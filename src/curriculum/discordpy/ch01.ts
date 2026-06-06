import type { Chapter } from "../types";

export const ch01: Chapter = {
  id: "discord-setup",
  title: "Your First Bot",
  glyph: "🤖",
  summary: "Spin up a discord.py bot from scratch — connect, react to going online, and log in safely.",
  lessons: [
    {
      id: "discord-create-bot",
      track: "discordpy",
      title: "Wake the bot up",
      subtitle: "Import discord.py and build a Bot object.",
      concepts: ["imports", "commands.Bot", "intents"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Every bot starts with a Bot" },
        {
          type: "p",
          text: "A discord.py bot is just a Python object that knows how to talk to Discord. You get it from the commands extension, which adds nice features like command handling on top of the raw library.",
        },
        {
          type: "p",
          text: "Modern discord.py (2.x) also wants you to declare intents — the categories of events your bot cares about. The defaults are a sensible starting point.",
        },
        {
          type: "code",
          lang: "python",
          text: 'import discord\nfrom discord.ext import commands\n\nintents = discord.Intents.default()\nbot = commands.Bot(command_prefix="!", intents=intents)',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided walkthrough — your code isn't run, it's checked. So write it like you mean it.",
        },
        {
          type: "p",
          text: "Import the two pieces, make a default intents object, and create a bot whose command prefix is the exclamation mark.",
        },
      ],
      starter:
        "# TODO: import discord and the commands extension\n\n# TODO: create a default intents object\n\n# TODO: create the bot with command_prefix=\"!\" and your intents\n",
      solution:
        'import discord\nfrom discord.ext import commands\n\nintents = discord.Intents.default()\nbot = commands.Bot(command_prefix="!", intents=intents)\n',
      checks: [
        { label: "Import the discord library", kind: "codeContains", value: "import discord" },
        { label: "Use the commands extension", kind: "codeContains", value: "from discord.ext import commands" },
        { label: "Create default intents", kind: "codeContains", value: "discord.Intents.default()" },
        { label: "Build the bot", kind: "codeContains", value: "commands.Bot" },
        { label: 'Set the "!" prefix', kind: "codeContains", value: 'command_prefix="!"' },
      ],
      hints: [
        "discord is one import; commands comes from discord.ext.",
        "intents = discord.Intents.default() gives you the standard set.",
        'bot = commands.Bot(command_prefix="!", intents=intents)',
      ],
      wellDone: "Your bot exists now. It's asleep, but it exists — that's the hard part done.",
    },
    {
      id: "discord-on-ready",
      track: "discordpy",
      title: "It's alive!",
      subtitle: "React when the bot connects with an on_ready event.",
      concepts: ["events", "@bot.event", "on_ready"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "Listening for the connection" },
        {
          type: "p",
          text: "Discord fires events at your bot constantly: messages, joins, reactions. The very first one you care about is on_ready, which fires once the bot has fully logged in and is ready to work.",
        },
        {
          type: "p",
          text: "You hook into an event by decorating an async function with @bot.event. The function name has to match the event exactly — on_ready means on_ready, not onReady.",
        },
        {
          type: "code",
          lang: "python",
          text: '@bot.event\nasync def on_ready():\n    print(f"Logged in as {bot.user}!")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "Event handlers are async — Discord can hand you events faster than one at a time, so they don't block each other.",
        },
        {
          type: "p",
          text: "Write an on_ready handler that prints a message confirming the bot logged in.",
        },
      ],
      starter:
        'import discord\nfrom discord.ext import commands\n\nintents = discord.Intents.default()\nbot = commands.Bot(command_prefix="!", intents=intents)\n\n# TODO: decorate an async on_ready function and print that you logged in\n',
      solution:
        'import discord\nfrom discord.ext import commands\n\nintents = discord.Intents.default()\nbot = commands.Bot(command_prefix="!", intents=intents)\n\n@bot.event\nasync def on_ready():\n    print(f"Logged in as {bot.user}!")\n',
      checks: [
        { label: "Register an event handler", kind: "codeContains", value: "@bot.event" },
        { label: "Define the on_ready event", kind: "codeContains", value: "on_ready" },
        { label: "Make the handler async", kind: "codeMatches", value: "async\\s+def\\s+on_ready\\s*\\(" },
        { label: "Print a logged-in message", kind: "codeContains", value: "print(" },
      ],
      hints: [
        "Put @bot.event on the line directly above your function.",
        "The function must be async: async def on_ready():",
        'async def on_ready():\n    print(f"Logged in as {bot.user}!")',
      ],
      wellDone: "Now your bot says hi to the console the moment it connects. Polite bot.",
    },
    {
      id: "discord-run-token",
      track: "discordpy",
      title: "Plug in the key",
      subtitle: "Run the bot with its secret token — and keep it secret.",
      concepts: ["bot.run", "tokens", "secrets"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "The token is the bot's password" },
        {
          type: "p",
          text: "Your bot logs in with a token — a long secret string from the Discord Developer Portal. You hand it to bot.run() and the bot connects. This line goes last, because it blocks and keeps the bot running.",
        },
        {
          type: "code",
          lang: "python",
          text: 'TOKEN = "your-token-here"\n\nbot.run(TOKEN)',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Never commit your real token. Anyone who has it controls your bot. Keep it in an environment variable or a file that git ignores — not in code you push.",
        },
        {
          type: "p",
          text: "Store the token in a TOKEN placeholder variable, then start the bot by passing it to bot.run().",
        },
      ],
      starter:
        'import discord\nfrom discord.ext import commands\n\nintents = discord.Intents.default()\nbot = commands.Bot(command_prefix="!", intents=intents)\n\n@bot.event\nasync def on_ready():\n    print(f"Logged in as {bot.user}!")\n\n# TODO: set a TOKEN placeholder variable (never your real token in code!)\n\n# TODO: run the bot with that token\n',
      solution:
        'import discord\nfrom discord.ext import commands\n\nintents = discord.Intents.default()\nbot = commands.Bot(command_prefix="!", intents=intents)\n\n@bot.event\nasync def on_ready():\n    print(f"Logged in as {bot.user}!")\n\n# Placeholder — load the real value from an environment variable, never hard-code it.\nTOKEN = "your-token-here"\n\nbot.run(TOKEN)\n',
      checks: [
        { label: "Create a TOKEN variable", kind: "codeMatches", value: "TOKEN\\s*=" },
        { label: "Start the bot", kind: "codeContains", value: "bot.run(" },
        { label: "Run with the token variable", kind: "codeContains", value: "bot.run(TOKEN)" },
      ],
      hints: [
        "Make a variable: TOKEN = \"your-token-here\" (a placeholder, not a real secret).",
        "The last line of a bot is almost always bot.run(...).",
        "bot.run(TOKEN) — and remember to keep the real token out of git.",
      ],
      wellDone: "That's a complete, runnable bot — and you already know to never leak the token. Pros forget that.",
    },
  ],
};
