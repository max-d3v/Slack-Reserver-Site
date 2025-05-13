import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { SessionProvider } from "@/components/sessionProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Slask Reserver",
  description: "Book meeting rooms and resources directly in Slack with Slack Reserver. Simplify your workspace management with our easy-to-use app.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions as any);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white`}>
        <SessionProvider session={session}>
          <Navbar />  
          {children}
          <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}
