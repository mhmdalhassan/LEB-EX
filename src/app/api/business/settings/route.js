import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

/* =======================
   GET — LOAD SETTINGS
======================= */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "BUSINESS_ADMIN") {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const business = await prisma.business.findFirst({
      where: { ownerId: session.user.id },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, business });
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

/* =======================
   PUT — SAVE SETTINGS
======================= */
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "BUSINESS_ADMIN") {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const body = await req.json();

    const business = await prisma.business.findFirst({
      where: { ownerId: session.user.id },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

    await prisma.business.update({
      where: { id: business.id },
      data: {
        name: body.name,
        description: body.description,
        phone: body.phone,
        email: body.email,
        website: body.website,
        address: body.address,
        googleMapUrl: body.googleMapUrl,
        openingTime: body.openingTime,
        closingTime: body.closingTime,
        minPrice: body.minPrice ? Number(body.minPrice) : null,
        maxPrice: body.maxPrice ? Number(body.maxPrice) : null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT settings error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
