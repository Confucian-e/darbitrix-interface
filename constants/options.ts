import {
  PancakeSwapFactory,
  SushiSwapFactory,
  TokenA,
  TokenB,
} from "@/constants/addressBook";
import { Option } from "@/types";

export const DexFactoryOptions: Option[] = [
  { value: PancakeSwapFactory, label: "PancakeSwap" },
  { value: SushiSwapFactory, label: "SushiSwap" },
];

export const TokenOptions: Option[] = [
  { value: TokenA, label: "TokenA" },
  { value: TokenB, label: "TokenB" },
];
