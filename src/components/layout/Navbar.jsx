"use client";

import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import NotificationBell from "@/components/notifications/NotificationBell";


export default function Navbar({ title = "Dashboard" }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setOpen(!open)}
          >
            <Menu size={22} className="text-gray-700" />
          </button>

          {/* Page Title */}
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          {/* Notification Button */}

            <NotificationBell />

          {/* <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button> */}

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium shadow-md">
            M
          </div>
        </div>
      </div>
    </header>
  );
}
