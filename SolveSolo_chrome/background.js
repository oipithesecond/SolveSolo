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
    "copilot.microsoft.com",
    "qwen.ai",
    "mistral.ai",
    "meta.ai",
    "grok.com",
    "ai.baidu.com"
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

        //set penaltyMode to false for a normal session
        chrome.storage.local.set({ 
            unlockTime: unlockTime,
            penaltyMode: false 
        });

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

//time penalty handler
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "TEST_CASE_FAILED") {
        chrome.storage.local.get(["unlockTime", "penaltyMode", "penaltyDuration"], (data) => {
            const now = Date.now();
            const isTimerRunning = data.unlockTime && data.unlockTime > now;

            //run if the timer is off
            if (!isTimerRunning) {
                console.log("Timer finished. Wrong Answer detected. Starting Penalty...");
                const penaltyMinutes = (data.penaltyDuration !== undefined) ? data.penaltyDuration : 5;
                
                if (penaltyMinutes > 0) {
                    const penaltyTime = now + (penaltyMinutes * 60 * 1000);
                    
                    chrome.storage.local.set({
                        unlockTime: penaltyTime,
                        penaltyMode: true 
                    });
                    console.log(`Starting Penalty: ${penaltyMinutes} mins`);
                }
            }
        });
    }
});