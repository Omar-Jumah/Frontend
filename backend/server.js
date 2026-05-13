import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import resultsRoutes from "./routes/resultsRoutes.js";
import creditRoutes from "./routes/creditRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/results", resultsRoutes);
app.use("/api/credits", creditRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SmartShop API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});