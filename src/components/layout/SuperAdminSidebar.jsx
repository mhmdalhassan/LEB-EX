// "use client";
// import Link from "next/link";
// import { Building2, LayoutDashboard, Users, CreditCard, Settings } from "lucide-react";

// export default function SuperAdminSidebar() {
//   const menu = [
//     { href: "/superadmin", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/superadmin/businesses", label: "Businesses", icon: Building2 },
//     { href: "/superadmin/subscriptions", label: "Subscriptions", icon: CreditCard },
//     { href: "/superadmin/users", label: "Users", icon: Users },
//     { href: "/superadmin/settings", label: "Settings", icon: Settings }
//   ];

//   return (
//     <aside className="w-64 bg-black text-white min-h-screen p-4 space-y-6">
//       <h1 className="text-lg font-bold">LEB-EX Admin</h1>

//       <ul className="space-y-1">
//         {menu.map(({ href, label, icon: Icon }) => (
//           <li key={href}>
//             <Link
//               href={href}
//               className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition"
//             >
//               <Icon size={18} />
//               {label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// }










"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Building2,
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut
} from "lucide-react";

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { href: "/superadmin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/superadmin/businesses", label: "Businesses", icon: Building2 },
    { href: "/superadmin/subscriptions", label: "Subscriptions", icon: CreditCard },
    { href: "/superadmin/users", label: "Users", icon: Users },
    { href: "/superadmin/settings", label: "Settings", icon: Settings }
  ];

  return (
    <aside className="w-64 bg-black text-white flex flex-col min-h-screen p-4">
      {/* Logo / Title */}
      <div className="text-xl font-bold mb-8 text-center tracking-wide">
        LEB-EX Admin
      </div>

      {/* Menu Links */}
      <ul className="flex-1 space-y-1">
        {menu.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-gray-900"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        className="flex items-center gap-3 px-4 py-2 rounded-md text-red-400 hover:bg-red-700 hover:text-white transition mt-4"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
