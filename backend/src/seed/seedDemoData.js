const mongoose = require("mongoose");
const connectDB = require("../config/db");
const config = require("../config/env");

const User = require("../models/User");
const Card = require("../models/Card");
const Statement = require("../models/Statement");
const Transaction = require("../models/Transaction");

const runSeed = async () => {
  try {
    await connectDB();

    console.log("Clearing old demo data...");
    await Promise.all([
      User.deleteMany({}),
      Card.deleteMany({}),
      Statement.deleteMany({}),
      Transaction.deleteMany({})
    ]);

    console.log("Inserting demo data...");

    const user = await User.create({
      customerId: "CUST1001",
      fullName: "Rheanne Demo",
      email: "rheanne.demo@example.com",
      phone: "+91-9876543210",
      riskSegment: "LOW",
      status: "ACTIVE"
    });

    const card = await Card.create({
      user: user._id,
      last4: "4242",
      network: "VISA",
      cardType: "PLATINUM",
      status: "IN_TRANSIT", // good for card-delivery flows
      creditLimit: 100000,
      availableLimit: 76500
    });

    const statement = await Statement.create({
      user: user._id,
      card: card._id,
      month: 1,
      year: 2025,
      totalDue: 22540,
      minimumDue: 2254,
      dueDate: new Date("2025-02-05"),
      closingBalance: 22540,
      pdfUrl: "mock://statement/jan-2025.pdf"
    });

    const tx1 = await Transaction.create({
      user: user._id,
      card: card._id,
      amount: 3200,
      currency: "INR",
      merchantName: "BigBasket",
      category: "GROCERY",
      postedAt: new Date("2025-01-10T10:00:00Z"),
      isEmi: false
    });

    const tx2 = await Transaction.create({
      user: user._id,
      card: card._id,
      amount: 12000,
      currency: "INR",
      merchantName: "MakeMyTrip",
      category: "TRAVEL",
      postedAt: new Date("2025-01-12T12:00:00Z"),
      isEmi: true,
      emiTenureMonths: 6,
      emiPlanId: "EMI-PLAN-001"
    });

    console.log("Seed completed.");
    console.log("User:", user.customerId);
    console.log("Card last4:", card.last4);
    console.log("Statement:", statement.month, statement.year);
    console.log("Transactions:", tx1._id.toString(), tx2._id.toString());
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  }
};

runSeed();