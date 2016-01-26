document.addEventListener("DOMContentLoaded", function(event) { 
  walk(document.body);
});

function walk(node) {   
  // I stole this function from here:
  // http://is.gd/mwZp7E
  var child, next;
  switch ( node.nodeType )
  {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child)
      {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;
    case 3: // Text node
      node.nodeValue = handleText(node.nodeValue);
      //handleText(node.nodeValue);
      break;
  }
}

var cmToIn = function(cm) { return (cm / 2.54).toFixed(2).concat(' in') };
var units = {
  cm: cmToIn,
};

function convertMatch(match) {
  var number = match[1],
      unit = match[2];
  return number + " " + unit + " (" + units[unit](number) + ")";
}

function handleText(text) {
  var cmPattern = /([0-9]+)[\s]*(cm)[^a-zA-Z]/g;
  var match = cmPattern.exec(text);
  while (match != null) {
    text = text.replace(match[0].trim(), convertMatch(match));
    match = cmPattern.exec(text);
  }
  return text;
}
