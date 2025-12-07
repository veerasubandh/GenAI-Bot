module.exports = {
  checkEMIEligibility: async (amount) => {
    if (!amount) {
      return {
        eligible: false,
        message: "Please provide the transaction amount to check EMI eligibility."
      };
    }

    if (amount < 2500) {
      return { eligible: false, message: "Minimum ₹2,500 required for EMI." };
    }

    return {
      eligible: true,
      tenures: ["3 months", "6 months", "9 months", "12 months"],
      interestRate: "13% APR"
    };
  }
};