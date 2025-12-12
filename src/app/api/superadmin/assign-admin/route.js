import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { businessId, email } = await req.json();

    if (!businessId) {
      return NextResponse.json(
        { success: false, message: "Business ID missing" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Admin email is required" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({ where: { email } });

    // 🔹 Create user if not exists
    if (!user) {
      const tempPassword = await bcrypt.hash("admin123", 10);
      user = await prisma.user.create({
        data: {
          email,
          password: tempPassword,
          role: "BUSINESS_ADMIN",
        },
      });
    }

    // 🔹 Update role if not BUSINESS_ADMIN
    if (user.role !== "BUSINESS_ADMIN") {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { role: "BUSINESS_ADMIN" },
      });
    }

    // 🔹 Assign ownership to business
    await prisma.business.update({
      where: { id: businessId },
      data: {
        ownerId: user.id,
        users: { connect: { id: user.id } },
      },
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Assign Admin Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
