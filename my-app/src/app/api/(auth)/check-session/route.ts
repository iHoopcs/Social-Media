import { cookies } from "next/headers";
import User from "../../../../../models/user";

//user verification once authenticated
export async function GET(request: Request) {
  //check that session created stored in cookie
  const cookieStore = await cookies();
  console.log("Store", cookieStore);
  const session = cookieStore.get("session")?.value;
  if (!session) return new Response("Unauthorized!", { status: 400 });

  return new Response("Logged in!", { status: 200 });
}
