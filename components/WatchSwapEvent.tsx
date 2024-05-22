"use client";

import { IUniswapV2Pair } from "@/abi";
import { PairContract } from "@/classes";
import { quoteRelativePrice } from "@/core/Strategy";
import { useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useReadContracts, useWatchContractEvent } from "wagmi";

/**
 * WatchSwapEvent component.
 *
 * @param pairs - An array of PairContract objects.
 * @param callback - A function that returns a Promise.
 * @param enabled - A boolean indicating whether the component is enabled.
 * @returns JSX.Element
 */
export default function WatchSwapEvent({
  pairs,
  callback,
  enabled,
}: {
  pairs: PairContract[];
  callback: () => Promise<void>;
  enabled: boolean;
}) {
  const pair1 = pairs[0];
  const pair2 = pairs[1];

  const [token0, token1] = [pair1.token0, pair1.token1];

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
    })();
  }, [eventCount]);

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

  return (
    <>
      <div className="flex justify-center">
        {results.isSuccess && `${results.data[1]} / ${results.data[0]}`}
      </div>
      <div className="flex justify-center">
        <h3>Pair1: </h3>
        <div className="ml-1">{prices && prices[0]}</div>
      </div>
      <div className="flex justify-center">
        <h3>Pair2: </h3>
        <div className="ml-1">{prices && prices[1]}</div>
      </div>
    </>
  );
}
