//config
const TRIGGER_DOMAINS = ["leetcode.com/problems",
                         "geeksforgeeks.org/problems",
                        ];
const AI_DOMAINS = [
    "chatgpt.com",
    "claude.ai",
    "gemini.google.com", 
    "deepseek.com",
    "perplexity.ai",
    "copilot.microsoft.com"
];
const YOUTUBE_DOMAIN = "youtube.com";

//listener for trigger Sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (TRIGGER_DOMAINS.some(d => tab.url.includes(d))) {
            activateTimer();
        }
    }
});

//blocker for AI sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url) {
        checkAndBlock(tabId, tab.url);
    }
});

//activate focus mode
function activateTimer() {
    chrome.storage.local.get(['unlockTime', 'blockDuration'], (data) => {
        const now = Date.now();
        //if timer is already running, don't overwrite it
        if (data.unlockTime && data.unlockTime > now) return;

        //use custom duration (default 20 mins)
        const minutes = data.blockDuration || 20;
        const unlockTime = now + (minutes * 60 * 1000);

        chrome.storage.local.set({ unlockTime: unlockTime });
        console.log(`Focus Mode: Blocked for ${minutes} mins`);
    });
}

//check if blocked
function checkAndBlock(tabId, url) {
    chrome.storage.local.get(['unlockTime', 'blockYoutube'], (data) => {
        const now = Date.now();
        const unlockTime = data.unlockTime || 0;

        //if time is up do nothing
        if (now > unlockTime) return;

        let shouldBlock = false;

        //AI checker
        if (AI_DOMAINS.some(d => url.includes(d))) {
            shouldBlock = true;
        }

        //youtube checker
        if (url.includes(YOUTUBE_DOMAIN) && data.blockYoutube) {
            shouldBlock = true;
        }

        if (shouldBlock) {
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked/blocked.html") });
        }
    });
}