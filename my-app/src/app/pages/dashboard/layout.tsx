"use client";
import { handleLogout } from "@/app/components/LogoutComponent";
import { IoIosLogOut } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
              <TooltipTrigger asChild>
                <IoIosLogOut
                  size={30}
                  className="hover:text-red-600 cursor-pointer"
                  onClick={handleLogout}
                />
              </TooltipTrigger>

              <TooltipContent>
                <p className="text-sm">Logout?</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
