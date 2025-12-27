function updateTimer() {
    chrome.storage.local.get(["unlockTime"], (result) => {
        const unlockTime = result.unlockTime || 0;
        const now = Date.now();
        const timeLeft = unlockTime - now;

        const timerElement = document.getElementById("timer");

        if (timeLeft > 0) {
            const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);
            timerElement.innerText = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            timerElement.innerText = "00:00";
        }
    });
}

updateTimer();
setInterval(updateTimer, 1000);