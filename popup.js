const updateTimer = async () => {
    const data = await browser.storage.local.get("unlockTime");
    const unlockTime = data.unlockTime || 0;
    const now = Date.now();
    const timeLeft = unlockTime - now;

    const timerElement = document.getElementById("timer");
    const msgElement = document.getElementById("message");

    if (timeLeft > 0) {
        //convert ms to MM:SS
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        
        timerElement.innerText = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timerElement.style.color = "#ff4444"; //red for locked
        msgElement.innerText = "AI Access Blocked";
    } else {
        timerElement.innerText = "00:00";
        timerElement.style.color = "#4caf50"; //green for free
        msgElement.innerText = "You are free to use AI.";
    }
};

//update immediately, then every second
updateTimer();
setInterval(updateTimer, 1000);