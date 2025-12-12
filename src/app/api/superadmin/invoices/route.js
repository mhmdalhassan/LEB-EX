import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { business: true },
      orderBy: { paidAt: "desc" },
    });

    return NextResponse.json({ success: true, invoices });
  } catch (error) {
    console.error("Invoices error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load invoices" },
      { status: 500 }
    );
  }
}
