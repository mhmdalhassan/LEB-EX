import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    /* ================================
       Allow public/auth routes
    ================================= */
    if (
      path.startsWith("/auth") ||
      path.startsWith("/login") ||
      path.startsWith("/maintenance")
    ) {
      return NextResponse.next();
    }

    /* ================================
       Not logged in
    ================================= */
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    /* ================================
       🔧 Maintenance Mode Check
    ================================= */
    try {
      const res = await fetch(
        `${req.nextUrl.origin}/api/superadmin/settings`,
        { cache: "no-store" }
      );

      const data = await res.json();
      const maintenance = data?.settings?.maintenanceMode;

      if (maintenance) {
        // Allow SUPER_ADMIN only
        if (token.role === "SUPER_ADMIN") {
          return NextResponse.next();
        }

        // Block everyone else
        return NextResponse.redirect(
          new URL("/maintenance", req.url)
        );
      }
    } catch (err) {
      console.error("Maintenance check failed", err);
      // If settings API fails → allow access (safe fallback)
    }

    /* ================================
       🔐 Role-based Access (YOUR CODE)
    ================================= */
    if (path.startsWith("/superadmin")) {
      return token.role === "SUPER_ADMIN"
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/login", req.url));
    }

    if (path.startsWith("/business")) {
      const allowed = [
        "BUSINESS_ADMIN",
        "ACCOUNTANT",
        "STOREKEEPER",
        "CASHIER",
        "DELIVERY",
      ];

      return allowed.includes(token.role)
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }
);

export const config = {
  matcher: [
    "/superadmin/:path*",
    "/business/:path*",
  ],
};
