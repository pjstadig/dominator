function quote(tab) {
  chrome.pageAction.show(tab.id);
}

function unquote(tab) {
  chrome.pageAction.hide(tab.id);
}

function exit(tab) {
  chrome.windows.getAll({populate : false}, function (wins) {
    debug(wins);
    for (i = 0; i < wins.length; i++) {
      var w = wins[i];
      debug(w);
      chrome.windows.remove(w.id, function(){});
    }
  });
}

function closeTab(tab) {
  chrome.tabs.remove(tab.id);
}

function newTab(tab) {
  chrome.tabs.create({windowId : tab.windowId});
}

function previousTab(tab) {
  chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
    debug("tabs.length = " + tabs.length);
    debug("tab.index = " + tab.index);
    var index = (tab.index + tabs.length - 1) % tabs.length;
    debug("index = " + index);
    chrome.tabs.update(tabs[index].id, {selected : true});
  });
}

function nextTab(tab) {
  debug (tab);
  chrome.tabs.getAllInWindow(tab.windowId, function(tabs) {
    debug("tabs.length = " + tabs.length);
    debug("tab.index = " + tab.index);
    var index = (tab.index + 1) % tabs.length;
    debug("index = " + index);
    chrome.tabs.update(tabs[index].id, {selected : true});
  });
}

function findActionHandler(action) {
  return {
    "close-tab" : closeTab,
    "previous-tab" : previousTab,
    "next-tab" : nextTab,
    "new-tab" : newTab,
    "quote" : quote,
    "unquote" : unquote,
    "exit" : exit
  }[action];
}

function createMessageHandler(port) {
  return function (message) {
    var action = message.shift();
    var actionHandler = findActionHandler(action);
    if (actionHandler) {
      actionHandler(port.sender.tab, message);
    } else {
      debug("Missing handler for " + action);
    }
  }
}

function connectionHandler(port) {
  port.onMessage.addListener(createMessageHandler(port));
}

chrome.extension.onConnect.addListener(connectionHandler);
