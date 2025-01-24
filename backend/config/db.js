const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("connection failed:", error.message);
  }
};

module.exports = connectDB;