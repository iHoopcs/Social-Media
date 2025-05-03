import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const uri: string | undefined = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB URI variable not found");
  }
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
