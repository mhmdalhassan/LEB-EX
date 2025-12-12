import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST() {
  try {
    const now = new Date();
    const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Find businesses expiring within 7 days
    const businesses = await prisma.business.findMany({
      where: {
        deleted: false,
        subscriptionEndsAt: {
          gt: now,
          lte: in7days,
        },
      },
      include: {
        owner: true, // we assume owner.email is where we send
      },
    });

    if (!businesses.length) {
      return NextResponse.json({
        success: true,
        message: "No businesses are expiring in the next 7 days.",
      });
    }

    // Configure transporter only if SMTP is set
    let transporter: any = null;
    if (process.env.SMTP_HOST) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }

    for (const biz of businesses) {
      const toEmail = biz.owner?.email || biz.email;
      if (!toEmail) continue;

      const subject = `Your subscription for ${biz.name} is expiring soon`;
      const text = `Hello,

Your subscription plan (${biz.subscriptionPlan}) for business "${biz.name}" will expire on ${new Date(
        biz.subscriptionEndsAt
      ).toLocaleDateString()}.

Please log in to your dashboard to renew your subscription and avoid interruption.

Best regards,
Your Platform Team
`;

      if (transporter) {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: toEmail,
          subject,
          text,
        });
      } else {
        // Dev mode: just log
        console.log("[Reminder Email - DEV]", { toEmail, subject, text });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${businesses.length} expiring businesses.`,
    });
  } catch (err) {
    console.error("Reminder error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send reminders" },
      { status: 500 }
    );
  }
}
