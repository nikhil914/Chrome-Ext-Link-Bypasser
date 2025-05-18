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

// Start the automation process
startAutomationProcess();
