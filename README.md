Bypass Ads for below website

       "https://nanotech.org.in/*",
        "https://softspoker.co.in/*",
        "https://audioverse.org.in/*",
        "https://linkshortx.in/"
        "https://dragontales.lat/*",
        "https://hindisink.com/*"

skip the waiting time
https://linkshortx.in/RvGxHZvJ
## LinkShortX flow (v1.1)
linkshortx.in now sends you through 4 "Step X of 4" pages on hindisink.com before the final "Get Link" page.
Each step page already contains the next-step form, so the extension submits it instantly (no 15–20s timer,
no 5s hold). If a step page ever comes back (server rejected the skip), it falls back to clicking
Verify → Continue → Next automatically. On the final linkshortx.in page it opens the Get Link URL as soon as it unlocks.

### v1.2 fixes
- Fixed "stuck after Click here to verify": the site pauses its countdown whenever the tab is not visible.
  `lsx-main.js` now runs in the page before the site's scripts, keeps the tab looking visible and runs the
  step timers at 30 ms, so even a manual/fallback click-through finishes in ~2 s.
- Fixed the skip guard turning itself off after a few links (step 1 is always `/` and step articles repeat).
- Fallback click-through no longer gives up after a fixed time.
