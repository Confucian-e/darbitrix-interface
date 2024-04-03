import type { Address } from "viem";

export type Option = {
    value: Address,
    label: string,
}

export type SwapExactForParam = {
    amountIn: bigint,
    amountOutMin: bigint,
    path: Address[],
    to: Address,
    deadline: bigint
}

export type SwapForExactParam = {
    amountOut: bigint,
    amountInMax: bigint,
    path: Address[],
    to: Address,
    deadline: bigint
}

export type TokenInfo = {
    tokenAddress: Address,
    tokenSymbol: string,
    tokenDecimals: number
}