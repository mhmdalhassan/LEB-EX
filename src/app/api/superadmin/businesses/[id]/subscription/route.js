import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const { subscriptionPrice, subscriptionPlan } = await req.json();

    const updated = await prisma.business.update({
      where: { id },
      data: {
        subscriptionPrice: parseFloat(subscriptionPrice),
        subscriptionPlan
      }
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
