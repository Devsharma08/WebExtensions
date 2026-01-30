// Register the menu only when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "spendAmount",
    title: "Add '%s' to spendings",
    contexts: ["selection"]
  })
  chrome.storage.sync.get({ tempLimit: 0 }, (data) => {
    chrome.action.setBadgeText({ text: data.tempLimit.toString() });
    chrome.action.setBadgeBackgroundColor({ color: "#090a0e" });
  });
});

// Listen for the click
chrome.contextMenus.onClicked.addListener((data) => {
  if (data.menuItemId === "spendAmount") {
    // Extract numbers 
    let rawText = data.selectionText.replace(/[^0-9.]/g, '');
    let amount = parseFloat(rawText);

    // check for a valid number
    if (isNaN(amount)) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon-48.png',
        title: 'Invalid Amount',
        message: `Selected text "${data.selectionText}" is not a valid number.`
      });
      return;
    }

    updateAmount(amount);
  }
});

// Update and compare with limit
function updateAmount(amount) {
  // Use chrome.storage.sync so it works across devices
  chrome.storage.sync.get(['tempLimit', 'tempSpent'], (data) => {
    let limit = parseFloat(data.tempLimit) || 0;
    let newTotal = (parseFloat(data.tempSpent) || 0) + amount;

    if (limit > 0 && newTotal > limit) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon-48.png',
        title: 'Budget Limit Exceeded',
        message: `Warning! Your new tempSpent is $${newTotal.toFixed(2)}, exceeding your limit of $${limit.toFixed(2)}.`
      });
    }

    // Save the new tempSpent
    chrome.storage.sync.set({ tempSpent: newTotal });
  });
}