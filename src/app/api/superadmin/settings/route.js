import { NextResponse } from "next/server";
import prisma from "@/lib/db";

/* =========================
   GET Platform Settings
========================= */
export async function GET() {
  try {
    let settings = await prisma.platformSettings.findUnique({
      where: { id: "platform" },
    });

    if (!settings) {
      settings = await prisma.platformSettings.create({
        data: {
          id: "platform",
          platformName: "LEB-EX",
          currency: "USD",
          defaultPlan: "Basic",
          defaultMonthlyPrice: 0,
          defaultPaymentMethod: "CASH",
          maintenanceMode: false,
        },
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

/* =========================
   UPDATE Platform Settings
========================= */
export async function PATCH(req) {
  try {
    const body = await req.json();

    const settings = await prisma.platformSettings.update({
      where: { id: "platform" },
      data: body,
    });

    return NextResponse.json({ success: true, settings });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
