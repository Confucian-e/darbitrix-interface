"use client";

import { ArbitrageContract, PairContract } from "@/classes";
import {
  Balance,
  GenerateAccount,
  PairPrice,
  SelectBox,
  SendGas,
  SignTypeData,
  WatchEvent,
} from "@/components";
import { phalconUrl } from "@/constants";
import {
  Arbitrage as Arbitrage_Address,
  PancakeSwapRouter,
  SushiSwapRouter,
} from "@/constants/addressBook";
import { DexFactoryOptions, TokenOptions } from "@/constants/options";
import {
  encodeCallSwapExactFor,
  encodeCallSwapForExact,
  encodeMakeFlashLoanData,
} from "@/core/Executor/encode";
import { findPairs, getPairs } from "@/core/Searcher";
import { SwapExactForParam, SwapForExactParam } from "@/types";
import {
  BranchesOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Card, Empty, Space, Steps, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import {
  maxUint256,
  parseEther,
  type Account,
  type Address,
  type Hex,
} from "viem";
import "./style.css";

export default function Page() {
  const [account, setAccount] = useState<Account>();
  const [selectedDexs, setSelectedDexs] = useState<Address[]>();
  const [selectedTokens, setSelectedTokens] = useState<Address[]>();
  const [pairs, setPairs] = useState<PairContract[]>();
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<Hex>();
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [enabled, setEnabled] = useState<boolean>(false);

  const [pair1Count, setPair1Count] = useState<number>(0);
  const [pair2Count, setPair2Count] = useState<number>(0);

  const handleConfirm = async () => {
    if (!account || !selectedDexs || !selectedTokens) return;

    const pairs = await findPairs(
      selectedDexs,
      selectedTokens[0],
      selectedTokens[1]
    );
    const [PairA, PairB] = await getPairs(account, pairs, selectedTokens);

    setPairs([PairA, PairB]);
    setConfirmed(true);

    console.log("Pairs: ", pairs);
  };

  async function execute() {
    if (!pairs || !account) return;
    const [PairA, PairB] = pairs;
    const [token0, token1] = [PairA.token0, PairA.token1];

    console.log("Pairs: ", pairs);

    const arbitrage = new ArbitrageContract(Arbitrage_Address, account);

    const swapAmount = parseEther("100");
    const path1 = [token0, token1];
    const path2 = [token1, token0];
    const to = arbitrage.contract;
    // const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 10);
    const deadline = 1730000000n; // 2024-10-27

    // encode swap for exact
    const param1: SwapForExactParam = {
      amountInMax: maxUint256,
      amountOut: swapAmount,
      path: path1,
      to,
      deadline,
    };

    // encode swap exact for
    const param2: SwapExactForParam = {
      amountIn: swapAmount,
      amountOutMin: 0n,
      path: path2,
      to,
      deadline,
    };

    const call1 = encodeCallSwapForExact(SushiSwapRouter, param1);
    const call2 = encodeCallSwapExactFor(PancakeSwapRouter, param2);

    const data = encodeMakeFlashLoanData([call1, call2]);

    // execute arbitrage
    const tx = await arbitrage.makeFlashLoan(
      [PairA.token0, PairA.token1],
      [swapAmount, swapAmount],
      data
    );

    setTransaction(tx);
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Account Management",
      children: (
        <Card>
          {!account && (
            <div className="flex justify-center">
              <GenerateAccount setAccount={setAccount} />
            </div>
          )}
          {account && (
            <>
              <h4 className="flex justify-center">
                Send Gas to Account Address:
              </h4>
              <h4 className="flex justify-center">{account.address}</h4>
              <div className="flex justify-center">
                <Balance account={account.address} />
              </div>
              <div className="flex justify-center">
                <SendGas receiver={account.address} />
              </div>
            </>
          )}
        </Card>
      ),
    },
    {
      key: "2",
      label: "Select",
      children: (
        <Card>
          <Space
            align="center"
            direction="vertical"
            className="flex justify-center"
          >
            <Space align="center" size={28}>
              <SelectBox
                options={DexFactoryOptions}
                setSelected={setSelectedDexs}
                placeHolder="Select DEXs"
              />
              <SelectBox
                options={TokenOptions}
                setSelected={setSelectedTokens}
                placeHolder="Select Tokens"
              />
            </Space>
            <Button
              className="mt-8"
              onClick={handleConfirm}
              disabled={confirmed}
            >
              confirm
            </Button>
          </Space>
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
              <PairPrice pair={pairs[0]} count={pair1Count} />
              <PairPrice pair={pairs[1]} count={pair2Count} />
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
          {pairs && (
            <Space align="center" direction="vertical">
              <Card>
                <Space align="center" direction="vertical">
                  <h2>Sign Typed Data to Switch</h2>
                  <SignTypeData enabled={enabled} setEnabled={setEnabled} />
                </Space>
              </Card>

              <WatchEvent
                pair={pairs[0]}
                enabled={enabled}
                setCount={setPair1Count}
                callback={execute}
              />
              <WatchEvent
                pair={pairs[1]}
                enabled={enabled}
                setCount={setPair2Count}
                callback={execute}
              />
            </Space>
          )}
        </Card>
      ),
      disabled: confirmed ? false : true,
    },
    {
      key: "5",
      label: "Aribtrage Transaction",
      children: (
        <Card>
          {!transaction && <Empty />}
          <a
            className="flex justify-center"
            target="_blank"
            href={phalconUrl + transaction}
          >
            {transaction}
          </a>
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
        className="flex justify-center ml-5 mr-5"
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
          <Tabs type="card" defaultActiveKey="1" items={items} />
        </Card>
      </Space>
    </>
  );
}
