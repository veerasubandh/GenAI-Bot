const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      index: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Text index for fuzzy-ish search
faqSchema.index({
  question: "text",
  answer: "text",
  category: "text",
  tags: "text"
});

module.exports = mongoose.model("Faq", faqSchema);
