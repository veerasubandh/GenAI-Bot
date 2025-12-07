module.exports = {
  getOverdueStatus: async (userId) => {
    return {
      overdue: true,
      daysPending: 18,
      penalty: "₹899",
      recommendedAction: "Pay minimum due immediately to avoid further penalty."
    };
  }
};