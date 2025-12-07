const ConversationLog = require("../models/ConversationLog");
const crypto = require("crypto");

const getOrCreateSession = async (userId, channel) => {
  const sessionId = crypto.randomUUID();

  const session = await ConversationLog.create({
    userId: userId || null,
    channel,
    sessionId,
    messages: []
  });

  return session;
};

const appendMessage = async ({ sessionId, role, message, intent = null }) => {
  await ConversationLog.updateOne(
    { sessionId },
    {
      $push: {
        messages: {
          role,
          message,
          intent,
          timestamp: new Date()
        }
      }
    }
  );
};

module.exports = { getOrCreateSession, appendMessage };
