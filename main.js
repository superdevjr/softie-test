import { svgToJson } from "./svg-to-json.js";
import { svgString } from "./svg-string-for-export.js"

console.log("test")
let newString = svgToJson(svgString);




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
  
    // for (const [name, value] of Object.entries(json.attributes)) {
    //   element.setAttribute(name, value);
    // }


    // make this a function

    for (const [name, value] of Object.entries(json.attributes)) {
        if (name === 'fill' && json.tagName !== 'text') {
          const className = `color-${value.replace('#', '')}`;
          fillColorsMap.set(value, className);
          element.setAttribute('class', className);
        } else {
          element.setAttribute(name, value);
        }
      }
  
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

  function generateDynamicCssStyles() {
    const cssVariableDeclarations = Array.from(fillColorsMap.entries())
      .map(([color, className]) => `--${className}: ${color};`)
      .join(' ');
  
    const cssClasses = Array.from(fillColorsMap.entries())
      .map(([color, className]) => `.${className} { fill: var(--${className}); }`)
      .join(' ');
  
    return `
      :root {
        ${cssVariableDeclarations}
      }
      ${cssClasses}
    `;
  }
  const boday = document.body;

  appendSvg(newString, boday);

