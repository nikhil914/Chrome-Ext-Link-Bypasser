Bypass Ads for below website

       "https://nanotech.org.in/*",
        "https://softspoker.co.in/*",
        "https://audioverse.org.in/*",
        "https://linkshortx.in/"
        "https://dragontales.lat/*",
        "https://hindisink.com/*"

skip the waiting time
https://linkshortx.in/RvGxHZvJ
## LinkShortX flow (v1.5)
linkshortx.in -> hindisink.com "Step 1..N of N" -> linkshortx.in "Get Link" -> telegram.me

Rules measured on the live site:
- Step 1 can be submitted instantly.
- Steps 2+ are rejected by the server if submitted less than 9 s after the page loads (8 s rejected, 9 s accepted) (you land on a plain
  article with no step form). Speeding up the page timer does not help; the server checks real time.
- A rejected step can be recovered by re-posting the same token a few seconds later.

What the extension does:
- Step 1: submits instantly.
- Every later step (any number of steps): submits the hidden next-step form after ~9.2 s (the server minimum) (badge top-right shows the countdown).
  No clicking Verify/Continue needed.
- If a step is still rejected: re-posts its saved token every 1.5 s (up to 6x) and adds 0.5 s to the wait for future runs.
- Final linkshortx.in page: opens the Get Link URL (telegram.me) as soon as it unlocks.
