import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

// ADD THIS — your NextAuth configuration must be exported
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return user;
      },
    }),
  ],

 callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;      
      token.role = user.role;
      token.email = user.email;
      token.businessId = user.businessId;

    }
    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id;     
    session.user.role = token.role;
    session.user.email = token.email;
        session.user.businessId = token.businessId;

    return session;
  },



    async redirect({ url, baseUrl }) {
      return url;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

// MUST wrap authOptions
const handler = NextAuth(authOptions);

// Export NextAuth handlers
export { handler as GET, handler as POST };
