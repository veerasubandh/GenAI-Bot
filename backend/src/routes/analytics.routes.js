const router = require("express").Router();
const ConversationLog = require("../models/ConversationLog");

// Returns count of messages per day for activity analytics
router.get("/time-series/messages", async (req, res) => {
  const data = await ConversationLog.aggregate([
    { $unwind: "$messages" },
    {
      $group: {
        _id: {
          day: { $dayOfMonth: "$messages.timestamp" },
          month: { $month: "$messages.timestamp" },
          year: { $year: "$messages.timestamp" }
        },
        totalMessages: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
  ]);

  res.json({ data });
});

module.exports = router;
