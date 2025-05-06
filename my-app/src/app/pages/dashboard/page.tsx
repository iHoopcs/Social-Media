import { getUserFromSession } from "@/lib/session-auth";

export default async function Dashboard() {
  const user = await getUserFromSession();
  console.log("User from session:", user);

  if (!user) return <p>Unauthorized!</p>;

  return (
    <>
      <h1>
        Welcome {user.firstName} {user.lastName}!
      </h1>
    </>
  );
}
