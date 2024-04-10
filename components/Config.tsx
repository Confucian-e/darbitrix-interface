"use client";

import { Arbitrum_RPC_WS } from "@/configs/networks";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, webSocket } from "wagmi";
import { arbitrum } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "My Graduation Dapp",
  projectId: "DARBITRIX",
  chains: [arbitrum],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [arbitrum.id]: webSocket(Arbitrum_RPC_WS),
  },
});

const Config = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Config;
