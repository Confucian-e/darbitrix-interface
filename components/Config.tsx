"use client";

import { Arbitrum_RPC_WS } from "@/configs/networks";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  metaMaskWallet,
  okxWallet,
  oneKeyWallet,
  rabbyWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider, webSocket } from "wagmi";
import { arbitrum } from "wagmi/chains";

/**
 * Creates connectors for wallets.
 *
 * @param {Array<WalletGroup>} walletGroups - An array of wallet groups.
 * @param {AppConfig} appConfig - The configuration for the app.
 * @returns {Connectors} - The connectors for the wallets.
 */
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        rabbyWallet,
        oneKeyWallet,
        okxWallet,
      ],
    },
  ],
  {
    appName: "My Graduation Dapp",
    projectId: "DARBITRIX",
  }
);

/**
 * Creates a configuration object for the dApp.
 *
 * @param {Object} options - The configuration options.
 * @param {Array} options.connectors - The connectors to be used.
 * @param {Array} options.chains - The chains to be used.
 * @param {boolean} options.ssr - Whether the dApp uses server side rendering (SSR).
 * @param {Object} options.transports - The transports to be used.
 * @returns {Object} The configuration object.
 */
const config = createConfig({
  connectors,
  chains: [arbitrum],
  ssr: true,
  transports: {
    [arbitrum.id]: webSocket(Arbitrum_RPC_WS),
  },
});

/**
 * Config component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The rendered component.
 */
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
