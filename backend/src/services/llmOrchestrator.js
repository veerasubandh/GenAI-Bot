const logger = require("../utils/logger");
const intentMap = require("./intentMap");
const { setCache, getCache, saveUserContext, getUserContext } = require("./cacheService");
const { classifyIntentAndEntities } = require("./llmProvider");
const { searchKnowledge } = require("./knowledgeService");

// Normalize message
const normalize = (msg) => msg.trim().toLowerCase();
const buildCacheKey = (msg) => `faq:${encodeURIComponent(normalize(msg))}`;

const processUserMessage = async ({ userId, message, channel = "web" }) => {
  const text = normalize(message || "");
  if (!text) return botPayload("Please enter a message.");

  const cacheKey = buildCacheKey(text);
  const cached = await getCache(cacheKey);

  if (cached) {
    logger.debug(`🧠 Cache hit → "${text}"`);
    return { ...cached, meta: { fromCache: true } };
  }

  // 1️⃣ Knowledge Base Priority
  const kbMatch = await searchKnowledge(text);

  if (kbMatch) {
    const reply = {
      response: kbMatch.answer,
      intent: "knowledge_base_faq",
      type: "informational",
      category: kbMatch.category
    };

    await setCache(cacheKey, reply);
    return reply;
  }

  // 2️⃣ Context: Is this a follow-up?
  const context = await getUserContext(userId);
  const isFollowUp = looksLikeFollowUp(text);

  let intent, entities = {}, contextUsed = false;

  if (isFollowUp && context?.lastIntent) {
    logger.debug(`🔁 Follow-up detected → reusing intent: ${context.lastIntent}`);
    intent = context.lastIntent;
    entities = context.lastEntities || {};
    contextUsed = true;
  } else {
    // 3️⃣ AI + Regex fallback
    const nlu = await detectIntent(text, context);
    intent = nlu.intent;
    entities = nlu.entities || {};
  }

  const mapped = intentMap[intent];

  // 4️⃣ Unknown intent
  if (!mapped) {
    const reply = botPayload(getToneResponse("general_faq"), "unknown");
    await setCache(cacheKey, reply);
    return reply;
  }

  // 5️⃣ Informational intent → No DB call
  if (mapped.type === "informational" || !mapped.action) {
    const replyText = getToneResponse(intent);

    const reply = { intent, type: "informational", response: replyText };
    await setCache(cacheKey, reply);

    await updateContext(userId, intent, entities, channel);
    return reply;
  }

  // 6️⃣ Needs login
  if (!userId) {
    return botPayload("🔒 Please sign in to continue.", intent, true);
  }

  // 7️⃣ Execute action
  const result = await mapped.action(
    mapped.requires?.includes("amount") ? entities.amount : userId
  );

  const finalResponse = formatResponse(intent, result);

  const responsePayload = {
    intent,
    response: finalResponse,
    type: "actionable",
    meta: { usedContext: contextUsed }
  };

  await setCache(cacheKey, responsePayload);
  await updateContext(userId, intent, entities, channel);

  return responsePayload;
};

/* ---------------------------------------------
   🔍 Intent Detection (LLM + Regex fallback)
------------------------------------------------*/
const detectIntent = async (msg, context) => {
  try {
    const aiResult = await classifyIntentAndEntities(msg, context?.lastIntent || "");

    if (aiResult.confidence >= 0.45 && intentMap[aiResult.intent]) {
      return aiResult;
    }

    return { intent: detectIntentRegex(msg), entities: {} };
  } catch (err) {
    logger.error("Intent model error:", err.message);
    return { intent: detectIntentRegex(msg), entities: {} };
  }
};

const detectIntentRegex = (msg) => {
  if (/track|where.*card|delivery/i.test(msg)) return "card_delivery_status";
  if (/reissue|lost|replacement/i.test(msg)) return "card_reissue";
  if (/loan|apply.*loan|eligible/i.test(msg)) return /apply/.test(msg) ? "loan_apply" : "loan_query";
  if (/schedule|autopay|standing instruction/i.test(msg)) return "schedule_payment";
  if (/bill|statement|invoice/i.test(msg)) return "bill_summary";
  if (/email.*statement|send.*statement/i.test(msg)) return "send_statement_email";
  if (/emi|installment/i.test(msg)) return "transaction_emi";
  if (/due|repay|outstanding/i.test(msg)) return "repayment_query";
  if (/overdue|late fee|collections/i.test(msg)) return "collections_overdue";
  return "general_faq";
};

const looksLikeFollowUp = (msg) =>
  /ok|yes|same|do it|continue|when|how much/i.test(msg);

/* ---------------------------------------------
   💬 Response Formatting by Intent
------------------------------------------------*/
const formatResponse = (intent, result) => {
  const formats = {
    card_delivery_status: `📦 Status: ${result.status}\n🪪 Last 4 digits: ${result.last4}`,
    bill_summary: `📄 Bill: ₹${result.totalDue}\n📅 Due: ${result.dueDate}`,
    repayment_query: `💰 Outstanding: ₹${result.outstanding}\n📅 Due: ${result.dueDate}`,
    transaction_emi: result.eligible
      ? `✔ Eligible for EMI\nOptions: ${result.tenures.join(", ")} months`
      : result.message,
    collections_overdue: `⚠ Overdue Balance: ₹${result.overdue}\nLate Fee: ₹${result.penalty}`,
    send_statement_email: result.success ? "📧 Your statement has been emailed." : result.message
  };

  return formats[intent] || result.message || "Done.";
};

/* ---------------------------------------------
   🎯 Tone-Based Response Suggestions
------------------------------------------------*/
const responseTone = {
  loan_query: [
    "You may be eligible for a loan. I can help you explore or start the process.",
    "Loan assistance available — want eligibility details?",
    "I can walk you through eligibility or help begin your loan request."
  ],
  schedule_payment: [
    "Sure — what date each month works best (e.g., 5th)?",
    "We can automate this — what monthly payment date would you prefer?",
    "Understood — please share the calendar date you'd like scheduled."
  ],
  general_faq: [
    "I'm here to help with your credit card: billing, EMIs, card delivery, repayments or loans.",
    "Try asking: 'Track my card' or 'Show my bill'.",
    "I can assist with card tracking, statements, EMIs or repayments."
  ]
};

const getToneResponse = (intent) => {
  const options = responseTone[intent] || responseTone.general_faq;
  return options[Math.floor(Math.random() * options.length)];
};

/* ---------------------------------------------
   🧠 Helpers
------------------------------------------------*/
const updateContext = async (userId, intent, entities, channel) => {
  await saveUserContext(userId, {
    lastIntent: intent,
    lastEntities: entities,
    lastChannel: channel
  });
};

const botPayload = (response, intent = "general_faq", requiresAuth = false) => ({
  intent,
  response,
  requiresAuth
});

module.exports = { processUserMessage };
