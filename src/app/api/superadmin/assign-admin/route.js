import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req) {
  try {
    const { businessId, email } = await req.json();

    if (!businessId || !email) {
      return NextResponse.json(
        { success: false, message: "Missing data" },
        { status: 400 }
      );
    }


    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: "123456", // 🔥 Default until email invitation system
          role: "BUSINESS_ADMIN",
        },
      });
    }

    // Ensure correct role
    if (user.role !== "BUSINESS_ADMIN") {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "BUSINESS_ADMIN" },
      });
    }

    // Assign relationship
    await prisma.business.update({
      where: { id: businessId },
      data: {
        ownerId: user.id,
        users: { connect: [{ id: user.id }] },
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}