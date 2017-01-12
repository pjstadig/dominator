function scrollToTop(message) {
  window.scrollTo(0, 0);
}

function scrollToBottom(message) {
  window.scrollTo(0, document.body.scrollHeight);
}

function scrollDown(message) {
  window.scrollBy(0, 20);
}

function scrollUp(message) {
  window.scrollBy(0, -20);
}

function scrollRight(message) {
  window.scrollBy(20, 0);
}

function scrollLeft(message) {
  window.scrollBy(-20, 0);
}

function pageDown(message) {
  window.scrollBy(0, window.innerHeight - 40);
}

function pageUp(message) {
  window.scrollBy(0, -window.innerHeight + 40);
}

function back(message) {
  history.back(message);
}

function forward(message) {
  history.forward(message);
}

function cut(message) {
  document.execCommand('cut');
}

function copy(message) {
  document.execCommand('copy');
}

function paste(message) {
  document.execCommand('paste');
}

var dispatch = {
  "scroll-to-top" : scrollToTop,
  "scroll-to-bottom" : scrollToBottom,
  "scroll-down" : scrollDown,
  "scroll-up" : scrollUp,
  "scroll-right" : scrollRight,
  "scroll-left" : scrollLeft,
  "page-down" : pageDown,
  "page-up" : pageUp,
  "back" : back,
  "forward" : forward,
  "cut" : cut,
  "copy" : copy,
  "paste" : paste
};

function messageHandler(command, sender, sendResponse) {
  var action = dispatch[command];
  if (action) {
    action(command);
  } else {
    debug("Unknown action");
  }
}

chrome.runtime.onMessage.addListener(messageHandler);
