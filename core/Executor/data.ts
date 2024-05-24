import { PairContract } from "@/classes";
import { Hex, maxUint256 } from "viem";
import { quoteRelativePrice } from "../Strategy";
import { getFactoryInfo } from "@/utils";
import { SwapExactForParam, SwapForExactParam } from "@/types";
import { Arbitrage } from "@/constants";
import {
  encodeCallSwapExactFor,
  encodeCallSwapForExact,
  encodeMakeFlashLoanData,
} from "./encode";

export async function calculateProfit(
  pair0: PairContract,
  pair1: PairContract,
  swapAmount: bigint,
  diff: number = 0.05,
): Promise<Hex | undefined> {
  if (pair0.token0 != pair1.token0 || pair0.token1 != pair1.token1) return;

  const [token0, token1] = pair0.getTokens();
  const [price0, price1] = await Promise.all([
    quoteRelativePrice(pair0, token0),
    quoteRelativePrice(pair1, token0),
  ]);

  const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 10);

  let data: Hex | undefined;
  const [highPricePair, lowPricePair, highPrice, lowPrice] =
    price0 > price1
      ? [pair0, pair1, price0, price1]
      : [pair1, pair0, price1, price0];

  const distance = highPrice / lowPrice - 1;
  if (distance >= diff) {
    const lowPriceFactory = await lowPricePair.getFactory();
    const { router: lowPriceRouter } = getFactoryInfo(lowPriceFactory);

    const highPriceFactory = await highPricePair.getFactory();
    const { router: highPriceRouter } = getFactoryInfo(highPriceFactory);

    const buyPath = [token0, token1];
    const sellPath = [...buyPath].reverse();

    const buyParam: SwapForExactParam = {
      amountInMax: maxUint256,
      amountOut: swapAmount,
      path: buyPath,
      to: Arbitrage,
      deadline,
    };

    const sellParam: SwapExactForParam = {
      amountIn: swapAmount,
      amountOutMin: 0n,
      path: sellPath,
      to: Arbitrage,
      deadline,
    };

    const buyCall = encodeCallSwapForExact(lowPriceRouter, buyParam);
    const sellCall = encodeCallSwapExactFor(highPriceRouter, sellParam);

    data = encodeMakeFlashLoanData([buyCall, sellCall]);
  }

  return data;
}
