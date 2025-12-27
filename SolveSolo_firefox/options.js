//load saved settings
document.addEventListener("DOMContentLoaded", async () => {
    const data = await browser.storage.local.get("blockDuration");
    // Default to 20 minutes if not set
    document.getElementById("duration").value = data.blockDuration || 20;
});

//save settings
document.getElementById("save").addEventListener("click", async () => {
    const minutes = parseInt(document.getElementById("duration").value);
    await browser.storage.local.set({ blockDuration: minutes });
    
    //show "saved" message
    const status = document.getElementById("status");
    status.style.display = "block";
    setTimeout(() => status.style.display = "none", 1500);
});