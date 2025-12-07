const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,
  openAiApiKey: process.env.OPENAI_API_KEY
};

if (!config.mongoUri) {
  console.warn("MONGO_URI is not set in .env");
}

if (!config.redisUrl) {
  console.warn("REDIS_URL is not set in .env");
}

module.exports = config;