import GoogleProvider from "next-auth/providers/google";

// Database-backed user storage is disabled in this deployment.
// Sign-in still works through Google + JWT sessions; persistence is skipped.

export const authOptions = {
  url: process.env.SITE_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      return Boolean(user?.id && user?.email);
    },
    async session({ session, token }: any) {
      session.user = {
        id: token.sub ?? null,
        role: "user",
        isAdmin: false,
        tenant_id: null,
        tenant: null,
        created_at: null,
        stripe_customer_id: null,
        subscription: null,
        freePlan: false,
        name: session.user?.name ?? null,
        email: session.user?.email ?? null,
        image: session.user?.image ?? "",
      };
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return `${baseUrl}/pricing`;
    },
  },
  pages: {
    signIn: "/signIn",
    error: "/auth-result",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
