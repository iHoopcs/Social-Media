import mongoose, { Schema } from "mongoose";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);
