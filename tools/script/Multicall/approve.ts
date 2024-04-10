import { erc20Abi, maxUint256, type Address } from "viem";
import { PancakeSwapRouter, SushiSwapRouter } from "../../../configs/addresses";
import { walletClient } from "../../config/client";
import { TokenA, TokenB } from "../Balancer/info";

const tokens: Address[] = [TokenA, TokenB];
const spenders: Address[] = [PancakeSwapRouter, SushiSwapRouter];

async function main() {
  for (const token of tokens) {
    for (const spender of spenders) {
      const tx = await walletClient.writeContract({
        address: token,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender, maxUint256],
      });

      console.log("Approve Tokens: ", tx);
    }
  }
}

await main();
