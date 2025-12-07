const mongoose = require("mongoose");

const statementSchema = new mongoose.Schema(
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
    month: {
      type: Number, // 1 - 12
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    totalDue: {
      type: Number,
      required: true
    },
    minimumDue: {
      type: Number,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    closingBalance: {
      type: Number,
      required: true
    },
    pdfUrl: {
      type: String // later we can generate / attach real PDFs
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Statement", statementSchema);