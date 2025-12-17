// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import prisma from "@/lib/db";

// // export async function GET() {
// //   try {


// //     /////////////////////////////////
// //     const session = await getServerSession(authOptions);

// //     if (!session || session.user.role !== "BUSINESS_ADMIN") {
// //       return NextResponse.json(
// //         { success: false, message: "Unauthorized" },
// //         { status: 401 }
// //       );
// //     }
// //     console.log('IDDDD: ',session.user.id);
// //     // 🔑 FIXED: ownerId instead of adminId
// //     const business = await prisma.business.findFirst({
// //       where: { ownerId: session.user.id },
// //       select: { id: true },
// //     });
// //     console.log("Business dashboard business:", business);

// //     if (!business) {
// //       return NextResponse.json(
// //         { success: false, message: "Business not found" },
// //         { status: 404 }
// //       );
// //     }
// // // cmj7go3pk0000if502u43q62u
// // // cmj7go3pk0001if50who71m7g
// //     const businessId = business.id;

// //     const [
// //   staffCount,
// //   productCount,
// //   orderCount,
// //   recentOrders,
// // ] = await Promise.all([
// //   prisma.user.count({
// //     where: { businessId, role: { not: "BUSINESS_ADMIN" } },
// //   }),
// //   prisma.product.count({
// //     where: { businessId, active: true },
// //   }),
// //   prisma.order.count({
// //     where: { businessId },
// //   }),
// //   prisma.order.findMany({
// //     where: { businessId },
// //     orderBy: { createdAt: "desc" },
// //     take: 5,
// //     select: {
// //       id: true,
// //       status: true,
// //       createdAt: true,
// //       totalAmount: true,
// //       customerName: true,
// //     },
// //   }),
// // ]);


// //     return NextResponse.json({
// //       success: true,
// //       data: {
// //         stats: {
// //           staffCount,
// //           productCount,
// //           orderCount,
// //         },
// //         recentOrders,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Business dashboard error:", error);
// //     return NextResponse.json(
// //       { success: false, message: "Server error" },
// //       { status: 500 }
// //     );
// //   }
// // }


// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     // 1️⃣ Session must have email (guaranteed by NextAuth)
//     if (!session?.user?.email) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     // 2️⃣ Resolve REAL user from DB
//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       select: { id: true, role: true },
//     });

//     if (!user || user.role !== "BUSINESS_ADMIN") {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }



// ///////sallary////////
//         const totalStaffCost = await prisma.staff.aggregate({
//     where: {
//         businessId: business.id,
//         active: true,
//     },
//     _sum: {
//         salary: true,
//     },
//     });


//     return NextResponse.json({
//     success: true,
//     stats: {
//         totalStaffCost: totalStaffCost._sum.salary || 0,
//     },
//     });




//     // 3️⃣ Find business OWNED by this user
//     const business = await prisma.business.findFirst({
//       where: { ownerId: user.id },
//       select: { id: true },
//     });

//     if (!business) {
//       return NextResponse.json(
//         { success: false, message: "Business not found" },
//         { status: 404 }
//       );
//     }

//     const businessId = business.id;

//     // 4️⃣ Dashboard stats
//     const [
//       staffCount,
//       productCount,
//       orderCount,
//       recentOrders,
//     ] = await Promise.all([
//       prisma.user.count({
//         where: {
//           businessId,
//           role: { not: "BUSINESS_ADMIN" },
//         },
//       }),
//       prisma.product.count({
//         where: {
//           businessId,
//           active: true,
//         },
//       }),
//       prisma.order.count({
//         where: { businessId },
//       }),
//       prisma.order.findMany({
//         where: { businessId },
//         orderBy: { createdAt: "desc" },
//         take: 5,
//         select: {
//           id: true,
//           status: true,
//           createdAt: true,
//           totalAmount: true,
//           customerName: true,
//         },
//       }),
//     ]);

//     return NextResponse.json({
//       success: true,
//       data: {
//         stats: {
//           staffCount,
//           productCount,
//           orderCount,
//           totalStaffCost,
//         },
//         recentOrders,
//       },
//     });
//   } catch (error) {
//     console.error("Business dashboard error:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true },
    });

    if (!user || user.role !== "BUSINESS_ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const business = await prisma.business.findFirst({
      where: { ownerId: user.id },
      select: { id: true },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

    const businessId = business.id;

    const [
      staffCount,
      productCount,
      orderCount,
      recentOrders,
      staffSalary,
    ] = await Promise.all([
      prisma.user.count({
        where: { businessId, role: { not: "BUSINESS_ADMIN" } },
      }),
      prisma.product.count({
        where: { businessId, active: true },
      }),
      prisma.order.count({
        where: { businessId },
      }),
      prisma.order.findMany({
        where: { businessId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          status: true,
          createdAt: true,
          totalAmount: true,
          customerName: true,
        },
      }),
      prisma.staff.aggregate({
        where: { businessId, active: true },
        _sum: { salary: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          staffCount,
          productCount,
          orderCount,
          totalStaffCost: staffSalary._sum.salary || 0,
        },
        recentOrders,
      },
    });
  } catch (error) {
    console.error("Business dashboard error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
