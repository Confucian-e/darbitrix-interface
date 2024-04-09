import { AmazingToken, BusinessToken, QuickSwapFactory, SushiSwapFactory } from "@/configs/addresses"
import { Option } from "@/types"

export const DexFactoryOptions: Option[] = [
    { value: QuickSwapFactory, label: "QuickSwap" },
    { value: SushiSwapFactory, label: "SushiSwap" }
]

export const TokenOptions: Option[] = [
    { value: AmazingToken, label: "Amazing" },
    { value: BusinessToken, label: "Business" }
]