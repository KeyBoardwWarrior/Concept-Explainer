import express, { json } from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// The models list will query the preferred one first, then fallback sequentially
const FALLBACK_MODELS = [
  process.env.MODEL_NAME,
  "deepseek/deepseek-v4-flash:free",
  "google/gemma-4-31b-it:free",
  "openrouter/free"
].filter(Boolean);


const app = express();

app.use(cors());
app.use(json());

// Helper function to query OpenRouter with automatic multi-model fallback
async function queryOpenRouterWithFallback(prompt) {
  let lastError = null;

  for (const model of FALLBACK_MODELS) {
    try {
      console.log(`Querying OpenRouter model: ${model}`);
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errText}`);
      }

      const data = await response.json();
      
      // OpenRouter sometimes returns 200 OK but with an error body (like Venice upstream 429)
      if (data.error) {
        throw new Error(`OpenRouter Error: ${data.error.message || JSON.stringify(data.error)}`);
      }

      const text = data.choices?.[0]?.message?.content;
      if (!text) {
        throw new Error(`Empty response choices from model ${model}`);
      }

      console.log(`Successfully received response from model: ${model}`);
      return text;

    } catch (err) {
      console.warn(`Model "${model}" failed: ${err.message}. Trying next fallback...`);
      lastError = err;
    }
  }

  throw new Error(`All fallback models exhausted. Last error: ${lastError ? lastError.message : "Unknown"}`);
}

app.post("/api/explain", async (req, res) => {
  try {
    const { concept, level } = req.body;
    console.log("Explaining concept:", { concept, level });

    if (!concept || !level) {
      return res.status(400).json({
        error: "Concept and level are required",
      });
    }

    const prompt = `
      Explain the concept "${concept}" in-depth for a ${level} learner.
      
      We need a highly detailed, comprehensive, and wordy response. Do NOT use brief or concise summaries.

      Return ONLY valid JSON in this format:
      {
        "definition": "A highly detailed, comprehensive explanation (at least 120-150 words) defining the concept, its core context, history, and scientific/intellectual significance.",
        "principles": [
          "A substantial, fully-elaborated paragraph (at least 80-100 words) describing the first key principle in depth—how it functions, why it's critical, and its mechanics.",
          "A substantial, fully-elaborated paragraph (at least 80-100 words) describing the second key principle in depth—how it functions, why it's critical, and its mechanics."
        ],
        "applications": [
          "A rich, descriptive paragraph (at least 80-100 words) detailing a concrete, real-world application, specific industry or scientific domain use case, and its modern impact.",
          "A rich, descriptive paragraph (at least 80-100 words) detailing another concrete, real-world application, specific industry or scientific domain use case, and its modern impact."
        ],
        "analogy": "A highly descriptive, narrative, and elaborate analogy (at least 120-150 words) setting up a vivid scenario, walking through all corresponding details, and explaining exactly how the scenario maps back to the technical concept."
      }

      Rules:
      - Exactly 2 principles and 2 applications.
      - Each text block MUST be highly detailed, informative, and substantial in length. Avoid simple sentences.
      - STRICT: Return ONLY raw JSON (no markdown, no backticks, no wrap).
      - Keep vocabulary and depth perfectly tuned for a ${level} learner, but maximize elaboration.
    `;

    const text = await queryOpenRouterWithFallback(prompt);

    let parsed;
    try {
      const startIndex = text.indexOf('{');
      const endIndex = text.lastIndexOf('}');
      if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
        throw new Error("No valid JSON block found in AI response.");
      }
      const jsonBlock = text.slice(startIndex, endIndex + 1);
      parsed = JSON.parse(jsonBlock);

      // 🔹 Safety: ensure only 2 items
      if (parsed.principles) {
        parsed.principles = parsed.principles.slice(0, 2);
      }
      if (parsed.applications) {
        parsed.applications = parsed.applications.slice(0, 2);
      }

    } catch (err) {
      console.error("JSON parsing error:", err);
      return res.status(500).json({
        error: "Failed to parse AI response as valid JSON",
        raw: text,
      });
    }

    res.json(parsed);

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: error.message || "Something went wrong on server",
    });
  }
});

app.post("/api/analogy", async (req, res) => {
  try {
    const { concept, level } = req.body;
    console.log("Generating new analogy for:", { concept, level });

    if (!concept || !level) {
      return res.status(400).json({
        error: "Concept and level are required",
      });
    }

    const prompt = `
      Provide a brand new, highly creative, descriptive, and deeply intuitive narrative analogy to explain the concept "${concept}" to a ${level} learner.
      
      The analogy must be highly detailed and elaborate (at least 120-150 words), walking through a vivid real-world comparison scenario and explaining exactly how the mechanics of the scenario map back to the concept.

      Return ONLY valid JSON in this format:
      {
        "analogy": "..."
      }

      Rules:
      - Must be an elaborate, rich paragraph.
      - Make sure the analogy is highly appropriate for a ${level} level.
      - STRICT: Return ONLY raw JSON (no markdown, no explanation, no backticks).
    `;

    const text = await queryOpenRouterWithFallback(prompt);

    let parsed;
    try {
      const startIndex = text.indexOf('{');
      const endIndex = text.lastIndexOf('}');
      if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
        throw new Error("No valid JSON block found in AI response.");
      }
      const jsonBlock = text.slice(startIndex, endIndex + 1);
      parsed = JSON.parse(jsonBlock);
    } catch (err) {
      console.error("Analogy parsing error:", err);
      return res.status(500).json({
        error: "Failed to parse AI analogy response",
        raw: text,
      });
    }

    res.json(parsed);

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: error.message || "Something went wrong on server",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});