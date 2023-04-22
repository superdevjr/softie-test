import { svgElement } from "./modules/json-to-svg-process.js";

function appendSvg(targetElement) {
  targetElement.appendChild(svgElement);
  console.log("svgappended");
}

const body = document.body;
appendSvg(body);
