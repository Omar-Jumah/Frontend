import express from "express";

import {
  getCredits,
  getTransactions,
  addCredits,
  useCredits,
} from "../controllers/creditController.js";

const router = express.Router();

router.get("/", getCredits);
router.get("/transactions", getTransactions);
router.post("/topup", addCredits);
router.post("/use-ai", useCredits);

export default router;