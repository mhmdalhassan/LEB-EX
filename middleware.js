import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;

      // Not logged in → block protected routes
      if (!token) return false;

      // Super Admin area
      if (path.startsWith("/superadmin")) {
        return token.role === "SUPER_ADMIN";
      }

      // Business area (admin + staff)
      if (path.startsWith("/business")) {
        return [
          "BUSINESS_ADMIN",
          "ACCOUNTANT",
          "STOREKEEPER",
          "CASHIER",
          "DELIVERY",
        ].includes(token.role);
      }

      // Everything else is public
      return true;
    },
  },
});

export const config = {
  matcher: [
    "/superadmin/:path*",
    "/business/:path*",
  ],
};
