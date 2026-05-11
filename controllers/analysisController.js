import fs from "fs";
import path from "path";

import Analysis from "../models/Analysis.js";
import { analyzeImage } from "../services/aiAnalysisService.js";

async function analyzeAndSave(req, res) {
    let imagePath = null;

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        imagePath = path.resolve(req.file.path);

        const aiResult = await analyzeImage(imagePath, req.body.text);
        const aiData = aiResult.parsed;

        const savedAnalysis = await Analysis.create({
            ad_text: aiData.ad || "",
            description_G: aiData.description || "",
            bio: aiData.bio || "",
            hashtags: Array.isArray(aiData.hashtags)
                ? aiData.hashtags.join(" ")
                : aiData.hashtags || ""
        });

        return res.status(201).json({
            success: true,
            saved: savedAnalysis,
            ai_response: aiData
        });

    } catch (error) {
        console.error("ANALYSIS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });

    } finally {
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
}

export {
    analyzeAndSave
};