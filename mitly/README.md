# Mitly

A simple Calendly-style meeting booking page. Pick a date, pick a time, enter your details, done.

## Run locally

No build step, no install. Just open the file:

```bash
open index.html
```

Or, to serve it over `http://` (some browsers prefer this):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html` — page structure (host details, calendar, time slots, booking form)
- `styles.css` — all styling
- `app.js` — calendar + booking logic (vanilla JS, no dependencies)

## Notes

- Availability is sample data in `app.js` (`TIME_SLOTS`). Weekends and past dates are disabled.
- Booking is front-end only right now — nothing is saved yet. Persistence, a host dashboard, and Google Calendar come later.
