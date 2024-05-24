"use client";

import { ArbitrageContract, PairContract } from "@/classes";
import {
  AccountManage,
  AribtrageTransaction,
  EventsCatched,
  PairPrice,
  SelectRouter,
} from "@/components";
import { Arbitrage } from "@/constants/addressBook";
import { calculateProfit } from "@/core/Executor/data";
import { findPairs, getPairs } from "@/core/Searcher";
import {
  BranchesOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Card, Space, Steps, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { parseEther, type Account, type Address, type Hex } from "viem";
import "./style.css";
import Link from "next/link";

export default function Page() {
  const [account, setAccount] = useState<Account>();
  const [selectedDexs, setSelectedDexs] = useState<Address[]>();
  const [selectedTokens, setSelectedTokens] = useState<Address[]>();
  const [pairs, setPairs] = useState<PairContract[]>();
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Hex[]>();
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [counts, setCounts] = useState<number[]>([]);

  const handleConfirm = async () => {
    if (!account || !selectedDexs || !selectedTokens) return;

    const pairs = await findPairs(
      selectedDexs,
      selectedTokens[0],
      selectedTokens[1],
    );
    const [PairA, PairB] = await getPairs(account, pairs, selectedTokens);

    setPairs([PairA, PairB]);
    setConfirmed(true);
  };

  async function execute() {
    if (!pairs || !account) return;
    const [PairA, PairB] = pairs;

    const arbitrage = new ArbitrageContract(Arbitrage, account);

    const swapAmount = parseEther("100");
    const data = await calculateProfit(PairA, PairB, swapAmount);
    if (data == undefined) throw new Error("Invalid flashLoan data");

    // execute arbitrage
    const tx = await arbitrage.makeFlashLoan(
      [PairA.token0, PairA.token1],
      [swapAmount, swapAmount],
      data,
    );

    setTransactions(transactions ? [...transactions, tx] : [tx]);
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Account",
      children: (
        <Card>
          <AccountManage account={account} setAccount={setAccount} />
        </Card>
      ),
    },
    {
      key: "2",
      label: "Select",
      children: (
        <Card>
          <SelectRouter
            setSelectedDexs={setSelectedDexs}
            setSelectedTokens={setSelectedTokens}
            disabled={confirmed}
            onClick={handleConfirm}
          />
        </Card>
      ),
      disabled: account ? false : true,
    },
    {
      key: "3",
      label: "Pairs Price",
      children: (
        <Card className="flex justify-center bg-sky-300">
          {pairs && (
            <Space align="center" direction="vertical">
              {pairs.map((pair, index) => (
                <PairPrice key={index} pair={pair} count={counts[index]} />
              ))}
            </Space>
          )}
        </Card>
      ),
      disabled: confirmed && account ? false : true,
    },
    {
      key: "4",
      label: "Events Catched",
      children: (
        <Card className="flex justify-center bg-sky-300">
          <EventsCatched
            pairs={pairs}
            enabled={enabled}
            setEnabled={setEnabled}
            setCounts={setCounts}
            callback={execute}
          />
        </Card>
      ),
      disabled: confirmed ? false : true,
    },
    {
      key: "5",
      label: "Aribtrage Transaction",
      children: (
        <Card>
          <AribtrageTransaction transactions={transactions} />
        </Card>
      ),
    },
  ];

  useEffect(() => {
    if (account) setCurrentStep(0);
    if (confirmed) setCurrentStep(1);
    if (enabled) setCurrentStep(2);
  }, [account, confirmed, enabled]);

  return (
    <>
      <div className="flex justify-end mt-4 mr-4">
        <ConnectButton chainStatus="icon" />
      </div>

      <Space
        align="center"
        direction="vertical"
        className="flex justify-center mt-10 ml-5 mr-5"
      >
        <Card className="mb-10">
          <Steps
            className="mr-16"
            direction="horizontal"
            size="small"
            current={currentStep}
            items={[
              {
                title: "Generate Account",
                icon: <UserOutlined />,
              },
              {
                title: "Select Router",
                icon: <BranchesOutlined />,
              },
              {
                title: "Watching Events",
                icon: <LoadingOutlined />,
              },
            ]}
          />
        </Card>
        <Card className="bg-gray-200 ml-10 mr-10">
          <Tabs
            tabBarGutter={10}
            type="card"
            defaultActiveKey="1"
            items={items}
          />
        </Card>
      </Space>
    </>
  );
}
