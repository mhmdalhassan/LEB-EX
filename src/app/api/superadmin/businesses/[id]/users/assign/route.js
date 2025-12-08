import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req, context) {
  try {
    const { id: businessId } = await context.params;
    const { userId } = await req.json();

    if (!businessId || !userId) {
      return NextResponse.json(
        { success: false, message: "Missing businessId or userId" },
        { status: 400 }
      );
    }

    // Update user role + assign as business admin
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "BUSINESS_ADMIN",
        business: { connect: { id: businessId } }
      },
    });

    return NextResponse.json(
      { success: true, message: "Admin assigned successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Assign Admin Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
