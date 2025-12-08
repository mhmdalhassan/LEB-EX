import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(req, { params }) {
  try {
    await prisma.user.update({
      where: { id: params.id },
      data: { deleted: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
