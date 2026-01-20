import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONG0_URL);
    console.log("MongoDB connected successfully");
    const connection = mongoose.connection;
    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
    
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }

};

export default connectDB;