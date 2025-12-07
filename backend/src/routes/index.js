const express = require("express");
const chatRoutes = require("./chat.routes");

const router = express.Router();

// Versioned API
router.use("/chat", chatRoutes);

module.exports = router;