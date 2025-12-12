import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const businesses = await prisma.business.findMany({
      where: { deleted: false },
      include: { owner: true },
    });
    return NextResponse.json({ success: true, businesses });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Error fetching businesses" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const {
      name,
      industry,
      email,
      phone,
      country,
      city,
      address,
      currency,
      adminName,
      adminEmail,
      adminPassword,
    } = await req.json();

    if (!name || !adminEmail || !adminPassword) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const createdBusiness = await prisma.business.create({
      data: {
        name,
        industry,
        email,
        phone,
        country,
        city,
        address,
        currency,
        owner: {
          create: {
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: "BUSINESS_ADMIN",
          },
        },
      },
      include: { owner: true },
    });

    return NextResponse.json({ success: true, business: createdBusiness });
  } catch (err) {
    console.error("Create business error:", err);
    return NextResponse.json(
      { success: false, message: "Error creating business" },
      { status: 500 }
    );
  }
}
