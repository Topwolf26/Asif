# MyFattyPal

A MyFitnessPal-style calorie tracker built for **bulking**. Same familiar layout —
the *Goal − Food + Exercise = Remaining* dashboard, macro rings, and a meal-by-meal
diary — but tuned to help you hit a calorie **surplus** and put on size.

## Run locally

No build step, no install:

```bash
open index.html
```

Or serve over `http://` (better for the camera/photo picker):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What it does

- **Dashboard** — the classic MyFitnessPal calorie ring (calories *remaining to eat*),
  Base Goal / Food / Exercise breakdown, and Carbs / Fat / Protein macro rings.
- **Diary** — Breakfast / Lunch / Dinner / Snacks sections plus Exercise, with day-by-day
  navigation (‹ ›) and a running Remaining total.
- **Add food** — search a food list, one-tap add favorites, or **Snap a meal** to get an
  AI calorie/macro estimate with a portion slider.
- **Add exercise** — quick-pick or custom; burned calories add back to your daily goal.
- **Progress** — log your weight and watch the trend climb toward your goal.
- **Bulk plan** — onboarding (stats + goal weight + target date) computes a safe daily
  surplus (Mifflin–St Jeor TDEE + capped surplus) and macro targets (1 g protein/lb).

## Files

- `index.html` — all screens (dashboard, diary, progress, more, add-food/snap/exercise modals, onboarding)
- `styles.css` — the light, MyFitnessPal-style theme (blue + colored macro rings)
- `app.js` — all logic (vanilla JS, no dependencies)

## Notes

- **Photo recognition is simulated** in this build: snapping returns a realistic sample meal.
  The code is structured so a real Claude vision call drops into one function
  (`analyzePhoto()` in `app.js`) later, without touching the UI.
- All data is stored locally in your browser (`localStorage`) — no account, no server.
- Bulking math caps the surplus at ~600 cal/day (lean-bulk pace) so it stays realistic.
