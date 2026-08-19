const Token = require('../models/Token');
const Queue = require('../models/Queue');
const Doctor = require('../models/Doctor');
const { TokenStatus } = require('../shared');

async function getAnalyticsSummary(req, res, next) {
  try {
    const today = new Date().toISOString().split('T')[0];

    const totalTokensToday = await Token.countDocuments({
      createdAt: { $gte: new Date(today) }
    });

    const completedTokensToday = await Token.countDocuments({
      status: TokenStatus.COMPLETED,
      updatedAt: { $gte: new Date(today) }
    });

    const activeQueuesCount = await Queue.countDocuments({
      date: today,
      status: 'ACTIVE'
    });

    const availableDoctorsCount = await Doctor.countDocuments({
      status: 'AVAILABLE'
    });

    // Calculate Average Wait Time for completed tokens today
    const completedTokens = await Token.find({
      status: TokenStatus.COMPLETED,
      calledAt: { $exists: true },
      updatedAt: { $gte: new Date(today) }
    });

    let totalWaitMs = 0;
    completedTokens.forEach(t => {
      if (t.calledAt && t.checkedInAt) {
        totalWaitMs += (new Date(t.calledAt) - new Date(t.checkedInAt));
      }
    });

    const avgWaitMinutes = completedTokens.length > 0 
      ? Math.round((totalWaitMs / completedTokens.length) / 60000) 
      : 12;

    res.json({
      success: true,
      data: {
        totalTokensToday,
        completedTokensToday,
        activeQueuesCount,
        availableDoctorsCount,
        avgWaitMinutes
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAnalyticsSummary
};
