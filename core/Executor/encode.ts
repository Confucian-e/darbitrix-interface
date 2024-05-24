import { IUniswapV2Router } from "@/abi";
import type { Call, SwapExactForParam, SwapForExactParam } from "@/types";
import {
  encodeAbiParameters,
  encodeFunctionData,
  parseAbiParameter,
  type Address,
  type Hex,
} from "viem";

/**
 * Encodes an array of calls into flash loan data.
 * @param calls An array of calls to be encoded.
 * @returns The encoded flash loan data as a hexadecimal string.
 */
export function encodeMakeFlashLoanData(calls: Call[]): Hex {
  const Call = parseAbiParameter([
    "Call[]",
    "struct Call { address target; bytes callData; }",
  ]);

  return encodeAbiParameters([Call], [calls]);
}

/**
 * Encodes the call to swap exact tokens for tokens.
 * @param target The target address.
 * @param param The swap exact for parameter.
 * @returns The encoded call data.
 */
export function encodeCallSwapExactFor(
  target: Address,
  param: SwapExactForParam,
): Call {
  const swapData = encodeFunctionData({
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

  return { target: target, callData: swapData };
}

/**
 * Encodes a call to swap tokens for an exact amount using the Uniswap V2 Router.
 * @param target The target address to call.
 * @param param The parameters for the swap.
 * @returns The encoded call data.
 */
export function encodeCallSwapForExact(
  target: Address,
  param: SwapForExactParam,
): Call {
  const swapData = encodeFunctionData({
    abi: IUniswapV2Router,
    functionName: "swapTokensForExactTokens",
    args: [
      param.amountOut,
      param.amountInMax,
      param.path,
      param.to,
      param.deadline,
    ],
  });

  return { target: target, callData: swapData };
}
