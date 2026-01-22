let lastUrl = location.href; 
let isProcessingPenalty = false;

// Watch for DOM changes (helpful for Single Page Apps like LeetCode)
const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
    }
    detectFailure();
});

observer.observe(document, { subtree: true, childList: true });

function detectFailure() {
    if (isProcessingPenalty) return;

    // We search the body text for specific failure keywords.
    // In a production app, you might target specific classes (e.g., .result-status) 
    // to avoid false positives from the problem description text.
    const pageText = document.body.innerText;
    
    const failureKeywords = [
        "Wrong Answer",
        "Time Limit Exceeded",
        "Compilation Error",
        "Runtime Error",
        "Memory Limit Exceeded"
    ];

    // Check if any keyword exists
    const hasFailure = failureKeywords.some(keyword => pageText.includes(keyword));

    if (hasFailure) {
        // Optional: specific check to ensure "Accepted" isn't also present 
        // (sometimes the UI shows history)
        triggerPenalty();
    }
}

function triggerPenalty() {
    isProcessingPenalty = true;
    
    chrome.runtime.sendMessage({ action: "APPLY_PENALTY" });

    // Cooldown: Ignore failures for 10 seconds after triggering.
    // This prevents the penalty from being applied multiple times for a single submission.
    setTimeout(() => {
        isProcessingPenalty = false;
    }, 10000);
}