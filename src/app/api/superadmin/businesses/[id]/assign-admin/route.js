import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req, { params }) {
  try {
    const { id : businessId} = await params;
    const { userId } = await req.json();

    if (!businessId || !userId) {
      return NextResponse.json(
        { success: false, message: "Missing business or user ID" },
        { status: 400 }
      );
    }

    // Check business exists
    const business = await prisma.business.findUnique({
      where: { id: businessId, deleted: false },
    });
    if (!business) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

    // Reset existing admins of this business
    await prisma.user.updateMany({
      where: {
        businessId,
        role: "BUSINESS_ADMIN",
      },
      data: {
        role: "CASHIER", // downgrade old admins
      },
    });

    // Assign new admin
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: "BUSINESS_ADMIN",
        businessId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Business admin assigned successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Assign Admin Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to assign admin" },
      { status: 500 }
    );
  }
}
