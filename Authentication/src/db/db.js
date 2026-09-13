const mongoose = require("mongoose")

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected succefully")
    } catch (error) {
        console.error("Database connect error:", error)
    }
}

module.exports=connectDB;