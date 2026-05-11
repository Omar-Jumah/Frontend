import fs from "fs";
import path from "path";

function getType(imagePath) {
    const ext = path.extname(imagePath).toLowerCase();

    if (ext === ".png") return "image/png";
    if (ext === ".webp") return "image/webp";
    if (ext === ".gif") return "image/gif";

    return "image/jpeg";
}

function cleanAIResponse(text) {
    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
}

async function analyzeImage(imagePath, userText) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";

    if (!apiKey) {
        throw new Error("Missing OPENROUTER_API_KEY");
    }

    const base64Image = fs.readFileSync(imagePath).toString("base64");
    const mimeType = getType(imagePath);

    const prompt = `
أنت خبير تسويق رقمي.

حلل صورة المنتج واكتب النتيجة كـ JSON فقط بهذا الشكل:

{
  "description": "",
  "ad": "",
  "bio": "",
  "hashtags": []
}

ممنوع ترجع markdown.
ممنوع ترجع شرح خارج JSON.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model,
            max_tokens: 1000,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `${prompt}\n\nUser Text:\n${userText || ""}`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${mimeType};base64,${base64Image}`
                            }
                        }
                    ]
                }
            ]
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error?.message ||
            `OpenRouter request failed with status ${response.status}`
        );
    }

    const aiText = cleanAIResponse(data?.choices?.[0]?.message?.content || "");

    try {
        return {
            raw: aiText,
            parsed: JSON.parse(aiText),
            model
        };
    } catch {
        throw new Error("AI did not return valid JSON: " + aiText);
    }
}

export {
    analyzeImage
};