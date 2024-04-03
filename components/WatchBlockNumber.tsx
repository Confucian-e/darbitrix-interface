"use client";

import { Arbitrage } from "@/configs/addresses";
import { Switch } from "antd";
import { useState } from "react";
import type { Address, TypedData } from "viem";
import { useChainId, useSignTypedData, useWatchBlockNumber } from "wagmi";

/**
 * A component for subscribing to a wallet with a callback function.
 * @param wallet - The wallet address.
 * @param callback - The callback function to be called when a block number is received.
 * @returns A React component.
 */
export default function WatchBlockNumber({
  wallet,
  callback,
}: {
  wallet: Address;
  callback: () => void;
}) {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { signTypedData } = useSignTypedData();
  const chainId = useChainId();

  useWatchBlockNumber({
    onBlockNumber: (blockNumber) => {
      console.log(`Block Number: ${blockNumber}`);
      callback();
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
    <div className="flex justify-center">
      <h3 className="mr-3">Switch to Enable/Disable</h3>
      <Switch checked={enabled} onChange={handleSwitch} />
    </div>
  );
}
