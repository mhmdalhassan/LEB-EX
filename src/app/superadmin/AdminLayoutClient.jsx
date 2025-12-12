"use client";

import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";
import Navbar from "@/components/layout/Navbar";

export default function AdminLayoutClient({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Super Admin" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
