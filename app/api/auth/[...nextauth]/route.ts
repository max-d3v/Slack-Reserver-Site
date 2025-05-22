import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import subscriptionService from "@/lib/stripe/subscriptions";
import { PrismaClient } from "@prisma/client";
import db from "@/lib/db/db";
import { inspect } from "util";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
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
          tenant_id: true,
          created_at: true,
          stripe_customer_id: true,
          tenant: {
            select: {
              id: true,
              subdomain: true,
              status: true,
              workspace_team_id: true,
              tenant_subscriptions: {
                select: {
                  id: true,
                  stripe_subscription_id: true,
                },
                orderBy: {
                  created_at: "desc",
                }
              },
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

      let subscription = null;
      let status = null;
      if (dbUser.tenant) {
        const foundSubscription = await subscriptionService.retrieveSubscription(dbUser.tenant.tenant_subscriptions[0]?.stripe_subscription_id);
        console.log("Subscription found pelo id do banco: ", dbUser.tenant.tenant_subscriptions[0]?.stripe_subscription_id)
        status = foundSubscription?.status;
        subscription = foundSubscription?.items.data[0];
        //console.log(foundSubscription);

      }
    
      session.user = {
        ...dbUser,
        subscription,
        subscription_status: status,
        name: session.user.name, // Google name
        email: session.user.email, // Google email
        image: session.user.image || "", // Google image
      };
    
      return session;
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
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

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };