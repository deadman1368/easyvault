
'use strict';
var passwords;
var token;
var time;

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "id": "MainMenu2",
    "title": "Easy Vault Usernames",
    "contexts": ["editable"]
  });
  
  chrome.contextMenus.create({
    "id": "MainMenu",
    "title": "Easy Vault Passwords",
    "contexts": ["editable"]
  });


});

function onClickHandler(info, tab) 
{
  if(info.parentMenuItemId == "MainMenu")
  {
    chrome.tabs.sendMessage(tab.id, {type: 10,value: passwords[parseInt(info.menuItemId)]}, function(clickedEl) {});
    chrome.runtime.sendMessage({type: 10}, function(response){});
  }
  else if(info.parentMenuItemId == "MainMenu2")
  {
    chrome.tabs.sendMessage(tab.id, {type: 11,value: passwords[parseInt(info.menuItemId)]}, function(clickedEl) {});
    chrome.runtime.sendMessage({type: 11}, function(response){});
  }

};


chrome.contextMenus.onClicked.addListener(onClickHandler);

function populateSubMenu(item, index) {
 
  chrome.contextMenus.create({
    "title": item.url,
    "id": index+"_",
    "parentId": "MainMenu2",
    "contexts":["editable"]
  });

  chrome.contextMenus.create({
    "title": item.url,
    "id": index+"",
    "parentId": "MainMenu",
    "contexts":["editable"]
  });

}


  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch(request.type)
      {
        case 1:
          token = request.token;
         // console.log(token);
        break;
       
        case 2:
          sendResponse({verify: token});
          break;

        case 3:
          token = "";
          passwords = null;
          break;

        case 4:
          request.data.forEach(populateSubMenu);
          passwords = request.data;
          break;

        case 5:
          break;

        case 6:
          time = request.time;
          break;

        case 7:
          sendResponse({verify: time});
          break;
      }
    }
  );

  chrome.browserAction.onClicked.addListener(function () { var e = { left: screen.availLeft + screen.availWidth / 2 - 367.5, top: screen.availTop + screen.availHeight / 2 - 290 }, o = chrome.runtime.getURL("login.html"); chrome.tabs.query({ url: o }, function (n) { n.length > 0 ? chrome.windows.update(n[0].windowId, { focused: !0 }, function () { chrome.tabs.update(n[0].id, { active: !0 }) }) : chrome.windows.create({ url: o , focused: !0, left: Math.floor(e.left), top: Math.floor(e.top), type: "panel" }, function (e) { chrome.windows.onRemoved.addListener(function (o) { e.id == o && (chrome.browserAction.setIcon({ path: { 16: "img/16.png", 48: "img/48.png", 128: "img/128.png" } }, function () { }), chrome.browserAction.setBadgeText({ text: "" })) }) }) }) });