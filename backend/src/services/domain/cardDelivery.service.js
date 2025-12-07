const Card = require("../../models/Card");
const User = require("../../models/User");

module.exports = {
  getCardStatus: async (userId) => {
    if (!userId) {
      return {
        message: "User ID missing. Please authenticate or provide a registered phone/email."
      };
    }

    // Get user and linked card
    const user = await User.findOne({ customerId: userId });
    if (!user) return { message: "No user found with this ID." };

    const card = await Card.findOne({ user: user._id }).lean();

    if (!card) {
      return {
        message: "No card record exists yet. Try again after onboarding completes."
      };
    }

    // Convert status into more human-friendly messaging
    let statusMessage = "";
    switch (card.status) {
      case "IN_TRANSIT":
        statusMessage = "Your card is currently in transit.";
        break;
      case "ACTIVE":
        statusMessage = "Your card is active and ready to use!";
        break;
      case "BLOCKED":
        statusMessage = "Your card has been blocked.";
        break;
      default:
        statusMessage = `Current card status: ${card.status}`;
    }

    return {
      status: card.status,
      message: statusMessage,
      last4: card.last4,
      cardType: card.cardType,
      network: card.network
    };
  }
};