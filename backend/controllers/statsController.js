import DashboardStat from "../models/DashboardStat.js";

export const getStats = async (req, res) => {
  try {
    const stats = await DashboardStat.findOne();

    res.json({
      stats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};