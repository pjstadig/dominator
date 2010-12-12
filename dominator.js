function messageHandler(message) {
  debug("Recieved message:");
  debug(message);
}

var port = chrome.extension.connect();
port.onMessage.addListener(messageHandler);

var isQuote = false;

function quote() {
  isQuote = true;
  keys = [];
  port.postMessage(["quote"]);
}

function unquote() {
  isQuote = false;
  keys = [];
  port.postMessage(["unquote"]);
}

var keys = [];
var config = {
  "q"   : "close-tab",
  "C-M-q" : quote,
  "M-n" : "next-tab",
  "M-p" : "previous-tab",
  "C-x" : {
    "C-c" : "exit",
    "C-f" : "new-tab"
  },
  "C-n" : function() { window.scrollBy(0, 20) },
  "C-p" : function() { window.scrollBy(0, -20) },
  "C-v" : function() { window.scrollBy(0, window.innerHeight - 40) },
  "M-v" : function() { window.scrollBy(0, -window.innerHeight + 40) },
  "S-b" : function() { history.back() },
  "S-f" : function() { history.forward() },
  "M-S-," : function() { window.scrollTo(0, 0) },
  "M-S-." : function() { window.scrollTo(0, document.body.scrollHeight) }
};

function matchKeys(config) {
  debug("keys = " + keys);
  if (keys.length == 0) return config;

  var key = keys.shift();
  debug("key = " + key);
  var action = config[key];
  debug("action = " + action);
  if (typeof action == "object") {
    action = matchKeys(action);
    debug("action = " + action);
    if (typeof action == "object") {
      keys.unshift(key);
    }
  }
  return action;
}

function keyHandler(e) {
  if (e.isIgnored()) return;
  var key = e.getKey();
  if (isQuote) {
    if (key == "Esc")
      unquote();
    return;
  }

  keys.push(e.getKey());
  action = matchKeys(config);
  if (action) {
    e.cancelBubble = true;
    e.preventDefault();
    e.stopPropagation();
    if (typeof action == "function")
      action();
    else if (typeof action != "object")
      port.postMessage([action]);
  }
}

document.addEventListener("keydown", keyHandler);
