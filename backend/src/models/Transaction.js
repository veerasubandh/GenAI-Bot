const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "INR"
    },
    merchantName: {
      type: String,
      required: true
    },
    category: {
      type: String, // "GROCERY", "TRAVEL", "ONLINE", etc.
      required: true
    },
    postedAt: {
      type: Date,
      required: true
    },
    isEmi: {
      type: Boolean,
      default: false
    },
    emiTenureMonths: {
      type: Number
    },
    emiPlanId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);