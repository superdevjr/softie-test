export function processIds(element, idElements) {
  element.querySelectorAll("*").forEach((childElement) => {
    if (childElement.hasAttribute("id")) {
      const elementId = childElement.id;
      if (
        childElement.tagName === "text" ||
        childElement.tagName === "rect" ||
        childElement.tagName === "circle" ||
        childElement.tagName === "ellipse" ||
        childElement.tagName === "line" ||
        childElement.tagName === "polygon" ||
        childElement.tagName === "polyline"
      ) {
        if (!idElements[elementId]) {
          idElements[elementId] = childElement;
        } else {
          // Add a comment to the object if the id already exists
          idElements[elementId] = {
            ...idElements[elementId],
            comment: "Multiple elements with the same id",
          };
        }
      }
    }
  });
}
