// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function DELETE(req, context) {
//   try {
//     const { id: businessId, userId } = await context.params;

//     if (!businessId || !userId) {
//       return NextResponse.json(
//         { success: false, message: "Business ID or User ID missing" },
//         { status: 400 }
//       );
//     }

//     const user = await prisma.user.findUnique({ where: { id: userId } });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       );
//     }

//     if (user.role === "BUSINESS_ADMIN" && user.businessId === businessId) {
//       return NextResponse.json(
//         { success: false, message: "Cannot remove Business Owner!" },
//         { status: 400 }
//       );
//     }

//     await prisma.user.update({
//       where: { id: userId },
//       data: {
//         businessId: null,
//       },
//     });

//     return NextResponse.json({ success: true });

//   } catch (err) {
//     console.error("Delete Error:", err);
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }
