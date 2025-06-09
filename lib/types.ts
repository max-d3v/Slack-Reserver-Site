import type { DefaultSession } from "next-auth";
import Stripe from "stripe";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      isAdmin: boolean;
      tenant_id: string | null;
      created_at: Date;
      stripe_customer_id: string | null;\
      freePlan: boolean;
      subscription: Stripe.Subscription; // Replace with your actual subscription type
      tenant?: {
        id: string;
        subdomain: string;
        status: string;
        workspace_team_id: string;
      } | null;
    } & DefaultSession["user"];
  }
}