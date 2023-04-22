import { JSONfromSVG } from "./stuff-not-on-site/svg-to-json.js";
// import { modalContentObject } from "./stuff-not-on-site/modal-content-object.js";
import { processIds } from "./stuff-not-on-site/generate-idObject.js";

// Create SVG from flowchart
export const svgElement = createElementNodeFromJson(JSONfromSVG);

function createElementFromJson(json) {
  if (json.type === "element") {
    return createElementNodeFromJson(json);
  } else if (json.type === "text") {
    return createTextNodeFromJson(json);
  }
}
function createElementNodeFromJson(json) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    json.tagName
  );

  for (const [name, value] of Object.entries(json.attributes)) {
    element.setAttribute(name, value);
  }

  for (const childJson of json.children) {
    const childNode = createElementFromJson(childJson);
    element.appendChild(childNode);
  }

  return element;
}
function createTextNodeFromJson(json) {
  return document.createTextNode(json.content);
}

// Add click event listeners to shape and text elements
const shapeAndTextElements = svgElement.querySelectorAll(
  "rect, circle, ellipse, line, polygon, polyline, text"
);

shapeAndTextElements.forEach((element) => {
  if (element.tagName === "path") return; // Exclude path elements
  element.addEventListener("click", () => {
    openModalWindow(element, modalContentObject);
    console.log("event listenres added");
  });
});

//modal stuff
function openModalWindow(element, modalContentObject) {
  const elementInfo = modalContentObject[element.id];
  const heading = elementInfo.heading || element.tagName;
  const content = elementInfo.content || "";
  const links = elementInfo.links || [];

  const modalWindow = document.getElementById("modal-window");
  const modalBackground = document.getElementById("modal-background");

  // Update heading
  const modalHeading = document.getElementById("modal-heading");
  modalHeading.textContent = heading;

  // Update content
  const modalParagraph = document.getElementById("modal-paragraph");
  modalParagraph.textContent = content;

  // Get the correct modal content object using the element.id
  const contentObjKey = Object.keys(modalContentObject).find(
    (key) => modalContentObject[key].heading === element.id
  );
  const modalContent = modalContentObject[contentObjKey];

  // Update links if exist
  const modalLinks = document.getElementById("modal-links");
  modalLinks.innerHTML = "";
  if (modalContent.links.length) {
    modalContent.links.forEach((link) => {
      const modalLink = document.createElement("li");
      const linkElement = document.createElement("a");
      linkElement.textContent = link.text;
      linkElement.href = link.url;
      modalLink.appendChild(linkElement);

      addReadToggleButton(modalLink, link); // Pass the original link object

      modalLinks.appendChild(modalLink);
    });
  }

  modalWindow.style.display = "block";
  modalBackground.style.display = "block";

  modalBackground.addEventListener("click", () => {
    closeModalWindow(modalWindow, modalBackground);
  });
}

function addReadToggleButton(modalLink, link) {
  const readToggleButton = document.createElement("button");
  readToggleButton.textContent = link.read ? "Mark as unread" : "Mark as read";
  readToggleButton.addEventListener("click", () => {
    link.read = !link.read;
    readToggleButton.textContent = link.read
      ? "Mark as unread"
      : "Mark as read";
    console.log(
      Object.entries(modalContentObject)
        .map(([shape, content]) =>
          content.links.map(
            (link) => `Shape: ${shape}, Link: ${link.text}, Read: ${link.read}`
          )
        )
        .flat()
        .join("\n")
    );
  });
  modalLink.appendChild(readToggleButton);
}

function closeModalWindow(modalWindow, modalBackground) {
  modalWindow.style.display = "none";
  modalBackground.style.display = "none";
}

// const idObject = {};

// // fill content if no content
// Object.keys(idObject).forEach((id) => {
//   if (!modalContentObject[id]) {
//     modalContentObject[id] = {
//       heading: id,
//       content: "No content available for this element.",
//     };
//   }
// });

//

//

// the content of this file will eventually be replaced by an api call

export const modalContentObject = {
  "Rectangle 1": {
    heading: "Rectangle 1",
    content: "This is some content for Rectangle 1.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
      {
        text: "Link 2",
        url: "https://www.example.com/link2",
        read: false,
      },
      {
        text: "Link 3",
        url: "https://www.example.com/link3",
        read: false,
      },
    ],
  },
  "Rectangle 2": {
    heading: "Rectangle 2",
    content: "This is some content for Rectangle 2.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
      {
        text: "Link 2",
        url: "https://www.example.com/link2",
        read: false,
      },
    ],
  },
  "Rectangle 3": {
    heading: "Rectangle 3",
    content: "This is some content for Rectangle 3.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
      {
        text: "Link 2",
        url: "https://www.example.com/link2",
        read: false,
      },
      {
        text: "Link 3",
        url: "https://www.example.com/link3",
        read: false,
      },
      {
        text: "Link 4",
        url: "https://www.example.com/link4",
        read: false,
      },
    ],
  },
  "Rectangle 4": {
    heading: "Rectangle 4",
    content: "This is some content for Rectangle 4.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
      {
        text: "Link 2",
        url: "https://www.example.com/link2",
        read: false,
      },
      {
        text: "Link 3",
        url: "https://www.example.com/link3",
        read: false,
      },
      {
        text: "Link 4",
        url: "https://www.example.com/link4",
        read: false,
      },
      {
        text: "Link 5",
        url: "https://www.example.com/link5",
        read: false,
      },
    ],
  },
  "Line 1": {
    content: "This is some content for Line 1.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
    ],
  },
  "Line 2": {
    content: "This is some content for Line 2.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
      {
        text: "Link 2",
        url: "https://www.example.com/link2",
        read: false,
      },
    ],
  },
  "Line 3": {
    content: "This is some content for Line 3.",
    links: [],
  },
  "Ellipse 1": {
    heading: "Ellipse 1",
    content: "This is some content for Ellipse 1.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
      {
        text: "Link 2",
        url: "https://www.example.com/link2",
        read: false,
      },
      {
        text: "Link 3",
        url: "https://www.example.com/link3",
        read: false,
      },
    ],
  },
  "SOME RANDOM SUBJECT_2": {
    heading: "SOME RANDOM SUBJECT_2",
    content: "This is some content for SOME RANDOM SUBJECT_2.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
      {
        text: "Link 2",
        url: "https://www.example.com/link2",
        read: false,
      },
      {
        text: "Link 3",
        url: "https://www.example.com/link3",
        read: false,
      },
    ],
  },
  "some more text": {
    heading: "Some More Text",
    content: "This is some more text.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
    ],
  },
  tester: {
    heading: "Tester",
    content: "This is some content for Tester.",
    links: [],
  },
  chester: {
    heading: "Chester",
    content: "This is some content for Chester.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
      {
        text: "Link 2",
        url: "https://www.example.com/link2",
        read: false,
      },
      {
        text: "Link 3",
        url: "https://www.example.com/link3",
        read: false,
      },
      {
        text: "Link 4",
        url: "https://www.example.com/link4",
        read: false,
      },
    ],
  },
  plorp: {
    heading: "Plorp",
    content: "This is some content for Plorp.",
    links: [
      {
        text: "Link 1",
        url: "https://www.example.com/link1",
        read: false,
      },
      {
        text: "Link 2",
        url: "https://www.example.com/link2",
        read: false,
      },
      {
        text: "Link 3",
        url: "https://www.example.com/link3",
        read: false,
      },
      {
        text: "Link 4",
        url: "https://www.example.com/link4",
        read: false,
      },
      {
        text: "Link 5",
        url: "https://www.example.com/link5",
        read: false,
      },
    ],
  },
};
