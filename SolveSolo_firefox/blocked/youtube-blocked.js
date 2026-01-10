document.addEventListener('DOMContentLoaded', () => {
    const returnBtn = document.getElementById('return-btn');
    returnBtn.addEventListener('click', () => {
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
            const codingTab = tabs.find(tab => 
                (tab.url.includes("leetcode.com") || tab.url.includes("geeksforgeeks.org")) 
                && !tab.url.includes("blocked.html")
                && !tab.url.includes("youtube-blocked.html")
            );

            chrome.tabs.getCurrent((currentTab) => {
                if (codingTab) {
                    chrome.tabs.update(codingTab.id, { active: true });
                }

                if (tabs.length > 1) {
                    chrome.tabs.remove(currentTab.id);
                } else {
                    chrome.tabs.create({});
                    chrome.tabs.remove(currentTab.id);
                }
            });
        });
    });
});