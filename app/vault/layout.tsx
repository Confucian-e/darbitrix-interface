import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Config } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vault",
  description: "Balancer.fi Vault",
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
