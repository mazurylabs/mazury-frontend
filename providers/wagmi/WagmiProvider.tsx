import * as React from 'react';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { polygon } from 'wagmi/chains';

const { chains, provider, webSocketProvider } = configureChains(
  [polygon],
  [
    alchemyProvider({ apiKey: process.env.NEXT_ALCHEMY_API_KEY as string }),
    publicProvider(),
  ]
);

const client = createClient({
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Mazury',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
        // version: '2',
        // projectId: 'd1ee6e60454412a6f78208b621f621b2',
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export const WagmiProvider: React.FC = ({ children }) => (
  <WagmiConfig client={client}>{children}</WagmiConfig>
);
