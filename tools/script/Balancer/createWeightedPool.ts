import { zeroAddress } from "viem";
import { walletClient } from "../../config/client";
import { WeightedPoolFactory_ABI } from "./abi/WeightedPoolFactory";
import { TokenA, TokenB, WeightedPoolFactory_Address } from "./info";

async function createWeightedPool() {
  const param = {
    name: "A50-B50",
    symbol: "AB-50",
    tokens: [TokenA, TokenB],
    normalizedWeights: [500000000000000000n, 500000000000000000n],
    rateProviders: [zeroAddress, zeroAddress],
    swapFeePercentage: 3000000000000000n,
    owner: "0x000000269073b3B12AF597028aCc00668B67aD6E",
    salt: "0x4826772766356e264e4557762471314443406c2d4e602f4e75502c6e6d332701",
  };

  const tx = await walletClient.writeContract({
    address: WeightedPoolFactory_Address,
    abi: WeightedPoolFactory_ABI,
    functionName: "create",
    args: [
      param.name,
      param.symbol,
      param.tokens,
      param.normalizedWeights,
      param.rateProviders,
      param.swapFeePercentage,
      param.owner,
      param.salt,
    ],
  });

  console.log(`tx: ${tx}`);
}

await createWeightedPool();
