import mongoose from "mongoose";

const creditTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    amount: Number,

    type: {
      type: String,
      enum: ["topup", "usage"],
    },

    description: String,
  },
  {
    timestamps: true,
  }
);

const CreditTransaction = mongoose.model(
  "CreditTransaction",
  creditTransactionSchema
);

export default CreditTransaction;