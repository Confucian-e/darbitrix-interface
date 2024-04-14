import { IUniswapV2Router } from "../../abi";
import {
  AmazingToken,
  BusinessToken,
  PancakeSwapRouter,
} from "../../configs/addresses";
import { type SwapExactForParam } from "../../types";
import { walletClient } from "../config/client";

const [receiver] = await walletClient.getAddresses();

const param: SwapExactForParam = {
  amountIn: 1n,
  amountOutMin: 0n,
  path: [AmazingToken, BusinessToken],
  to: receiver,
  deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 10),
};

const tx = await walletClient.writeContract({
  address: PancakeSwapRouter,
  abi: IUniswapV2Router,
  functionName: "swapExactTokensForTokens",
  args: [
    param.amountIn,
    param.amountOutMin,
    param.path,
    param.to,
    param.deadline,
  ],
});

console.log(`Transaction hash: ${tx}`);
