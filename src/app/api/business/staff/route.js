import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

/* ======================================================
   GET — Fetch all staff for this business
====================================================== */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "BUSINESS_ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const business = await prisma.business.findFirst({
      where: { ownerId: session.user.id },
      select: { id: true },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

    const staff = await prisma.staff.findMany({
      where: {
        businessId: business.id,
        // ⚠️ no over-filtering here
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      staff,
    });
  } catch (error) {
    console.error("Fetch staff error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

/* ======================================================
   POST — Create staff (YOUR CODE, UNCHANGED)
====================================================== */
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "BUSINESS_ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, email, phone, role, salary } = body;

    if (!name || !email || !role || salary === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const salaryNumber = Number(salary);
    if (Number.isNaN(salaryNumber)) {
      return NextResponse.json(
        { success: false, message: "Salary must be a valid number" },
        { status: 400 }
      );
    }

    const business = await prisma.business.findFirst({
      where: { ownerId: session.user.id },
      select: { id: true },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

    const existingStaff = await prisma.staff.findFirst({
      where: {
        email,
        businessId: business.id,
      },
    });

    if (existingStaff) {
      return NextResponse.json(
        { success: false, message: "Staff already exists" },
        { status: 409 }
      );
    }

    await prisma.staff.create({
      data: {
        name,
        email,
        phone,
        role,
        salary: salaryNumber,
        businessId: business.id,
        active: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Create staff error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
