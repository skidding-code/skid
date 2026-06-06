import type { Chapter } from "../types";

export const ch02: Chapter = {
  id: "discord-commands",
  glyph: "💬",
  title: "Commands",
  summary:
    "Teach your bot to talk back. Wire up real commands with @bot.command(), " +
    "read arguments, and greet whoever pinged you by name.",
  lessons: [
    {
      id: "dpy-ping",
      track: "discordpy",
      title: "Ping, Pong",
      subtitle: "The 'hello world' of bots that answer back.",
      concepts: ["@bot.command()", "ctx.send"],
      estimatedMinutes: 4,
      intro: [
        { type: "h", text: "A bot that answers" },
        {
          type: "p",
          text: "A command is just a function with a decorator on top. Slap @bot.command() above an async function and discord.py turns it into a chat command. The function name becomes the command name, so def ping(...) means people type !ping.",
        },
        {
          type: "p",
          text: "That first argument, ctx (short for context), is your handle on the conversation: who sent the message, in which channel, and how to reply. To answer, you await ctx.send(...).",
        },
        {
          type: "code",
          lang: "python",
          text: '@bot.command()\nasync def hello(ctx):\n    await ctx.send("Hi there!")',
        },
        {
          type: "callout",
          tone: "note",
          text: "This is a guided walkthrough, so your code isn't run live. We check that you wrote the real thing.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "ctx.send is a coroutine. Forget the await and your bot stares back in silence.",
        },
        {
          type: "p",
          text: 'Your task: finish the ping command so it replies with "Pong!".',
        },
      ],
      starter:
        '@bot.command()\nasync def ping(ctx):\n    # TODO: reply with "Pong!" using await ctx.send(...)\n    pass',
      solution: '@bot.command()\nasync def ping(ctx):\n    await ctx.send("Pong!")',
      checks: [
        {
          label: "Register a command with @bot.command()",
          kind: "codeContains",
          value: "@bot.command()",
        },
        {
          label: "Define the command as an async function",
          kind: "codeContains",
          value: "async def",
        },
        {
          label: "Reply with await ctx.send(...)",
          kind: "codeContains",
          value: "await ctx.send",
        },
        {
          label: 'Send the text "Pong!"',
          kind: "codeContains",
          value: "Pong!",
        },
        {
          label: "Replace the TODO scaffold",
          kind: "codeNotContains",
          value: "TODO",
        },
      ],
      hints: [
        "Keep the @bot.command() line and the async def ping(ctx): line as they are.",
        "Inside the function, you need one line that awaits ctx.send with your reply.",
        'Answer: await ctx.send("Pong!")',
      ],
      wellDone: "Pong! Your bot has officially learned to clap back.",
    },
    {
      id: "dpy-echo",
      track: "discordpy",
      title: "Echo Chamber",
      subtitle: "Commands can take arguments. Read them and parrot them.",
      concepts: ["command arguments", "ctx.send"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Catching what they type" },
        {
          type: "p",
          text: "Commands aren't limited to ctx. Any extra parameters get filled in from whatever the user types after the command name. discord.py reads them straight off the message.",
        },
        {
          type: "p",
          text: 'By default each argument is one whitespace-separated word. Writing *, msg (a keyword-only argument) tells discord.py to scoop up the entire rest of the line into msg, spaces and all. So !echo hello there gives you msg = "hello there", not just "hello".',
        },
        {
          type: "code",
          lang: "python",
          text: "@bot.command()\nasync def shout(ctx, *, words):\n    await ctx.send(words.upper())",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Drop the *, and msg would only catch the first word. The * is what makes it greedy.",
        },
        {
          type: "p",
          text: "Your task: write an echo command that takes the rest of the message as msg and sends it straight back.",
        },
      ],
      starter:
        "@bot.command()\nasync def echo(ctx, *, msg):\n    # TODO: send msg back to the channel\n    pass",
      solution: "@bot.command()\nasync def echo(ctx, *, msg):\n    await ctx.send(msg)",
      checks: [
        {
          label: "Register a command with @bot.command()",
          kind: "codeContains",
          value: "@bot.command()",
        },
        {
          label: "Define an async command function",
          kind: "codeContains",
          value: "async def",
        },
        {
          label: "Accept the rest of the message as a keyword-only argument",
          kind: "codeMatches",
          value: "async\\s+def\\s+echo\\s*\\(\\s*ctx\\s*,\\s*\\*\\s*,\\s*msg\\s*\\)",
        },
        {
          label: "Send msg back with await ctx.send(...)",
          kind: "codeMatches",
          value: "await\\s+ctx\\.send\\s*\\(\\s*msg\\s*\\)",
        },
        {
          label: "Replace the TODO scaffold",
          kind: "codeNotContains",
          value: "TODO",
        },
      ],
      hints: [
        "The signature is already done for you: ctx, then *, msg to grab everything.",
        "You only need one line in the body: await ctx.send(...) with the right variable.",
        "Answer: await ctx.send(msg)",
      ],
      wellDone: "Echo... echo... echo. Your bot now repeats anything you feed it.",
    },
    {
      id: "dpy-greet",
      track: "discordpy",
      title: "Who Goes There",
      subtitle: "Use ctx.author to greet the person who summoned the bot.",
      concepts: ["ctx.author", "f-strings"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Know your caller" },
        {
          type: "p",
          text: "ctx carries the whole context of a command, and ctx.author is the member who ran it. Drop it into a message and discord.py renders their name (printing a member shows their display name).",
        },
        {
          type: "p",
          text: "Mix it into an f-string to build a personalized reply. Even slicker: ctx.author.mention gives you a clickable @ping, but plain ctx.author is plenty to say hello.",
        },
        {
          type: "code",
          lang: "python",
          text: '@bot.command()\nasync def whoami(ctx):\n    await ctx.send(f"You are {ctx.author}.")',
        },
        {
          type: "callout",
          tone: "note",
          text: "ctx.author is a Member in a server and a User in DMs. Either way, putting it in a string just works.",
        },
        {
          type: "p",
          text: "Your task: write a greet command that sends a friendly hello using ctx.author.",
        },
      ],
      starter:
        "@bot.command()\nasync def greet(ctx):\n    # TODO: greet the user by name using ctx.author\n    pass",
      solution:
        '@bot.command()\nasync def greet(ctx):\n    await ctx.send(f"Hello, {ctx.author}! Welcome.")',
      checks: [
        {
          label: "Register a command with @bot.command()",
          kind: "codeContains",
          value: "@bot.command()",
        },
        {
          label: "Define an async command function",
          kind: "codeContains",
          value: "async def",
        },
        {
          label: "Reply with await ctx.send(...)",
          kind: "codeContains",
          value: "await ctx.send",
        },
        {
          label: "Greet the caller using ctx.author",
          kind: "codeContains",
          value: "ctx.author",
        },
        {
          label: "Build the message with an f-string",
          kind: "codeMatches",
          value: 'f"[^"]*\\{ctx\\.author',
        },
        {
          label: "Replace the TODO scaffold",
          kind: "codeNotContains",
          value: "TODO",
        },
      ],
      hints: [
        "ctx.author is the person who ran the command. You can drop it inside an f-string.",
        'Build something like f"Hello, {ctx.author}!" and send it.',
        'Answer: await ctx.send(f"Hello, {ctx.author}! Welcome.")',
      ],
      wellDone: "Personalized greetings unlocked. Your bot now remembers its manners.",
    },
  ],
};
