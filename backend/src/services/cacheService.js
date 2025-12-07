const { redisClient } = require("../config/redis");
const logger = require("../utils/logger");

const DEFAULT_TTL_SECONDS = 60 * 5; // 5 minutes for FAQ / LLM responses
const CONTEXT_TTL_SECONDS = 60 * 30; // 30 minutes for conversation context

const safeJsonParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
};

const setCache = async (key, value, ttl = DEFAULT_TTL_SECONDS) => {
  try {
    if (!redisClient?.isOpen) return;
    await redisClient.set(key, JSON.stringify(value), { EX: ttl });
  } catch (err) {
    logger.error("Redis setCache error:", err.message);
  }
};

const getCache = async (key) => {
  try {
    if (!redisClient?.isOpen) return null;
    const data = await redisClient.get(key);
    if (!data) return null;
    return safeJsonParse(data);
  } catch (err) {
    logger.error("Redis getCache error:", err.message);
    return null;
  }
};

// ---------- User Context Helpers ----------

const buildUserContextKey = (userId) => `user:ctx:${userId}`;

const saveUserContext = async (userId, context) => {
  if (!userId) return; // anonymous users won't have long-lived context
  const key = buildUserContextKey(userId);
  const payload = {
    ...context,
    lastUpdatedAt: new Date().toISOString()
  };
  await setCache(key, payload, CONTEXT_TTL_SECONDS);
};

const getUserContext = async (userId) => {
  if (!userId) return null;
  const key = buildUserContextKey(userId);
  return await getCache(key);
};

module.exports = {
  setCache,
  getCache,
  saveUserContext,
  getUserContext
};