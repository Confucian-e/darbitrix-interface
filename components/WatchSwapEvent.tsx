"use client";

import { IUniswapV2Pair } from "@/abi";
import { PairContract } from "@/classes";
import { Arbitrage } from "@/configs/addresses";
import { quoteRelativePrice } from "@/core/Strategy";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { erc20Abi, type Address, type TypedData } from "viem";
import {
  useChainId,
  useReadContracts,
  useSignTypedData,
  useWatchContractEvent,
} from "wagmi";

/**
 * A component for subscribing to a wallet with a callback function.
 * @param wallet - The wallet address.
 * @param callback - The callback function to be called when a block number is received.
 * @returns A React component.
 */
export default function WatchSwapEvent({
  wallet,
  pairs,
  callback,
}: {
  wallet: Address;
  pairs: PairContract[];
  callback: () => Promise<void>;
}) {
  const pair1 = pairs[0];
  const pair2 = pairs[1];

  const [token0, token1] = [pair1.token0, pair1.token1];

  const [enabled, setEnabled] = useState<boolean>(false);
  const [eventCount, setEventCount] = useState<number>(0);
  const [prices, setPrices] = useState<number[]>();
  const results = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: token0,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: token1,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  });

  useEffect(() => {
    (async () => {
      const price1 = await quoteRelativePrice(pair1, token0);
      const price2 = await quoteRelativePrice(pair2, token0);
      setPrices([price1, price2]);

      console.log(`price1: ${price1}`);
      console.log(`price2: ${price2}`);
    })();
  }, [eventCount]);

  const { signTypedData } = useSignTypedData();
  const chainId = useChainId();

  useWatchContractEvent({
    address: pair1.contract,
    abi: IUniswapV2Pair,
    eventName: "Swap",
    onLogs: (logs) => {
      console.log("Swap Event: ", logs);
      setEventCount((count) => count + 1);
      callback()
        .then(() => console.log("success"))
        .catch((err) => {
          console.error(err);
        });
    },
    enabled: enabled,
  });

  useWatchContractEvent({
    address: pair2.contract,
    abi: IUniswapV2Pair,
    eventName: "Swap",
    onLogs: (logs) => {
      console.log("Swap Event: ", logs);
      setEventCount((count) => count + 1);
      callback()
        .then(() => console.log("success"))
        .catch((err) => {
          console.error(err);
        });
    },
    enabled: enabled,
  });

  const types = {
    Message: [
      { name: "wallet", type: "address" },
      { name: "project", type: "string" },
      { name: "action", type: "string" },
      { name: "contents", type: "string" },
    ],
  } as const satisfies TypedData;

  /**
   * Handles the switch toggle event.
   * @param checked - The boolean value indicating whether the switch is checked or not.
   */
  const handleSwitch = (checked: boolean) => {
    signTypedData(
      {
        domain: {
          chainId: chainId,
          name: "Darbitrix",
          version: "1.0",
          verifyingContract: Arbitrage,
        },
        types,
        primaryType: "Message",
        message: {
          wallet: wallet,
          project: "Darbitrix",
          action: enabled ? "Stop" : "Start",
          contents: "I have agreed to the terms and conditions.",
        },
      },
      {
        onSuccess: () => setEnabled(checked),
      }
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <h3 className="mr-3">Switch to Enable/Disable</h3>
        <Switch checked={enabled} onChange={handleSwitch} />
      </div>
      <div>
        <div className="flex justify-center">
          {results.isSuccess && `${results.data[1]} / ${results.data[0]}`}
        </div>
        <div className="flex justify-center">
          <h3>Pair1 Price: </h3>
          <div className="ml-1">{prices && prices[0]}</div>
        </div>
        <div className="flex justify-center">
          <h3>Pair2 Price: </h3>
          <div className="ml-1">{prices && prices[1]}</div>
        </div>
      </div>
    </>
  );
}
