import axios from "axios";
import config from "../config/config.js";

const promptGemini = async (promptMessage) => {
  const result = await axios.post(
    config.gemini.url,
    {
      contents: [
        {
          parts: [
            {
              text: promptMessage,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "X-goog-api-key": config.gemini.apiKey,
      },
    }
  );
  return result.data.candidates[0].content.parts[0].text;
};

export default promptGemini;
