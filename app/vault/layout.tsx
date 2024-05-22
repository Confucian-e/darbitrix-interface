import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Config } from "@/components";
import { Alert } from "antd";

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
        <Alert
          message={
            <span className="flex justify-center">
              此课题仅做区块链技术研究，涉及的 Token
              仅用作测试等用途，所设计的产品不用于实际的虚拟货币交易
            </span>
          }
          type="warning"
          banner
          showIcon={false}
        />
        <Config>{children}</Config>
      </body>
    </html>
  );
}
