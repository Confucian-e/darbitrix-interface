import dotenv from "dotenv";
import { createWalletClient, http, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrum } from "viem/chains";
dotenv.config();

if (!process.env.PrivateKey)
  throw new Error("Please set a private key in the .env file");

const Arbitrum_RPC_HTTP = process.env.Arbitrum_RPC_HTTP as string;

const PrivateKey = process.env.PrivateKey as Hex;

const account = privateKeyToAccount(PrivateKey);

export const walletClient = createWalletClient({
  account,
  chain: arbitrum,
  transport: http(Arbitrum_RPC_HTTP),
});
