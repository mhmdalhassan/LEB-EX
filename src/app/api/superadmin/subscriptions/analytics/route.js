import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();

    const activeCount = await prisma.business.count({
      where: { subscriptionStatus: "ACTIVE", deleted: false },
    });

    const expiredCount = await prisma.business.count({
      where: { subscriptionStatus: "EXPIRED", deleted: false },
    });

    const monthlyRevenue = await prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { period: "MONTHLY" },
    });

    const yearlyRevenue = await prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { period: "YEARLY" },
    });

    const paymentsByMethod = await prisma.invoice.groupBy({
      by: ["method"],
      _sum: { amount: true },
    });

    return NextResponse.json({
      success: true,
      activeCount,
      expiredCount,
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
      yearlyRevenue: yearlyRevenue._sum.amount || 0,
      paymentsByMethod,
    });

  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load analytics" },
      { status: 500 }
    );
  }
}
