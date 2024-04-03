import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Config } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashborad to operate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Config>{children}</Config>
      </body>
    </html>
  );
}
