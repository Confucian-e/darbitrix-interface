"use client";

import Image from "next/image";
import { Table, Tag, type TableProps } from "antd";
import { Address, erc20Abi, formatUnits } from "viem";
import { Vault } from "@/constants";
import { useReadContracts } from "wagmi";

interface DataType {
  key: string;
  tokenIcon: string;
  token: string;
  tags: string[];
  amount: string;
  address: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Icon",
    dataIndex: "tokenIcon",
    key: "tokenIcon",
    render: (iconUrl) => (
      <Image src={iconUrl} alt="Token Icon" width={40} height={18} />
    ),
  },
  {
    title: "Token",
    dataIndex: "token",
    key: "token",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color;
          switch (tag) {
            case "Stable":
              color = "green";
              break;

            case "Wrapped":
              color = "pink";
              break;

            case "Governance":
              color = "geekblue";
              break;

            default:
              color = "volcano";
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address) => (
      <a href={`https://arbiscan.io/address/${address}`}>{address} </a>
    ),
  },
];

interface TokenInfo {
  icon: string;
  symbol: string;
  address: Address;
  tags: string[];
}

const tokenList: TokenInfo[] = [
  {
    icon: "/usdc.svg",
    symbol: "USDC",
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    tags: ["Stable"],
  },
  {
    icon: "/usdt.svg",
    symbol: "USDT",
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    tags: ["Stable"],
  },
  {
    icon: "/wbtc.svg",
    symbol: "WBTC",
    address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    tags: ["Wrapped"],
  },
  {
    icon: "/link.svg",
    symbol: "LINK",
    address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
    tags: ["Governance"],
  },
];

const contracts = tokenList.flatMap((token) => [
  {
    address: token.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [Vault],
  },
  {
    address: token.address,
    abi: erc20Abi,
    functionName: "decimals",
  },
]);

export default function VaultTable() {
  const { data, isSuccess } = useReadContracts({
    contracts,
  });

  const dataSource = tokenList.map((token, index) => {
    let decimalAmount = "";
    if (isSuccess) {
      const balance = data?.[index * 2].result as bigint;
      const decimals = data?.[index * 2 + 1].result as number;
      const stringAmount = formatUnits(balance, decimals);
      decimalAmount = parseFloat(stringAmount).toFixed(4);
    }

    return {
      key: index.toString(),
      tokenIcon: token.icon,
      token: token.symbol,
      tags: token.tags,
      amount: decimalAmount,
      address: token.address,
    };
  });

  return (
    <>
      {isSuccess && (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowClassName=""
        ></Table>
      )}
    </>
  );
}
