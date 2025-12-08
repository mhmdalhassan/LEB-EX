// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import BusinessSidebar from "@/components/business/BusinessSidebar";

// export default async function BusinessLayout({ children }) {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "BUSINESS_ADMIN") {
//     redirect("/auth/login");
//   }

//   return (
//     <div className="flex min-h-screen">
//       <BusinessSidebar />
//       <main className="flex-1 p-6 bg-gray-50">{children}</main>
//     </div>
//   );
// }










// leb-ex/src/app/business/layout.jsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import BusinessSidebar from "@/components/business/BusinessSidebar";

export default async function BusinessLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "BUSINESS_ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen">
      <BusinessSidebar />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
