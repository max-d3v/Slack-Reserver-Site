import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";

export const auth = () => getServerSession(authOptions as any) as any;