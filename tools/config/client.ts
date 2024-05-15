import { createWalletClient, http, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrum } from "viem/chains";

const PrivateKey = Bun.env.PrivateKey as Hex;
if (!PrivateKey) throw new Error("Please set a private key in the .env file");

const Arbitrum_RPC_HTTP = Bun.env.Arbitrum_RPC_HTTP;
if (!Arbitrum_RPC_HTTP)
  throw new Error("Please set the Arbitrum RPC HTTP endpoint in the .env file");

export const walletClient = createWalletClient({
  account: privateKeyToAccount(PrivateKey),
  chain: arbitrum,
  transport: http(Arbitrum_RPC_HTTP),
});
