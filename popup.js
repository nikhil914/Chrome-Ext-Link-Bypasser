document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const statusText = document.getElementById('statusText');
    
    // Retrieve the current state of the automation from storage
    chrome.storage.local.get(['isEnabled'], (result) => {
        const isEnabled = result.isEnabled || false;
        updateUI(isEnabled);
    });

    // Add a click listener to the toggle button
    toggleButton.addEventListener('click', () => {
        chrome.storage.local.get(['isEnabled'], (result) => {
            const isEnabled = !result.isEnabled; // Toggle the state

            // Save the new state in storage
            chrome.storage.local.set({ isEnabled }, () => {
                // Update the UI based on the new state
                updateUI(isEnabled);

                // Notify the content script to enable/disable automation
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        function: toggleAutomation,
                        args: [isEnabled]
                    });
                });
            });
        });
    });

    // Function to update the UI based on the current state
    function updateUI(isEnabled) {
        toggleButton.textContent = isEnabled ? 'Disable Automation' : 'Enable Automation';
        statusText.textContent = `Status: ${isEnabled ? 'Enabled' : 'Disabled'}`;
    }
});

// Function that will be injected into the active tab to toggle automation
function toggleAutomation(isEnabled) {
    if (isEnabled) {
        startAutomationProcess(); // This function should be defined in content.js
    } else {
        console.log('Automation disabled'); // Implement your logic for stopping automation if needed
    }
}
