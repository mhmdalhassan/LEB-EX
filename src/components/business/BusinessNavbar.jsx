// "use client";

// import { signOut } from "next-auth/react";
// import { LogOut, User } from "lucide-react";
// import { useEffect, useState } from "react";
// import { safeFetch } from "@/lib/safeFetch";

// export default function BusinessNavbar({ pageTitle }) {
//   const [businessName, setBusinessName] = useState(null);

//   useEffect(() => {
//     const loadBusiness = async () => {
//       const res = await safeFetch("/api/business/me");
//       if (res?.success) {
//         setBusinessName(res.businessName);
//       }
//     };
//     loadBusiness();
//   }, []);

//   return (
//     <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
//       <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
//         {businessName ? (
//           <>
//             {businessName}
//             {pageTitle && (
//               <span className="text-gray-400 font-medium">
//                 {" "}
//                 / {pageTitle}
//               </span>
//             )}
//           </>
//         ) : (
//           <span className="text-gray-300">—</span>
//         )}
//       </h1>

//       <div className="flex items-center gap-5">
//         <div className="flex items-center gap-2 text-gray-600 text-sm">
//           <User size={18} />
//           Business Admin
//         </div>

//         <button
//           onClick={() => signOut({ callbackUrl: "/login" })}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//         >
//           <LogOut size={16} />
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }




"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { safeFetch } from "@/lib/safeFetch";

const pageTitles = {
  "/business/dashboard": "Dashboard",
  "/business/staff": "Staff",
  "/business/products": "Products",
  "/business/orders": "Orders",
  "/business/notifications": "Notifications",
  "/business/settings": "Settings",
};

export default function BusinessNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "";
  const [businessName, setBusinessName] = useState("Loading...");

  useEffect(() => {
    const loadBusiness = async () => {
      const res = await safeFetch("/api/business/me");
      if (res?.success) setBusinessName(res.businessName);
    };
    loadBusiness();
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
        {businessName}
        {pageTitle && (
          <span className="text-gray-400 font-medium"> / {pageTitle}</span>
        )}
      </h1>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <User size={18} />
          {session?.user?.email}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
