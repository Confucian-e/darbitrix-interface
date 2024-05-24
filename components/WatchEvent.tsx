"use client";

import { IUniswapV2Pair } from "@/abi";
import { PairContract } from "@/classes";
import { getFactoryInfo } from "@/utils";
import { Card, Empty, Space } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Hash, Log } from "viem";
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

export default function WatchEvent({
  pair,
  enabled,
  callback,
  setCounts,
  countsIndex,
}: {
  pair: PairContract;
  enabled: boolean;
  callback: () => Promise<void>;
  setCounts: React.Dispatch<React.SetStateAction<number[]>>;
  countsIndex: number;
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

      await callback();

      setCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts[countsIndex]++;
        return newCounts;
      });
    },
    enabled,
  });

  useEffect(() => {
    (async () => {
      const factory = await pair.getFactory();
      const { name } = getFactoryInfo(factory);
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
