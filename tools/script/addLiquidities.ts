import { IUniswapV2Router } from "../../abi";
import { walletClient } from "../config/client";

import {
  AmazingToken,
  BusinessToken,
  PancakeSwapRouter,
  SushiSwapRouter,
} from "../../configs/addresses";
import { parseUnits } from "viem";

async function addLiquidities() {
  const receiver = "0x000000269073b3B12AF597028aCc00668B67aD6E";
  const deadline = 1720537189n; // 2024-07-09 22:59:49

  const amount_1m = parseUnits("1", 24);
  const amount_2m = parseUnits("2", 24);
  const amount_4m = parseUnits("4", 24);

  const tx_1 = await walletClient.writeContract({
    abi: IUniswapV2Router,
    address: PancakeSwapRouter,
    functionName: "addLiquidity",
    args: [
      AmazingToken,
      BusinessToken,
      amount_1m,
      amount_2m,
      0n,
      0n,
      receiver,
      deadline,
    ],
  });

  console.log("PancakeSwap Adding Liquidity: ", tx_1);

  const tx_2 = await walletClient.writeContract({
    abi: IUniswapV2Router,
    address: SushiSwapRouter,
    functionName: "addLiquidity",
    args: [
      AmazingToken,
      BusinessToken,
      amount_1m,
      amount_4m,
      0n,
      0n,
      receiver,
      deadline,
    ],
  });

  console.log("SushiSwap Adding Liquidity: ", tx_2);
}

await addLiquidities();
