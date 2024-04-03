"use client";

import { Mumbai_RPC_WS } from "@/configs/networks";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, webSocket } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [polygonMumbai],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [polygonMumbai.id]: webSocket(Mumbai_RPC_WS),
  },
});

const queryClient = new QueryClient();

const Config = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider showRecentTransactions={true} coolMode>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Config;
