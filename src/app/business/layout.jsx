"use client";

import { signOut, useSession } from "next-auth/react";
import BusinessSidebar from "@/components/business/BusinessSidebar";
import { LogOut, User } from "lucide-react";

export default function BusinessLayout({ children }) {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <BusinessSidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
            Business Dashboard
          </h1>

          <div className="flex items-center gap-5">
            {/* User Info */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <User size={18} />
              {session?.user?.email || "Business Admin"}
            </div>

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
