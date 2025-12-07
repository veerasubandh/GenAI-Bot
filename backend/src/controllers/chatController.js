const { success, failure } = require("../utils/apiResponse");
const logger = require("../utils/logger");
const llmOrchestrator = require("../services/llmOrchestrator");
const { getOrCreateSession, appendMessage } = require("../services/loggingService");

const testChat = (req, res) => {
  return success(res, { message: "Chat service is up 🚀" }, "Chat test OK");
};

const handleUserMessage = async (req, res) => {
  try {
    const { message, channel = "web" } = req.body;

    // Comes from authentication middleware
    const userId = req.auth?.user?.customerId || null;

    if (!message) {
      return failure(res, "Message is required", 400);
    }

    logger.info(`Incoming: user=${userId || "anonymous"} channel=${channel} message=${message}`);

    // --------------------------
    // 🧠 Conversation Logging Setup
    // --------------------------
    let sessionId = req.headers["x-session-id"];

    if (!sessionId) {
      const session = await getOrCreateSession(userId, channel);
      sessionId = session.sessionId;
      logger.info(`🆕 New chat session created → ${sessionId}`);
    }

    // Log incoming user message
    await appendMessage({ sessionId, role: "user", message });

    // --------------------------
    // 🤖 Call the LLM Orchestrator
    // --------------------------
    const response = await llmOrchestrator.processUserMessage({
      userId,
      message,
      channel
    });

    // --------------------------
    // 📝 Log Assistant Response
    // --------------------------
    await appendMessage({
      sessionId,
      role: "assistant",
      message: response.response,
      intent: response.intent
    });

    // --------------------------
    // 📦 Return Chat + Session ID
    // --------------------------
    return success(
      res,
      { ...response, sessionId },
      "Chat response"
    );

  } catch (error) {
    logger.error("Error in handleUserMessage:", error.message);
    return failure(res, "Failed to process message", 500, error.message);
  }
};

module.exports = {
  testChat,
  handleUserMessage
};
