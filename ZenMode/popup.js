document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // Helper to clear active states from UI
    const clearActive = () => {
        document.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    };

    document.getElementById('dark').addEventListener('click', () => {
        body.classList.add('popup-dark'); // Makes popup dark
        clearActive();
        document.getElementById('dark').classList.add('active');
        change('invert(1) hue-rotate(180deg)');
    });

    document.getElementById('sepia').addEventListener('click', () => {
        body.classList.remove('popup-dark'); // Makes popup light
        clearActive();
        document.getElementById('sepia').classList.add('active');
        change('sepia(.8)');
    });

    document.getElementById('reset').addEventListener('click', () => {
        body.classList.remove('popup-dark');
        clearActive();
        change('none');
    });
});

async function change(filterValue) {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab.url.includes("chrome://")) return;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (val) => {
            document.documentElement.style.setProperty('filter', val, 'important');
            // Re-invert images so they stay normal
            const media = document.querySelectorAll('img, video');
            media.forEach(m => m.style.filter = val.includes('invert') ? 'invert(1) hue-rotate(180deg)' : '');
        },
        args: [filterValue]
    });
}