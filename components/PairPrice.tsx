"use client";

import { PairContract } from "@/classes";
import { quoteRelativePrice } from "@/core/Strategy";
import { useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useReadContracts } from "wagmi";

export default function PairPrice({ pairs }: { pairs: PairContract[] }) {
  const pair1 = pairs[0];
  const pair2 = pairs[1];

  const [prices, setPrices] = useState<number[]>();
  const results = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: pair1.token0,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: pair1.token1,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  });

  useEffect(() => {
    const updatePrice = async () => {
      const price1 = await quoteRelativePrice(pair1, pair1.token0);
      const price2 = await quoteRelativePrice(pair2, pair2.token0);
      setPrices([price1, price2]);

      console.log(`price1: ${price1}`);
      console.log(`price2: ${price2}`);
    };

    updatePrice();

    // 设置定时器，每2秒调用一次异步函数更新数据
    const intervalId = setInterval(() => {
      updatePrice();
    }, 2000);

    // 组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>
        <div>
          {results.isSuccess && `${results.data[1]} / ${results.data[0]}`}
        </div>
        <div>
          <h3>Pair1 Price</h3>
          <div>{prices && prices[0]}</div>
        </div>
        <div>
          <h3>Pair2 Price</h3>
          <div>{prices && prices[1]}</div>
        </div>
      </div>
      {/* <div>
        <Button onClick={handleClick}>Refresh</Button>
      </div> */}
    </>
  );
}
