// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import AdminLayoutClient from "./AdminLayoutClient";

// export const metadata = {
//   title: "Super Admin | LEB-EX",
// };

// export default async function SuperAdminLayout({ children }) {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "SUPER_ADMIN") {
//     redirect("/login");
//   }

//   return (
//     <AdminLayoutClient>
//       {children}
//     </AdminLayoutClient>
//   );
// }



import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";
import prisma from "@/lib/db";


export const metadata = {
  title: "Super Admin | LEB-EX",
};

export default async function SuperAdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Authorization guard
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
  redirect("/auth/login");
}

const settings = await prisma.platformSettings.findUnique({
  where: { id: "platform" },
});


const settingsSafe = settings ?? { platformName: "LEBEX" };

return (
  <AdminLayoutClient settings={settingsSafe}>
    {children}
  </AdminLayoutClient>
);
}
