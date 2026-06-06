import type { Chapter } from "../types";

export const ch03: Chapter = {
  id: "discord-events",
  title: "Events & Embeds",
  glyph: "✨",
  summary:
    "React to every message and reply with fancy boxed-up embeds instead of plain text.",
  lessons: [
    {
      id: "discord-on-message",
      track: "discordpy",
      title: "Listen to everything",
      subtitle: "The on_message event fires on every single message.",
      concepts: ["events", "on_message"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Your bot is always listening" },
        {
          type: "p",
          text: "Commands only fire on the right prefix. Events fire on activity. The on_message event runs for every message in every channel the bot can see — including the bot's own messages.",
        },
        {
          type: "p",
          text: "That last part is a trap. If your bot replies to a keyword and its own reply contains that keyword, it will answer itself forever. So the first thing on_message does is ignore itself.",
        },
        {
          type: "code",
          lang: "python",
          text: '@bot.event\nasync def on_message(message):\n    if message.author == bot.user:\n        return\n    if "ping" in message.content:\n        await message.channel.send("pong!")\n    await bot.process_commands(message)',
        },
        {
          type: "callout",
          tone: "warn",
          text: "Defining on_message overrides command handling. Call await bot.process_commands(message) at the end or your @bot.command()s quietly stop working.",
        },
        {
          type: "p",
          text: "Write an on_message that ignores the bot itself, then replies pong! whenever someone says ping. Remember to process commands.",
        },
      ],
      starter:
        '@bot.event\nasync def on_message(message):\n    # TODO: ignore messages the bot sent itself, then\n    # reply "pong!" when "ping" is in message.content,\n    # and finally let commands still run\n    pass\n',
      solution:
        '@bot.event\nasync def on_message(message):\n    if message.author == bot.user:\n        return\n    if "ping" in message.content:\n        await message.channel.send("pong!")\n    await bot.process_commands(message)\n',
      checks: [
        { label: "Handle the on_message event", kind: "codeContains", value: "on_message" },
        { label: "Ignore the bot's own messages", kind: "codeContains", value: "message.author" },
        { label: "Send a reply (use await)", kind: "codeContains", value: "await" },
        {
          label: "Let commands keep working",
          kind: "codeContains",
          value: "process_commands",
        },
      ],
      hints: [
        "Compare message.author to bot.user and return early if they match.",
        'Check if "ping" in message.content, then await message.channel.send(...).',
        "End with await bot.process_commands(message) so your commands still fire.",
      ],
      wellDone:
        "Your bot listens to the whole room now — and politely ignores its own voice.",
    },
    {
      id: "discord-embed",
      track: "discordpy",
      title: "Send a fancy embed",
      subtitle: "Plain text is fine. A glowing colored box is better.",
      concepts: ["discord.Embed"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Boxes beat plain text" },
        {
          type: "p",
          text: "An embed is that rich card with a title, a colored side stripe, and a body. You build a discord.Embed object, then send it with the embed= keyword instead of plain content.",
        },
        {
          type: "code",
          lang: "python",
          text: '@bot.command()\nasync def info(ctx):\n    embed = discord.Embed(\n        title="About this bot",\n        description="I was built in a coding lesson and I am very proud.",\n    )\n    await ctx.send(embed=embed)',
        },
        {
          type: "callout",
          tone: "tip",
          text: "ctx.send(embed=embed) — not ctx.send(embed). The embed= keyword is what tells Discord to render the card.",
        },
        {
          type: "p",
          text: "Make an info command that builds a discord.Embed with a title and description, then sends it.",
        },
      ],
      starter:
        '@bot.command()\nasync def info(ctx):\n    # TODO: build a discord.Embed with a title and description,\n    # then await ctx.send(embed=embed)\n    pass\n',
      solution:
        '@bot.command()\nasync def info(ctx):\n    embed = discord.Embed(\n        title="About this bot",\n        description="I was built in a coding lesson and I am very proud.",\n    )\n    await ctx.send(embed=embed)\n',
      checks: [
        { label: "Build a discord.Embed", kind: "codeContains", value: "discord.Embed" },
        { label: "Give it a title", kind: "codeContains", value: "title=" },
        { label: "Give it a description", kind: "codeContains", value: "description=" },
        { label: "Send it with embed=", kind: "codeMatches", value: "await\\s+ctx\\.send\\(\\s*embed=" },
      ],
      hints: [
        "Create the object: embed = discord.Embed(title=..., description=...).",
        "Both title= and description= are strings in quotes.",
        "Send it with await ctx.send(embed=embed).",
      ],
      wellDone: "That plain message just glowed up into a proper card.",
    },
    {
      id: "discord-embed-field",
      track: "discordpy",
      title: "Add a field",
      subtitle: "Fields are the little labeled rows inside an embed.",
      concepts: ["embeds", "add_field"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "One embed, many rows" },
        {
          type: "p",
          text: "A title and description are the headline. Fields are the details — each one is a small bold name with a value underneath. You stack them on with embed.add_field after creating the embed.",
        },
        {
          type: "code",
          lang: "python",
          text: '@bot.command()\nasync def stats(ctx):\n    embed = discord.Embed(title="Server Stats")\n    embed.add_field(name="Members", value="42")\n    embed.add_field(name="Mood", value="excellent")\n    await ctx.send(embed=embed)',
        },
        {
          type: "callout",
          tone: "note",
          text: "Both name and value must be non-empty strings. An empty value makes Discord reject the whole embed.",
        },
        {
          type: "p",
          text: "Build a stats embed and add at least one field with add_field, then send it.",
        },
      ],
      starter:
        '@bot.command()\nasync def stats(ctx):\n    embed = discord.Embed(title="Server Stats")\n    # TODO: add one or two fields, then send the embed\n    pass\n',
      solution:
        '@bot.command()\nasync def stats(ctx):\n    embed = discord.Embed(title="Server Stats")\n    embed.add_field(name="Members", value="42")\n    embed.add_field(name="Mood", value="excellent")\n    await ctx.send(embed=embed)\n',
      checks: [
        { label: "Start from a discord.Embed", kind: "codeContains", value: "discord.Embed" },
        { label: "Add a field with add_field", kind: "codeContains", value: "add_field" },
        { label: "Give the field a name and value", kind: "codeMatches", value: "add_field\\(\\s*name=[\\s\\S]*value=" },
        { label: "Send it (use await)", kind: "codeContains", value: "await" },
      ],
      hints: [
        "Call embed.add_field(name=..., value=...) after creating the embed.",
        "Both name= and value= are strings — give them real text.",
        "Finish with await ctx.send(embed=embed).",
      ],
      wellDone: "Your embed has structure now. That is basically a tiny dashboard.",
    },
  ],
};
