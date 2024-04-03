import { PairContract } from "@/classes";
import type { Address } from "viem";

const fee = 0.003;

export async function quoteRelativePrice(
    pair: PairContract,
    baseToken: Address
) {
    const [reserve0, reserve1] = await pair.getReserves();

    switch (baseToken) {
        case pair.token0:
            return reserve0 / reserve1;
        case pair.token1:
            return reserve1 / reserve0;
        default:
            throw new Error("Base token not in pair");
    }
}
