import dotenv from "dotenv";
import connectDB from "../config/db.js";

import User from "../models/User.js";
import DashboardStat from "../models/DashboardStat.js";
import CreditTransaction from "../models/CreditTransaction.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await DashboardStat.deleteMany();
    await CreditTransaction.deleteMany();

    const user = await User.create({
      name: "SmartShop User",
      email: "smartshop@demo.com",
      credits: 120,
    });

    await DashboardStat.create({
      totalProducts: 3,
      savedHours: 4,
      engagement: 67,
    });

    await CreditTransaction.create([
      {
        userId: user._id,
        amount: 120,
        type: "topup",
        description: "Initial credit balance",
      },
    ]);

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();