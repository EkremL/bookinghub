import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("Connected to the database.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
