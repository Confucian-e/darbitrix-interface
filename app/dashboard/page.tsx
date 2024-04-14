"use client";

import { ArbitrageContract, PairContract } from "@/classes";
import {
  Balance,
  GenerateAccount,
  SelectBox,
  SendGas,
  WatchSwapEvent,
} from "@/components";
import { Arbitrage as Arbitrage_Address } from "@/configs/addresses";
import { DexFactoryOptions, TokenOptions } from "@/constants/options";
import {
  encodeCallSwapExactFor,
  encodeCallSwapForExact,
  encodeMakeFlashLoanData,
} from "@/core/Executor/encode";
import { findPairs, getPairs } from "@/core/Searcher";
import { SwapExactForParam, SwapForExactParam } from "@/types";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "antd";
import { useState } from "react";
import { maxUint256, parseEther, type Account, type Address } from "viem";

export default function Page() {
  const [account, setAccount] = useState<Account>();
  const [selectedDexs, setSelectedDexs] = useState<Address[]>();
  const [selectedTokens, setSelectedTokens] = useState<Address[]>();
  const [pairs, setPairs] = useState<PairContract[]>();
  const [confirmed, setConfirmed] = useState<boolean>(false);

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

  function execute() {
    if (!pairs || !account) return;
    const [PairA, PairB] = pairs;

    const arbitrage = new ArbitrageContract(Arbitrage_Address, account);

    const swapAmount = parseEther("100");
    const path = [PairA.token0, PairA.token1];
    const to = arbitrage.contract;
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 10);

    // encode swap for exact
    const param1: SwapForExactParam = {
      amountInMax: maxUint256,
      amountOut: swapAmount,
      path,
      to,
      deadline,
    };

    // encode swap exact for
    const param2: SwapExactForParam = {
      amountIn: swapAmount,
      amountOutMin: 0n,
      path,
      to,
      deadline,
    };

    const call1 = encodeCallSwapForExact(PairA.contract, param1);
    const call2 = encodeCallSwapExactFor(PairB.contract, param2);

    const data = encodeMakeFlashLoanData([call1, call2]);

    console.log("makeFlashLoan data: ", data);

    // execute arbitrage
    // await arbitrage.makeFlashLoan(
    //   [PairA.token0, PairA.token1],
    //   [swapAmount, swapAmount],
    //   data
    // );
  }

  return (
    <div>
      <div className="flex justify-end mt-4 mr-4">
        <ConnectButton chainStatus="icon" />
      </div>
      <h2 className="flex justify-center">Welcome to Dashborad</h2>

      <div>
        {!account && (
          <div className="flex justify-center">
            <GenerateAccount setAccount={setAccount} />
          </div>
        )}
        {account && (
          <>
            <h4 className="flex justify-center">
              Send Gas to Account Address: {account.address}
            </h4>
            <div className="flex justify-center">
              <Balance account={account.address} />
            </div>
            <SendGas receiver={account.address} />
          </>
        )}
      </div>

      <div>
        <div className="flex justify-center">
          <h4>Choose DEXs</h4>
          <SelectBox
            options={DexFactoryOptions}
            setSelected={setSelectedDexs}
          />
        </div>
        <div className="flex justify-center">
          <h4>Choose Tokens</h4>
          <SelectBox options={TokenOptions} setSelected={setSelectedTokens} />
        </div>

        <div className="flex justify-center">
          <Button onClick={handleConfirm} disabled={confirmed}>
            confirm
          </Button>
        </div>
        <div className="flex justify-center">{confirmed && <h3>Ready</h3>}</div>
      </div>

      {account && confirmed && (
        <div>
          <WatchSwapEvent
            wallet={account.address}
            pairs={pairs!}
            callback={execute}
          />
        </div>
      )}
    </div>
  );
}
