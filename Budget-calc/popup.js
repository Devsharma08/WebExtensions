let spent = document.getElementById('spent');
let limit = document.getElementById('limit');
let amount = document.getElementById('amount');
let amountBtn = document.getElementById('addAmount');

window.addEventListener('load',()=>{
  chrome.storage.sync.get({tempSpent : 0,tempLimit : 1000},(data)=>{
    limit.innerText = data.tempLimit ;
    spent.innerText = data.tempSpent ; 
  });
})

amountBtn.addEventListener('click', () => {
    //  Validation
    if (amount.value == 0 || amount.value == "") {
        alert("Enter Amount To Add");
        return;
    }

    // Local variables for math 
    let amountVal = Number(amount.value);
    let spentVal = Number(spent.innerText) || 0;
    let limitVal = Number(limit.innerText) || 0;

    // Check BEFORE updating
    if (limitVal < amountVal) {
        alert("Limit Exceeded !!");
        return; 
    }

    spentVal = spentVal + amountVal ;
    limitVal = limitVal - amountVal ;
    
    // Update the actual values and seting values to chrome storage
    chrome.storage.sync.set({tempSpent:spentVal,tempLimit:limitVal},()=>{
      spent.innerText = spentVal ;
      limit.innerText = limitVal ;
  
      // UX: Clear the input box after a successful add
      amount.value = "";
    })
});