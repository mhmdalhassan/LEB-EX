import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(req, context) {
  try {
    const { id } = await context.params;
    const { subscriptionPrice } = await req.json();

    const business = await prisma.business.update({
      where: { id },
      data: { subscriptionPrice: Number(subscriptionPrice) || 0 }
    });

    return NextResponse.json({ success: true, business });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Failed to update subscription" });
  }
}
