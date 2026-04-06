function startApp() {
    alert("Welcome to FreshDrop 🌿");
}

// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => console.log("Service Worker Registered ✅"))
            .catch(err => console.log("SW Error:", err));
    });
}

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// CAPTURE INSTALL EVENT
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

// INSTALL BUTTON CLICK
installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        console.log(result.outcome);
        deferredPrompt = null;
    }
});

// AFTER INSTALL
window.addEventListener('appinstalled', () => {
    console.log("App Installed 🎉");
});