import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

async function dropIndex() {
  try {
    console.log("Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGO)
    console.log("Connected to MongoDB")
    
    // Drop the problematic index
    const result = await mongoose.connection.db.collection("users").dropIndex("name_1")
    console.log("Index dropped successfully:", result)
  } catch (error) {
    console.error("Error:", error.message)
    // If the index doesn't exist, that's fine too
    if (error.message.includes("index not found")) {
      console.log("Index doesn't exist or was already dropped")
    }
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

dropIndex()