Bypass Ads for below website

       "https://nanotech.org.in/*",
        "https://softspoker.co.in/*",
        "https://audioverse.org.in/*",
        "https://linkshortx.in/"
        "https://dragontales.lat/*",
        "https://hindisink.com/*"

skip the waiting time
https://linkshortx.in/RvGxHZvJ
## LinkShortX flow (v1.4)
linkshortx.in -> hindisink.com "Step 1..N of N" -> linkshortx.in "Get Link" -> telegram.me

Rules measured on the live site:
- Step 1 can be submitted instantly.
- Steps 2+ are rejected by the server if submitted less than ~10 s after the page loads (you land on a plain
  article with no step form). Speeding up the page timer does not help; the server checks real time.
- A rejected step can be recovered by re-posting the same token a few seconds later.

What the extension does:
- Step 1: submits instantly.
- Every later step (any number of steps): submits the hidden next-step form after 11 s (badge top-right shows the countdown).
  No clicking Verify/Continue needed.
- If a step is still rejected: re-posts its saved token after 6 s and adds 4 s to the wait for future runs (max 30 s).
- Final linkshortx.in page: opens the Get Link URL (telegram.me) as soon as it unlocks.
