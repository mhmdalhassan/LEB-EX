

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const business = await prisma.business.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, business });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to update business" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    await prisma.business.update({
      where: { id },
      data: {
        deleted: true,
        deletedAt: new Date(),
        active: false,
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to delete business" },
      { status: 500 }
    );
  }
}
