import mongoose from "mongoose";

const creditSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      default: "Eman",
    },

    totalCredits: {
      type: Number,
      default: 200,
    },

    usedCredits: {
      type: Number,
      default: 50,
    },

    remainingCredits: {
      type: Number,
      default: 150,
    },
  },
  {
    timestamps: true,
  }
);

const Credit = mongoose.model("Credit", creditSchema);

export default Credit;