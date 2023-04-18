// Main function to convert an SVG string to a JSON object
export function svgToJson(svgString) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
  const svgRoot = svgDoc.documentElement;
  return parseNode(svgRoot);
}

// Parses a DOM node and returns the appropriate JSON object
function parseNode(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    return parseElementNode(node);
  } else if (node.nodeType === Node.TEXT_NODE) {
    return parseTextNode(node);
  }
}

// Parses an element node and returns a JSON object
function parseElementNode(node) {
  const elementObject = {
    type: "element",
    tagName: node.tagName,
    attributes: getAttributes(node),
    children: getChildNodes(node),
  };

  return elementObject;
}

// Extracts the attributes from a DOM element and returns an object
function getAttributes(node) {
  const attributes = {};
  for (const attr of node.attributes) {
    attributes[attr.name] = attr.value;
  }
  return attributes;
}

// Gets the child nodes of a DOM element and returns an array of JSON objects
function getChildNodes(node) {
  return Array.from(node.childNodes)
    .map((childNode) => parseNode(childNode))
    .filter((parsedChildNode) => parsedChildNode);
}

// Parses a text node and returns a JSON object
function parseTextNode(node) {
  const textContent = node.textContent.trim();

  return {
    type: "text",
    content: textContent,
  };
}
