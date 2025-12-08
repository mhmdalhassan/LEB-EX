import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(req, context) {
  try {
    const { id: businessId } = await context.params;

    if (!businessId) {
      return NextResponse.json(
        { success: false, message: "Missing business ID" },
        { status: 400 }
      );
    }

    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.business.update({
      where: { id: businessId },
      data: {
        active: !business.active,
        ownerId: business.ownerId, // Required by Prisma
      },
    });

    return NextResponse.json({ success: true, business: updated });
  } catch (err) {
    console.error("Toggle Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to toggle status" },
      { status: 500 }
    );
  }
}
