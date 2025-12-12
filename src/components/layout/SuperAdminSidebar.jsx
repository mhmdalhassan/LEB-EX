"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Users,
  CreditCard,
  LogOut,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/superadmin", icon: LayoutDashboard },
    { name: "Businesses", href: "/superadmin/businesses", icon: Store },
    { name: "Users", href: "/superadmin/users", icon: Users },
    { name: "Subscriptions", href: "/superadmin/subscriptions", icon: CreditCard },
    { title: "Settings", href: "/superadmin/settings", icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          LEBEX
        </h1>
        <p className="text-xs text-gray-500 mt-1">Super Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white shadow"
                  : "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
              }
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
