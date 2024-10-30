import { fetchWeb } from "https://code4fukui.github.io/wsutil/fetchWeb.js";
import { fetchImageRecog } from "https://code4fukui.github.io/openai-imagerecog/fetchImageRecog.js"

export default fetchWeb(async (param, req, path, conninfo) => {
  if (path == "/api/imagerecog") {
    const res = await fetchImageRecog(param.imgbin, param.prompt);
    return res;
  }
  return null;
});
