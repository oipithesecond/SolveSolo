let isPenalized = false;

//exact phrases that trigger a penalty
const FAILURE_KEYWORDS = [
    "Wrong Answer",
    "Time Limit Exceeded",
    "Memory Limit Exceeded",
    "Runtime Error",
    "Compile Error"
];

const observer = new MutationObserver((mutations) => {
    //don't run if we just penalized
    if (isPenalized) return;

    //scan visible text on the page
    const bodyText = document.body.innerText;

    //check if any failure keyword exists
    const hasFailure = FAILURE_KEYWORDS.some(keyword => bodyText.includes(keyword));
    const isRealResult = bodyText.includes("Details") || bodyText.includes("Testcase"); 

    if (hasFailure && isRealResult) {
        chrome.runtime.sendMessage({ action: "TEST_CASE_FAILED" });
        
        //lock for 10 seconds
        isPenalized = true;
        setTimeout(() => { isPenalized = false; }, 10000);
    }
});

//observe everything
observer.observe(document.body, { childList: true, subtree: true, characterData: true });