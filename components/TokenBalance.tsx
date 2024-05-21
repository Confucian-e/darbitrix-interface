import { Space } from "antd";
import { Address, erc20Abi, formatUnits } from "viem";
import { useReadContracts } from "wagmi";

export default function TokenBalance({
  token,
  account,
}: {
  token: Address;
  account: Address;
}) {
  const { data, isLoading, isFetched } = useReadContracts({
    contracts: [
      {
        address: token,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      },
      {
        address: token,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ],
  });

  let decimalBalance = "";
  if (isFetched) {
    const balance = data?.[0].result as bigint;
    const decimals = data?.[1].result as number;
    decimalBalance = formatUnits(balance, decimals);
  }

  return (
    <>
      <Space align="center" direction="vertical">
        {isLoading && <h1>fetching data</h1>}
        {isFetched && decimalBalance != "" && <h2>{decimalBalance}</h2>}
      </Space>
    </>
  );
}
