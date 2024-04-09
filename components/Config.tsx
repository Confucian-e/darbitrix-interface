"use client";

import { Sepolia_RPC_WS } from "@/configs/networks";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, webSocket } from "wagmi";
import { sepolia } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "My Graduation Dapp",
  projectId: "DARBITRIX",
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [sepolia.id]: webSocket(Sepolia_RPC_WS),
  },
});

const Config = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  console.log(`Sepolia Ws URL: ${Sepolia_RPC_WS}`)
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Config;
