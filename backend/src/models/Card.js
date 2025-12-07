const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    last4: {
      type: String,
      required: true
    },
    network: {
      type: String,
      enum: ["VISA", "MASTERCARD", "RUPAY", "AMEX"],
      required: true
    },
    cardType: {
      type: String,
      enum: ["PLATINUM", "SIGNATURE", "GOLD", "SILVER", "ENTRY"],
      default: "ENTRY"
    },
    status: {
      type: String,
      enum: ["ACTIVE", "IN_TRANSIT", "BLOCKED", "EXPIRED"],
      default: "IN_TRANSIT"
    },
    creditLimit: {
      type: Number,
      required: true
    },
    availableLimit: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Card", cardSchema);