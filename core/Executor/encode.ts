import { IUniswapV2Router } from "@/abi";
import type { SwapExactForParam, SwapForExactParam } from "@/types";
import { encodeAbiParameters, encodeFunctionData, parseAbiParameter, type Address, type Hex } from "viem";

/**
 * Encodes a call to the `swapExactTokensForTokens` function of the Uniswap V2 Router contract.
 * 
 * @param target The address of the contract to call.
 * @param param The parameters for the `swapExactTokensForTokens` function call.
 * @returns The encoded call data.
 */
export function encodeCallSwapExactFor(target: Address, param: SwapExactForParam): Hex {
    const swapData = encodeFunctionData({
        abi: IUniswapV2Router,
        functionName: "swapExactTokensForTokens",
        args: [param.amountIn, param.amountOutMin, param.path, param.to, param.deadline]
    });

    const encodedCall = encodeCallStruct(target, swapData);
    return encodedCall;
}

/**
 * Encodes a call to swap tokens for an exact amount using the Uniswap V2 Router.
 * 
 * @param target The target address to call the function on.
 * @param param The parameters for the swap.
 * @returns The encoded call as a hexadecimal string.
 */
export function encodeCallSwapForExact(target: Address, param: SwapForExactParam): Hex {
    const swapData = encodeFunctionData({
        abi: IUniswapV2Router,
        functionName: "swapTokensForExactTokens",
        args: [param.amountOut, param.amountInMax, param.path, param.to, param.deadline]
    });

    const encodedCall = encodeCallStruct(target, swapData);
    return encodedCall;
}

/**
 * Encodes the call structure with the target address and call data.
 * 
 * @param target The target address.
 * @param callData The call data.
 * @returns The encoded call structure.
 */
function encodeCallStruct(target: Address, callData: Hex): Hex {
    const Call = parseAbiParameter([
        'Call',
        'struct Call { address target; bytes callData; }'
    ])

    const encodedCall = encodeAbiParameters(
        [Call],
        [{
            target: target,
            callData: callData
        }]
    );
    return encodedCall;
}