import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const count = await prisma.notification.count({
      where: {
        roleTarget: "SUPER_ADMIN",
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Unread count error:", error);
    return NextResponse.json(
      { success: false, count: 0 },
      { status: 500 }
    );
  }
}
