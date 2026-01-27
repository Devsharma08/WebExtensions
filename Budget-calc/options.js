let saveBtn = document.getElementById('saveLimit');
let clearBtn = document.getElementById('resetLimit');
let limitInp = document.getElementById('limit');
let limitDetail = document.getElementById('limitDetail');
let spentDetail = document.getElementById('spentDetail');

window.addEventListener('load', () => {
    chrome.storage.sync.get({ tempLimit: 0, tempSpent: 0 }, (data) => {
        // We use textContent or innerText to avoid overwriting the container style
        limitDetail.innerHTML = `<h2>${data.tempLimit}</h2>`;
        spentDetail.innerHTML = `<h2>${data.tempSpent}</h2>`;
    });
});

saveBtn.addEventListener('click', () => {
    // 1. Basic validation
    if (limitInp.value === "" || Number(limitInp.value) === 0) {
        alert('Enter a valid Limit !!!');
        return;
    }


    let enteredLimit = Number(limitInp.value);

    chrome.storage.sync.set({ tempLimit: enteredLimit }, () => {
        limitDetail.innerHTML = `<h2>${enteredLimit}</h2>`;
        alert("Limit Saved!");
        limitInp.value = ""; 
    });
});

clearBtn.addEventListener('click', () => {
    chrome.storage.sync.set({ tempLimit: 0 }, () => {
        limitDetail.innerHTML = `<h2>0</h2>`;
        alert("Limit Reset!");
    });
});