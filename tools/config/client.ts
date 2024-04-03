import dotenv from "dotenv";
import { createWalletClient, http, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { Mumbai_RPC_HTTP } from "../../configs/networks";
dotenv.config();

if (!process.env.PrivateKey)
  throw new Error("Please set a private key in the .env file");

const PrivateKey = process.env.PrivateKey as Hex;

const account = privateKeyToAccount(PrivateKey);

export const walletClient = createWalletClient({
  account,
  chain: polygonMumbai,
  transport: http(Mumbai_RPC_HTTP),
});
