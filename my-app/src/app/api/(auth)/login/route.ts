"use server";
import { connectMongoDB } from "./../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { payload } = await request.json();
  if (!payload) return new Error("Missing payload data");

  try {
    await connectMongoDB();
    const foundUser = await User.findOne({ email: payload.email });

    if (foundUser) {
      //check password
      const isMatch = await bcrypt.compare(
        payload.password,
        foundUser.password
      );
      if (isMatch) {
        (await cookies()).set("session", foundUser._id, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        });
        return new Response("Logged in!", { status: 200 });
      }
      return new Response("Incorrect Password", { status: 401 });
    }
    return new Response("Could not find account with provided email", {
      status: 401,
    });
  } catch (err) {
    console.log(err);
  }
}
