"use client";

import { PairContract } from "@/classes";
import {
  Balance,
  GenerateAccount,
  SelectBox,
  SendGas,
  WatchBlockNumber,
} from "@/components";
import { DexFactoryOptions, TokenOptions } from "@/constants/options";
import { findPairs, getPairs } from "@/core/Searcher";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "antd";
import { useState } from "react";
import type { Account, Address } from "viem";

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

  async function execute() {
    if (!pairs) return;
    const [PairA, PairB] = pairs;
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
          <WatchBlockNumber wallet={account.address} callback={execute} />
        </div>
      )}
    </div>
  );
}
