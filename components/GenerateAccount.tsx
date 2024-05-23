"use client";

import { Button, Card, Modal, Space } from "antd";
import { useState } from "react";
import type { Account, Hex } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

/**
 * Generates an account and updates the state with the generated account.
 *
 * @param {Object} props - The component props.
 * @param {React.Dispatch<React.SetStateAction<Account | undefined>>} props.setAccount - The state setter function for the account.
 * @returns {JSX.Element} The generated account component.
 */
export default function GenerateAccount({
  setAccount,
}: {
  setAccount: React.Dispatch<React.SetStateAction<Account | undefined>>;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [privateKey, setPrivateKey] = useState<Hex>();

  /**
   * Handles the click event for generating an account.
   * Generates a private key, sets it in the state, and shows the modal.
   */
  const handleClick = () => {
    const privateKey = generatePrivateKey();
    setPrivateKey(privateKey);
    setIsModalVisible(true);
  };

  /**
   * Handles the modal action.
   * Converts the private key to an account, sets the account state,
   * hides the modal, and clears the private key.
   */
  const handleModal = () => {
    const account = privateKeyToAccount(privateKey!);
    setAccount(account);
    setIsModalVisible(false);
    setPrivateKey(undefined);
  };

  return (
    <Space align="center" direction="vertical">
      <h4>You Need Generate Account First</h4>
      <Button onClick={handleClick}>Generate</Button>
      <Modal
        title="Private Key"
        open={isModalVisible}
        onOk={handleModal}
        onCancel={handleModal}
      >
        {/* <Space align="center" direction="vertical">
          <p>Copy the private key to import account</p>
          <pre>{privateKey}</pre>
        </Space> */}
        <Card>
          <p>Copy the private key to import account</p>
          <pre>{privateKey}</pre>
        </Card>
      </Modal>
    </Space>
  );
}
