import { IUniswapV2Factory } from "@/abi";
import { PairContract } from "@/classes";
import { config } from "@/configs";
import type { Abi, Account, Address } from "viem";
import { multicall } from "wagmi/actions";

/**
 * Retrieves pairs of tokens from multiple factories using the Uniswap V2 protocol.
 * @param factories An array of factory addresses.
 * @param tokenA The address of the first token.
 * @param tokenB The address of the second token.
 * @returns An array of pairs of tokens.
 */
export async function findPairs(
  factories: Address[],
  tokenA: Address,
  tokenB: Address,
): Promise<Address[]> {
  const contracts = factories.map((factory) => ({
    address: factory,
    abi: IUniswapV2Factory as Abi,
    functionName: "getPair",
    args: [tokenA, tokenB],
  }));

  const pairs = (
    await multicall(config, {
      contracts,
    })
  ).map((v) => v.result);

  return pairs as Address[];
}

/**
 * Retrieves a pair of PairContract instances based on the provided account, pairs, and tokens.
 * @param account - The account used for the PairContract instances.
 * @param pairs - An array of addresses representing the pairs.
 * @param tokens - An array of addresses representing the tokens.
 * @returns A promise that resolves to an array of PairContract instances.
 * @throws Error if the length of pairs is not equal to 2 or the length of tokens is not equal to 2.
 */
export async function getPairs(
  account: Account,
  pairs: Address[],
  tokens: Address[],
): Promise<PairContract[]> {
  if (pairs.length !== 2) throw new Error("Invalid Length of pairs");
  if (tokens.length !== 2) throw new Error("Invalid Length of tokens");

  const [tokenA, tokenB] = tokens;

  const PairA = new PairContract(pairs[0], account, tokenA, tokenB);
  const PairB = new PairContract(pairs[1], account, tokenA, tokenB);

  return [PairA, PairB];
}
