// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany({
//       where: {
//         role: {
//           not: "SUPERADMIN"
//         }
//       },
//       include: {
//         business: {
//           select: { name: true },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json({ success: true, users });
//   } catch (err) {
//     console.error("Users fetch error:", err);
//     return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
//   }
// }











import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: "SUPER_ADMIN",
        },
      },
      include: {
        business: {
          select: {
            id: true,
            name: true,
            active: true,
            deleted: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, users });
  } catch (err) {
    console.error("Users API Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load users" },
      { status: 500 }
    );
  }
}
