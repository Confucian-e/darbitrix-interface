"use client";

import { TokenBalance, VaultTable } from "@/components";
import { Vault } from "@/constants";
import { Button, Card, Input, Modal, Space } from "antd";
import Image from "next/image";
import { useState } from "react";
import { Address, isAddress } from "viem";
import "./style.css";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [token, setToken] = useState<Address>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAddress(e.target.value)) {
      setToken(e.target.value);
    }
  };

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
            <a href={`https://arbiscan.io/address/${Vault}`}>{Vault}</a>

            <Space>
              <Input placeholder="Token Address" onChange={handleChange} />
              <Button onClick={showModal}>Check Balance</Button>
              <Modal
                title="token balance"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                {token && <TokenBalance token={token} account={Vault} />}
              </Modal>
            </Space>
            <VaultTable />
          </Space>
        </Card>
      </div>
    </>
  );
}
