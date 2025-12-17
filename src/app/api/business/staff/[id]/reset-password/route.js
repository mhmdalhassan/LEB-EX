import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const { id } = params;

  const business = await prisma.business.findFirst({
    where: { ownerId: session.user.id },
    select: { id: true },
  });

  const staff = await prisma.user.findFirst({
    where: { id, businessId: business.id },
  });

  if (!staff) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  const tempPassword = Math.random().toString(36).slice(-8);
  const hashed = await bcrypt.hash(tempPassword, 10);

  await prisma.user.update({
    where: { id },
    data: { password: hashed },
  });

  console.log(`🔐 RESET PASSWORD for ${staff.email}: ${tempPassword}`);

  return NextResponse.json({ success: true });
}
