import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // ✅ Robust: fetch user id by email (because your session currently stores role but may not store id)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 401 }
    );
  }

  // ✅ Ownership
  const business = await prisma.business.findFirst({
    where: { ownerId: user.id },
    select: { id: true, name: true },
  });

  if (!business) {
    return NextResponse.json(
      { success: false, message: "No business linked to this account" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, business });
}
