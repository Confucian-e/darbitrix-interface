import {
  generatePrivateKey,
  privateKeyToAccount,
  type Account,
} from "viem/accounts";

/**
 * Generates a new account.
 * @returns The generated account.
 */
export function generateAccount(): Account {
  const privateKey = generatePrivateKey();
  console.log("privateKey:", privateKey);
  const account = privateKeyToAccount(privateKey);
  return account;
}
