document.addEventListener('DOMContentLoaded', () => {
    const returnBtn = document.getElementById('return-btn');
    
    if (returnBtn) {
        returnBtn.addEventListener('click', () => {
            chrome.tabs.query({ currentWindow: true }, (tabs) => {
                const codingTab = tabs.find(tab => 
                    (tab.url.includes("leetcode.com") || tab.url.includes("geeksforgeeks.org"))
                );
    
                chrome.tabs.getCurrent((currentTab) => {
                    if (codingTab) {
                        chrome.tabs.update(codingTab.id, { active: true });
                    }
                    chrome.tabs.remove(currentTab.id);
                });
            });
        });
    }
});