import { encodeAbiParameters, type Hex } from "viem";
import { walletClient } from "../../config/client";
import { Vault_ABI } from "./abi";

async function initPool() {
  const amountsIn = [0n, 0n];
  const userData = encodeUserData(amountsIn);
  const param = {
    poolId:
      "0x000000269073b3b12af597028acc00668b67ad6e000000000000000000000000",
    sender: "0x000000269073b3B12AF597028aCc00668B67aD6E",
    recipient: "0x000000269073b3B12AF597028aCc00668B67aD6E",
    request: {
      assets: ["0xA", "0xB"],
      maxAmountsIn: amountsIn,
      userData: userData,
      fromInternalBalance: false,
    },
  };

  const tx = await walletClient.writeContract({
    address: "0xba12222222228d8ba445958a75a0704d566bf2c8",
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
