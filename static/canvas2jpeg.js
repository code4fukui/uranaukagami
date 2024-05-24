import { Base64 } from "https://code4fukui.github.io/Base64/Base64.js";

const resizedCanvas = (canvas, width) => {
  if (!width || canvas.width == width) return canvas;
  const c2 = document.createElement("canvas");
  c2.width = width;
  c2.height = Math.floor(width / canvas.width * canvas.height);
  const g = c2.getContext("2d");
  g.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, c2.width, c2.height);
  return c2;
};

export const canvas2jpeg = (canvas, width = null) => {
  canvas = resizedCanvas(canvas, width);
  const dataurl = canvas.toDataURL("image/jpeg");
  const bin = Base64.decode(dataurl.substring(dataurl.indexOf(",") + 1));
  return bin;
};
