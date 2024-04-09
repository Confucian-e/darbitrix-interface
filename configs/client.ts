import { createPublicClient, http, walletActions } from 'viem';
import { sepolia } from 'viem/chains';
import { Sepolia_RPC_HTTP } from './networks';

export const client = createPublicClient({
    chain: sepolia,
    transport: http(Sepolia_RPC_HTTP)
}).extend(walletActions);