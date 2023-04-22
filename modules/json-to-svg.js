import { newString } from "./svg-to-json.js";
import { modalContentObject } from "./flowchart-example.js";
console.log(newString);

// Create SVG element and idObject
const idObject = {};
export const svgElement = createElementNodeFromJson(newString, idObject);

// Add click event listeners to shape and text elements
const shapeAndTextElements = svgElement.querySelectorAll(
  "rect, circle, ellipse, line, polygon, polyline, text"
);
shapeAndTextElements.forEach((element) => {
  if (element.tagName === "path") return; // Exclude path elements
  element.addEventListener("click", () => {
    openModalWindow(element, modalContentObject);
  });
});

// update read state
function updateLinkReadState(linkIndex, modalElement) {
  const links = modalElement.querySelectorAll(".modal-link");
  const link = links[linkIndex];
  const linkObject = link.linkObject;

  // Update the link object's read property
  linkObject.read = true;

  // Update the link's class to indicate that it has been read
  link.classList.add("read");

  // Update the progress bar
  const progressBar = modalElement.querySelector(".progress-bar");
  const numLinks = links.length;
  const numRead = modalElement.querySelectorAll(".modal-link.read").length;
  progressBar.style.width = `${(numRead / numLinks) * 100}%`;
}

function openModalWindow(element, modalContentObject) {
  // Get information from modalContentObject
  const elementInfo = modalContentObject[element.id];
  const heading = elementInfo.heading || element.tagName;
  const content = elementInfo.content || "";
  const links = elementInfo.links || [];

  // Create modal window and background
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal-window");

  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Create heading
  const modalHeading = document.createElement("h2");
  modalHeading.textContent = heading;
  modalContent.appendChild(modalHeading);

  // Create paragraph with content
  const modalParagraph = document.createElement("p");
  modalParagraph.textContent = content;
  modalContent.appendChild(modalParagraph);

  // Create links if exist
  if (links.length) {
    const modalLinks = document.createElement("ul");
    links.forEach((link) => {
      const modalLink = document.createElement("li");
      const linkElement = document.createElement("a");
      linkElement.textContent = link.text;
      linkElement.href = link.url;
      modalLink.appendChild(linkElement);
      modalLinks.appendChild(modalLink);
    });
    modalContent.appendChild(modalLinks);
  }

  // Add modal content to modal window
  modalWindow.appendChild(modalContent);

  // Add modal window and background to body
  document.body.appendChild(modalBackground);
  document.body.appendChild(modalWindow);

  // Calculate width of modal window and position it to the right of the screen
  const modalWidth = modalWindow.offsetWidth;
  const screenWidth = window.innerWidth;
  const modalLeft = screenWidth - modalWidth;

  modalWindow.style.left = `${modalLeft}px`;

  // Darken background
  modalBackground.addEventListener("click", () => {
    closeModalWindow(modalWindow, modalBackground);
  });
}

// Close modal window
function closeModalWindow(modalWindow, modalBackground) {
  modalWindow.remove();
  modalBackground.remove();
}

// Create SVG element from JSON
function createElementFromJson(json, idElements) {
  if (json.type === "element") {
    return createElementNodeFromJson(json, idElements);
  } else if (json.type === "text") {
    return createTextNodeFromJson(json);
  }
}

function createElementNodeFromJson(json, idElements) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    json.tagName
  );

  for (const [name, value] of Object.entries(json.attributes)) {
    element.setAttribute(name, value);
  }

  for (const childJson of json.children) {
    const childNode = createElementFromJson(childJson, idElements);
    element.appendChild(childNode);
  }

  // Check if the element has an id
  if (json.attributes && json.attributes.id) {
    const elementId = json.attributes.id;
    if (
      json.tagName === "text" ||
      json.tagName === "rect" ||
      json.tagName === "circle" ||
      json.tagName === "ellipse" ||
      json.tagName === "line" ||
      json.tagName === "polygon" ||
      json.tagName === "polyline"
    ) {
      if (!idElements[elementId]) {
        idElements[elementId] = element;
      } else {
        // Add a comment to the object if the id already exists
        idElements[elementId] = {
          ...idElements[elementId],
          comment: "Multiple elements with the same id",
        };
      }
    }
  }

  return element;
}

function createTextNodeFromJson(json) {
  return document.createTextNode(json.content);
}

// Add styles for modal window and background
const modalStyles = `
    .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    }

    .modal-window {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 50%;
    background-color: white;
    z-index: 1001;
    overflow-y: auto;
    padding: 20px;
    }

    .modal-content {
    margin-top: 50px;
    }
    `;

Object.keys(idObject).forEach((id) => {
  if (!modalContentObject[id]) {
    modalContentObject[id] = {
      heading: id,
      content: "No content available for this element.",
    };
  }
});

// Add modal styles to head
const head = document.querySelector("head");
const style = document.createElement("style");
style.textContent = modalStyles;
head.appendChild(style);
console.log(idObject);
