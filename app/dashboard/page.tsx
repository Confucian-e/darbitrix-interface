"use client";

import "./style.css";
import { ArbitrageContract, PairContract } from "@/classes";
import {
  Balance,
  GenerateAccount,
  SelectBox,
  SendGas,
  WatchSwapEvent,
  ShowEvent,
} from "@/components";
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
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Card, Space } from "antd";
import { useState } from "react";
import { Hex, maxUint256, parseEther, type Account, type Address } from "viem";

const baseUrl = "https://app.blocksec.com/explorer/tx/arbitrum/";

export default function Page() {
  const [account, setAccount] = useState<Account>();
  const [selectedDexs, setSelectedDexs] = useState<Address[]>();
  const [selectedTokens, setSelectedTokens] = useState<Address[]>();
  const [pairs, setPairs] = useState<PairContract[]>();
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [tx, setTx] = useState<Hex>();

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

    setTx(tx);
  }

  return (
    <>
      <div className="flex justify-end mt-4 mr-4">
        <ConnectButton chainStatus="icon" />
      </div>

      <Space
        align="center"
        className="flex justify-center"
        direction="horizontal"
        size={28}
      >
        <Card title="Account Management">
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
              <h4>{account.address}</h4>
              <div className="flex justify-center">
                <Balance account={account.address} />
              </div>
              <div className="flex justify-center">
                <SendGas receiver={account.address} />
                <Button
                  className="ml-2"
                  onClick={handleConfirm}
                  disabled={confirmed}
                >
                  confirm
                </Button>
              </div>
            </>
          )}
        </Card>

        <Card title="Select DEXs">
          <SelectBox
            options={DexFactoryOptions}
            setSelected={setSelectedDexs}
          />
        </Card>

        <Card title="Select Tokens">
          <SelectBox options={TokenOptions} setSelected={setSelectedTokens} />
        </Card>
      </Space>

      <Space
        align="center"
        className="flex mt-10 justify-center"
        direction="horizontal"
      >
        {account && confirmed && (
          <Card>
            <WatchSwapEvent
              wallet={account.address}
              pairs={pairs!}
              callback={execute}
            />
          </Card>
        )}

        {account && confirmed && (
          <Card
            className="ml-8"
            style={{
              backgroundColor: "#f0f0f0", // 设置背景颜色为浅灰色
            }}
          >
            <Card title="Events Catched">
              <ShowEvent pairs={pairs!} />
            </Card>

            <Card className="mt-8" title="Aribtrage Transaction Hash">
              <a target="_blank" href={baseUrl + tx}>
                {tx}
              </a>
            </Card>
          </Card>
        )}
      </Space>
    </>
  );
}
