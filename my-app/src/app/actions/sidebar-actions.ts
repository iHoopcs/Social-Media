"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  //delete cookie w/ sessionId
  (await cookies()).delete("session");
  redirect("/");
};

