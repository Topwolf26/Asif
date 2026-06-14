# Session Handoff — Full Chat Export

**Date:** 2026-06-14
**Working directory:** `AI SESSION WITH UNCLE SHAZ`
**Agent:** Claude Code (Opus 4.8) with the Superpowers skill set
**Outcome:** Built two vibe-coded apps — **FastCal** and **MyFattyPal** — both no-build, vanilla HTML/CSS/JS, data in `localStorage`.

---

## 1. What we set out to do

Starting from the **Vibe Coding Starter Guide** (`VIBE-CODING-STARTER-GUIDE.md`) and an existing first app (`mitly/`, a Calendly clone), the goal was to build a **better MyFitnessPal** — specifically:

> "Make MyFitnessPal a bit better for entrepreneurs looking to lose weight. It needs to be aligned with time-saving — the problem with MyFitnessPal is everyone logs by themselves and wastes a lot of time. You should just be able to take a picture and track the meal straight away."

We followed the **brainstorming → design → build** discipline (Superpowers), using the **visual companion** (a local browser tool) to compare screen layouts.

---

## 2. Brainstorming decisions (chronological)

The design was settled through a few one-at-a-time questions:

1. **Photo-to-meal recognition — how real for v1?**
   → **Fake it first (demo).** Build the full snap-a-photo flow + UI, but return realistic *canned* results. Keep it a simple no-build app like Mitly. Structure the code so a real Claude vision API call can drop in later.

2. **Which features in v1?** (core photo-log + calorie dashboard already in)
   → **All four:** Goal & calorie-budget setup · Macros (protein/carbs/fat) · Daily food diary/history · Weight tracking + trend.

3. **Time-saving touches for the busy-entrepreneur angle?**
   → **All four:** One-tap re-log favorites · Everything on one screen · Smart daily summary · Quick-edit AI guesses (portion slider).

4. **Main-screen layout** (shown as phone mockups in the visual companion):
   - A · Ring-first · B · Action-first · C · Budget-bar
   → **B · Action-first** chosen (giant "Snap a meal" button up top — most on-brand for "open it, snap, done").

The user then said **"just build it"**, so we proceeded directly to implementation (skipping the formal written-spec review gate, per the user's explicit instruction — user instructions take precedence).

---

## 3. App #1 — FastCal (`fastcal/`)

A calorie tracker for **entrepreneurs cutting weight**. Promise: *open it → snap → done.*

**Files:** `index.html`, `styles.css`, `app.js`, `README.md`
**Theme:** Dark, green accent (#34d399). Mobile-first, max-width 460px.

**Features built:**
- Onboarding: stats + goal weight + target date → daily calorie **budget** (Mifflin–St Jeor BMR → TDEE → safe **deficit**, capped at ~1,000 cal/day, floored at 1,200/1,500).
- Home (Layout B): smart status nudge, giant Snap button, one-tap favorites row, left/protein/weight stat strip, today's meals.
- Snap & confirm flow: photo → simulated "analyzing…" → AI guess (name + calories + macros) → **portion slider** → add.
- Diary (meals grouped by day) and Weight tracking (log + SVG trend chart toward goal).
- All data in `localStorage`. Simulated recognition isolated in `analyzePhoto()`.

**Run:** `cd fastcal && open index.html` (or `python3 -m http.server 8000` for the camera).

---

## 4. Pivot — App #2 — MyFattyPal (`myfattypal/`)

User then asked: **"do exactly like MyFitnessPal but call it MyFattyPal and make it for people bulking."**

So MyFattyPal is a **faithful MyFitnessPal clone tuned for bulking (calorie surplus)**.

**Files:** `index.html`, `styles.css`, `app.js`, `logo.svg`, `README.md`
**Theme:** Light, MyFitnessPal blue (#1875ff), colored macro rings (Carbs teal / Fat purple / Protein orange).

**Features built (MFP-faithful):**
- **Dashboard:** the classic calorie ring (calories *remaining to eat*) + *Goal − Food + Exercise = Remaining* breakdown + three macro rings.
- **Diary:** Breakfast / Lunch / Dinner / Snacks sections + Exercise, with **‹ › day navigation** and a running Remaining total.
- **Add Food** (blue ＋ in the center tab): pick meal → search food list, one-tap favorites, or **Snap a meal** (simulated AI) with portion slider.
- **Add Exercise:** quick-pick or custom; burned calories add back to the goal.
- **Progress:** weight log + trend chart climbing toward a *higher* goal.
- **Bulking math:** goal weight > current; daily **surplus** (TDEE + surplus, capped ~600 cal/day for a lean bulk); protein at **1 g/lb**; macro split derived from the budget. Nudges say "eat X more to hit your bulk 💪" instead of "stay under."

**Logo:** Added a friendly **chubby-guy mascot** (`logo.svg`) — blue shirt, rosy cheeks, double chin, big smile. Shown on onboarding (large), the dashboard app bar (small), and as the browser favicon.

**Run:** `cd myfattypal && open index.html` (or `python3 -m http.server 8000`).

---

## 5. Bugs found & fixed

- **Phantom "blur" over the whole app.** The CSS rule `.overlay { display:flex }` (a class selector) was *overriding* the HTML `hidden` attribute (whose default `[hidden]{display:none}` has lower specificity). Result: the onboarding overlay *and* the empty photo-modal overlay stayed on screen permanently as dim, frosted glass layers — so the app looked permanently out of focus.
  **Fix:** added `.overlay[hidden]{display:none}` (specificity beats `.overlay`). Applied in both apps.
- Also reduced the backdrop blur and centered the modal on taller (desktop) windows so it reads as an intentional card, not a blurred page.

---

## 6. Verification done

- `node --check app.js` passed for both apps.
- Cross-checked that **every element ID referenced in `app.js` exists in `index.html`** (no typos) for both apps.
- `logo.svg` validated as well-formed XML.
- Apps opened in the browser for manual review.

> Note: verification was static + manual-open. No automated end-to-end/browser-driven test was run. A logical next step is to click through each flow (onboarding → add food → snap → exercise → day nav → weight) in the browser.

---

## 7. Architecture notes (both apps)

- **No build step, no dependencies, no server.** Three files + (MyFattyPal) one SVG.
- **Persistence:** `localStorage` under keys `fastcal.v1` / `myfattypal.v1`. Nothing leaves the device.
- **Simulated AI:** `analyzePhoto()` returns a `Promise` resolving to a canned food after ~1.4s. **To make it real:** replace that function's body with a call to Claude's vision API (send the photo data URL, ask for `{name, cal, p, c, f}` JSON). The UI does not need to change.
- **Calorie math:** Mifflin–St Jeor BMR × activity = TDEE; FastCal subtracts a capped deficit, MyFattyPal adds a capped surplus.

---

## 8. Current repo state

- **Remote:** `https://github.com/Topwolf26/Asif.git` · **branch:** `main`
- **Added this session:** `fastcal/`, `myfattypal/`, `.gitignore`, `SESSION-HANDOFF.md` (this file). `mitly/` (prior app) and `Myfattypal.code-workspace` also committed.
- `.superpowers/` (visual-companion scratch files) is **gitignored** — intentionally not committed.

---

## 9. Suggested next steps

1. **Manual browser pass** of every flow in both apps.
2. **Swap in real photo recognition** via `analyzePhoto()` + an Anthropic API key (keep the key in `.env`, never in code — already gitignored).
3. Pick **one** app to take forward (FastCal = cutting, MyFattyPal = bulking) rather than maintaining both.
4. Optional: add barcode entry, a bigger food database, and real serving sizes for closer MFP parity.
5. Optional: deploy free (e.g. GitHub Pages — these are static sites, so it's drag-and-drop).
