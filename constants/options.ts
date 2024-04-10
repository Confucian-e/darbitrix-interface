import {
  AmazingToken,
  BusinessToken,
  PancakeSwapFactory,
  SushiSwapFactory,
} from "@/configs/addresses";
import { Option } from "@/types";

export const DexFactoryOptions: Option[] = [
  { value: PancakeSwapFactory, label: "PancakeSwap" },
  { value: SushiSwapFactory, label: "SushiSwap" },
];

export const TokenOptions: Option[] = [
  { value: AmazingToken, label: "Amazing" },
  { value: BusinessToken, label: "Business" },
];
