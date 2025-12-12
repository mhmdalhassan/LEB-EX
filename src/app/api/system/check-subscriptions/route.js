import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const today = new Date();

    // Find businesses with expired subscriptions
    const expiredBusinesses = await prisma.business.findMany({
      where: {
        subscriptionEndsAt: { lt: today },
        subscriptionStatus: "ACTIVE",
        deleted: false,
      },
    });

    if (expiredBusinesses.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No expired subscriptions found.",
      });
    }

    // Suspend them
    await prisma.business.updateMany({
      where: {
        id: { in: expiredBusinesses.map(b => b.id) },
      },
      data: {
        subscriptionStatus: "EXPIRED",
        active: false,
      },
    });

    for (const biz of expiredBusinesses) {
  await prisma.notification.create({
    data: {
      businessId: biz.id,
      message: `Subscription expired for ${biz.name}`,
      type: "EXPIRED",
    },
  });
}


    return NextResponse.json({
      success: true,
      message: `Suspended ${expiredBusinesses.length} expired businesses.`,
    });

  } catch (error) {
    console.error("Subscription check error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
