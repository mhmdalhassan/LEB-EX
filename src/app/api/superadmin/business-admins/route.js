import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, businessId } = await req.json();

    if (!businessId) {
      return NextResponse.json(
        { success: false, message: "Business ID required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1️⃣ Create Business Admin user
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "BUSINESS_ADMIN",
        business: {
          connect: { id: businessId } // Staff reference
        }
      }
    });

    // 2️⃣ Assign User as Business Owner
    await prisma.business.update({
      where: { id: businessId },
      data: {
        owner: {
          connect: { id: admin.id }
        },
        users: {
          connect: { id: admin.id }
        }
      }
    });

    return NextResponse.json({ success: true, admin });

  } catch (err) {
    console.error("Business Admin Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
