import { IUniswapV2Pair } from "@/abi";
import { client } from "@/configs/client";
import type { Account, Address } from "viem";
import { BaseContract } from "./BaseContract";

export class PairContract extends BaseContract {
    token0: Address;
    token1: Address;

    /**
     * Represents an ArbitrageContract instance.
     * @constructor
     * @param contract - The contract address.
     * @param signer - The signer account.
     */
    constructor(contract: Address, signer: Account, token0: Address, token1: Address) {
        super(contract, signer);
        this.token0 = token0;
        this.token1 = token1;
    }

    /**
     * Retrieves the reserves of the Uniswap V2 pair contract.
     * @returns A promise that resolves to an array of two bigints representing the reserves.
     */
    async getReserves(): Promise<[bigint, bigint]> {
        const data = await client.readContract({
            address: this.contract,
            abi: IUniswapV2Pair,
            functionName: "getReserves",
        });

        const reserves = data as [bigint, bigint];
        return reserves;
    }
}
