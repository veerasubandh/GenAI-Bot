const { createClient } = require("redis");
const config = require("./env");

const redisClient = createClient({
  url: config.redisUrl
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis connected");
    }
  } catch (error) {
    console.error("Redis connection error:", error.message);
  }
};

module.exports = {
  redisClient,
  connectRedis
};