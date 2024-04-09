if (!process.env.NEXT_PUBLIC_API_KEY)
  throw new Error("Alchemy_RPC_API_KEY is not set in .env");

const Alchemy_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const networks = {
  sepolia: {
    rpcUrls: {
      public: {
        http: "https://rpc.ankr.com/polygon",
        ws: "wss://polygon-rpc.com",
      },
      private: {
        http: `https://eth-sepolia.g.alchemy.com/v2/${Alchemy_API_KEY}`,
        ws: `wss://eth-sepolia.g.alchemy.com/v2/${Alchemy_API_KEY}`,
      },
    },
  },
};

const Sepolia_RPC_HTTP = networks.sepolia.rpcUrls.private.http;
const Sepolia_RPC_WS = networks.sepolia.rpcUrls.private.ws;

export { Sepolia_RPC_HTTP, Sepolia_RPC_WS };
