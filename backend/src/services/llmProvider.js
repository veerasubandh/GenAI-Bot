const OpenAI = require("openai");
const config = require("../config/env");
const logger = require("../utils/logger");

let client = config.openAiApiKey ? new OpenAI({ apiKey: config.openAiApiKey }) : null;

const classifyIntentAndEntities = async (message, contextSummary = "") => {
  if (!client) throw new Error("OpenAI key missing — LLM disabled");

  const systemPrompt = `
You are an intent classifier for a credit card assistant.
Return ONLY valid JSON.

Valid Intents:
- card_delivery_status, card_reissue, change_delivery_address
- bill_summary, send_statement_email, billing_cycle_info
- repayment_query, schedule_payment, enable_auto_debit
- transaction_history, transaction_emi, refund_status
- collections_overdue, settlement_request, dispute_charges
- loan_query, loan_apply
- kyc_status, card_activation, profile_update_request
- account_faq, general_faq

Extract:
- amount (number or null)
- date (string or null)
- month (string or null)
- year (number or null)

Return JSON ONLY:
{
 "intent": "...",
 "confidence": 0-1,
 "entities": { "amount": null | number, "date": null | string }
}`;

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `User: ${message}\nContext: ${contextSummary}` }
    ],
    response_format: { type: "json_object" }
  });

  try {
    return JSON.parse(completion.choices[0]?.message?.content || "{}");
  } catch (err) {
    logger.error("LLM Parsing error:", err);
    return { intent: "general_faq", confidence: 0.0, entities: {} };
  }
};

module.exports = { classifyIntentAndEntities };
