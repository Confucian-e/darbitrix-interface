import { Button, Space } from "antd";
import SelectBox from "./SelectBox";
import { DexFactoryOptions, TokenOptions } from "@/constants";
import { Address } from "viem";
import { Dispatch, SetStateAction } from "react";

export default function SelectRouter({
  setSelectedDexs,
  setSelectedTokens,
  disabled,
  onClick,
}: {
  setSelectedDexs: Dispatch<SetStateAction<Address[] | undefined>>;
  setSelectedTokens: Dispatch<SetStateAction<Address[] | undefined>>;
  disabled: boolean;
  onClick: () => Promise<void>;
}) {
  return (
    <>
      <Space
        align="center"
        direction="vertical"
        className="flex justify-center"
      >
        <Space align="center" size={28}>
          <SelectBox
            options={DexFactoryOptions}
            setSelected={setSelectedDexs}
            placeHolder="Select DEXs"
          />
          <SelectBox
            options={TokenOptions}
            setSelected={setSelectedTokens}
            placeHolder="Select Tokens"
          />
        </Space>
        <Button className="mt-8" onClick={onClick} disabled={disabled}>
          confirm
        </Button>
      </Space>
    </>
  );
}
