//load saved settings
document.addEventListener("DOMContentLoaded", async () => {
    const durationInput = document.getElementById('duration');
    const saveBtn = document.getElementById('save');
    const statusMsg = document.getElementById('status');
    
    chrome.storage.local.get(['blockDuration', 'blockYoutube'], (data) => {
        //default to 20 mins
        document.getElementById('duration').value = data.blockDuration || 20;
        //default to false
        document.getElementById('blockYoutube').checked = data.blockYoutube || false;
    });


    //save button click handler
    saveBtn.addEventListener('click', () => {
        const duration = parseInt(durationInput.value);
        const blockYoutube = document.getElementById('blockYoutube').checked;

        //validation
        if (isNaN(duration) || duration < 15) {
            //error state
            statusMsg.innerText = "Duration cannot be less than 15 minutes.";
            statusMsg.className = "error"; 
            statusMsg.style.display = "inline";
            
            //do not save
            return; 
        }

        //save success
        chrome.storage.local.set({
            blockDuration: duration,
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
});