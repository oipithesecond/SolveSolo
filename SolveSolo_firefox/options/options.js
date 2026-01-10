//load saved settings
document.addEventListener("DOMContentLoaded", async () => {
    const durationInput = document.getElementById('duration');
    const penaltyInput = document.getElementById('penaltyDuration');
    const saveBtn = document.getElementById('save');
    const statusMsg = document.getElementById('status');
    
    chrome.storage.local.get(['blockDuration', 'blockYoutube'], (data) => {
        //default to 20 mins
        document.getElementById('duration').value = data.blockDuration || 20;
        //default to 5 mins
        penaltyInput.value = (data.penaltyDuration !== undefined) ? data.penaltyDuration : 5;
        //default to false
        document.getElementById('blockYoutube').checked = data.blockYoutube || false;
    });


    //save button click handler
    saveBtn.addEventListener('click', () => {
        const duration = parseInt(durationInput.value);
        const penalty = parseInt(penaltyInput.value);
        const blockYoutube = document.getElementById('blockYoutube').checked;

        //validation
        if (isNaN(duration) || duration < 15 || duration > 99) {
            showError("Block Duration must be between 15 and 99 minutes.");
            return;
        }

        if (isNaN(penalty) || penalty < 0 || penalty > 30) {
            showError("Penalty must be between 0 and 30 minutes.");
            return;
        }

        //save success
        chrome.storage.local.set({
            blockDuration: duration,
            penaltyDuration: penalty,
            blockYoutube: blockYoutube
        }, () => {
            //success state
            statusMsg.innerText = "Saved!";
            statusMsg.className = "success";
            statusMsg.style.display = "inline";
            
            //status message for 1.5 secs
            setTimeout(() => { statusMsg.style.display = 'none'; }, 1500);
        });
    });

    function showError(msg) {
        statusMsg.innerText = msg;
        statusMsg.className = "error";
        statusMsg.style.display = "inline";
    }
});