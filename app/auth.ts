import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";
import type { Session } from "next-auth";


export const auth = (): Promise<Session | null> => getServerSession(authOptions as any) as any;