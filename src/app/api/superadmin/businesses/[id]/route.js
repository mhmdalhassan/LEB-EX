// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// // DELETE — Soft Delete Business
// export async function DELETE(req, context) {
//   try {
//     const { id: businessId } = await context.params; // ⬅️ حل المشكلة: await

//     if (!businessId) {
//       return NextResponse.json(
//         { success: false, message: "Business ID missing" },
//         { status: 400 }
//       );
//     }

//     await prisma.business.update({
//       where: { id: businessId },
//       data: {
//         deleted: true,
//         active: false,
//         deletedAt: new Date(),
//       },
//     });

//     return NextResponse.json(
//       { success: true, message: "Business deleted successfully" },
//       { status: 200 }
//     );

//   } catch (err) {
//     console.error("Delete Business Error:", err);
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }



// export async function PUT(req, { params }) {
//   try {
//     const { id } = await params;
//     const data = await req.json();

//     const updated = await prisma.business.update({
//       where: { id },
//       data,
//     });

//     return NextResponse.json({ success: true, updated });
//   } catch (err) {
//     console.error("PUT Error:", err);
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const business = await prisma.business.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, business });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to update business" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    await prisma.business.update({
      where: { id },
      data: {
        deleted: true,
        deletedAt: new Date(),
        active: false,
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to delete business" },
      { status: 500 }
    );
  }
}
