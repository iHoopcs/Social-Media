import { getUserFromSession } from "@/lib/session-auth";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const user = await getUserFromSession();
  console.log("User from session:", user);

  if (!user) redirect("/");

  return (
    <>
      <h1>
        Welcome {user.firstName} {user.lastName}!
      </h1>
    </>
  );
}
