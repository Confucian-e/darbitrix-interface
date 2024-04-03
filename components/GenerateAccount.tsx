import { generateAccount } from "@/utils";
import { Button } from "antd";
import type { Account } from "viem";

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
  const handleClick = () => {
    const newAccount = generateAccount();
    setAccount(newAccount);
  };

  return (
    <div>
      <h4>You Need Generate Account First</h4>
      <div className="flex justify-center">
        <Button onClick={handleClick}>Generate</Button>
      </div>
    </div>
  );
}
