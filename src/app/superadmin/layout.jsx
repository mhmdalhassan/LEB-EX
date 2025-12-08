// export const metadata = {
//   title: "Super Admin",
// };

// import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";

// export default function SuperAdminLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <SuperAdminSidebar />
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }





// leb-ex/src/app/superadmin/layout.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";

export const metadata = {
  title: "Super Admin | LEB-EX",
};

export default async function SuperAdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SuperAdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
