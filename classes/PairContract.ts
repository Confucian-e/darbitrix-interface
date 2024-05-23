import { IUniswapV2Pair } from "@/abi";
import { config } from "@/configs";
import type { Account, Address } from "viem";
import { readContract } from "wagmi/actions";
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
  constructor(
    contract: Address,
    signer: Account,
    tokenA: Address,
    tokenB: Address,
  ) {
    super(contract, signer);
    this.token0 = tokenA < tokenB ? tokenA : tokenB;
    this.token1 = tokenA < tokenB ? tokenB : tokenA;
  }

  /**
   * Retrieves the reserves of the Uniswap V2 pair contract.
   * @returns A promise that resolves to an array of two bigints representing the reserves.
   */
  async getReserves(): Promise<[bigint, bigint]> {
    const data = await readContract(config, {
      address: this.contract,
      abi: IUniswapV2Pair,
      functionName: "getReserves",
    });

    const reserves = data as [bigint, bigint];
    return reserves;
  }

  /**
   * Retrieves the factory address associated with the contract.
   * @returns A promise that resolves to the factory address.
   */
  async getFactory(): Promise<Address> {
    const data = await readContract(config, {
      address: this.contract,
      abi: IUniswapV2Pair,
      functionName: "factory",
    });

    return data as Address;
  }
}
