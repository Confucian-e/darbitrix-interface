import { encodeAbiParameters, parseEther, type Hex } from "viem";
import { walletClient } from "../../config/client";
import { Vault_ABI } from "./abi/vault";
import { PoolId, TokenA, TokenB, Vault_Address } from "./info";

const amountA = parseEther("1000000000");
const amountB = parseEther("2000000000");

async function initPool() {
  const amountsIn = [amountA, amountB];
  const userData = encodeUserData(amountsIn);
  const param = {
    poolId: PoolId,
    sender: "0x000000269073b3B12AF597028aCc00668B67aD6E",
    recipient: "0x000000269073b3B12AF597028aCc00668B67aD6E",
    request: {
      assets: [TokenA, TokenB],
      maxAmountsIn: amountsIn,
      userData: userData,
      fromInternalBalance: false,
    },
  };

  const tx = await walletClient.writeContract({
    address: Vault_Address,
    abi: Vault_ABI,
    functionName: "joinPool",
    args: [
      param.poolId,
      param.sender,
      param.recipient,
      [
        param.request.assets,
        param.request.maxAmountsIn,
        param.request.userData,
        param.request.fromInternalBalance,
      ],
    ],
  });

  console.log(`tx: ${tx}`);
}

await initPool();

function encodeUserData(amountsIn: bigint[]): Hex {
  const encodeData = encodeAbiParameters(
    [{ type: "uint256" }, { type: "uint256[]" }],
    [0n, amountsIn]
  );

  return encodeData;
}
