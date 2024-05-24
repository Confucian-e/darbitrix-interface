import { Space } from "antd";
import type { Account } from "viem";
import Balance from "./Balance";
import GenerateAccount from "./GenerateAccount";
import SendGas from "./SendGas";

/**
 * Renders the AccountManage component.
 *
 * @param {Object} props - The component props.
 * @param {Account | undefined} props.account - The account object.
 * @param {React.Dispatch<React.SetStateAction<Account | undefined>>} props.setAccount - The function to set the account object.
 * @returns {JSX.Element} The rendered AccountManage component.
 */
export default function AccountManage({
  account,
  setAccount,
}: {
  account: Account | undefined;
  setAccount: React.Dispatch<React.SetStateAction<Account | undefined>>;
}) {
  return (
    <>
      {account ? (
        <Space
          align="center"
          direction="vertical"
          className="flex justify-center"
        >
          <h4>Send Gas to Account Address:</h4>
          <h4>{account.address}</h4>
          <div>
            <Balance account={account.address} />
          </div>
          <div>
            <SendGas receiver={account.address} />
          </div>
        </Space>
      ) : (
        <div className="flex justify-center">
          <GenerateAccount setAccount={setAccount} />
        </div>
      )}
    </>
  );
}
