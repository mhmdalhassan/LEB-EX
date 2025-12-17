import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

/* ===============================
   GET — List Categories
================================ */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "BUSINESS_ADMIN") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const business = await prisma.business.findFirst({
    where: { ownerId: session.user.id },
    select: { id: true },
  });

  const categories = await prisma.category.findMany({
    where: { businessId: business.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, categories });
}

/* ===============================
   POST — Create Category
================================ */
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "BUSINESS_ADMIN") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name) {
    return NextResponse.json(
      { success: false, message: "Name required" },
      { status: 400 }
    );
  }

  const business = await prisma.business.findFirst({
    where: { ownerId: session.user.id },
    select: { id: true },
  });

  const exists = await prisma.category.findFirst({
    where: { name, businessId: business.id },
  });

  if (exists) {
    return NextResponse.json(
      { success: false, message: "Category exists" },
      { status: 409 }
    );
  }

  const category = await prisma.category.create({
    data: {
      name,
      businessId: business.id,
    },
  });

  return NextResponse.json({ success: true, category });
}
