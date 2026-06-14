# FastCal

A calorie tracker for entrepreneurs who don't have time to log food.
**Open it → snap your meal → done.** Calories, macros, and your daily status update automatically.

## Run locally

No build step, no install. Just open the file:

```bash
open index.html
```

Or serve it over `http://` (better for the camera/photo picker):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What it does

- **Snap a meal** — take/pick a photo and get an instant food + calorie + macro estimate, with a portion slider to fine-tune.
- **One-tap re-log** — favorites you eat often log in a single tap, no photo needed.
- **Everything on one screen** — daily status, snap button, and today's meals all on Home.
- **Smart daily summary** — a one-line "on track / X cals left, hit your protein" nudge.
- **Goal & calorie budget** — quick setup (stats + goal weight + target date) calculates your daily budget.
- **Diary** — every meal grouped by day.
- **Weight tracking** — log weight and see your trend toward goal.

## Files

- `index.html` — all screens (home, diary, weight, setup, snap modal, onboarding)
- `styles.css` — the dark, mobile-first theme
- `app.js` — all logic (vanilla JS, no dependencies)

## Notes

- **Photo recognition is simulated** in this build: snapping returns a realistic sample meal from a built-in food list. The code is structured so a real Claude vision call can drop into one function (`analyzePhoto()` in `app.js`) later, without touching the UI.
- All data is stored locally in your browser (`localStorage`) — no account, no server, nothing leaves your device.
- Calorie budget uses the Mifflin–St Jeor formula (BMR → TDEE → safe deficit toward your target date).
