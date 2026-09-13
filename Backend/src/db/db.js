const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Exit the application if DB connection fails
    }
}

module.exports = connectDB;