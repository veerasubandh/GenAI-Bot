const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    message: { type: String, required: true },
    intent: { type: String, default: null },
    timestamp: { type: Date, default: Date.now }
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    userId: { type: String, default: null, index: true },
    channel: { type: String, default: "web" },
    startedAt: { type: Date, default: Date.now },
    messages: [messageSchema]
  },
  { timestamps: true }
);

// Making it time-series friendly for Grafana
conversationSchema.index({ createdAt: 1 });

module.exports = mongoose.model("ConversationLog", conversationSchema);
