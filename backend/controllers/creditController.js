import Credit from "../models/Credit.js";
import CreditTransaction from "../models/CreditTransaction.js";

const getOrCreateWallet = async () => {
  let wallet = await Credit.findOne();

  if (!wallet) {
    wallet = await Credit.create({
      userName: "Eman",
      totalCredits: 200,
      usedCredits: 50,
      remainingCredits: 150,
    });
  }

  return wallet;
};

export const getCredits = async (req, res) => {
  try {
    const wallet = await getOrCreateWallet();

    res.json({
      credits: wallet.remainingCredits,
      wallet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await CreditTransaction.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCredits = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Invalid credit amount",
      });
    }

    const wallet = await getOrCreateWallet();
    const creditAmount = Number(amount);

    wallet.totalCredits += creditAmount;
    wallet.remainingCredits += creditAmount;

    await wallet.save();

    const transaction = await CreditTransaction.create({
      amount: creditAmount,
      type: "topup",
      description: `Top up ${creditAmount} credits`,
    });

    res.status(201).json({
      message: "Credits added successfully",
      credits: wallet.remainingCredits,
      wallet,
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const useCredits = async (req, res) => {
  try {
    const { amount, description } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Invalid usage amount",
      });
    }

    const wallet = await getOrCreateWallet();
    const usageAmount = Number(amount);

    if (wallet.remainingCredits < usageAmount) {
      return res.status(400).json({
        message: "رصيد الكريدت غير كافي",
        credits: wallet.remainingCredits,
      });
    }

    wallet.usedCredits += usageAmount;
    wallet.remainingCredits -= usageAmount;

    await wallet.save();

    const transaction = await CreditTransaction.create({
      amount: usageAmount,
      type: "usage",
      description: description || `AI usage ${usageAmount} credits`,
    });

    res.status(201).json({
      message: "AI credits used successfully",
      credits: wallet.remainingCredits,
      wallet,
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};