// function createElementFromJson(json) {
//   if (json.type === "element") {
//     return createElementNodeFromJson(json);
//   } else if (json.type === "text") {
//     return createTextNodeFromJson(json);
//   }
// }

// function createElementNodeFromJson(json) {
//   const element = document.createElementNS(
//     "http://www.w3.org/2000/svg",
//     json.tagName
//   );

//   for (const [name, value] of Object.entries(json.attributes)) {
//     element.setAttribute(name, value);
//   }

//   for (const childJson of json.children) {
//     const childNode = createElementFromJson(childJson);
//     if (childNode) {
//       element.appendChild(childNode);
//     }
//   }
//   return element;
// }

// function createTextNodeFromJson(json) {
//   return document.createTextNode(json.content);
// }
