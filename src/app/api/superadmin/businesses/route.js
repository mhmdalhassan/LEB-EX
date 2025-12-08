// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// // ----- GET: Load businesses -----
// export async function GET() {
//   try {
//     const businesses = await prisma.business.findMany({
//       where: { deleted: false }, // لمنع ظهور المحذوفين فقط تحسين
//       include: {
//         owner: { select: { email: true } },
//         users: {
//           select: {
//             id: true,
//             email: true,
//             role: true
//           }
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json({ success: true, businesses });
//   } catch (err) {
//     console.error("GET Error:", err);
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }




// // ----- POST: Create business -----
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const {
//       name,
//       email,
//       phone,
//       industry,
//       country,
//       city,
//       address,
//       currency,
//     } = body;

//     if (!name || !email || !industry) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // 🔍 Check if business admin user already exists
//     let adminUser = await prisma.user.findUnique({ where: { email } });

//     if (!adminUser) {
//       adminUser = await prisma.user.create({
//         data: {
//           email,
//           password: "123456", // Temporary until invite system
//           role: "BUSINESS_ADMIN",
//         },
//       });
//     }

//     // 🏢 Create business and assign owner + access
//     const business = await prisma.business.create({
//   data: {
//     name,
//     email,
//     phone,
//     industry,
//     country,
//     city,
//     address,
//     currency,
//     ownerId: adminUser.id,
//     active: true,
//   },
//   include: {
//   owner: { select: { email: true } },
//   users: {
//     select: {
//       id: true,
//       email: true,
//       role: true,
//     },
//   },
// },
// });

// // 🧩 Link owner as Business Admin inside business users
// await prisma.user.update({
//   where: { id: adminUser.id },
//   data: {
//     role: "BUSINESS_ADMIN",
//     businessId: business.id, 
//   },
// });

//     return NextResponse.json({ success: true, business });
//   } catch (err) {
//     console.error("POST Error:", err);
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }














import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET all businesses (exclude deleted)
export async function GET() {
  try {
    const businesses = await prisma.business.findMany({
      where: { deleted: false },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, businesses });
  } catch (err) {
    console.error("Fetch Businesses Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// CREATE new business
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const business = await prisma.business.create({
      data: {
        name: body.name,
        email: body.email,
        industry: body.industry || "",
        phone: body.phone || "",
        country: body.country || "",
        city: body.city || "",
        address: body.address || "",
        currency: body.currency || "USD",
        active: true,
        deleted: false,
      },
    });

    return NextResponse.json({ success: true, business });
  } catch (err) {
    console.error("Business Create Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
