if (!process.env.NEXT_PUBLIC_API_KEY)
  throw new Error("Alchemy_RPC_API_KEY is not set in .env");

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const networks = {
  arbitrum: {
    http: `https://g.w.lavanet.xyz:443/gateway/arb1/rpc-http/${API_KEY}`,
    ws: `wss://g.w.lavanet.xyz:443/gateway/arb1/rpc/${API_KEY}`,
  },
};

const Arbitrum_RPC_HTTP = networks.arbitrum.http;
const Arbitrum_RPC_WS = networks.arbitrum.ws;

export { Arbitrum_RPC_HTTP, Arbitrum_RPC_WS };
