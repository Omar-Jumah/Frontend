import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import analysisRoutes from "./routes/analysisRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/web")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api/analysis", analysisRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});