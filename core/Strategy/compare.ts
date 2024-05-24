import { PairContract } from "@/classes";
import { formatEther, type Address } from "viem";

const fee = 0.003;

export async function quoteRelativePrice(
  pair: PairContract,
  baseToken: Address,
) {
  const [reserve0, reserve1] = await pair.getReserves();

  const reserve0_ether = formatEther(reserve0);
  const reserve1_ether = formatEther(reserve1);

  const reserve0_float = parseFloat(reserve0_ether);
  const reserve1_float = parseFloat(reserve1_ether);

  switch (baseToken) {
    case pair.token0:
      return reserve0_float / reserve1_float;
    case pair.token1:
      return reserve1_float / reserve1_float;
    default:
      throw new Error("Base token not in pair");
  }
}
