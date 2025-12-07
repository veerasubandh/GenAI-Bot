const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const userId = req.headers["x-user-id"];

  // If no user ID, treat as anonymous user
  if (!userId) {
    req.auth = { isAuthenticated: false, user: null };
    return next();
  }

  // Lookup in DB
  const user = await User.findOne({ customerId: userId }).lean();

  if (!user) {
    // Unknown user but still allow chatbot to respond
    req.auth = { isAuthenticated: false, user: null };
    return next();
  }

  req.auth = {
    isAuthenticated: true,
    user
  };

  next();
};

module.exports = authMiddleware;