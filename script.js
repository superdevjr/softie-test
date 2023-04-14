
 
 const testerString = `
 <svg width="2107" height="1897" viewBox="0 0 2107 1897" fill="none" xmlns="http://www.w3.org/2000/svg">
 <rect width="2107" height="1897" fill="#F5F5F5"/>
 <g id="Component 1">
 <rect id="Rectangle 1" x="693" y="471" width="812" height="368" fill="#F44C4C" stroke="black" stroke-width="4"/>
 <rect id="squoran" x="321" y="22" width="464" height="188" fill="#D9D9D9"/>
 <line id="plorp" x1="786.391" y1="117.688" x2="1069.39" y2="472.688" stroke="black"/>
 <g id="master">
 <rect width="2" height="8" transform="translate(294 440)" fill="white"/>
 </g>
 <line id="chester" x1="322.409" y1="109.288" x2="139.409" y2="369.288" stroke="black"/>
 <rect id="tester" y="369" width="278" height="121" fill="#67E753"/>
 <text id="SOME EXMAPLE TEXT" fill="black" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="32" letter-spacing="0em"><tspan x="384" y="126.136">SOME EXMAPLE TEXT</tspan></text>
 <text id="some more text" fill="black" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="32" letter-spacing="0em"><tspan x="948" y="676.136">some more text</tspan></text>
 <rect id="Rectangle 3" x="327" y="1188" width="1213" height="125" rx="20" fill="#D9D9D9"/>
 <rect id="Rectangle 4" x="327" y="1382" width="1213" height="125" rx="20" fill="#D67EFF"/>
 <rect id="Rectangle 5" x="344" y="1495" width="1213" height="125" rx="20" fill="#D9D9D9"/>
 <line id="Line 1" x1="1508" y1="602.5" x2="2106" y2="605.598" stroke="black"/>
 <line id="Line 2" x1="689.984" y1="723.5" x2="343.984" y2="712.5" stroke="black"/>
 <text id="text up here" fill="black" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="32" letter-spacing="0em"><tspan x="1188" y="24.1364">text up here&#10;</tspan></text>
 <rect id="Rectangle 2" x="1087.5" y="42.5" width="576" height="56" fill="#75CDFF" stroke="black"/>
 <line id="Line 3" x1="1095.5" y1="829.048" x2="1014.5" y2="1676.05" stroke="black"/>
 <ellipse id="Ellipse 1" cx="937.5" cy="1786.5" rx="383.5" ry="110.5" fill="#D9D9D9"/>
 </g>
 </svg>`

 newString = svgToJson(testerString)


function parseNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      return parseElementNode(node);
    } else if (node.nodeType === Node.TEXT_NODE) {
      return parseTextNode(node);
    } else if (node.nodeType === Node.COMMENT_NODE) {
      return parseCommentNode(node);
    }
    return null;
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
    if (textContent.length === 0) return null;
  
    return {
      type: 'text',
      content: textContent,
    };
  }
  
  function parseCommentNode(node) {
    return {
      type: 'comment',
      content: node.textContent,
    };
  }
  
  function svgToJson(svgString) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgRoot = svgDoc.documentElement;
  
    return parseNode(svgRoot);
  }

  function toggleVisibility(id) {
    const element = document.getElementById(id);
    if (element) {
      const currentDisplay = element.style.display;
      element.style.display = currentDisplay === 'none' ? '' : 'none';
    } else {
      console.log(`Element not found with ID: ${id}`);
    }
  }

  const contentMapping = {
    'squoran': function () {
        toggleVisibility("dog")
    },
    'element2': '<p>Content for element 2</p><a href="https://example.org">Another Link</a>',
    // Add more content for other element IDs as needed
  };
  





function createElementFromJson(json) {
    if (json.type === 'element') {
      return createElementNodeFromJson(json);
    } else if (json.type === 'text') {
      return createTextNodeFromJson(json);
    } else if (json.type === 'comment') {
      return createCommentNodeFromJson(json);
    }
    return null;
  }
  
  const fillColorsMap = new Map();

  function createElementNodeFromJson(json) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', json.tagName);
  
    for (const [name, value] of Object.entries(json.attributes)) {
      element.setAttribute(name, value);
    }


    // make this a function

    // for (const [name, value] of Object.entries(json.attributes)) {
    //     if (name === 'fill' && json.tagName !== 'text') {
    //       const className = `color-${value.replace('#', '')}`;
    //       fillColorsMap.set(value, className);
    //       element.setAttribute('class', className);
    //     } else {
    //       element.setAttribute(name, value);
    //     }
    //   }
  
    // Create and append child nodes
    for (const childJson of json.children) {
      const childNode = createElementFromJson(childJson);
      if (childNode) {
        element.appendChild(childNode);
      }
    }
  
    // Add onclick event listeners for text and shape elements, excluding path elements
    const shapeAndTextElements = ['rect', 'circle', 'ellipse', 'polygon', 'polyline', 'line', 'text'];
    if (shapeAndTextElements.includes(json.tagName) && json.tagName !== 'path') {
        element.addEventListener('click', (e) => {
          const id = json.attributes.id || 'unknown';
          performActionBasedOnId(id, contentMapping);
        });
      }
    
      return element;
    }
    
    function performActionBasedOnId(id, contentMapping) {
      const actionFunction = contentMapping[id];
      if (actionFunction) {
        actionFunction();
      } else {
        console.log(`No action found for element with ID: ${id}`);
      }
    }
    
  
  function createTextNodeFromJson(json) {
    return document.createTextNode(json.content);
  }
  
  function createCommentNodeFromJson(json) {
    return document.createComment(json.content);
  }
  
  function jsonToSvg(json) {
    const svgElement = createElementNodeFromJson(json);
    return svgElement;
  }
  
  function appendSvg(json, targetElement) {
    const svgElement = jsonToSvg(json);
    targetElement.appendChild(svgElement);
  }

//   function generateDynamicCssStyles() {
//     const cssVariableDeclarations = Array.from(fillColorsMap.entries())
//       .map(([color, className]) => `--${className}: ${color};`)
//       .join(' ');
  
//     const cssClasses = Array.from(fillColorsMap.entries())
//       .map(([color, className]) => `.${className} { fill: var(--${className}); }`)
//       .join(' ');
  
//     return `
//       :root {
//         ${cssVariableDeclarations}
//       }
//       ${cssClasses}
//     `;
//   }
  const boday = document.body;

  appendSvg(newString, boday);



//   const dynamicCssStyles = generateDynamicCssStyles();
// console.log(dynamicCssStyles);
