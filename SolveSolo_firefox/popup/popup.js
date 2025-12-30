document.addEventListener('DOMContentLoaded', () => {
    //setting button logic
    const settingsBtn = document.getElementById('settings-btn');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => { 
            if (chrome.runtime.openOptionsPage) {
                chrome.runtime.openOptionsPage();
            } else {
                //fallback:manually open options page
                window.open(chrome.runtime.getURL("options/options.html"));
            }
        });
    } else {
        console.error("Could not find the settings button!");
    }

function updateTimer() {
    chrome.storage.local.get(["unlockTime"], (result) => {
        const unlockTime = result.unlockTime || 0;
        const now = Date.now();
        const timeLeft = unlockTime - now;

        const timerElement = document.getElementById("timer");
        const msgElement = document.getElementById("message");
        
        //active mode
        if (timeLeft > 0) {
            document.body.classList.add("active-mode");
            
            const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);
            timerElement.innerText = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            msgElement.innerText = "Good luck on your problem!";
        } else {
            //idle mode
            document.body.classList.remove("active-mode");

            if (timerElement) {
                timerElement.innerText = "00:00";
                timerElement.style.color = "#444"; // Reset to dark grey
            }
            if (msgElement) {
                msgElement.innerText = "Ready when you are.";
                msgElement.style.color = "#666";
            }
        }
    });
}

updateTimer();
setInterval(updateTimer, 1000);

});