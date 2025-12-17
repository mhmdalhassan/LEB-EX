import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

/* ===============================
   PATCH: UPDATE STAFF
================================ */
export async function PATCH(req, context) {
const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  // ✅ FIX: await params
  const { id } = await context.params;

  const { name, email, phone, role, active, salary } = await req.json();

  const business = await prisma.business.findFirst({
    where: { ownerId: session.user.id },
    select: { id: true },
  });

  if (!business) {
    return NextResponse.json({ success: false }, { status: 403 });
  }

  const staff = await prisma.staff.findFirst({
    where: {
      id,
      businessId: business.id,
    },
  });

  if (!staff) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  await prisma.staff.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      role,
      // only update active if provided
      ...(typeof active === "boolean" ? { active } : {}),
      ...(salary !== undefined ? { salary } : {}),
    },
  });

  return NextResponse.json({ success: true });
}

/* ===============================
   DELETE: REMOVE STAFF
================================ */
export async function DELETE(req, context) {
const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  // ✅ FIX: await params
  const { id } = await context.params;

  const business = await prisma.business.findFirst({
    where: { ownerId: session.user.id },
    select: { id: true },
  });

  if (!business) {
    return NextResponse.json({ success: false }, { status: 403 });
  }

  const staff = await prisma.staff.findFirst({
    where: {
      id,
      businessId: business.id,
    },
  });

  if (!staff) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  await prisma.staff.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
