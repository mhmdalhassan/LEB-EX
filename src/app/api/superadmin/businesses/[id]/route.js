import { NextResponse } from "next/server";
import prisma from "@/lib/db";


/////////// for show //////////////

export async function GET(req, context) {
  try {
    const { id } = await context.params;

    const business = await prisma.business.findUnique({
      where: { id },
      include: {
        invoices: true,
        notifications: true,
      },
    });

    if (!business) {
      return NextResponse.json(
        { success: false, message: "Business not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, business });
  } catch (err) {
    console.error("GET business error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}



/////////////// UPDATE /////////////

export async function PUT(req, { params }) {
  try {
  const { id } = await params;
    const body = await req.json();

    const business = await prisma.business.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, business });
  } catch (err) {
  console.error("GET /business error:", err);
  return NextResponse.json(
    {
      success: false,
      message: err.message || "Failed to fetch business",
    },
    { status: 500 }
  );
}

}




///////////////// DELETE //////////////////

export async function DELETE(req, { params }) {
  try {
  const { id } = await params;

    await prisma.business.update({
      where: { id },
      data: {
        deleted: true,
        deletedAt: new Date(),
        active: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to delete business" },
      { status: 500 }
    );
  }
}
