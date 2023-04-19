import { newString } from "./modules/svg-to-json.js";
import { createElementNodeFromJson } from "./modules/json-to-svg.js";

function jsonToSvg(json) {
  const svgElement = createElementNodeFromJson(json);
  return svgElement;
}

const svgElement = jsonToSvg(newString);

function appendSvg(targetElement) {
  targetElement.appendChild(svgElement);
}

const body = document.body;
appendSvg(body);
