"use client";

import { PairContract } from "@/classes";
import { PancakeSwapFactory, SushiSwapFactory } from "@/constants";
import { quoteRelativePrice } from "@/core/Strategy";
import { Card, Space } from "antd";
import { useEffect, useState } from "react";
import { Address, erc20Abi } from "viem";
import { useReadContracts } from "wagmi";
import Image from "next/image";

function getFactoryName(factory: Address) {
  switch (factory) {
    case PancakeSwapFactory:
      return "PancakeSwap";
    case SushiSwapFactory:
      return "SushiSwap";
    default:
      return "Unknown";
  }
}

export default function PairPrice({
  pair,
  count,
}: {
  pair: PairContract;
  count: number;
}) {
  const [token0, token1] = [pair.token0, pair.token1];

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();

  const { data, isSuccess } = useReadContracts({
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
      const price = await quoteRelativePrice(pair, token0);
      setPrice(price);
    })();
  }, [count]);

  useEffect(() => {
    (async () => {
      const factory = await pair.getFactory();
      const name = getFactoryName(factory);
      setName(name);
    })();
  }, [pair]);

  return (
    <>
      <Card
        title={
          <Space>
            <Image src={`${name}.svg`} alt={name} width={30} height={30} />
            <span>{name}</span>
          </Space>
        }
      >
        <Space align="center" direction="vertical">
          <h2>Pair Contract:</h2>
          <h2>{pair.contract}</h2>

          {isSuccess && (
            <div>
              token0: {data[0]} token1: {data[1]}
            </div>
          )}
          <div>Relative Price (Based on Token0):{price}</div>
        </Space>
      </Card>
    </>
  );
}
