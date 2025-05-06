

import { handleLogout } from "@/app/components/LogoutComponent";
import { IoIosLogOut } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

// Logout functionality
{
  /* <span>
  <TooltipProvider>
    <Tooltip>
      <AlertDialog>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <IoIosLogOut
              size={30}
              className="hover:text-red-600 cursor-pointer"
            />
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Logout?</p>
        </TooltipContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out and prompted to log back in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Tooltip>
  </TooltipProvider>
</span>; */
}
