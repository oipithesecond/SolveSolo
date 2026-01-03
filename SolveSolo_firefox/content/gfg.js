let isPenalized = false;

const observer = new MutationObserver(() => {
    if (isPenalized) return;

    const bodyText = document.body.innerText.toLowerCase();

    //specific keywords
    if (bodyText.includes("wrong answer") || 
        bodyText.includes("compilation error") || 
        bodyText.includes("time limit exceeded")) {
        
        //GFG usually shows "Output" or "Your Output" near the error
        if (bodyText.includes("output") || bodyText.includes("expected")) {
            chrome.runtime.sendMessage({ action: "TEST_CASE_FAILED" });
            
            isPenalized = true;
            setTimeout(() => { isPenalized = false; }, 10000);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });