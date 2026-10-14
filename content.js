// =====================================================================
// LinkShortX flow (2026-10): linkshortx.in -> hindisink.com "Step 1..4 of 4"
// pages -> back to linkshortx.in "Get Link" page.
//
// Each hindisink step page already contains the next-step form
// (<form id="fwd" method="post"> with a hidden token). The countdown and
// "Continue" buttons are purely client-side, and the server accepts the form
// right away, so we submit it immediately. If the same step page comes back
// (server rejected the skip), we fall back to clicking through the buttons.
// =====================================================================
(function linkShortXFlow() {
    const TAG = '[Bypasser:LinkShortX]';
    const log = (...a) => console.log(TAG, ...a);

    function poll(test, every, maxTries, onHit) {
        let n = 0;
        const iv = setInterval(() => {
            n++;
            let r = false;
            try { r = test(); } catch (e) {}
            if (r) { clearInterval(iv); onHit && onHit(r); }
            else if (n >= maxTries) clearInterval(iv);
        }, every);
    }
    const isShown = el => !!el && !el.classList.contains('x') && el.offsetParent !== null;

    // ---- Step pages (hindisink.com and any mirror using the same template) ----
    function handleStepPage() {
        const form = document.getElementById('fwd');
        const isStepTemplate = form && form.method.toLowerCase() === 'post' &&
            document.getElementById('pDone') && document.getElementById('go');
        if (!isStepTemplate) return false;

        // Loop guard: only treat it as "skip rejected" if this same step came back
        // within a few seconds of us submitting it. (Keying on URL alone broke:
        // step 1 is always "/" and step articles repeat between links, so old
        // counts piled up and disabled the skip.)
        const KEY = 'lsx_last_skip';
        const step = document.title;
        let last = null;
        try { last = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) {}
        const recent = last && last.step === step && (Date.now() - last.at) < 15000;
        const tries = recent ? last.tries : 0;

        if (tries < 2) {
            sessionStorage.setItem(KEY, JSON.stringify({ step, at: Date.now(), tries: tries + 1 }));
            log('Skipping step instantly:', step);
            // .call() so a field named "submit" can never shadow the method
            HTMLFormElement.prototype.submit.call(form);
            return true;
        }

        // Fallback: the server didn't accept the skip — click through normally.
        // (lsx-main.js keeps the page "visible" and speeds its timers up.)
        sessionStorage.removeItem(KEY);
        log('Instant skip rejected, clicking through:', step);
        const go = document.getElementById('go');
        poll(() => !go.disabled && isShown(go) && go, 300, Infinity, b => { b.click(); log('Clicked verify'); });
        poll(() => { const c = document.getElementById('pCont'); return isShown(c) && c.querySelector('button:not([disabled])'); },
            300, Infinity, b => { b.click(); log('Clicked Continue'); });
        poll(() => { const d = document.getElementById('pDone'); return isShown(d) && d.querySelector('button[type=submit],#final'); },
            300, Infinity, b => { b.click(); log('Clicked next step'); });
        return true;
    }

    // ---- Final linkshortx.in page (AdLinkFly "Get Link") ----
    function handleGetLinkPage() {
        if (!document.querySelector('a.get-link') && !document.getElementById('go-link')) return false;
        log('Waiting for Get Link to unlock...');
        poll(() => {
            const a = document.querySelector('a.get-link');
            if (!a || /(^|\s)disabled(\s|$)/.test(a.className)) return false;
            const href = a.getAttribute('href') || '';
            if (!href || href === '#' || href.startsWith('javascript')) return false;
            return a.href;
        }, 300, 400, url => { log('Opening', url); location.href = url; });
        return true;
    }

    window.__lsxHandled = handleStepPage() || handleGetLinkPage();
})();

// Function to find and click a button by its text content
function clickButtonByText(buttonText) {
    var buttons = Array.from(document.querySelectorAll('button'));
    var button = buttons.find(btn => btn.textContent.trim() === buttonText);
    if (button) {
        button.scrollIntoView(); // Ensure the button is in view
        button.click();
        return true;
    }
    return false;
}

// Function to find and invoke the startTimer function with a numerical suffix
function runStartTimerFunctions() {
    // Loop through potential function names from startTimer1 to startTimer100
    for (let i = 1; i <= 100; i++) {
        let functionName = `startTimer${i}`;
        
        // Check if the function exists in the global window object
        if (typeof window[functionName] === 'function') {
            console.log(`Calling ${functionName}`); // For debugging
            window[functionName](); // Call the function
        }
    }
}

// Function to handle button clicks as soon as the button becomes visible
function clickButtonWhenVisible(buttonText) {
       console.log('clickButtonWhenVisible '+ buttonText);

    var checkInterval = setInterval(function() {
        if (clickButtonByText(buttonText)) {
                   console.log('clickButtonWhenVisible clickButtonByText *********** '+ buttonText);

            clearInterval(checkInterval); // Stop checking once the button is clicked
        }
    }, 1000); // Check every second for the button to become visible
}

// Function to remove the timer element if necessary
function removeTimer() {
    var timer = document.getElementById('txt2'); // Update with the correct ID of the timer element
    if (timer) {
        timer.style.display = 'none'; // Hide the timer
        // Alternatively, you could remove it entirely from the DOM:
        timer.remove();
    }
}


// Function to find and click an element (button or div) by its text content
function clickElementByText(tag, text) {
    const elements = Array.from(document.querySelectorAll(tag));
    const el = elements.find(e => e.textContent.trim() === text);
    if (el) {
        el.scrollIntoView();
        el.click();
        console.log(`Clicked ${tag} with text: "${text}"`);
        return true;
    }
    return false;
}

// Function to handle clicks when an element becomes visible
function clickElementWhenVisible(tag, text) {
    console.log(`Waiting for ${tag} with text: "${text}"...`);
    const interval = setInterval(() => {
        if (clickElementByText(tag, text)) {
            clearInterval(interval);
            waitForRemoveTimer();
        }
    }, 1000);
}

 function clickElementByText(tag, text) {
        const elements = Array.from(document.querySelectorAll(tag));
        const el = elements.find(e => e.textContent.trim() === text);
        if (el) {
            el.scrollIntoView();
            el.click();
            console.log(`[Bypasser] Clicked ${tag} with text "${text}"`);
            return true;
        }
        removeTimer();
        return false;
    }


function waitForRemoveTimer(){
      setTimeout(() => {
        removeTimer();
        // Step 3: Try clicking final "Now-Continue" button
        const clickNowContinue = () => {
            const btn = document.getElementById('rtg-snp-btn');
            if (btn) {
                btn.scrollIntoView();
                btn.click();
                console.log('[Bypasser] Clicked final Now-Continue button');
            } else {
                setTimeout(clickNowContinue, 1000);
            }
        };
        clickNowContinue();
    }, 2000);
}    


// Start the process by running timer functions and clicking buttons as they become visible
function startAutomationProcess() {
    if (window.__lsxHandled) return; // LinkShortX pages have their own handler



    clickElementWhenVisible('div', 'Click here to verify');
    waitForRemoveTimer();
   clickElementWhenVisible('div', 'Now-Continue');
   clickElementWhenVisible('div', 'Continue');


        console.log('Automation process started');

    // Run startTimer functions initially
    runStartTimerFunctions();
    
    // Click the initial button
    clickButtonWhenVisible('I Am Not Robot');
    
    // Click subsequent buttons as they become visible
    clickButtonWhenVisible('Dual Tap To "Go To Link"');
    clickButtonWhenVisible('Dual Tap "Go Link"');
    clickButtonWhenVisible('Dual Tap "Continue"');
    clickButtonWhenVisible('Dual Tap "Continue"');
    clickButtonWhenVisible('Open Continue..');
    clickButtonWhenVisible('Open Continue.');
    clickButtonWhenVisible('Open Continue');
    clickButtonWhenVisible('Open-Continue');
    clickButtonWhenVisible('Open-Continue.');
    clickButtonWhenVisible('Open-Continue..');
    clickButtonWhenVisible('Open-Continue...');
    clickButtonWhenVisible('Get Link');
    clickButtonWhenVisible('Dual Tap Verify');
    clickButtonWhenVisible('Click here to verify');
    clickButtonWhenVisible('Dual Tap "Go Link"'); // Include the new button here
}


function stopAutomationProcess() {
    console.log('Automation process stopped');
    // Implement your logic to stop any ongoing automation
}

// Start the automation process (legacy sites only)
if (!window.__lsxHandled) startAutomationProcess();
