import { phalconUrl } from "@/constants";
import { Empty, Space } from "antd";
import { Hex } from "viem";

export default function AribtrageTransaction({
  transactions,
}: {
  transactions: Hex[] | undefined;
}) {
  return (
    <>
      <Space
        align="center"
        direction="vertical"
        className="flex justify-center"
      >
        {transactions ? (
          transactions.map((tx, index) => (
            <a key={index} target="_blank" href={phalconUrl + tx}>
              {tx}
            </a>
          ))
        ) : (
          <Empty />
        )}
      </Space>
    </>
  );
}
