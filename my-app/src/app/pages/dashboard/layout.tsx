"use client";
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-900 text-white p-4 flex flex-row items-center justify-between">
        <span className="text-2xl font-bold">Social Media</span>
        <span>
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
        </span>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
