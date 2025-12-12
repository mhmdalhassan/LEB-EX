import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, businessId } = await req.json();

    if (!businessId || !email) {
      return NextResponse.json(
        { success: false, message: "Business ID and email are required" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({ where: { email } });

    // If user doesn't exist → create with role BUSINESS_ADMIN
    if (!user) {
      const hashedPassword = await bcrypt.hash(password || "123456", 10);
      
      user = await prisma.user.create({
        data: {
          name: name || "",
          email,
          password: hashedPassword,
          role: "BUSINESS_ADMIN",
        },
      });
    }

    // Ensure correct role
    if (user.role !== "BUSINESS_ADMIN") {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "BUSINESS_ADMIN" },
      });
    }

    // Link the user to business (owner + staff)
    await prisma.business.update({
      where: { id: businessId },
      data: {
        ownerId: user.id,
        users: { connect: { id: user.id } },
      },
    });

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to assign admin" },
      { status: 500 }
    );
  }
}
