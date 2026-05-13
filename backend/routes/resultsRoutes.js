import express from "express";

import {
  generateResult,
  getResults,
} from "../controllers/resultsController.js";

const router = express.Router();

router.get("/", getResults);

router.post("/generate", generateResult);

export default router;