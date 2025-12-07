const domain = require("./domain");

module.exports = {

  // ================================
  // 💳 1. ACCOUNT & ONBOARDING
  // ================================
  account_faq: {
    category: "account_onboarding",
    type: "informational",
    action: null
  },
  kyc_status: {
    category: "account_onboarding",
    type: "actionable",
    action: domain.onboarding.getKYCStatus,
    responseFormat: "kyc_details"
  },
  card_activation: {
    category: "account_onboarding",
    type: "actionable",
    action: domain.onboarding.activateCard,
    responseFormat: "activation_status"
  },
  profile_update_request: {
    category: "account_onboarding",
    type: "actionable",
    action: domain.onboarding.requestProfileUpdate,
    responseFormat: "profile_update"
  },

  // ================================
  // 🚚 2. CARD DELIVERY
  // ================================
  card_delivery_status: {
    category: "card_delivery",
    type: "actionable",
    action: domain.cardDelivery.getCardStatus,
    responseFormat: "delivery_status"
  },
  card_reissue: {
    category: "card_delivery",
    type: "actionable",
    action: domain.cardDelivery.reissueCard,
    responseFormat: "reissue_confirmation"
  },
  change_delivery_address: {
    category: "card_delivery",
    type: "actionable",
    action: domain.cardDelivery.updateDeliveryAddress,
    requiresFollowUp: true,
    responseFormat: "address_update"
  },

  // ================================
  // 💰 3. TRANSACTION & EMI
  // ================================
  transaction_history: {
    category: "transactions",
    type: "actionable",
    action: domain.transactions.getRecentTransactions,
    responseFormat: "transactions_list"
  },
  transaction_emi: {
    category: "transactions",
    type: "actionable",
    action: domain.transactions.checkEMIEligibility,
    requires: ["amount"],
    responseFormat: "emi_details"
  },
  refund_status: {
    category: "transactions",
    type: "actionable",
    action: domain.transactions.checkRefundStatus,
    responseFormat: "refund_status"
  },

  // ================================
  // 📄 4. BILL & STATEMENT
  // ================================
  bill_summary: {
    category: "billing",
    type: "actionable",
    action: domain.billStatement.getLatestStatement,
    responseFormat: "statement_summary"
  },
  send_statement_email: {
    category: "billing",
    type: "actionable",
    action: domain.billStatement.sendStatementToEmail,
    responseFormat: "email_confirmation"
  },
  billing_cycle_info: {
    category: "billing",
    type: "informational",
    action: null
  },

  // ================================
  // 💸 5. REPAYMENTS
  // ================================
  repayment_query: {
    category: "repayments",
    type: "actionable",
    action: domain.repayments.getRepaymentInfo,
    responseFormat: "repayment_summary"
  },
  schedule_payment: {
    category: "repayments",
    type: "actionable",
    requiresFollowUp: true,
    action: domain.repayments.schedulePayment,
    responseFormat: "schedule_confirmation"
  },
  enable_auto_debit: {
    category: "repayments",
    type: "actionable",
    action: domain.repayments.enableAutoDebit,
    responseFormat: "autodebit_status"
  },

  // ================================
  // 🚨 6. COLLECTIONS
  // ================================
  collections_overdue: {
    category: "collections",
    type: "actionable",
    action: domain.collections.getOverdueStatus,
    responseFormat: "overdue_details"
  },
  settlement_request: {
    category: "collections",
    type: "actionable",
    action: domain.collections.requestSettlement,
    responseFormat: "settlement_offer"
  },
  dispute_charges: {
    category: "collections",
    type: "informational",
    action: null
  },

  // ================================
  // 🔮 NEW HYBRID LOAN FLOW (requested)
  // ================================
  loan_query: {
    category: "loan",
    type: "informational",
    action: null
  },
  loan_apply: {
    category: "loan",
    type: "actionable",
    requiresFollowUp: true,
    action: domain.loan?.startLoanApplication,
    responseFormat: "loan_application_started"
  },

  // ================================
  // 🔄 FALLBACK
  // ================================
  general_faq: {
    category: "fallback",
    type: "informational",
    action: null
  }
};
