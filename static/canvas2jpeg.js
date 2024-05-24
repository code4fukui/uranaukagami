import { Base64 } from "https://code4fukui.github.io/Base64/Base64.js";

export const canvas2jpeg = (canvas) => {
  const dataurl = canvas.toDataURL("image/jpeg");
  const bin = Base64.decode(dataurl.substring(dataurl.indexOf(",") + 1));
  return bin;
};
