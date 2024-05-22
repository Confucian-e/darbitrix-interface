"use client";

import { IUniswapV2Pair } from "@/abi";
import { PairContract } from "@/classes";
import { Empty } from "antd";
import { useState } from "react";
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

export default function ShowEvent({
  pair,
  enabled,
}: {
  pair: PairContract;
  enabled: boolean;
}) {
  const [events, setEvents] = useState<LogInfo[]>();

  useWatchContractEvent({
    address: pair.contract,
    abi: IUniswapV2Pair,
    eventName: "Swap",
    onLogs: (logs) => {
      const results = parseLogs(logs);
      setEvents(results);
    },
    enabled,
  });

  return (
    <>
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
    </>
  );
}
