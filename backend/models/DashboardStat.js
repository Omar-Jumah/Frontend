import mongoose from "mongoose";

const dashboardStatSchema = new mongoose.Schema(
  {
    totalProducts: {
      type: Number,
      default: 0,
    },

    savedHours: {
      type: Number,
      default: 0,
    },

    engagement: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const DashboardStat = mongoose.model(
  "DashboardStat",
  dashboardStatSchema
);

export default DashboardStat;