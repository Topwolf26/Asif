# 🚀 The Vibe Coding Starter Guide (Antigravity Edition · macOS)

### From zero to a ready-to-build AI coding setup in one 3-hour session

> **Who this is for:** complete beginners who have never coded, or never used an AI coding agent. By the end you'll have **Google Antigravity** (an agent-first IDE), two AI agents (Claude Code + Codex), a curated set of "skills", a memory/file structure that makes the AI smart about *your* project, and you'll have built your first app — the same way the "$900K app in 13 minutes (Claude Design + Codex)" video does it.
>
> **Platform:** macOS (commands use Terminal / zsh). Works on both Apple Silicon (M1–M4) and Intel Macs.
>
> **Cost to follow along:** Free tools + **at least one** AI subscription (~$20/mo). See the shopping list.
>
> **Why Antigravity?** It's built *on top of* VS Code (so everything VS Code does, it does — same panels, same terminal, same extensions) but it's designed *around* AI agents, comes with Google's Gemini 3 built in, and runs multiple agents in parallel. We use it as our home base and add Claude Code + Codex on top.

---

## 📋 How to use this guide

1. **Do the blocks in order.** Each one builds on the last.
2. **Every command goes in a terminal.** In Antigravity: menu **Terminal → New Terminal** (or `` Ctrl+` ``). It opens **zsh** by default. This integrated terminal is where you'll run the AI agents.
3. **After every install, run the "✅ Verify" command.** If it prints a version number, you're good. If it errors, see [Troubleshooting](#-troubleshooting) before moving on.
4. **Copy-paste is your friend.** Click the copy button on code blocks; don't retype.
5. **Don't panic at red text.** Warnings ≠ errors. Only stop if a command clearly *fails*.

**⏱️ The 3-hour map:**

| Block | Time | You'll have… |
|---|---|---|
| 0 · Accounts & keys | 20 min | Logins for GitHub + Google + your AI agent(s) |
| 1 · Foundation installs | 35 min | Antigravity, Homebrew, Git, Node, Python, MarkText |
| 2 · Terminal + secrets primer | 15 min | Confidence at the command line + safe key habits |
| 3 · AI agents | 30 min | Claude Code + Codex installed and logged in |
| 4 · Skills | 30 min | Superpowers, Karpathy, Claude Design, Open Design |
| 5 · Memory & file structure | 25 min | A project "brain" the AI reads every time |
| 6 · Your first vibe-code | 25 min | A real, running app you built by chatting |

---

## 🛒 Block 0 — Accounts & keys (20 min)

Create these **before** installing anything. Use the same email for all of them to stay sane.

| Account | URL | Why | Cost |
|---|---|---|---|
| **GitHub** | https://github.com/signup | Cloud backup for your code + where AI "skills" are downloaded from | Free |
| **Google** | https://accounts.google.com | Signs you into **Antigravity** + unlocks Gemini 3 | Free |
| **Anthropic (Claude)** | https://claude.ai | Powers **Claude Code** (our main agent) | **Pro $20/mo** or Max $100+/mo |
| **OpenAI (ChatGPT)** | https://chatgpt.com | Powers **Codex** (our second agent, the video's hero) | **Plus $20/mo** |

> 💡 **On a tight budget?** Antigravity's built-in Gemini agent is **free** to start, so you can vibe-code with zero paid subscriptions. To match the video, add Claude **Pro ($20)** and/or ChatGPT **Plus ($20)**. Every step below marks what's Claude-only vs Codex-only.

> 🔑 **API keys vs. account login:** For this guide you'll **log in with your accounts** (a browser pops up) — you do *not* need to paste API keys. Keys are only for advanced/automated use. We cover key *safety* in Block 2 anyway, because you'll meet them eventually.

---

## 🧱 Block 1 — Foundation installs (35 min)

These tools are the ground everything else stands on. On macOS we use **Homebrew** (the standard package manager for Macs) to install most of them in one line each. We install Homebrew first.

> Open a terminal first: press **⌘ (Command) + Space** to open Spotlight, type `terminal`, hit **Enter**.

### 1.0 — Homebrew (the macOS installer everything else uses)

Paste this whole line into Terminal and press Enter, then follow the prompts (it may ask for your Mac password — typing shows nothing, that's normal):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
> ⚠️ **Apple Silicon only:** at the end, Homebrew prints two `echo … >> ~/.zprofile` commands under "Next steps." **Copy-paste and run them**, then close and reopen Terminal. This puts `brew` on your PATH. (On Intel Macs it's already set up.)

✅ **Verify:**
```bash
brew --version
```

### 1.1 — Google Antigravity (your IDE / home base)

Download the macOS version from the official page, then install it like any Mac app:

**https://antigravity.google** → click **Download for macOS** (pick **Apple Silicon** for M1–M4 Macs, or **Intel** for older Macs).

Then:
1. Open the downloaded `.dmg` (or `.zip`).
2. **Drag the Antigravity icon into your `Applications` folder.**
3. Open it from **Applications** (or Spotlight: ⌘+Space → "Antigravity").

> 🛟 **"Antigravity can't be opened because Apple cannot check it…"?** Right-click the app → **Open** → **Open** again. (Or **System Settings → Privacy & Security → Open Anyway**.) This only happens the first time.

**First launch setup:**
1. **Import settings** — if it offers to import from VS Code/Cursor, say yes (or skip if this is a fresh machine).
2. **Choose a mode** — pick **agent-assisted development** (recommended: the AI helps but you stay in control).
3. **Sign in with your Google account** — this activates Gemini 3, the built-in agent.

✅ **Verify:** Antigravity opens to a welcome screen, and you can see the **Agent Manager** panel.

> 🧭 **Antigravity is VS Code underneath**, so throughout this guide: Extensions = `⌘+Shift+X`, Command Palette = `⌘+Shift+P`, integrated terminal = `` Ctrl+` ``, file explorer on the left. If you've seen a VS Code tutorial, it all applies. (On Mac, most shortcuts use **⌘ (Command)** where Windows uses Ctrl — but the terminal toggle stays `` Ctrl+` ``.)

### 1.2 — Git (version control = an undo button for your whole project)

macOS often ships with Git via the Xcode Command Line Tools. Install/refresh it with Homebrew:
```bash
brew install git
```
> Alternatively, running `git --version` once will offer to install Apple's Command Line Tools — either works.

✅ **Verify:**
```bash
git --version
```

**Now tell Git who you are** (use your GitHub email):
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 1.3 — Node.js (runs the AI agents + most web apps)

Install the **LTS** (Long-Term Support) version:
```bash
brew install node
```
> Prefer to manage multiple Node versions later? Look into `nvm`. For now, this is enough.

✅ **Verify** (close/reopen terminal first):
```bash
node --version
npm --version
```
Both should print numbers (Node v20+ is ideal).

### 1.4 — Python (needed by many tools & scripts)

macOS includes an old system Python; install a current one with Homebrew:
```bash
brew install python@3.12
```

✅ **Verify** (close/reopen terminal first):
```bash
python3 --version
```
> 💡 On macOS the command is **`python3`** (not `python`). Same for `pip3`.

### 1.5 — MarkText (a clean reader/editor for the `.md` files you'll create)

Markdown (`.md`) is the format your project's "brain" files use. MarkText shows them nicely instead of as raw text. (Antigravity can edit them too — MarkText is just a comfier reader.)

```bash
brew install --cask marktext
```
> Or download the `.dmg` manually from https://github.com/marktext/marktext/releases and drag it into Applications.

✅ **Verify:** open MarkText from Spotlight (⌘+Space → "MarkText"); it launches to a blank document.

> 🎉 **Block 1 done.** You now have an agent-first IDE, version control, two language runtimes, and a Markdown editor.

---

## ⌨️ Block 2 — Terminal & secrets primer (15 min)

### The 6 commands that get you 80% of the way

| Command | What it does | Example |
|---|---|---|
| `cd <folder>` | **C**hange **D**irectory — move into a folder | `cd Desktop` |
| `cd ..` | Go *up* one folder | `cd ..` |
| `ls` | List what's in the current folder | `ls` |
| `pwd` | Show where you currently are | `pwd` |
| `mkdir <name>` | Make a new folder | `mkdir my-first-app` |
| `open .` | Open the current folder in Finder | `open .` |

> 💡 The dot `.` always means "right here, the current folder." To open a folder *in Antigravity*, use **File → Open Folder** from the menu.

### 🔐 Secrets hygiene — read this once, never get burned

When you build real apps you'll get **API keys** and **passwords**. These are like house keys — anyone who has them can spend your money or read your data.

**Three rules that prevent every common disaster:**

1. **Keys live in a file called `.env`** — never typed directly into code.
2. **`.env` is listed in a file called `.gitignore`** — this stops Git from ever uploading it to GitHub. (Your AI agent sets this up for you; just know it must exist.)
3. **If you ever paste a key into a chat, screenshot, or public repo by accident — treat it as burned.** Go to the provider's dashboard and click "revoke / regenerate."

You don't need keys today (we log in via browser), but now you know the safe pattern when you do.

---

## 🤖 Block 3 — The AI agents (30 min)

Antigravity already ships with a **built-in Gemini 3 agent** (the Agent Manager) — you can start vibe-coding with that alone. But to match the video we add two more: **Claude Code** and **Codex**.

The most reliable way to run them inside Antigravity is the **integrated terminal** (`` Ctrl+` ``) — because Antigravity is a VS Code fork, the agent CLIs run there perfectly. (Marketplace extensions are a bonus — see the note at the end of this block.)

### 3.1 — Claude Code (our main agent) — *needs Claude Pro/Max*

**Install the CLI** (in Antigravity's integrated terminal):
```bash
npm install -g @anthropic-ai/claude-code
```

✅ **Verify:**
```bash
claude --version
```

**Start it & log in:** in the integrated terminal, type:
```bash
claude
```
The first launch opens a browser — sign in with your Anthropic account. After that, you chat with Claude *right in the terminal*. To point it at a project, `cd` into your project folder first, then run `claude`.

### 3.2 — Codex (our second agent, the video's hero) — *needs ChatGPT Plus*

**Install the CLI:**
```bash
npm install -g @openai/codex
```
(Alternative: `brew install codex`)

✅ **Verify:**
```bash
codex --version
```

**Start it & log in:** in the integrated terminal:
```bash
codex
```
Choose **Sign in with ChatGPT** and complete the browser flow.

> 🧩 **Want the graphical extensions instead of the terminal?** Open the Extensions panel (`⌘+Shift+X`) in Antigravity and search **Claude Code** / **Codex**. Antigravity uses the Open VSX marketplace, so an extension *may or may not* appear there. **If it does**, install it for inline diffs and buttons. **If it doesn't**, no problem — the terminal CLI above gives you the full agent. Either way you also have Antigravity's own built-in Gemini agent.

> 🎉 **Block 3 done.** Up to three AI pair-programmers (Gemini built-in + Claude + Codex), ready to run side by side.

---

## 🦾 Block 4 — Skills (30 min)

"Skills" are downloadable instruction packs that make your agent dramatically better — they force good habits and add new abilities. We add four. **Most are installed by typing commands *inside* Claude Code**, not the regular terminal.

> **How to type into Claude Code:** run `claude` in the integrated terminal, then type the `/` commands at its prompt.

### 4.1 — Superpowers (discipline: plan → test → review)

This is the big one. It forces the agent to *plan before coding, write tests, and review its own work* — exactly the discipline that stops AI from making a mess.

In the **Claude Code** prompt, type these two lines (one at a time):
```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```
Now you have `/brainstorm`, `/write-plan`, and `/execute-plan` commands.

### 4.2 — Karpathy Guidelines (anti-over-engineering)

Encodes Andrej Karpathy's four rules: no silent assumptions, no over-engineering, surgical changes only, concrete success criteria. It installs the **same easy way as Superpowers** — two lines in the **Claude Code** prompt (no `npx` needed):
```
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```
Pick **User** scope so the rules apply to every project, then run `/reload-plugins` to switch it on.

### 4.3 — Claude Design / Frontend Design (beautiful UIs)

Anthropic's official skill for distinctive, non-generic interfaces. In the **Claude Code** prompt:
```
/plugins
```
…then search **frontend-design** and click Install. (It also auto-activates whenever you ask Claude to "build a web page / interface".)

### 4.4 — Open Design (150+ brand design systems)

A local, open-source "Claude Design" alternative — gives the agent 150+ ready-made design systems (Linear, Stripe-style, etc.). It even supports Antigravity directly. In a **regular terminal**:
```bash
curl -fsSL https://open-design.ai/install.sh | sh -s claude
```
> `curl … | sh` works out of the box in macOS's zsh — no extra setup needed. (If you'd rather have a GUI, install the desktop app from https://open-design.ai.)
>
> To wire it into **Antigravity's built-in agent** instead of Claude, swap the last word: `… | sh -s antigravity`.

Then use it by asking, e.g.: *"Use open-design to generate a landing page with the Linear design system."*

### 4.5 — (Bonus) context7 — live, accurate docs

A small add-on that lets your agent pull *current* documentation for any library (so it stops guessing). Add it later via `/plugins` → search **context7** → Install. Worth it once you build something real.

> 🎉 **Block 4 done.** Your agent now plans carefully, stays surgical, and designs beautifully.

---

## 🧠 Block 5 — Memory & file structure (25 min)

This is the secret sauce. AI agents forget everything between sessions — **unless you give them files to read.** A few Markdown files at the root of your project act as a permanent "brain" the agent reads every single time.

### The "lite" baseline (perfect for beginners)

Create a project folder and these files. From a terminal:
```bash
cd ~/Desktop
mkdir my-first-app
cd my-first-app
mkdir docs
```
Now in Antigravity, use **File → Open Folder** and pick `my-first-app`. Create each file below (right-click in the file explorer → New File) and paste the template.

#### `CLAUDE.md` — the project brain (most important file)
```markdown
# <Project Name> — Project Context

## What this is
<One paragraph: what the app does and who it's for.>

## Tech stack
<e.g. Next.js + Tailwind + Supabase. Leave blank if unsure — the agent can suggest.>

## How to run it locally
\`\`\`bash
npm install
npm run dev
\`\`\`

## House rules for the AI
- Ask before doing anything destructive (deleting files, etc.).
- Keep changes small and surgical — don't refactor things I didn't ask about.
- Never commit secrets. Keys go in .env (which is gitignored).
- Explain what you're about to do before doing it.

## Where to look
- Action list: docs/BACKLOG.md
- Current state: docs/CODE-HANDOFF.md
```

#### `AGENTS.md` — works across *all* tools (Codex, Gemini/Antigravity, Cursor, etc.)
```markdown
# Agent instructions

This project follows the AGENTS.md standard.
The full project context lives in CLAUDE.md — read it first.
Current state is in docs/CODE-HANDOFF.md.
```

#### `docs/BACKLOG.md` — your single to-do list
```markdown
# Backlog — single source of truth for what to build

## Doing
- (what you're building right now)

## Up Next
- (the next 3–5 things)

## Done
- (finished items move here)
```

#### `docs/CODE-HANDOFF.md` — "where did I leave off?"
```markdown
# Code Handoff — current state

**Last updated:** <date>
**What works:** <e.g. nothing yet / homepage renders>
**What's broken:** <none yet>
**Next step:** <the very next thing to do>
```

#### `README.md` — the human-facing front door
```markdown
# <Project Name>

<One line: what it is.>

## Run locally
\`\`\`bash
npm install
npm run dev
\`\`\`
```

### How the agents' memory works (good to know)
- A file named **`CLAUDE.md`** in your project = rules for **that project** (Claude reads it).
- A file named **`AGENTS.md`** = the *cross-tool* version Codex and Antigravity's Gemini agent read. Keep both pointing at the same context.
- A `CLAUDE.md` at **`~/.claude/CLAUDE.md`** = rules for **every** project (your global preferences).
- Claude Code can also keep an auto-memory of facts across sessions. You'll see it reference these automatically — you don't have to set it up by hand to start.

> 💡 **Why so few files?** Big commercial projects grow this into a dozen docs (backlogs, handoff rituals, "lanes" for parallel sessions). Start lite. Add structure only when the pain of *not* having it shows up. See [What this grows into](#-what-this-grows-into).

> 🎉 **Block 5 done.** Your project now has a brain.

---

## ✨ Block 6 — Your first vibe-code: a Calendly clone ("Mitly") (40–60 min)

This is the **exact build from the reference video** — a Calendly/Cal.com clone called **Mitly** with a guest **booking page**, a host **dashboard**, Google login, and Google Calendar sync. The prompts below are the creator's **real, verbatim prompts** (typos and all — leave them, they work), mapped onto our Antigravity setup.

> **The method, in one line:** **ideate → mock up the look → Claude Design builds the UI → Codex wires up the logic and tests it in a browser → add integrations → (optional) marketing video + deploy.**
>
> In our setup: `claude` = Claude Design (the UI), `codex` = the backend/logic/testing. Run them in two split terminals (`` Ctrl+` `` then `⌘+\` to split), or use Antigravity's built-in Agent Manager as a third hand.

> ⚠️ **Reality check:** the presenter did this in 13 minutes because he's done it 100×. Phases 1–4 (a real, clickable, working booking app) are a great first session. Phases 6–8 (Google login, Calendar, video, deploy) are "level-up" — do them today if you're flying, or come back tomorrow. Either way you finish with a real app.

### Step 0 — Open the project
Open Antigravity → **File → Open Folder → `my-first-app`** (or make a fresh `mitly` folder). Open the integrated terminal (`` Ctrl+` ``).

### Phase 1 — Ideate the features
Run `codex` (or use ChatGPT in your browser). Paste verbatim:
```
I want to create a web application similar to calendarly or cal.com and i want
you to suggest a list of features that should be available in an app like this...
give me the data or the result in a numbered format so i can just pick and
choose the features that i want
```
Then pick the features you want and add:
```
I want all these features and i also want the ability to have a google login so
users can log in and also connect to a google calendar
```

### Phase 2 — Design 5 visual concepts
This uses an **image model** to mock up the look before building. Easiest in **ChatGPT (web)**:
```
Use your image gen model gpt image 2 to design the ui interface first give me
five different ui options each option should include the host dashboard and the
booking page for the guest
```
Pick your favourite, and **save that image into your project folder.**
> 🛟 No image model? Skip this — just describe the look in words in Phase 3. The frontend-design / Open Design skills can design from a description alone.

### Phase 3 — Build the front-end with Claude Design
Run `claude`. Reference the chosen UI image (drag it in / give its path) and **dictate the layout**:
```
Create two pages [the booking page and host dashboard]... this is a calendar
booking app similar to calendarly but i have the design that i want which is
this one... for the booking page on the left i want the logo the profile...
[then keep describing your navigation + layout, section by section]
```
Accept the diffs. You now have clickable HTML/CSS for **both** the booking page and the host dashboard.

### Phase 4 — Wire up the backend with Codex
Put the front-end files in a subfolder (the video uses `mitly design`). In a **second terminal** run `codex`.

**First, make it study the design:**
```
In the mitly app folder there's a subfolder called mitly design i designed the
full ui please study it and tell me if you have everything you need to build
out the functionality
```
**Then build + self-test:**
```
Build out the backend functionality make sure that every function works and
after you're done i want you to use browser use to test all the functions
```
> 🔎 **"browser use"** = letting the agent drive a real browser to click through the app like a human. Codex can do this; Antigravity also has a **built-in browser** the agent can control. If Codex asks how to test, tell it to use its browser tool.

### Phase 5 — Test & refine visually
Have it run a real booking end-to-end:
```
Use browser use to test dummy booking
```
For visual tweaks, **select an element on screen** (Antigravity lets you point the agent at a specific element), then:
```
Make this green
```
```
implement changes
```

### Phase 6 — Google login & Google Calendar *(stretch)*
```
I want to allow people to log in via google give me the steps to do this
```
```
I want the user to be able to connect to a google calendar please install the feature
```
Codex walks you through **Google Cloud Console** (creating OAuth credentials, redirect URLs, enabling the Calendar API). Keep every secret in `.env` — never in code (Block 2).

### Phase 7 — Marketing video with Remotion *(optional)*
Remotion makes videos with code. With the Remotion skill available:
```
Use @remotion skill and create a launch video to market this app and you want
to show off the booking page how people can book and also dashboard where host
can manage their bookings... and i want you to animate the buttons
```

### Phase 8 — Database & deploy (go live for free)
The video doesn't show exact prompts here — just ask your agent to guide you:
```
Guide me step by step to set up a Supabase database to store the user data,
then connect this project to GitHub and deploy it to Vercel for free.
```

### Run it locally any time
```bash
npm install
npm run dev
```
Open the link it prints (usually http://localhost:3000). 🎉 **That's Mitly.** Back up to GitHub as you go:
```bash
git init
git add .
git commit -m "Mitly — my first vibe-coded app"
```

> 💡 **Why two agents?** That's the whole trick of the video: **Claude Design** produces a beautiful UI in one shot; **Codex** is better at wiring logic, OAuth, and testing in a real browser. Antigravity is built to run them in parallel — add its built-in Gemini agent as a third hand (e.g. to write tests) and you're orchestrating three agents at once.

---

## ✅ Pre-flight checklist — "am I ready?"

Open a fresh terminal and run these. **Every line should print a version or succeed:**

```bash
brew --version
git --version
node --version
npm --version
python3 --version
claude --version
codex --version
```

Then confirm in Antigravity:
- [ ] Antigravity opens and you're signed in with Google (Agent Manager visible)
- [ ] `claude` runs in the integrated terminal and you're logged in
- [ ] `codex` runs in the integrated terminal and you're logged in
- [ ] `/plugin` in Claude Code lists **superpowers** as installed
- [ ] Your project has `CLAUDE.md`, `AGENTS.md`, `docs/BACKLOG.md`, `docs/CODE-HANDOFF.md`
- [ ] You built and ran one app

**All green? You're a vibe coder.** 🚀

---

## 🌱 What this grows into

You started lite. As projects get serious, this baseline expands — this is what a mature setup (like a real commercial codebase) adds:

| You have now | It grows into |
|---|---|
| `CLAUDE.md` | Same file, plus an `AGENTS.md` standard + per-folder context |
| `docs/BACKLOG.md` | Sectioned backlog (Doing / Up Next / Deferred / Done) as the *only* to-do source |
| `docs/CODE-HANDOFF.md` | An append-only log so multiple sessions hand off cleanly |
| One AI session | **"Lanes"** — 2–4 agents working different areas without clobbering each other (Antigravity makes this natural) |
| Manual testing | A UAT system: test plans, charters, automated checks |
| Superpowers | The same skills, used as rigorous plan→test→review discipline on every feature |

Don't add these on day one. Add each one *when you feel its absence.*

---

## 🆘 Troubleshooting

| Symptom | Fix |
|---|---|
| `command not found: git/node/python3` | Close **all** terminals and open a new one (PATH updates only apply to new terminals). On Apple Silicon, make sure you ran the two `echo … >> ~/.zprofile` lines Homebrew printed (Block 1.0). |
| `command not found: brew` | Homebrew isn't on your PATH. Re-run the two "Next steps" lines from the Homebrew installer, then reopen Terminal. |
| Antigravity "can't be opened" / unidentified developer | Right-click the app → **Open** → **Open** again. Or **System Settings → Privacy & Security → Open Anyway**. Make sure you downloaded from https://antigravity.google. |
| Wrong Antigravity build (slow/won't launch) | Download the build that matches your chip: **Apple Silicon** for M1–M4, **Intel** for older Macs. Check yours via  → **About This Mac**. |
| Claude Code / Codex won't log in | Make sure you have an *active paid subscription*. Run `claude` / `codex` again; allow the browser pop-up. |
| `npm install -g` permission error (`EACCES`) | Don't use `sudo`. Instead set a user-owned global folder: `mkdir ~/.npm-global && npm config set prefix ~/.npm-global`, then add `export PATH=~/.npm-global/bin:$PATH` to `~/.zprofile` and reopen Terminal. |
| `python` not found | On macOS the command is **`python3`** (and `pip3`). Use those. |
| Claude/Codex extension not in Antigravity's Extensions panel | Expected — Antigravity uses Open VSX, which may not carry them. Use the terminal CLI (`claude` / `codex`) instead; it's the full agent. |
| App won't start (`npm run dev` errors) | Paste the *entire* error into your agent and ask it to fix it. That's literally the workflow. |

---

## 🪐 Optional: prefer plain VS Code instead?

If you'd rather use standard **VS Code** (more third-party extensions, the official Claude Code + Codex *graphical* extensions, more beginner tutorials online), it's a drop-in swap:

1. Install it: `brew install --cask visual-studio-code` (or https://code.visualstudio.com).
2. Everything else in this guide is identical — same terminal commands, same `claude` / `codex` CLIs, same skills, same file structure.
3. In VS Code the graphical extensions *are* available: Extensions panel → search **Claude Code** (by Anthropic) and **Codex** (by OpenAI) → Install. You then get the ✱ spark icon and inline diff buttons.

You can even run both: keep VS Code for the polished extensions and Antigravity for parallel multi-agent runs. They don't conflict.

---

## 📚 Sources & further reading

- Google Antigravity — https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/ · https://antigravity.google
- Homebrew (macOS package manager) — https://brew.sh
- Claude Code setup — https://www.explainx.ai/blog/claude-code-vscode-ide-extension-setup-guide-2026
- Superpowers — https://github.com/obra/superpowers · https://github.com/obra/superpowers-marketplace
- Codex IDE & CLI — https://developers.openai.com/codex/ide · https://developers.openai.com/codex/cli
- Karpathy skills — https://github.com/forrestchang/andrej-karpathy-skills
- Frontend Design (Claude Design) — https://claude.com/plugins/frontend-design
- Open Design — https://github.com/nexu-io/open-design

---

*Built as a beginner baseline for end-to-end vibe coding in Google Antigravity on macOS (VS Code optional). Start lite, ship something, grow the structure when you feel its absence.*
