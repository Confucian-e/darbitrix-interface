"use client";

import { Address, formatEther } from "viem";
import { useBalance } from "wagmi";

/**
 * Renders the balance of an account.
 *
 * @param {Object} props - The component props.
 * @param {string} props.account - The account address.
 * @returns {JSX.Element} The rendered balance component.
 */
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
