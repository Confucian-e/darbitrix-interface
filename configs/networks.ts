if (!process.env.NEXT_PUBLIC_API_KEY)
  throw new Error("Alchemy_Mumbai_API_KEY is not set in .env");

const Alchemy_Mumbai_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const networks = {
  mumbai: {
    rpcUrls: {
      public: {
        http: "https://rpc.ankr.com/polygon_mumbai",
        ws: "wss://polygon-mumbai-bor.publicnode.com",
      },
      private: {
        http: `https://polygon-mumbai.g.alchemy.com/v2/${Alchemy_Mumbai_API_KEY}`,
        ws: `wss://polygon-mumbai.g.alchemy.com/v2/${Alchemy_Mumbai_API_KEY}`,
      },
    },
  },
};

const Mumbai_RPC_HTTP = networks.mumbai.rpcUrls.private.http;
const Mumbai_RPC_WS = networks.mumbai.rpcUrls.private.ws;

export { Mumbai_RPC_HTTP, Mumbai_RPC_WS };
