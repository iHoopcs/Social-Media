"use server";
import { cookies } from "next/headers";
import User from "../../models/user";
//response for checking sessionID & returning User specific data based on page
export async function getUserFromSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  console.log("ID:", sessionId);
  if (!sessionId) return null;
  const user = await User.findOne({ _id: sessionId }).lean();

  return user || null;
}
