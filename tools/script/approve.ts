import { erc20Abi, maxUint256, type Address } from "viem";
import { walletClient } from "../config/client";
import { TokenA, TokenB, Vault_Address } from "./Balancer/info";
import {
  Arbitrage,
  PancakeSwapRouter,
  SushiSwapRouter,
} from "../../constants/addressBook";
import { IArbitrage } from "../../abi";

async function approve(token: Address, spender: Address) {
  const tx = await walletClient.writeContract({
    address: token,
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, maxUint256],
  });

  console.log(`${token} approve ${spender}, tx: ${tx}`);
}

// async function main() {
//   await approve(TokenA, Vault_Address);
//   await approve(TokenB, Vault_Address);

//   await approve(TokenA, PancakeSwapRouter);
//   await approve(TokenB, PancakeSwapRouter);

//   await approve(TokenA, SushiSwapRouter);
//   await approve(TokenB, SushiSwapRouter);
// }

// await main();

async function approveArbitrage() {
  const tokens = [TokenA, TokenB];

  const spenders = [SushiSwapRouter, PancakeSwapRouter];

  const tx = await walletClient.writeContract({
    address: Arbitrage,
    abi: IArbitrage,
    functionName: "approveTokens",
    args: [tokens, spenders],
  });

  console.log(`tx: ${tx}`);
}

await approveArbitrage();
