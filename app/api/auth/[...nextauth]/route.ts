import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import db from "@/lib/db/db";

const prisma = new PrismaClient();

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

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

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
                  status: true,
                  plans: {
                    select: {
                      id: true,
                      name: true,
                      description: true,
                      price: true,
                      billing_interval: true,
                      features: true
                    },
                  },
                },
                where: { status: "active" },
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
    
      session.user = {
        ...dbUser,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image || "",
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