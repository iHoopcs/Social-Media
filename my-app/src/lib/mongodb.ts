import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const uri: string | undefined = process.env.MONGODB_URI;

  if (!uri) {
    console.log("Error in db connection");
    throw new Error("Database connection error");
  }
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
