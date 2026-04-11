import express, { json } from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.post("/api/explain", async (req, res) => {
  try {
    const { concept, level } = req.body;
    console.log({concept,level});

    if (!concept || !level) {
      return res.status(400).json({
        error: "Concept and level are required",
      });
    }

    const prompt = `
      Explain the concept "${concept}" for a ${level} learner.

      Return ONLY valid JSON in this format:
      {
        "definition": "...",
        "principles": ["...", "..."],
        "applications": ["...", "..."],
        "analogy": "..."
      }

      Rules:
      - Exactly 2 principles
      - Exactly 2 applications
      - STRICT: Return ONLY raw JSON (no markdown, no explanation)
      - Keep explanation appropriate for ${level}
      `;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free", //"minimax/minimax-m2.5:free"
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({
        error: "No response from AI",
        raw: data,
      });
    }

    let parsed;
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);

      // 🔹 Safety: ensure only 2 items
      if (parsed.principles) {
        parsed.principles = parsed.principles.slice(0, 2);
      }
      if (parsed.applications) {
        parsed.applications = parsed.applications.slice(0, 2);
      }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
        error: "Failed to parse AI response",
        raw: text,
      });
    }

    res.json(parsed);

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Something went wrong on server",
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