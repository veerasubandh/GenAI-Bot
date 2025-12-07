const Faq = require("../models/Faq");
const logger = require("../utils/logger");

/**
 * Search KB for a given user message.
 * We try:
 * 1) Mongo text search (relevance ranked)
 * 2) Simple regex fallback on keywords
 */
const searchKnowledge = async (message) => {
  const query = (message || "").trim();
  if (!query) return null;

  const lower = query.toLowerCase();

  try {
    // 1️⃣ Text search with relevance score
    const textResults = await Faq.find(
      { $text: { $search: query }, isActive: true },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(3)
      .lean();

    if (textResults.length > 0) {
      const top = textResults[0];
      return {
        category: top.category,
        question: top.question,
        answer: top.answer,
        source: "text_search"
      };
    }

    // 2️⃣ Fallback: keyword-based regex on question + tags
    const keywords = lower.split(/\s+/).filter((w) => w.length > 3);
    if (keywords.length === 0) return null;

    const regexConditions = keywords.map((word) => ({
      $or: [
        { question: { $regex: word, $options: "i" } },
        { tags: { $regex: word, $options: "i" } }
      ]
    }));

    const regexResult = await Faq.findOne({
      isActive: true,
      $and: regexConditions
    }).lean();

    if (regexResult) {
      return {
        category: regexResult.category,
        question: regexResult.question,
        answer: regexResult.answer,
        source: "regex_fallback"
      };
    }

    return null;
  } catch (err) {
    logger.error("Knowledge search error:", err.message);
    return null;
  }
};

module.exports = {
  searchKnowledge
};
