import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  okxWallet,
  oneKeyWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, webSocket } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { Arbitrum_RPC_WS } from "./networks";
import { PROJECT_ID } from "./walletConnect";

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
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: "Darbitrix",
    projectId: PROJECT_ID,
  },
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
export const config = createConfig({
  connectors,
  chains: [arbitrum],
  ssr: true,
  transports: {
    [arbitrum.id]: webSocket(Arbitrum_RPC_WS),
  },
});
