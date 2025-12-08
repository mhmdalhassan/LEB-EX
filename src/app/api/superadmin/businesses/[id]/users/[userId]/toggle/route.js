import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(req, context) {
  try {
    const { id: businessId, userId } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { business: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        business: user.business
          ? { disconnect: true }  // Suspend user
          : { connect: { id: businessId } }, // Activate user back
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Toggle User Error:", err);
    return NextResponse.json(
      { success: false, message: "Error updating user status" },
      { status: 500 }
    );
  }
}
