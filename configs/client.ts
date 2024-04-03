import { createPublicClient, http, walletActions } from 'viem';
import { polygonMumbai } from 'viem/chains';
import { Mumbai_RPC_HTTP } from './networks';

export const client = createPublicClient({
    chain: polygonMumbai,
    transport: http(Mumbai_RPC_HTTP)
}).extend(walletActions);