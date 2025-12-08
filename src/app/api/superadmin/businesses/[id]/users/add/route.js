import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req, context) {
  try {
    const { id: businessId } = await context.params;
    const { email, role } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email is required" },
        { status: 400 }
      );
    }

    // Check if User exists
    let user = await prisma.user.findUnique({ where: { email } });

    // If user does not exist → Create new
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: "123456",
          role,
        },
      });
    }

    // If adding BUSINESS_ADMIN → Switch ownership
    if (role === "BUSINESS_ADMIN") {
      const business = await prisma.business.findUnique({
        where: { id: businessId },
      });

      if (business && business.ownerId !== user.id) {
        // Remove ownership from previous Admin
        await prisma.user.updateMany({
          where: { id: business.ownerId },
          data: { role: "CASHIER" },
        });

        // Assign new Owner
        await prisma.business.update({
          where: { id: businessId },
          data: {
            ownerId: user.id,
            users: {
              connect: { id: user.id },
            },
          },
        });

      } else {
        // If same user already owner, just ensure connection
        await prisma.user.update({
          where: { id: user.id },
          data: {
            role,
            businessId,
          },
        });
      }

    } else {
      // Add normal user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          role,
          businessId,
        },
      });
    }

    return NextResponse.json({ success: true, message: "User added successfully!" });

  } catch (err) {
    console.error("Add User Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
