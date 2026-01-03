let errorAlreadyCounted = false;

const FAILURE_KEYWORDS = [
    "Wrong Answer",
    "Time Limit Exceeded",
    "Memory Limit Exceeded",
    "Runtime Error",
    "Compile Error"
];

const observer = new MutationObserver(() => {
    const bodyText = document.body.innerText;
    
    //failure keyword is currently on screen check
    const isErrorVisible = FAILURE_KEYWORDS.some(keyword => bodyText.includes(keyword));
    const isRealResult = bodyText.includes("Details") || bodyText.includes("Testcase");

    if (isErrorVisible && isRealResult) {
        //error on screen
        if (!errorAlreadyCounted) {
            //penalize
            console.log("New error detected. Sending penalty...");
            chrome.runtime.sendMessage({ action: "TEST_CASE_FAILED" });
            
            //mark as counted
            errorAlreadyCounted = true;
        }
    } else {
        errorAlreadyCounted = false;
    }
});

observer.observe(document.body, { childList: true, subtree: true, characterData: true });