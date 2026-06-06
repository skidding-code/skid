import type { Chapter } from "../types";

export const ch05: Chapter = {
  id: "discord-cogs",
  title: "Cogs & Errors",
  glyph: "🧩",
  summary:
    "Stop stuffing every command into one file. Group them into Cogs, load them cleanly, and catch errors before they catch you.",
  lessons: [
    {
      id: "discord-cog-class",
      track: "discordpy",
      title: "Your first Cog",
      subtitle: "A Cog is a class that holds a bunch of related commands.",
      concepts: ["cogs", "commands.Cog"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "One class to rule a feature" },
        {
          type: "p",
          text: "Once your bot has more than five commands, a single file turns into a swamp. A Cog is the cure: a class that subclasses commands.Cog and gathers related commands, listeners, and state into one tidy unit.",
        },
        {
          type: "p",
          text: "Commands inside a Cog are written with @commands.command() (not @bot.command()), and every command method takes self before ctx — it lives on the class now.",
        },
        {
          type: "code",
          lang: "python",
          text: 'class Greetings(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot\n\n    @commands.command()\n    async def hello(self, ctx):\n        await ctx.send(f"Hey {ctx.author.mention}!")',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Forget self in a command method and discord.py will hand your first real argument to self instead of ctx. Mysterious bugs follow. Always: async def name(self, ctx).",
        },
        {
          type: "p",
          text: "Build a MyCog class that subclasses commands.Cog, stores bot in __init__, and defines one command decorated with @commands.command().",
        },
      ],
      starter:
        "class MyCog(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot\n\n    # TODO: define a command method decorated with @commands.command()\n    # remember it takes (self, ctx) and uses await ctx.send(...)\n    pass\n",
      solution:
        'class MyCog(commands.Cog):\n    def __init__(self, bot):\n        self.bot = bot\n\n    @commands.command()\n    async def hello(self, ctx):\n        await ctx.send(f"Hey {ctx.author.mention}!")\n',
      checks: [
        { label: "Subclass commands.Cog", kind: "codeContains", value: "commands.Cog" },
        { label: "Decorate a command with @commands.command()", kind: "codeContains", value: "@commands.command()" },
        {
          label: "Command method takes self and ctx",
          kind: "codeMatches",
          value: "async\\s+def\\s+\\w+\\(\\s*self\\s*,\\s*ctx",
        },
        { label: "Send a reply (use await)", kind: "codeContains", value: "await" },
      ],
      hints: [
        "Below __init__, add @commands.command() on its own line.",
        "Right under it: async def hello(self, ctx): — self first, then ctx.",
        'Inside, await ctx.send("...") so the command actually replies.',
      ],
      wellDone:
        "That is a real Cog. Your commands finally have a home address.",
    },
    {
      id: "discord-cog-setup",
      track: "discordpy",
      title: "Load it with setup",
      subtitle: "A Cog does nothing until the bot adds it.",
      concepts: ["cogs", "add_cog", "setup"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "The secret handshake" },
        {
          type: "p",
          text: "Writing a Cog class is only half the job — the bot has no idea it exists yet. In discord.py 2.x, every extension file ends with an async function literally named setup. The library calls it when you load the file, and that is where you register the Cog.",
        },
        {
          type: "code",
          lang: "python",
          text: "async def setup(bot):\n    await bot.add_cog(MyCog(bot))",
        },
        {
          type: "callout",
          tone: "note",
          text: "Two things people forget in 2.x: setup must be async, and add_cog must be awaited. In old 1.x code neither was true, so copied snippets from the internet love to break here.",
        },
        {
          type: "p",
          text: "Write the async def setup(bot) function that awaits bot.add_cog with an instance of MyCog.",
        },
      ],
      starter:
        "async def setup(bot):\n    # TODO: register the cog (see the hint)\n    pass\n",
      solution:
        "async def setup(bot):\n    await bot.add_cog(MyCog(bot))\n",
      checks: [
        { label: "Define an async setup function", kind: "codeContains", value: "async def setup" },
        { label: "Register the cog with add_cog", kind: "codeContains", value: "add_cog" },
        {
          label: "Await add_cog with a cog instance",
          kind: "codeMatches",
          value: "await\\s+bot\\.add_cog\\(\\s*MyCog\\(\\s*bot\\s*\\)\\s*\\)",
        },
      ],
      hints: [
        "The function signature is already there — replace the TODO line.",
        "Create the cog instance by calling MyCog(bot).",
        "The whole line is: await bot.add_cog(MyCog(bot)).",
      ],
      wellDone:
        "setup wired it in. Load the extension and your Cog springs to life.",
    },
    {
      id: "discord-cog-errors",
      track: "discordpy",
      title: "Catch the chaos",
      subtitle: "Cooldowns and error handlers keep your commands from exploding.",
      concepts: ["error handling", "cooldown"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Things will go wrong" },
        {
          type: "p",
          text: "Users spam. Users pass garbage. A command that throws an unhandled exception just dies silently and prints a wall of red in your console. Two tools tame this: cooldowns to rate-limit spam, and a per-command .error handler to respond gracefully.",
        },
        {
          type: "p",
          text: "Stack @commands.cooldown(rate, per, type) above your command, then attach an error handler with @<command>.error. When the cooldown trips, discord.py raises CommandOnCooldown and your handler catches it.",
        },
        {
          type: "code",
          lang: "python",
          text: '@commands.command()\n@commands.cooldown(1, 5, commands.BucketType.user)\nasync def spam(self, ctx):\n    await ctx.send("Used once every 5 seconds!")\n\n@spam.error\nasync def spam_error(self, ctx, error):\n    if isinstance(error, commands.CommandOnCooldown):\n        await ctx.send(f"Chill! Try again in {error.retry_after:.0f}s.")',
        },
        {
          type: "callout",
          tone: "tip",
          text: "@spam.error must come AFTER the spam command is defined — it references that command object. Decorator order matters: @commands.command() goes on top, the cooldown underneath it.",
        },
        {
          type: "p",
          text: "Add a @commands.cooldown(...) to a command, then write an @<command>.error handler that catches CommandOnCooldown and replies politely.",
        },
      ],
      starter:
        "@commands.command()\n# TODO: add a cooldown decorator above the command (see the hint)\nasync def spam(self, ctx):\n    await ctx.send(\"Used once every 5 seconds!\")\n\n# TODO: add an error handler for when the command is rate-limited\n",
      solution:
        '@commands.command()\n@commands.cooldown(1, 5, commands.BucketType.user)\nasync def spam(self, ctx):\n    await ctx.send("Used once every 5 seconds!")\n\n@spam.error\nasync def spam_error(self, ctx, error):\n    if isinstance(error, commands.CommandOnCooldown):\n        await ctx.send(f"Chill! Try again in {error.retry_after:.0f}s.")\n',
      checks: [
        { label: "Keep the @commands.command() decorator", kind: "codeContains", value: "@commands.command()" },
        { label: "Add a cooldown", kind: "codeContains", value: "commands.cooldown" },
        {
          label: "Attach a per-command error handler",
          kind: "codeMatches",
          value: "@\\w+\\.error",
        },
        { label: "Catch the CommandOnCooldown error", kind: "codeContains", value: "CommandOnCooldown" },
      ],
      hints: [
        "Replace the first TODO with @commands.cooldown(1, 5, commands.BucketType.user).",
        "After the command, write @spam.error then async def spam_error(self, ctx, error):.",
        "Inside, use isinstance(error, commands.CommandOnCooldown) before you await ctx.send(...).",
      ],
      wellDone:
        "Spammers get a friendly cooldown message instead of a stack trace. Very classy.",
    },
  ],
};
