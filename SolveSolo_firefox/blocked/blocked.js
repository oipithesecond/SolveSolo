document.addEventListener('DOMContentLoaded', () => {
    const returnBtn = document.getElementById('return-btn');

    returnBtn.addEventListener('click', () => {
        //all tabs in the current window
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
            //check if coding problem is already open
            const codingTab = tabs.find(tab => 
                (tab.url.includes("leetcode.com") || tab.url.includes("geeksforgeeks.org")) 
                && !tab.url.includes("blocked.html")
            );

            chrome.tabs.getCurrent((currentTab) => {
                //found a coding tab?
                if (codingTab) {
                    chrome.tabs.update(codingTab.id, { active: true });
                }

                //close this blocked tab.
                if (tabs.length > 1) {
                    chrome.tabs.remove(currentTab.id);
                } else {
                    //if this is the ONLY tab open, don't close the window.
                    //redirect to a safe new tab
                    chrome.tabs.update(currentTab.id, { url: "chrome://newtab" });
                }
            });
        });
    });
});