# Organic Content Modules

Eight training modules for our firms on organic content, plus a standalone 30-Day Post Plan. They match the worksheets in Cormac's TAB classroom on Skool. Every module runs in the same order:

1. Navy cover with a mint glow.
2. **The BIG Problems**: three numbered problems on blue text pages.
3. **The Opportunity**: three matching opportunities on white text pages. The text pages look like an Instagram text post: flat linen texture, uppercase text, "magnify growth." at the bottom.
4. Boards: blue-square heading and a white framed diagram you draw over.
5. Exercises with a timer badge ("10 Minutes").
6. **Next...** (takeaways, actions, checklist), then a dotted **Notes** page.

## What's here

| Folder | What it is |
|---|---|
| `pdf/blank/` | **The workbooks you film over.** Import one into GoodNotes or Notability on the iPad and draw on the faint guides while you teach. |
| `pdf/filled/` | The same decks with the annotations already drawn in, in marker colours. Use these as your cheat sheet for what each board should look like by the end. You can also send them to clients as the "filled" copy. |
| `guides/` | One presenter guide per module: what to **say** and what to **draw** on every slide. |
| `30-Day-Post-Plan.csv` | The 13-post plan in the same columns as our client content calendars (plus post time, script beats, caption and the real example), ready to import into Google Sheets. |
| `src/` | Source. Edit content here and rebuild. |

## The modules

| # | Module | What the firm walks away with |
|---|---|---|
| 1 | Why Organic Content Wins | The Trust Gap, why content compounds and referrals don't, and their starting point |
| 2 | The Content Funnel | TOFU / MOFU / BOFU, the weekly mix, and topics mapped to each stage |
| 3 | The Organic Content Pillars | Cormac's four-pillar wheel (Connection, Value, Proof, Invitation) built out for law firms with post ideas and opening lines, collab / series / news / podcast ideas, the Outlier Method, the three rules (be different, one post a day, weekly review), and a 30-day calendar with one post a day (also in `30-Day-Pillar-Calendar.csv`) |
| 4 | Hooks and Scripts | Anatomy of a video, the 3 hook layers, 8 structures for firms, and a Claude script prompt |
| 5 | Filming Day | One day = one month, the set, start vs upgrade gear, the run sheet, and a shot list |
| 6 | Editing with Claude | The Claude edit pipeline (transcribe, selects, cut, captions, resize, export), the 3 prompts, and the edit spec |
| 7 | Posting with Claude | One video in six places, the caption formula, Claude as social media manager, weekly rhythm, and scorecard |
| 8 | Your 30-Day Post Plan | Walks through the client hand-out: the weekly schedule, the 30-day calendar, a post page, and the Day 30 review |
| - | 30-Day Post Plan (standalone) | The client hand-out: "your next 30 days are planned for you." A weekly time-blocked schedule, a 30-day calendar with one job per day, and a page per post (hook, beats, CTA, on-screen text, caption, law and finance versions, and a real lawyer Short in the same format with its views). Plus a tracker and the Day 30 review. |

The plan is 13 posts (Tue / Thu / Sun): 6 TOFU, 3 MOFU, 4 BOFU, matching the mix taught in Module 2.

## On Skool

Set it up like the TAB classroom: each lesson is the video plus a Resources list with the workbook PDF, named "[Lesson] Wrksht".

- **1.0 Watch This First!** Why Organic Content Wins · The Content Funnel
- **2.0 Plan Your Content:** The Organic Content Pillars · Hooks and Scripts
- **3.0 Make Your Content:** Filming Day · Editing with Claude
- **4.0 Post and Grow:** Posting with Claude · Your 30-Day Post Plan (add the standalone 30-Day Post Plan PDF and the CSV as extra resources)

The "Seen it work" view counts on the post pages were read from YouTube on 26 Oct 2026. Re-check them before quoting them to a client (`src/plan.js`, `EXAMPLES`).

## Filming it

1. Open `pdf/blank/Module-0X-....pdf` on the iPad.
2. Keep `pdf/filled/` and `guides/Module-0X-....md` open on a second screen.
3. Record the iPad screen with yourself on camera, and draw over each board as you talk.

## Changing the design or content

- **Branding:** colours are the `:root` tokens at the top of `src/styles.css`. The wordmark and program name are in `src/brand.js`. Change them and rebuild, and every module updates.
- **Content:** each module is one file in `src/modules/`. The 30-day plan data is `src/plan.js` (it feeds Module 8, the standalone PDF and the CSV).
- **Rebuild:** `npm install --no-save playwright`, then `npm run build`. It uses Playwright's Chromium if installed, otherwise your Chrome. `npm run preview` also writes PNGs of every filled slide to `previews/`. `node src/build.js 3` builds one module (`30` for the standalone plan).
