import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("Connection URI:", process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log("✅ MongoDB connected successfully");
    
    // Test the connection by listing collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error("Error details:", error.message);
    console.error("Full error:", error);
    
    if (error.code === 'ECONNREFUSED') {
      console.error("Is MongoDB running? Try starting MongoDB first.");
    }
    
    process.exit(1);
  }
};

export default connectDB;