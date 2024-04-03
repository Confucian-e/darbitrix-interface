import { IUniswapV2Factory } from "../../abi";
import { walletClient } from "../config/client";

import {
  QuickSwapFactory,
  SushiSwapFactory,
  AmazingToken,
  BusinessToken,
} from "../../configs/addresses";

async function createPairs() {
  const tx_1 = walletClient.writeContract({
    abi: IUniswapV2Factory,
    address: QuickSwapFactory,
    functionName: "createPair",
    args: [AmazingToken, BusinessToken],
  });

  const tx_2 = walletClient.writeContract({
    abi: IUniswapV2Factory,
    address: SushiSwapFactory,
    functionName: "createPair",
    args: [AmazingToken, BusinessToken],
  });

  await Promise.all([tx_1, tx_2]);
}

await createPairs();
