import config from "./config.js";
import mongoose from "mongoose";

async function connectDB() {
  try {
    const status = await mongoose.connect(config.mongoDBUrl);
    console.log(`MongoDB connected: ${status.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
