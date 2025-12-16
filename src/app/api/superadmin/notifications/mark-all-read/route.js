import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH() {
  try {
    await prisma.notification.updateMany({
      where: {
        roleTarget: "SUPER_ADMIN",
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mark all read error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to mark all as read" },
      { status: 500 }
    );
  }
}
