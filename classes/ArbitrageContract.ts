import { IArbitrage } from "@/abi";
import { client } from "@/configs/client";
import type { Account, Address, Hash, Hex } from "viem";
import { BaseContract } from "./BaseContract";

export class ArbitrageContract extends BaseContract {
    /**
     * Represents an ArbitrageContract instance.
     * @constructor
     * @param contract - The contract address.
     * @param signer - The signer account.
     */
    constructor(contract: Address, signer: Account) {
        super(contract, signer);
    }

    /**
     * Executes a flash loan by calling the `makeFlashLoan` function on the smart contract.
     * @param tokens - An array of token addresses.
     * @param amounts - An array of loan amounts corresponding to the tokens.
     * @param data - Additional data to be passed to the contract.
     * @returns A promise that resolves to the transaction hash of the executed flash loan.
     */
    async makeFlashLoan(
        tokens: Address[],
        amounts: bigint[],
        data: Hex
    ): Promise<Hash> {
        const { request } = await client.simulateContract({
            address: this.contract,
            abi: IArbitrage,
            functionName: "makeFlashLoan",
            args: [tokens, amounts, data],
            account: this.signer,
        });

        const txHash = await client.writeContract(request);
        return txHash;
    }

    /**
     * Withdraws tokens from the contract.
     * @param tokens - An array of token addresses to withdraw.
     * @returns A promise that resolves to the transaction hash of the withdrawal.
     */
    async withdraw(tokens: Address[]): Promise<Hash> {
        const { request } = await client.simulateContract({
            address: this.contract,
            abi: IArbitrage,
            functionName: "withdraw",
            args: [tokens],
            account: this.signer,
        });

        const txHash = await client.writeContract(request);
        return txHash;
    }

    /**
     * Executes a delegate call to the specified target contract with the given data.
     * @param target The address of the target contract.
     * @param data The data to be passed to the target contract.
     * @returns A promise that resolves to the transaction hash of the executed delegate call.
     */
    async delegateCall(target: Address, data: Hex): Promise<Hash> {
        const { request } = await client.simulateContract({
            address: this.contract,
            abi: IArbitrage,
            functionName: "delegateCall",
            args: [target, data],
            account: this.signer,
        });

        const txHash = await client.writeContract(request);
        return txHash;
    }
}
