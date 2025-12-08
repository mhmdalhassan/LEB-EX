import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
          console.log("TOKEN IN MIDDLEWARE:", token);

        // If no token → not logged in → block
        if (!token) return false;

        // Super Admin only routes
        if (path.startsWith("/superadmin")) {
          return token.role === "SUPER_ADMIN";
        }

        // Business Admin or Staff only routes
        if (path.startsWith("/business")) {
          return (
            token.role === "BUSINESS_ADMIN" ||
            token.role === "STAFF"
          );
        }

        // Default allow
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/login",
    "/superadmin/:path*",
    "/business/:path*",
  ],
};

