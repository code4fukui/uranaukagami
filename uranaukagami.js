import { fetchWeb } from "https://code4fukui.github.io/wsutil/fetchWeb.js";
import { fetchImageRecog } from "https://code4fukui.github.io/openai-imagerecog/fetchImageRecog.js"
import { askImage } from "https://code4fukui.github.io/ask/askImage.js";

//const model = "GPT5.3/OpenAI";
const model = "Gemma3/Google";

export default fetchWeb(async (param, req, path, conninfo) => {
  if (path == "/api/model") {
    return model;
  } else if (path == "/api/imagerecog") {
    if (model == "Gemma3/Google") {
      const res = await askImage(param.imgbin, param.prompt);
      return res;
    } else if (model == "GPT5.3/OpenAI") {
      const res = await fetchImageRecog(param.imgbin, param.prompt);
      return res;
    }
  }
  return null;
});
