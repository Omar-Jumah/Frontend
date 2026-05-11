import express from "express";
import multer from "multer";

import { analyzeAndSave } from "../controllers/analysisController.js";

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post("/", upload.single("image"), analyzeAndSave);

export default router;