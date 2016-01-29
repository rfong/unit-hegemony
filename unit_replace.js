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

var units = {
  'cmToIn': {
    convert: function(cm) { return cm / 2.54; },
    to: 'in',
    pattern: /((\d\.?\d*|\.\d+)\s?(cm|CM|centimeters))($|[^a-zA-Z])/g,
  },
};

function format(f, unit) {
  return f.toFixed(2).concat(' ' + unit);
}

function convertMatch(match, unit) {
  var originalStr = match[1],
      number = match[2];
  return (originalStr + " (" +
          format(units[unit].convert(number), units[unit].to) + ")");
}

function handleText(text) {
  for (var unit in units) {
    var pattern = units[unit].pattern,
        match = pattern.exec(text);
    while (match != null) {
      text = text.replace(match[1], convertMatch(match, unit));
      match = pattern.exec(text);
    }
  }
  return text;
}

walk(document.body);
