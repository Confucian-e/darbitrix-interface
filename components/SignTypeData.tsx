import { Arbitrage } from "@/constants";
import { Switch } from "antd";
import { TypedData } from "viem";
import { useAccount, useChainId, useSignTypedData } from "wagmi";

/**
 * Component for handling sign type data.
 * @param enabled - A boolean value indicating whether the sign type data is enabled or not.
 * @param setEnabled - A function to set the enabled state of the sign type data.
 */
export default function SignTypeData({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { signTypedData } = useSignTypedData();
  const chainId = useChainId();
  const account = useAccount();

  /**
   * Handles the switch toggle event.
   * @param checked - The boolean value indicating whether the switch is checked or not.
   */
  const handleSwitch = (checked: boolean) => {
    const types = {
      Message: [
        { name: "wallet", type: "address" },
        { name: "project", type: "string" },
        { name: "action", type: "string" },
        { name: "contents", type: "string" },
      ],
    } as const satisfies TypedData;

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
          wallet: account.address!,
          project: "Darbitrix",
          action: enabled ? "Stop" : "Start",
          contents: "I have agreed to the terms and conditions.",
        },
      },
      {
        onSuccess: () => setEnabled(checked),
      },
    );
  };

  return (
    <>
      <Switch
        checkedChildren="Start"
        unCheckedChildren="Stop"
        checked={enabled}
        onChange={handleSwitch}
      />
    </>
  );
}
