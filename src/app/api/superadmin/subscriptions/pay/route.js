// src/app/api/superadmin/subscriptions/pay/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
// If you want to restrict to SUPER_ADMIN only, you can also import getServerSession + authOptions
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

function addPeriodToDate(startDate, period) {
  const date = new Date(startDate);

  if (period === "YEARLY") {
    date.setFullYear(date.getFullYear() + 1);
  } else {
    // default MONTHLY
    date.setMonth(date.getMonth() + 1);
  }

  return date;
}

export async function POST(req) {
  try {
    // Optionally enforce auth here:
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== "SUPER_ADMIN") {
    //   return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    // }

    const body = await req.json();
    const { businessId, method, period, amount } = body;

    if (!businessId || !method || !period) {
      return NextResponse.json(
        {
          success: false,
          message: "businessId, method, and period are required",
        },
        { status: 400 }
      );
    }

    // Validate payment method & billing period values
    const allowedMethods = ["CASH", "OMT", "WISH", "BANK", "OTHER"];
    const allowedPeriods = ["MONTHLY", "YEARLY"];

    if (!allowedMethods.includes(method)) {
      return NextResponse.json(
        { success: false, message: "Invalid payment method" },
        { status: 400 }
      );
    }

    if (!allowedPeriods.includes(period)) {
      return NextResponse.json(
        { success: false, message: "Invalid billing period" },
        { status: 400 }
      );
    }

    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business || business.deleted) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

    // Determine amount to charge:
    const finalAmount = typeof amount === "number" && amount > 0
      ? amount
      : business.subscriptionPrice || 0;

    if (finalAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Subscription price is not configured" },
        { status: 400 }
      );
    }

    const now = new Date();

    // If subscriptionEndsAt is in the future, extend from that date
    // If it's null or already past, start from "now"
    const baseDate =
      business.subscriptionEndsAt && new Date(business.subscriptionEndsAt) > now
        ? new Date(business.subscriptionEndsAt)
        : now;

    const nextDueDate = addPeriodToDate(baseDate, period);

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        businessId: business.id,
        amount: finalAmount,
        method,
        period,
        nextDueDate,
      },
    });

    // Update business subscription info
    const updatedBusiness = await prisma.business.update({
      where: { id: business.id },
      data: {
        subscriptionEndsAt: nextDueDate,
        subscriptionStatus: "ACTIVE",
        billingPeriod: period,
        active: true, // re-activate if it was suspended/expired
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment recorded and subscription updated",
      invoice,
      business: updatedBusiness,
    });
  } catch (err) {
    console.error("Error in /api/superadmin/subscriptions/pay:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
