// background.js
// Empty or use for additional tasks if neededlet isEnabled = false;

chrome.action.onClicked.addListener((tab) => {
    isEnabled = !isEnabled;

    // Update the icon based on the enabled state
    chrome.action.setIcon({
        path: isEnabled ? "enabled_icon.png" : "disabled_icon.png"
    });

    // Inform the content script about the change
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: toggleAutomation,
        args: [isEnabled]
    });
});

// This function will be injected into the page
function toggleAutomation(isEnabled) {
    if (isEnabled) {
        startAutomationProcess(); // This function will be defined in content.js
    } else {
        // Stop the automation, implement a way to halt the process if needed
        console.log('Automation disabled');
    }
}
