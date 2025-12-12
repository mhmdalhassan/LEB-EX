// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function Home() {
//   const session = await getServerSession(authOptions);

//   // If logged in → redirect to the correct dashboard
//   if (session?.user?.role === "SUPER_ADMIN") {
//     redirect("/superadmin");
//   }

//   if (session?.user?.role === "BUSINESS_ADMIN") {
//     redirect("/business");
//   }

//   if (session?.user?.role === "STAFF") {
//     redirect("/business/dashboard");
//   }

//   // Otherwise → public page content:
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
//       <h1 className="text-3xl font-bold">Welcome to LEB-EX</h1>
//       <p className="text-gray-600 mt-3">Manage businesses in an easy way.</p>
//       <a
//         href="/login"
//         className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-900 transition"
//       >
//         Login
//       </a>
//     </main>
//   );
// }












// leb-ex/src/app/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  // ⚠ IMPORTANT: Role values from Prisma enum:
  // 'SUPER_ADMIN', 'BUSINESS_ADMIN', 'ACCOUNTANT', 'STOREKEEPER', 'CASHIER', 'DELIVERY'

  if (role === "SUPER_ADMIN") {
    redirect("/superadmin");
  }

  if (role === "BUSINESS_ADMIN") {
    redirect("/business");
  }

  if (
    role === "ACCOUNTANT" ||
    role === "STOREKEEPER" ||
    role === "CASHIER" ||
    role === "DELIVERY"
  ) {
    // Later we can redirect to a staff dashboard
    redirect("/business");
  }

  // Not logged in → Show public landing
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-3xl font-bold tracking-tight">Welcome to LEB-EX</h1>
      <p className="text-gray-600 mt-3">
        A simple way to manage businesses, users and subscriptions.
      </p>
      <Link
        href="/login"
        className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-900 transition"
      >
        Login
      </Link>
    </main>
  );
}
