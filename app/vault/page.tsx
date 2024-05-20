"use client";

import { VaultTable } from "@/components";
import { Card, Space } from "antd";
import Image from "next/image";
import "./style.css";

export default function Page() {
  return (
    <>
      <div className="flex justify-center mt-20">
        <Card className="bg-gray-800 bg-opacity-50 text-white">
          <Space align="center" direction="vertical" size={20}>
            <div className="flex items-center">
              <Image
                src="/balancer.svg"
                alt="Balancer"
                width={40}
                height={30}
              ></Image>
              <h1 className="ml-2">Balancer Vault Holdings</h1>
            </div>
            <a href="https://arbiscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8">
              0xBA12222222228d8Ba445958a75a0704d566BF2C8
            </a>

            {/* Input Token Address */}

            <VaultTable />
          </Space>
        </Card>
      </div>
    </>
  );
}
