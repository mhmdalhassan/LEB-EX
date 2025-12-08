import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req) {
  try {
    const { businessId, subscriptionPlan, subscriptionPrice } = await req.json();

    if (!businessId) {
      return NextResponse.json(
        { success: false, message: "Business ID is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.business.update({
      where: { id: businessId },
      data: {
        subscriptionPlan,
        subscriptionPrice: subscriptionPrice ?? 0,
      },
    });

    return NextResponse.json({ success: true, business: updated });

  } catch (err) {
    console.error("Update Subscription Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
