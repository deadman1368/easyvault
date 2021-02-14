//context sub menu passwords
var clickedEl = null;

document.addEventListener("contextmenu", function(event){
    clickedEl = event.target;
    chrome.runtime.sendMessage({type: 5}, function(response){});
}, true);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == 10) {
        clickedEl.value = request.value.password;
        return true;
    }
});