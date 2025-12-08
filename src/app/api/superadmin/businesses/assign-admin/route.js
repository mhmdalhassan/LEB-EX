import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req) {
  try {
    const { businessId, email } = await req.json();

    if (!businessId || !email) {
      return NextResponse.json(
        { success: false, message: "Missing businessId or email" },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: "123456", // Make later with reset!
          role: "BUSINESS_ADMIN",
        },
      });
    }

    // Connect user to the business
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
