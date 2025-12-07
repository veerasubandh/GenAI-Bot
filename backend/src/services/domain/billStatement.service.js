const Statement = require("../../models/Statement");
const User = require("../../models/User");
const Card = require("../../models/Card");
const { generateStatementPDF } = require("../pdfService");
const { sendStatementEmail } = require("../emailService");

module.exports = {
  getLatestStatement: async (userId) => {
    const user = await User.findOne({ customerId: userId });
    const card = await Card.findOne({ user: user._id });
    return await Statement.findOne({ user: user._id, card: card._id }).sort({ year: -1, month: -1 }).lean();
  },

  sendStatementToEmail: async (userId) => {
    const user = await User.findOne({ customerId: userId });
    if (!user) return { success: false, message: "User not found." };

    const card = await Card.findOne({ user: user._id });
    const statement = await Statement.findOne({ user: user._id, card: card._id })
      .sort({ year: -1, month: -1 })
      .lean();

    if (!statement) return { success: false, message: "No statement found." };

    const { filePath } = await generateStatementPDF(statement, user);

    return await sendStatementEmail(user, filePath);
  }
};
