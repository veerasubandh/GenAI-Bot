module.exports = {
  getApplicationStatus: async (applicationId) => {
    return {
      status: "Approved",
      nextStep: "Card will be dispatched in 2-3 business days."
    };
  }
};