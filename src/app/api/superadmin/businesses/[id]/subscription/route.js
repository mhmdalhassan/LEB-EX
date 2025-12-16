import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const {
      subscriptionPlan,
      subscriptionPrice,
      status, // ACTIVE | SUSPENDED | EXPIRED
      defaultPaymentMethod, // CASH | OMT | WISH | BANK | OTHER
    } = body;

    const data = {
      subscriptionPlan,
      subscriptionPrice: Number(subscriptionPrice),
      defaultPaymentMethod,
    };

    // status mapping
    if (status === "ACTIVE") data.active = true;
    if (status === "SUSPENDED") data.active = false;
    if (status === "EXPIRED") data.active = false;

    await prisma.business.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update subscription error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
