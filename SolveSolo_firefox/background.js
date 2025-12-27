// Configuration
const TRIGGER_DOMAINS = ["leetcode.com", "geeksforgeeks.org"];
const AI_DOMAINS = [
    "chatgpt.com",
    "claude.ai",
    "gemini.google.com", 
    "deepseek.com",
    "perplexity.ai",
    "copilot.microsoft.com"
];

//listener for trigger Sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (TRIGGER_DOMAINS.some(d => tab.url.includes(d))) {
            activateFocusMode();
        }
    }
});

//blocker for AI sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && AI_DOMAINS.some(d => tab.url.includes(d))) {
        checkAndBlock(tabId);
    }
});

//activate focus mode
function activateFocusMode() {
    chrome.storage.local.get(["unlockTime"], (result) => {
        const now = Date.now();
        //if timer is already running and in the future, don't reset it
        if (result.unlockTime && result.unlockTime > now) {
            return; 
        }

        //set unlock time 20 mins from now
        const unlockTime = now + (20 * 60 * 1000);
        chrome.storage.local.set({ unlockTime: unlockTime });
        
        //create an alarm to clean up later
        chrome.alarms.create("focusTimer", { when: unlockTime });
        console.log("Focus Mode Activated.");
    });
}

//check if blocked
function checkAndBlock(tabId) {
    chrome.storage.local.get(["unlockTime"], (result) => {
        if (result.unlockTime && Date.now() < result.unlockTime) {
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
        }
    });
}