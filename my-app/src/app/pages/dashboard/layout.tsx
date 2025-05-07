import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/app/components/DashboardSidebarComponent";
import { getUserFromSession } from "@/lib/session-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = JSON.stringify(await getUserFromSession());
  if (!user) redirect("/");
  //console.log(user);
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarProvider defaultOpen>
        <div className="flex flex-row items-baseline">
          <DashboardSidebar user={user} />
          <SidebarTrigger size={"lg"} className="cursor-pointer" />

          <main className="flex-1 p-4">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
