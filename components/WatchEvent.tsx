"use client";

import { IUniswapV2Pair } from "@/abi";
import { PairContract } from "@/classes";
import { PancakeSwapFactory, SushiSwapFactory } from "@/constants";
import { Card, Empty, Space } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Address, Hash, Log } from "viem";
import { useWatchContractEvent } from "wagmi";

interface LogInfo {
  transactionHash: Hash | null;
  eventName: string;
}

function parseLogs(logs: Log[]) {
  return logs.map((log) => {
    return {
      transactionHash: log.transactionHash,
      eventName: (log as unknown as { eventName: string }).eventName,
    };
  });
}

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

export default function WatchEvent({
  pair,
  enabled,
  setCount,
  callback,
}: {
  pair: PairContract;
  enabled: boolean;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  callback: () => Promise<void>;
}) {
  const [events, setEvents] = useState<LogInfo[]>();
  const [name, setName] = useState<string>("");

  useWatchContractEvent({
    address: pair.contract,
    abi: IUniswapV2Pair,
    eventName: "Swap",
    onLogs: async (logs) => {
      const results = parseLogs(logs);
      setEvents(results);

      setCount((count) => count + 1);
      await callback();
    },
    enabled,
  });

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
        {events ? (
          events.map((logInfo, index) => (
            <div key={index}>
              <div>Transaction Hash: </div>
              <div>{logInfo.transactionHash}</div>
              <div>Event Name: {logInfo.eventName}</div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </Card>
    </>
  );
}
