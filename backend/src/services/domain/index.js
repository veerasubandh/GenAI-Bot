const onboarding = require("./onboarding.service");
const cardDelivery = require("./cardDelivery.service");
const transactions = require("./transactions.service");
const billStatement = require("./billStatement.service");
const repayments = require("./repayments.service");
const collections = require("./collections.service");

module.exports = {
  onboarding,
  cardDelivery,
  transactions,
  billStatement,
  repayments,
  collections
};