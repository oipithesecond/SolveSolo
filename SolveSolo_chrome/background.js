const AI_DOMAINS = [
  "chatgpt.com", "claude.ai", "gemini.google.com", 
  "deepseek.com", "perplexity.ai", "copilot.microsoft.com", 
  "qwen.ai", "mistral.ai", "meta.ai", "grok.com", "ai.baidu.com"
];

const CODING_DOMAINS = ["leetcode.com", "geeksforgeeks.org"];

let penaltyLock = false;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
      checkFocusMode(tabId, tab.url);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "APPLY_PENALTY") {
      applyPenalty();
  }
});

function checkFocusMode(tabId, url) {
  if (penaltyLock) return;

  chrome.storage.local.get(['unlockTime', 'blockDuration', 'blockYoutube'], (data) => {
      const now = Date.now();
      const unlockTime = data.unlockTime || 0;
      const isFocusActive = now < unlockTime;

      if (isFocusActive) {
          handleActiveSession(tabId, url, data.blockYoutube);
      } else {
          handleIdleSession(url, data.blockDuration);
      }
  });
}

function handleActiveSession(tabId, url, blockYoutube) {
  const isAiSite = AI_DOMAINS.some(domain => url.includes(domain));
  const isYoutube = url.includes("youtube.com");

  if (isAiSite) {
      chrome.tabs.update(tabId, { url: chrome.runtime.getURL("Blocked/blocked.html") });
  } else if (isYoutube && blockYoutube) {
      chrome.tabs.update(tabId, { url: chrome.runtime.getURL("Youtube/youtube-blocked.html") });
  }
}

function handleIdleSession(url, savedDuration) {
  const isCodingSite = CODING_DOMAINS.some(domain => url.includes(domain));
  
  const isProblemPage = url.includes("/problems/") || url.includes("/problem-of-the-day/");

  if (isCodingSite && isProblemPage) {
      const duration = savedDuration || 20;
      const newUnlockTime = Date.now() + (duration * 60 * 1000);
      
      chrome.storage.local.set({ 
          unlockTime: newUnlockTime,
          penaltyMode: false 
      });
  }
}

function applyPenalty() {
  penaltyLock = true;
  
  chrome.storage.local.get(['unlockTime', 'penaltyDuration'], (data) => {
      const now = Date.now();
      const penaltyMins = data.penaltyDuration !== undefined ? data.penaltyDuration : 5;
      
      let currentUnlock = data.unlockTime || 0;
      if (currentUnlock < now) {
          currentUnlock = now;
      }

      const newUnlock = currentUnlock + (penaltyMins * 60 * 1000);

      chrome.storage.local.set({
          unlockTime: newUnlock,
          penaltyMode: true
      }, () => {
          setTimeout(() => {
              penaltyLock = false;
          }, 2000);
      });
  });
}