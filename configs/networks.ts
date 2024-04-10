if (!process.env.NEXT_PUBLIC_API_KEY)
  throw new Error("Alchemy_RPC_API_KEY is not set in .env");

const INFURA_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const networks = {
  arbitrum: {
    http: `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    ws: `wss://arbitrum-mainnet.infura.io/ws/v3/${INFURA_API_KEY}`,
  },
};

const Arbitrum_RPC_HTTP = networks.arbitrum.http;
const Arbitrum_RPC_WS = networks.arbitrum.ws;

export { Arbitrum_RPC_HTTP, Arbitrum_RPC_WS };
