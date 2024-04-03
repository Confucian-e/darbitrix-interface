import { QuickSwapFactory } from "@/configs/addresses"
import { Option } from "@/types"

export const DexFactoryOptions: Option[] = [
    { value: QuickSwapFactory, label: "QuickSwap" },
    { value: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4", label: "SushiSwap" }
]

export const TokenOptions: Option[] = [
    { value: "0xEB773bc017176dbc1Bd0D77d07E196cb26E8DC4c", label: "Amazing" },
    { value: "0xEc0cF6F4c63bB47d6C7888f204703DDB859E9223", label: "Business" }
]