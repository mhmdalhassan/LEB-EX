import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;

    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mark read error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to mark notification as read" },
      { status: 500 }
    );
  }
}
