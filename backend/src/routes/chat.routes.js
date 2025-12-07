const express = require("express");
const { testChat, handleUserMessage } = require("../controllers/chatController");

const router = express.Router();

// GET /api/v1/chat/test
router.get("/test", testChat);

// POST /api/v1/chat
router.post("/", handleUserMessage);

module.exports = router;