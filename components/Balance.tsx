"use client";

import { Address, formatEther } from "viem";
import { useBalance } from "wagmi";

export default function Balance({ account }: { account: Address }) {
  const result = useBalance({
    address: account,
    unit: "ether",
  });

  return (
    <div>
      {result.isLoading && <div>Loading...</div>}
      {result.isPending && <div>pending...</div>}
      {result.isSuccess && (
        <div>
          Balance: {formatEther(result.data.value)} {result.data.symbol}
        </div>
      )}
    </div>
  );
}
