import { createPublicClient, http, walletActions, webSocket } from "viem";
import { arbitrum } from "viem/chains";
import { Arbitrum_RPC_HTTP, Arbitrum_RPC_WS } from "./networks";

export const client = createPublicClient({
  chain: arbitrum,
  transport: webSocket(Arbitrum_RPC_WS),
}).extend(walletActions);
