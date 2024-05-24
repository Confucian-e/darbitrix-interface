import {
  PancakeSwapFactory,
  PancakeSwapRouter,
  SushiSwapFactory,
  SushiSwapRouter,
} from "@/constants";
import { Address, zeroAddress } from "viem";

/**
 * Retrieves the factory information based on the provided factory address.
 * @param factory - The factory address.
 * @returns An object containing the factory name and router address.
 */
export function getFactoryInfo(factory: Address) {
  let name: string;
  let router: Address;

  switch (factory) {
    case PancakeSwapFactory:
      name = "PancakeSwap";
      router = PancakeSwapRouter;
      break;

    case SushiSwapFactory:
      name = "SushiSwap";
      router = SushiSwapRouter;
      break;

    default:
      name = "Unknown";
      router = zeroAddress;
      break;
  }
  return { name, router };
}
