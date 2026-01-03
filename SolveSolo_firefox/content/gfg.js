let errorAlreadyCounted = false;

const observer = new MutationObserver(() => {
    const bodyText = document.body.innerText.toLowerCase();

    //error visibility check
    const isErrorVisible = (
        bodyText.includes("wrong answer") || 
        bodyText.includes("compilation error") || 
        bodyText.includes("time limit exceeded") ||
        bodyText.includes("output difference")
    );

    //GFG context check
    const isRealResult = bodyText.includes("output") || bodyText.includes("expected");

    if (isErrorVisible && isRealResult) {
        if (!errorAlreadyCounted) {
            chrome.runtime.sendMessage({ action: "TEST_CASE_FAILED" });
            errorAlreadyCounted = true;
        }
    } else {
        errorAlreadyCounted = false;
    }
});

observer.observe(document.body, { childList: true, subtree: true });