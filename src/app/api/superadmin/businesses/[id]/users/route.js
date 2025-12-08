import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = await params; // unwrap promise

  try {
    const users = await prisma.user.findMany({
      where: {
        businessId: id,
        deleted: false
      },
      include: {
        business: {
          select: { name: true, active: true, deleted: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Users Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}
