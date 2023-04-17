export function svgToJson(svgString) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgRoot = svgDoc.documentElement;
  return parseNode(svgRoot);
}

function parseNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      return parseElementNode(node);
    } else if (node.nodeType === Node.TEXT_NODE) {
      return parseTextNode(node);
    }
  }
  
function parseElementNode(node) {
    const obj = {
      type: 'element',
      tagName: node.tagName,
      attributes: {},
      children: [],
    };
  
    // Handle attributes
    for (const attr of node.attributes) {
      obj.attributes[attr.name] = attr.value;
    }
  
    // Handle child nodes
    for (const child of node.childNodes) {
      const childObj = parseNode(child);
      if (childObj) {
        obj.children.push(childObj);
      }
    }    
    return obj;
  }

function parseTextNode(node) {
  const textContent = node.textContent.trim();

    return {
      type: 'text',
      content: textContent,
    };
  }
