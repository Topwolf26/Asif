# Organic Content Modules

Eight training modules for our firms on organic content, plus a standalone 30-Day Post Plan. They're laid out like Cormac's TAB / Agency Mentor workbooks: a navy cover with a mint glow, grey whiteboard boards with faint guide diagrams, dotted Notes pages, boxed worksheets, a "Next..." page (takeaways and checklist), and a closing cover.

## What's here

| Folder | What it is |
|---|---|
| `pdf/blank/` | **The workbooks you film over.** Import one into GoodNotes or Notability on the iPad and draw on the faint guides while you teach. |
| `pdf/filled/` | The same decks with the annotations already drawn in, in marker colours. Use these as your cheat sheet for what each board should look like by the end. You can also send them to clients as the "filled" copy. |
| `guides/` | One presenter guide per module: what to **say** and what to **draw** on every slide. |
| `30-Day-Post-Plan.csv` | The 13-post plan in the same columns as our client content calendars, ready to import into Google Sheets. |
| `src/` | Source. Edit content here and rebuild. |

## The modules

| # | Module | What the firm walks away with |
|---|---|---|
| 1 | Why Organic Content Wins | The Trust Gap, why content compounds and referrals don't, and their starting point |
| 2 | The Content Funnel | TOFU / MOFU / BOFU, the weekly mix, and topics mapped to each stage |
| 3 | Content Pillars and Ideas | 3 pillars, the Idea Machine, 30 ideas in 30 minutes, and the Outlier Method |
| 4 | Hooks and Scripts | Anatomy of a video, the 3 hook layers, 8 structures for firms, and a Claude script prompt |
| 5 | Filming Day | One day = one month, the set, start vs upgrade gear, the run sheet, and a shot list |
| 6 | Editing with Claude | The Claude edit pipeline (transcribe, selects, cut, captions, resize, export), the 3 prompts, and the edit spec |
| 7 | Posting with Claude | One video in six places, the caption formula, Claude as social media manager, weekly rhythm, and scorecard |
| 8 | Your 30-Day Post Plan | The 30-day arc and map, week by week, daily habits, and the Day 30 review |
| - | 30-Day Post Plan (standalone) | Every post with hook, structure, CTA, plus a law example and a finance example. Includes a tracker. |

The plan is 13 posts (Tue / Thu / Sun): 6 TOFU, 3 MOFU, 4 BOFU, matching the mix taught in Module 2.

## Filming it

1. Open `pdf/blank/Module-0X-....pdf` on the iPad.
2. Keep `pdf/filled/` and `guides/Module-0X-....md` open on a second screen.
3. Record the iPad screen with yourself on camera, and draw over each board as you talk.

## Changing the design or content

- **Branding:** colours are the `:root` tokens at the top of `src/styles.css`. The wordmark and program name are in `src/brand.js`. Change them and rebuild, and every module updates.
- **Content:** each module is one file in `src/modules/`. The 30-day plan data is `src/plan.js` (it feeds Module 8, the standalone PDF and the CSV).
- **Rebuild:** `npm run build` (needs Node and Playwright with Chromium). `npm run preview` also writes PNGs of every filled slide to `previews/`.
