//load saved settings
document.addEventListener("DOMContentLoaded", async () => {
    chrome.storage.local.get(['blockDuration', 'blockYoutube'], (data) => {
        //default to 20 mins
        document.getElementById('duration').value = data.blockDuration || 20;
        //default to false
        document.getElementById('blockYoutube').checked = data.blockYoutube || false;
    });
});

//save settings
document.getElementById('save').addEventListener('click', () => {
    const duration = parseInt(document.getElementById('duration').value);
    const blockYoutube = document.getElementById('blockYoutube').checked;

    chrome.storage.local.set({
        blockDuration: duration,
        blockYoutube: blockYoutube
    }, () => {
        //show saved message for 1.5 seconds
        const status = document.getElementById('status');
        status.style.display = 'inline';
        setTimeout(() => { status.style.display = 'none'; }, 1500);
    });
});