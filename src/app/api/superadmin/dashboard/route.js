import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalBusinesses = await prisma.business.count({
      where: { deleted: false },
    });

    const activeBusinesses = await prisma.business.count({
      where: { active: true, deleted: false },
    });

    const expiredBusinesses = await prisma.business.count({
      where: { subscriptionStatus: "EXPIRED", deleted: false },
    });

    const totalUsers = await prisma.user.count({
      where: { deleted: false },
    });

    // Revenue
    const monthlyRevenue = await prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { period: "MONTHLY" },
    });

    const yearlyRevenue = await prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { period: "YEARLY" },
    });

    // Recent Payments
    const recentPayments = await prisma.invoice.findMany({
      include: { business: true },
      orderBy: { paidAt: "desc" },
      take: 5,
    });

    // Recent Businesses
    const recentBusinesses = await prisma.business.findMany({
      where: { deleted: false },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalBusinesses,
        activeBusinesses,
        expiredBusinesses,
        totalUsers,
        monthlyRevenue: monthlyRevenue._sum.amount || 0,
        yearlyRevenue: yearlyRevenue._sum.amount || 0,
        recentPayments,
        recentBusinesses,
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
