import GoogleProvider from "next-auth/providers/google";
import subscriptionService from "@/lib/stripe/subscriptions";
import { PrismaClient } from "@prisma/client";
import db from "@/lib/db/db";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const authOptions = {
  url: process.env.NEXT_PUBLIC_SITE_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user }: any) {
      const { id, email, name, image } = user;
            
      if (!id || !email) {
        return false;
      }

      await db.users.upsert({
        where: { google_id: id },
        update: {
          name,
          email,
          imageUrl: image,
        },
        create: {
          google_id: id,
          name,
          email,
          imageUrl: image,
          role: "user",
        },
      })
      return true;
    },
    async session({ session, token }: any) {
      const dbUser = await (db.users as PrismaClient['users']).findUnique({
        where: {
          google_id: token.sub,
        },
        select: {
          id: true,
          role: true,
          isAdmin: true,
          tenant_id: true,
          created_at: true,
          stripe_customer_id: true,
          tenant: {
            select: {
              id: true,
              subdomain: true,
              status: true,
              workspace_team_id: true,
            },
            where: {
              status: "active",
            },
          },
        },
      });

      if (!dbUser) {
        throw new Error("User not found");
      }

      let subscription: any = null;
      // In the paper, the user cannot have a customer id and not have a tenant. // this logic is in slack button and pricing 
      if (dbUser.tenant) {
        console.log("cust id stripe: ", dbUser.stripe_customer_id)
        const foundSubscription = await subscriptionService.getActiveSubscription(dbUser.stripe_customer_id);
        const data = foundSubscription?.items.data[0];
        subscription = data;
      }
    
      session.user = {
        ...dbUser,
        subscription,
        name: session.user.name, // Google name
        email: session.user.email, // Google email
        image: session.user.image || "", // Google image
      };
    
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return `${baseUrl}/pricing`; 
    }
  },
  pages: {
    signIn: '/signIn',
    error: '/auth-result',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
