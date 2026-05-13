import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    socialAd: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      required: true,
    },

    hashtags: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      default: 80,
    },
  },

  {
    timestamps: true,
  }
);

const Result = mongoose.model(
  "Result",
  resultSchema
);

export default Result;