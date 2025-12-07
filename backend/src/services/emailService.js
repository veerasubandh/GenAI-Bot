const nodemailer = require("nodemailer");
const config = require("../config/env");
const logger = require("../utils/logger");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // add to .env
    pass: process.env.MAIL_PASS
  }
});

const sendStatementEmail = async (user, filePath) => {
  const mailOptions = {
    from: `"Credit Card Support" <${process.env.MAIL_USER}>`,
    to: user.email,
    subject: "Your Credit Card Statement",
    text: `Hello ${user.fullName},\n\nAttached is your requested credit card statement.\n\nThank you!`,
    attachments: [
      {
        filename: filePath.split("/").pop(),
        path: filePath
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Statement sent successfully." };
  } catch (err) {
    logger.error("Email send error:", err.message);
    return { success: false, message: "Failed to send email." };
  }
};

module.exports = { sendStatementEmail };