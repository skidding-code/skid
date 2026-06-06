# Authoring NEW-TRACK chapters

Read /home/user/skid/AGENT_SPEC.md first for the Chapter/Lesson/CheckRule schema,
tone rules (funny + clear, no AI slop), and structure. This file adds the
per-track rules. starter/solution are **strings** (single file). 3 lessons per
chapter (4 ok). Only import: `import type { Chapter } from "../types";`.

## node  (JavaScript — RUNS LIVE in a browser sandbox, console output)
- `track: "node"`. Print with `console.log(...)`. Output is graded from the
  console, so it must be **synchronous** — NO setTimeout/async/await/promises
  (their output lands after grading). No DOM, no Node `require`/`fs`/`http`.
- Checks: `stdoutContains` (console output) + `codeContains`. Deterministic.
- starter = a comment/TODO; solution = working JS.

## bash  (Terminal — RUNS on Wandbox)
- `track: "bash"`. Print with `echo`. Pure shell: variables (`name="..."`),
  `for`/`while`, `if [ ... ]`, arithmetic `$(( ))`, and pipes with coreutils
  (echo | tr | grep | wc | rev | sort). NO real files, no network, no read.
- Checks: `stdoutContains` + `codeContains`. Deterministic output.

## GUIDED tracks — discordpy, mcmods, swiftui  (NOT executed)
These do NOT run. Grade ONLY with `codeContains` / `codeMatches` /
`codeNotContains` against the learner's source. **Never** use stdout/dom checks.
Write REAL, correct, idiomatic code for the solution; the starter is a scaffold
with a `// TODO` (or `# TODO`) the learner fills. Make checks pass on the
solution and fail on the starter. Be honest in tone that this is a guided
walkthrough (the app shows a "guided" note already — don't over-explain it).

### discordpy  (`track: "discordpy"`, Python, discord.py)
Teach: importing discord/commands, creating a bot, `@bot.command()` async
commands, `await ctx.send(...)`, `on_ready`/`on_message` events, `discord.Embed`.
Use `discord.py` 2.x style (`commands.Bot(command_prefix=..., intents=...)`).

### mcmods  (`track: "mcmods"`, Java, Minecraft Forge)
Teach: a `@Mod("id")` main class, the mod constructor + event bus, registering
content with `DeferredRegister`, and `@SubscribeEvent` handlers. Modern Forge
(1.20.x) style. Non-public classes fine.

### swiftui  (`track: "swiftui"`, Swift, SwiftUI)
Teach: a `struct X: View { var body: some View { ... } }`, `Text`, `VStack`/
`HStack`, modifiers (`.padding()`, `.font()`, `.foregroundColor()`), `@State` +
`Button(action:)`. SwiftUI for iOS/macOS.

Write the one file you're told to, then stop.
