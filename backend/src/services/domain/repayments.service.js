module.exports = {
  getRepaymentInfo: async (userId) => {
    return {
      outstanding: "₹22,540",
      dueDate: "2025-02-05",
      paymentOptions: ["Full Payment", "Minimum Due", "Flexible EMI"]
    };
  }
};