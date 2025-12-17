"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tags } from "lucide-react";

import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Bell,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/business/dashboard", icon: LayoutDashboard },
  { label: "Staff", href: "/business/staff", icon: Users },
  { label: "Products", href: "/business/products", icon: Package },
  { label: "Categories", href: "/business/categories", icon: Tags },
  { label: "Orders", href: "/business/orders", icon: ShoppingCart },
  { label: "Notifications", href: "/business/notifications", icon: Bell },
  { label: "Settings", href: "/business/settings", icon: Settings },
  
];

export default function BusinessSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">LEB-EX</h2>
        <p className="text-xs text-gray-500">Business Admin</p>
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  active
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
