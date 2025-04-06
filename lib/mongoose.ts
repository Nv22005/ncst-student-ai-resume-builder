import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    await mongoose.connect(process.env.MONGODB_URL, options);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
};
