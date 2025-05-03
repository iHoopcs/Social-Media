import { connectMongoDB } from "./../../../../lib/mongodb";
import { User } from "../../../../../models/user";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await connectMongoDB();
  //fetch form data
  const { payload } = await request.json();
  if (!payload) return new Error("Missing payload data");
  console.log(payload);

  //hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  //   construct & save user
  await User.create({
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: hashedPassword,
  });

  return new Response(JSON.stringify("User created!"), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
