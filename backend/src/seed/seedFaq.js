const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Faq = require("../models/Faq");

const seedFaqs = async () => {
  try {
    await connectDB();

    console.log("Clearing existing FAQs...");
    await Faq.deleteMany({});

    const faqs = [
  // ACCOUNT & ONBOARDING
  {
    category: "Account & Onboarding",
    question: "How do I apply for a new credit card?",
    answer: "You can apply through the app or website by completing a short form and submitting KYC documents.",
    tags: ["apply", "new card", "KYC"]
  },
  {
    category: "Account & Onboarding",
    question: "Who is eligible for a credit card?",
    answer: "Eligibility depends on age, income, and credit score. FinAI can check your eligibility quickly.",
    tags: ["eligibility", "requirements", "credit score"]
  },
  {
    category: "Account & Onboarding",
    question: "What documents are required to apply?",
    answer: "You typically need a valid ID, address proof, and PAN card. The app guides you step-by-step.",
    tags: ["documents", "KYC", "ID"]
  },
  {
    category: "Account & Onboarding",
    question: "Can I apply for multiple credit cards?",
    answer: "Yes, but approvals depend on your credit limit and banking policies. FinAI can suggest suitable options.",
    tags: ["multiple cards", "approval", "limit"]
  },
  {
    category: "Account & Onboarding",
    question: "Can I update my personal details after account creation?",
    answer: "Yes, details like email, phone number, and address can be updated after verification.",
    tags: ["update", "profile", "personal details"]
  },
  {
    category: "Account & Onboarding",
    question: "What types of credit cards are available?",
    answer: "We offer rewards, cashback, travel, and business credit cards. FinAI can suggest the best option for you.",
    tags: ["card types", "rewards", "cashback", "travel"]
  },
  {
    category: "Account & Onboarding",
    question: "How long does account verification take?",
    answer: "KYC verification is usually completed within 24–48 hours after submission.",
    tags: ["verification", "KYC", "timeframe"]
  },
  {
    category: "Account & Onboarding",
    question: "Can I check my credit limit?",
    answer: "Yes, ask 'What is my credit limit?' and FinAI will provide your current limit instantly.",
    tags: ["credit limit", "account info"]
  },
  {
    category: "Account & Onboarding",
    question: "How can I close my credit card account?",
    answer: "You can request account closure through the app after settling outstanding dues.",
    tags: ["close account", "settlement", "dues"]
  },
  {
    category: "Account & Onboarding",
    question: "Can I link my card to multiple bank accounts?",
    answer: "Yes, you can select a primary account for payments but multiple accounts can be added for convenience.",
    tags: ["bank accounts", "link card", "payments"]
  },
  {
    category: "Account & Onboarding",
    question: "Is my personal data safe?",
    answer: "Absolutely. We follow strict banking security standards and encryption policies.",
    tags: ["security", "data protection", "privacy"]
  },
  {
    category: "Card Delivery",
    question: "How long does card delivery take?",
    answer: "Once your credit card application is approved, delivery typically takes 3–7 business days depending on your location.",
    tags: ["delivery", "timeline", "card status"]
  },
  {
    category: "Card Delivery",
    question: "Can I track my card delivery?",
    answer: "Yes — you will receive an SMS and email with a tracking link once your card is dispatched.",
    tags: ["tracking", "delivery", "card status"]
  },
  {
    category: "Card Delivery",
    question: "Can I change my delivery address after applying?",
    answer: "Yes, if your card hasn't been dispatched yet. Verification is required to update the address.",
    tags: ["address change", "delivery", "update"]
  },
  {
    category: "Card Delivery",
    question: "My card was marked delivered but I didn’t receive it. What should I do?",
    answer: "FinAI can raise a courier investigation and request a replacement card if necessary.",
    tags: ["lost card", "delivery issue", "replacement"]
  },
  {
    category: "Card Delivery",
    question: "Can I request express delivery?",
    answer: "Express delivery may be available depending on your location. FinAI can check eligibility.",
    tags: ["express delivery", "priority", "shipping"]
  },
  {
    category: "Card Delivery",
    question: "How will I receive my card PIN?",
    answer: "Your PIN will be sent via SMS or you can set a custom PIN through the app.",
    tags: ["PIN", "security", "card info"]
  },
  {
    category: "Card Delivery",
    question: "What should I do if my card is damaged upon delivery?",
    answer: "You can report it immediately via FinAI to request a replacement card.",
    tags: ["damaged card", "replacement", "support"]
  },
  {
    category: "Card Delivery",
    question: "Can someone else receive my card on my behalf?",
    answer: "Yes, but proper identity verification is required for security reasons.",
    tags: ["delivery", "third-party", "verification"]
  },
  {
    category: "Card Delivery",
    question: "Will I get an email confirmation when my card is dispatched?",
    answer: "Yes, FinAI will send dispatch notifications with tracking details.",
    tags: ["email", "notification", "tracking"]
  },
  {
    category: "Card Delivery",
    question: "Can I temporarily hold my card delivery?",
    answer: "Yes, FinAI can help request a hold or reschedule the delivery date.",
    tags: ["hold delivery", "reschedule", "shipping"]
  },

  // TRANSACTIONS & EMI
  {
    category: "Transactions & EMI",
    question: "How can I view my recent transactions?",
    answer: "Just ask 'Show my recent transactions' and FinAI will list them after account verification.",
    tags: ["transactions", "history", "account info"]
  },
  {
    category: "Transactions & EMI",
    question: "How do I convert a purchase into EMI?",
    answer: "Ask 'Convert this transaction to EMI' and FinAI will display available plans.",
    tags: ["EMI", "conversion", "payments"]
  },
  {
    category: "Transactions & EMI",
    question: "Are there charges for EMI conversion?",
    answer: "Some banks may charge a processing fee or interest. FinAI will show all costs before confirming.",
    tags: ["EMI", "charges", "fees"]
  },
  {
    category: "Transactions & EMI",
    question: "What is the minimum transaction amount for EMI?",
    answer: "Transactions above ₹1,500 are typically eligible. Exceptions may apply.",
    tags: ["EMI", "minimum amount", "eligibility"]
  },
  {
    category: "Transactions & EMI",
    question: "Can I convert multiple transactions into EMI at once?",
    answer: "Yes, if each transaction meets eligibility criteria. FinAI can process them together.",
    tags: ["EMI", "bulk conversion", "transactions"]
  },
  {
    category: "Transactions & EMI",
    question: "How do I dispute a suspicious transaction?",
    answer: "Select the transaction or provide details and FinAI will raise a dispute on your behalf.",
    tags: ["dispute", "transaction", "fraud"]
  },
  {
    category: "Transactions & EMI",
    question: "Can international transactions be converted to EMI?",
    answer: "No, most international transactions, wallet loads, and cash withdrawals are not eligible.",
    tags: ["EMI", "international", "exclusions"]
  },
  {
    category: "Transactions & EMI",
    question: "How can I categorize my transactions?",
    answer: "FinAI can help tag and categorize transactions for easier tracking and budgeting.",
    tags: ["categorize", "transactions", "budget"]
  },
  {
    category: "Transactions & EMI",
    question: "Can I get notifications for large transactions?",
    answer: "Yes, FinAI can alert you via SMS or app notifications for transactions above a set limit.",
    tags: ["alerts", "transactions", "notifications"]
  },
  {
    category: "Transactions & EMI",
    question: "Is there a limit on EMI duration?",
    answer: "EMI plans usually range from 3 to 24 months. FinAI will show available durations for each transaction.",
    tags: ["EMI", "duration", "plans"]
  },

  // BILL & STATEMENT
  {
    category: "Bill & Statement",
    question: "When is my bill generated?",
    answer: "Your statement is generated monthly based on your billing cycle date.",
    tags: ["billing", "statement", "cycle"]
  },
  {
    category: "Bill & Statement",
    question: "Can I download past statements?",
    answer: "Yes — you can download up to 24 months of past statements from your app or request via FinAI.",
    tags: ["download", "statements", "history"]
  },
  {
    category: "Bill & Statement",
    question: "Can I change my billing cycle?",
    answer: "Some banks allow changing billing cycles. FinAI can check eligibility and assist in the change.",
    tags: ["billing", "cycle change", "statement"]
  },
  {
    category: "Bill & Statement",
    question: "Why is my bill higher this month?",
    answer: "Higher bills may include new transactions, interest, fees, or EMI charges. FinAI can provide a detailed breakdown.",
    tags: ["billing", "high bill", "statement"]
  },
  {
    category: "Bill & Statement",
    question: "How can I get my statement emailed?",
    answer: "FinAI can email your statement instantly once you request it.",
    tags: ["statement", "email", "notification"]
  },
  {
    category: "Bill & Statement",
    question: "Can I get a duplicate statement?",
    answer: "Yes, duplicate statements can be generated anytime for previous months.",
    tags: ["duplicate", "statements", "history"]
  },
  {
    category: "Bill & Statement",
    question: "How do I read my statement?",
    answer: "FinAI can guide you through each section of your statement including transactions, fees, and due amount.",
    tags: ["statement", "guide", "reading"]
  },
  {
    category: "Bill & Statement",
    question: "Are digital statements secure?",
    answer: "Yes, all statements are encrypted and securely delivered through authenticated channels.",
    tags: ["digital", "security", "statement"]
  },
  {
    category: "Bill & Statement",
    question: "Can I subscribe to e-statements only?",
    answer: "Yes, FinAI can update your preference to receive only digital statements.",
    tags: ["e-statement", "digital", "preference"]
  },
  {
    category: "Bill & Statement",
    question: "What is the minimum payment on my bill?",
    answer: "The minimum amount is usually 5% of the total outstanding or as defined by your bank.",
    tags: ["minimum payment", "bill", "payment"]
  },

  // REPAYMENTS
  {
    category: "Repayments",
    question: "What are repayment options?",
    answer: "You can pay via UPI, net banking, AutoPay, credit card apps, or NEFT.",
    tags: ["repayment", "options", "methods"]
  },
  {
    category: "Repayments",
    question: "Is there a grace period?",
    answer: "A grace period of 2–3 days may apply depending on your bank and payment method.",
    tags: ["grace period", "repayment", "bank"]
  },
  {
    category: "Repayments",
    question: "Can I pay more than the minimum amount?",
    answer: "Yes, paying more reduces interest charges. FinAI can help you specify an amount.",
    tags: ["repayment", "extra payment", "interest"]
  },
  {
    category: "Repayments",
    question: "Can I set up automatic payments?",
    answer: "Yes, AutoPay can be set for minimum or full payment each month after verification.",
    tags: ["AutoPay", "automatic", "repayment"]
  },
  {
    category: "Repayments",
    question: "How do I check my outstanding balance?",
    answer: "Ask 'What is my outstanding balance?' and FinAI will provide the latest amount.",
    tags: ["balance", "repayment", "check"]
  },
  {
    category: "Repayments",
    question: "Can I schedule a payment for a future date?",
    answer: "Yes, FinAI can schedule a payment on any date you choose.",
    tags: ["schedule", "payment", "future"]
  },
  {
    category: "Repayments",
    question: "Are there penalties for late payment?",
    answer: "Late payments may incur fees and interest. FinAI can show exact charges for your account.",
    tags: ["late payment", "penalties", "fees"]
  },
  {
    category: "Repayments",
    question: "Can I change my repayment method?",
    answer: "Yes, you can switch between UPI, net banking, or AutoPay anytime.",
    tags: ["repayment method", "change", "options"]
  },
  {
    category: "Repayments",
    question: "How do I know if my payment was successful?",
    answer: "FinAI confirms each successful payment with a receipt and notification.",
    tags: ["confirmation", "success", "payment"]
  },
  {
    category: "Repayments",
    question: "Can I make partial payments?",
    answer: "Yes, partial payments are allowed and will reflect in your outstanding balance.",
    tags: ["partial payment", "repayment", "balance"]
  },

  // COLLECTIONS & OVERDUE
  {
    category: "Collections & Overdue",
    question: "What happens if my payment is overdue?",
    answer: "Late payments may incur fees and interest. FinAI can guide you on repayment options.",
    tags: ["overdue", "collections", "late payment"]
  },
  {
    category: "Collections & Overdue",
    question: "Can I pay part of my overdue bill?",
    answer: "Yes, FinAI can help you make a partial payment towards your overdue amount.",
    tags: ["partial payment", "overdue", "collections"]
  },
  {
    category: "Collections & Overdue",
    question: "Will late payments affect my credit score?",
    answer: "Yes, overdue payments may impact your credit score. FinAI can suggest ways to minimize the effect.",
    tags: ["credit score", "late payment", "collections"]
  },
  {
    category: "Collections & Overdue",
    question: "Can I request extra time to pay?",
    answer: "Some banks allow extensions or repayment plans. FinAI can check your eligibility.",
    tags: ["extension", "repayment plan", "overdue"]
  },
  {
    category: "Collections & Overdue",
    question: "How do I get reminders for overdue bills?",
    answer: "FinAI can send notifications via SMS, email, or in-app alerts before and after due dates.",
    tags: ["reminders", "notifications", "overdue"]
  },
  {
    category: "Collections & Overdue",
    question: "Can I speak to a collections agent?",
    answer: "Yes, FinAI can connect you to customer support for overdue account assistance.",
    tags: ["collections agent", "support", "overdue"]
  },
  {
    category: "Collections & Overdue",
    question: "Are there options to restructure my overdue payments?",
    answer: "Yes, FinAI can help explore repayment plans or settlements if eligible.",
    tags: ["restructure", "repayment", "overdue"]
  },
  {
    category: "Collections & Overdue",
    question: "Will my account be blocked if I miss a payment?",
    answer: "Accounts may be temporarily restricted. FinAI can guide you on restoring access.",
    tags: ["account block", "overdue", "restrictions"]
  },
  {
    category: "Collections & Overdue",
    question: "Are partial payments counted towards reducing interest?",
    answer: "Yes, any payment reduces the principal and accrued interest accordingly.",
    tags: ["partial payment", "interest", "overdue"]
  },
  {
    category: "Collections & Overdue",
    question: "Can I automate overdue repayment notifications?",
    answer: "Yes, FinAI can schedule recurring reminders until payment is completed.",
    tags: ["automation", "notifications", "overdue"]
  }
];

    await Faq.insertMany(faqs);
    console.log("✅ FAQ seed completed.");
  } catch (err) {
    console.error("FAQ seed error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedFaqs();
