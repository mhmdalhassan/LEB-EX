// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import BusinessSidebar from "@/components/business/BusinessSidebar";
// import { LogOut, User } from "lucide-react";
// import { safeFetch } from "@/lib/safeFetch";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";


// const pageTitles = {
//   "/business/dashboard": "Dashboard",
//   "/business/staff": "Staff",
//   "/business/products": "Products",
//   "/business/orders": "Orders",
//   "/business/notifications": "Notifications",
//   "/business/settings": "Settings",
// };

// export default function BusinessLayout({ children }) {
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const pageTitle = pageTitles[pathname] || "";

//   const [businessName, setBusinessName] = useState("Loading...");

//   useEffect(() => {
//     const loadBusiness = async () => {
//       const res = await safeFetch("/api/business/me");
//       if (res?.success) setBusinessName(res.businessName);
//     };
//     loadBusiness();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <BusinessSidebar />

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
//           <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
//             {businessName}
//             {pageTitle && (
//               <span className="text-gray-400 font-medium">
//                 {" "}
//                 / {pageTitle}
//               </span>
//             )}
//           </h1>

//           <div className="flex items-center gap-5">
//             <div className="flex items-center gap-2 text-gray-600 text-sm">
//               <User size={18} />
//               {session?.user?.email || "Business Admin"}
//             </div>

//             <button
//               onClick={() => signOut({ callbackUrl: "/login" })}
//               className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//             >
//               <LogOut size={16} />
//               Logout
//             </button>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 lg:p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }








import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BusinessSidebar from "@/components/business/BusinessSidebar";
import BusinessNavbar from "@/components/business/BusinessNavbar";

export default async function BusinessLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "BUSINESS_ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <BusinessSidebar />

      <div className="flex-1 flex flex-col">
        <BusinessNavbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
