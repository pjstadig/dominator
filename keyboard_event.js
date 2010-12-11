var keyCode = {
  "U+0009" : "Tab",
  "U+001B" : "Esc",
  "U+0020" : "Space",
  "U+00BB" : "+",
  "U+00BC" : ",",
  "U+00BD" : "-",
  "U+00BE" : ".",
  "U+00BF" : "/",
  "U+00BA" : ":",
  "U+007F" : "Delete",
  "U+00C0" : "`",
  "U+00DB" : "[",
  "U+00DC" : "\\",
  "U+00DD" : "]",
  "U+00DE" : "'"
}

KeyboardEvent.prototype.getKey = function() {
  var key;
  if((/^U\+[\da-fA-F]+$/).test(this.keyIdentifier))
    key = keyCode[this.keyIdentifier] ||
    (String.fromCharCode(parseInt(this.keyIdentifier.substring(2,6), 16))).toLowerCase();
  else
    key = this.keyIdentifier;

  if (this.shiftKey)
    key = "S-" + key;
  if (this.metaKey || this.altKey)
    key = "M-" + key;
  if (this.ctrlKey)
    key = "C-" + key;

  return key;
}

KeyboardEvent.prototype.isIgnored = function () {
  return (/^(Control|Alt|Shift|Win|U\+0000)$/.test(this.keyIdentifier));
}
