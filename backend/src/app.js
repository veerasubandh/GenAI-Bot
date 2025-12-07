const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Basic security & logging
app.use(helmet());
app.use(cors());
app.use(express.json());
const authMiddleware = require("./middleware/authMiddleware");
app.use(authMiddleware);
app.use(morgan("dev"));
app.use("/api/v1/analytics", require("./routes/analytics.routes"));


// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "GenAI Credit Card Assistant backend is running"
  });
});

// API routes
app.use("/api/v1", routes);

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;