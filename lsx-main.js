// Runs in the PAGE's own JS world at document_start on the LinkShortX step pages
// (hindisink.com), before the site's scripts. The step timers live in a closure,
// so they can't be edited from the content script; instead we change what the
// page's code sees:
//  1. The tab always looks visible. The site pauses its countdown whenever the
//     tab is hidden ("if(!visible)return"), which froze the flow after Verify
//     if you switched tabs.
//  2. The countdown ticks (1400 ms and 1000 ms intervals) run at 30 ms, so even
//     the click-through fallback finishes in ~2 seconds.
(function () {
    'use strict';
    try {
        Object.defineProperty(Document.prototype, 'visibilityState', { get: () => 'visible', configurable: true });
        Object.defineProperty(Document.prototype, 'hidden', { get: () => false, configurable: true });
    } catch (e) {}

    // Swallow visibilitychange so the page's listener never flips to "hidden".
    const block = e => e.stopImmediatePropagation();
    document.addEventListener('visibilitychange', block, true);
    window.addEventListener('visibilitychange', block, true);

    const FAST = 30;
    const TIMER_DELAYS = new Set([1000, 1400]);
    const origSetInterval = window.setInterval;
    window.setInterval = function (fn, delay, ...rest) {
        if (TIMER_DELAYS.has(Number(delay))) delay = FAST;
        return origSetInterval.call(this, fn, delay, ...rest);
    };
})();
