import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req, { params }) {
  try {
    const businessId = params.id;
    const body = await req.json();
    const { email, role = "DELIVERY" } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email is required!" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: "123456",
          role: role,
          business: { connect: { id: businessId } }
        },
      });
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          business: { connect: { id: businessId } }
        }
      });
    }

    return NextResponse.json({ success: true, user });

  } catch (err) {
    console.error("Add User Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
