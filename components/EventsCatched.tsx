import { PairContract } from "@/classes";
import { Card, Empty, Space } from "antd";
import SignTypeData from "./SignTypeData";
import WatchEvent from "./WatchEvent";
import { Dispatch, SetStateAction } from "react";

export default function EventsCatched({
  pairs,
  enabled,
  setEnabled,
  setCounts,
  callback,
}: {
  pairs: PairContract[] | undefined;
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  setCounts: Dispatch<SetStateAction<number[]>>;
  callback: () => Promise<void>;
}) {
  return (
    <>
      {pairs ? (
        <Space align="center" direction="vertical">
          <Card>
            <Space align="center" direction="vertical">
              <h2>Sign Typed Data to Switch</h2>
              <SignTypeData enabled={enabled} setEnabled={setEnabled} />
            </Space>
          </Card>
          {pairs.map((pair, index) => (
            <WatchEvent
              key={index}
              pair={pair}
              enabled={enabled}
              callback={callback}
              setCounts={setCounts}
              countsIndex={index}
            />
          ))}
        </Space>
      ) : (
        <Empty />
      )}
    </>
  );
}
