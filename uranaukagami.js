import { serveWeb } from "https://code4fukui.github.io/wsutil/serveWeb.js";
import { fetchImageRecog } from "https://code4fukui.github.io/openai-imagerecog/fetchImageRecog.js"

serveWeb(async (param, req, path, conn) => {
  if (path == "/api/imagerecog") {
    const res = await fetchImageRecog(param.imgbin, param.prompt);
    return res;
  }
  return null;
});
