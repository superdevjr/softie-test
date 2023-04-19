import { svgElement } from "./modules/json-to-svg.js";

function appendSvg(targetElement) {
  targetElement.appendChild(svgElement);
}

const body = document.body;
appendSvg(body);
