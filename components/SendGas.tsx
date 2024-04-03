"use client";

import { useEffect, useState } from "react";
import { Button, InputNumber, notification } from "antd";
import { parseEther, type Address } from "viem";
import { useSendTransaction } from "wagmi";

/**
 * Component for sending gas to a receiver.
 * @param receiver - The address of the receiver.
 */
export default function SendGas({ receiver }: { receiver: Address }) {
  const [amount, setAmount] = useState<number>();
  const {
    data: hash,
    isPending,
    isSuccess,
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

  /**
   * Opens a success notification when the transaction is successful.
   */
  const openNotification = () => {
    notification.success({
      message: "Transaction Submitted.",
      description: `Transaction Hash: ${hash}`,
      placement: "topLeft",
      duration: null,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      openNotification();
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="flex justify-center">
        <div>
          <InputNumber defaultValue={0.1} onChange={handleChange} />
        </div>
        <div className="flex ml-5">
          <Button disabled={isPending} onClick={handleClick}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
