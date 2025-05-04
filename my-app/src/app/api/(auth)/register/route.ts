"user server";
import { connectMongoDB } from "./../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { payload } = await request.json();
  if (!payload) return new Error("Missing payload data");

  try {
    await connectMongoDB();

    const foundUser = await User.findOne({ email: payload.email });
    if (foundUser) {
      return new Response(
        JSON.stringify("Account already exists with provided email"),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    //hash password
    const hashedPassword = await bcrypt.hash(payload.password, 10);

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
  } catch (err) {
    console.log(err);
  }
}
