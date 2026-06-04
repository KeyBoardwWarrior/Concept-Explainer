import express, { json } from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { jsonrepair } from "jsonrepair";

dotenv.config();

// The models list will query the preferred one first, then fallback sequentially
const FALLBACK_MODELS = [
  process.env.MODEL_NAME,
<<<<<<< HEAD
  // "deepseek/deepseek-v4-flash:free",
  // "google/gemma-4-31b-it:free",
=======
  "deepseek/deepseek-v4-flash:free",
  "google/gemma-4-31b-it:free",
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb
  "openrouter/free"
].filter(Boolean);


const app = express();

app.use(cors());
app.use(json());

<<<<<<< HEAD
// Helper function to robustly extract and parse JSON from LLM text
function parseRobustJson(text) {
  const start = text.indexOf('{');
  if (start === -1) {
    throw new Error("No opening curly brace '{' found in response.");
  }
  
  let braceCount = 0;
  let inQuote = false;
  let escape = false;
  let jsonBlock = null;
  
  for (let i = start; i < text.length; i++) {
    const char = text[i];
    
    if (escape) {
      escape = false;
      continue;
    }
    
    if (char === '\\') {
      escape = true;
      continue;
    }
    
    if (char === '"') {
      inQuote = !inQuote;
      continue;
    }
    
    if (!inQuote) {
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          jsonBlock = text.slice(start, i + 1);
          break;
        }
      }
    }
  }
  
  if (!jsonBlock) {
    throw new Error("No matching closing curly brace '}' found in response.");
  }
  
  try {
    const repaired = jsonrepair(jsonBlock);
    return JSON.parse(repaired);
  } catch (err) {
    console.warn("JSON repair failed, trying raw parse:", err.message);
    return JSON.parse(jsonBlock);
  }
}

// Helper function to query OpenRouter with automatic multi-model fallback and JSON validation
async function queryOpenRouterWithFallback(prompt, parseFn) {
=======
// Helper function to query OpenRouter with automatic multi-model fallback
async function queryOpenRouterWithFallback(prompt) {
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb
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
      
<<<<<<< HEAD
=======
      // OpenRouter sometimes returns 200 OK but with an error body (like Venice upstream 429)
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb
      if (data.error) {
        throw new Error(`OpenRouter Error: ${data.error.message || JSON.stringify(data.error)}`);
      }

      const text = data.choices?.[0]?.message?.content;
      if (!text) {
        throw new Error(`Empty response choices from model ${model}`);
      }

      console.log(`Successfully received response from model: ${model}`);
<<<<<<< HEAD
      
      // Attempt to parse and validate
      const parsedData = parseFn(text);
      console.log(`Successfully parsed response from model: ${model}`);
      return parsedData;

    } catch (err) {
      console.warn(`Model "${model}" failed or returned invalid JSON: ${err.message}. Trying next fallback...`);
=======
      return text;

    } catch (err) {
      console.warn(`Model "${model}" failed: ${err.message}. Trying next fallback...`);
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb
      lastError = err;
    }
  }

<<<<<<< HEAD
  throw new Error(`All fallback models exhausted or failed to return valid JSON. Last error: ${lastError ? lastError.message : "Unknown"}`);
=======
  throw new Error(`All fallback models exhausted. Last error: ${lastError ? lastError.message : "Unknown"}`);
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb
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
<<<<<<< HEAD
      - Ensure all double quotes inside JSON string values are properly escaped as \\" (or use single quotes instead) to prevent JSON parsing errors.
      - Do NOT include any trailing commas after the last property or list item.
    `;

    const parsed = await queryOpenRouterWithFallback(prompt, (text) => {
      const data = parseRobustJson(text);
      if (!data.definition || !data.principles || !data.applications || !data.analogy) {
        throw new Error("Missing required JSON keys (definition, principles, applications, analogy)");
      }
      if (!Array.isArray(data.principles) || !Array.isArray(data.applications)) {
        throw new Error("principles or applications are not arrays");
      }
      data.principles = data.principles.slice(0, 2);
      data.applications = data.applications.slice(0, 2);
      return data;
    });
=======
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
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb

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
<<<<<<< HEAD
      - Ensure all double quotes inside JSON string values are properly escaped as \\" (or use single quotes instead) to prevent JSON parsing errors.
      - Do NOT include any trailing commas.
    `;

    const parsed = await queryOpenRouterWithFallback(prompt, (text) => {
      const data = parseRobustJson(text);
      if (!data.analogy) {
        throw new Error("Missing required JSON key: analogy");
      }
      return data;
    });
=======
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
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb

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