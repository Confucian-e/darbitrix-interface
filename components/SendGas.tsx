"use client";

import { Button, InputNumber, notification, Space } from "antd";
import { useEffect, useState } from "react";
import { parseEther, type Address } from "viem";
import { useSendTransaction } from "wagmi";

/**
 * Component for sending gas to a receiver.
 * @param receiver - The address of the receiver.
 */
export default function SendGas({ receiver }: { receiver: Address }) {
  const defaultValue = 0.000005;
  const [amount, setAmount] = useState<number>(defaultValue);
  const {
    data: hash,
    isPending,
    error,
    status,
    sendTransaction,
  } = useSendTransaction();

  /**
   * Event handler for input change.
   * @param event - The input change event.
   */
  const handleChange = (value: number | null) => {
    setAmount(value || 0);
  };

  /**
   * Event handler for button click.
   */
  const handleClick = () => {
    sendTransaction({
      to: receiver,
      value: parseEther(`${amount}`),
    });
  };

  useEffect(() => {
    switch (status) {
      case "success":
        notification.success({
          message: "Transaction Submitted.",
          description: `Transaction Hash: ${hash}`,
          placement: "topLeft",
          duration: null,
        });
        break;

      case "error":
        notification.error({
          message: "Transaction Failed.",
          description: error?.message,
          placement: "topLeft",
          duration: null,
        });
        break;

      case "pending":
        notification.info({
          message: "Transaction Pending.",
          description: "Waiting for confirmation...",
          placement: "topLeft",
          duration: null,
        });
        break;

      default:
        break;
    }
  }, [status]);

  return (
    <>
      <Space>
        <InputNumber defaultValue={defaultValue} onChange={handleChange} />
        <Button disabled={isPending} onClick={handleClick}>
          Send
        </Button>
      </Space>
    </>
  );
}
