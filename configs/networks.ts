const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
if (!API_KEY)
  throw new Error("Alchemy RPC API KEY is not set in environment variables");

const networks = {
  arbitrum: {
    http: `https://arb-mainnet.g.alchemy.com/v2/${API_KEY}`,
    ws: `wss://arb-mainnet.g.alchemy.com/v2/${API_KEY}`,
  },
};

const Arbitrum_RPC_HTTP = networks.arbitrum.http;
const Arbitrum_RPC_WS = networks.arbitrum.ws;

export { Arbitrum_RPC_HTTP, Arbitrum_RPC_WS };
