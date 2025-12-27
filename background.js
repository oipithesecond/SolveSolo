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

//if a url contains any of the domains
const matches = (url, domains) => domains.some(domain => url.includes(domain));

//listener runs whenever a tab updates
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    //only run if the URL has changed or the page finished loading
    if (!tab.url) return;

    //check for trigger
    if (matches(tab.url, TRIGGER_DOMAINS)) {
        //get block duration from storage
        const settings = await browser.storage.local.get("blockDuration");
        const durationMinutes = settings.blockDuration || 20; 
        
        const targetTime = Date.now() + (durationMinutes * 60 * 1000);
        
        //save the unlock time to storage
        const currentData = await browser.storage.local.get("unlockTime");
        if (!currentData.unlockTime || targetTime > currentData.unlockTime) {
            await browser.storage.local.set({ unlockTime: targetTime });
            console.log(`Focus Mode: Blocked for ${durationMinutes} mins`);
        }
    }

    //check for AI sites
    if (matches(tab.url, AI_DOMAINS)) {
        //retrieve the stored unlock time
        const data = await browser.storage.local.get("unlockTime");
        const unlockTime = data.unlockTime || 0;

        if (Date.now() < unlockTime) {
            //if current time is before unlock time, block access
            console.log("AI Access Denied.");
            browser.tabs.update(tabId, { url: browser.runtime.getURL("blocked.html") });
        }
    }
});