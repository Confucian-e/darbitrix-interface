import { IArbitrage } from "../../abi";
import {
  Arbitrage,
  PancakeSwapRouter,
  SushiSwapRouter,
} from "../../configs/addresses";
import { walletClient } from "../config/client";

async function approve() {
  const tokens = [
    "0x5E0543f61F94B40c9A5265b5B3a7B35aa8Dc6B49",
    "0x81b58Ae322E933f8238505538A73FE81Ad4f2B1E",
  ];

  const spenders = [SushiSwapRouter, PancakeSwapRouter];

  const tx = await walletClient.writeContract({
    address: Arbitrage,
    abi: IArbitrage,
    functionName: "approveTokens",
    args: [tokens, spenders],
  });

  console.log(`tx: ${tx}`);
}

await approve();
