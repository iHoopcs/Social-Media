import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/app/components/DashboardSidebarComponent";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarProvider defaultOpen>
        <div className="flex flex-row items-baseline">
          <DashboardSidebar />
          <SidebarTrigger size={"lg"} className="cursor-pointer" />

          <main className="flex-1 p-4">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
