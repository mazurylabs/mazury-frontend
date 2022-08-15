import * as React from 'react';
// import {
//   createClient,
//   configureChains,
//   defaultChains,
//   WagmiConfig,
// } from 'wagmi';
import { Connector, Provider, chain, defaultChains } from 'wagmi';
// import { infuraProvider } from 'wagmi/providers/infura';
// import { publicProvider } from 'wagmi/providers/public';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { providers } from 'ethers';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
//   infuraProvider(),
//   jsonRpcProvider({
//     rpc: (chain) => ({
//       http: `https://rpc.ankr.com/polygon_mumbai`,
//     }),
//   }),
//   publicProvider(),
// ]);

// const connectors = [
//   new InjectedConnector({ chains }),
//   new WalletConnectConnector({
//     chains,
//     options: {
//       qrcode: true,
//     },
//   }),
// ];

const chains = defaultChains;
const defaultChain = chain.polygonTestnetMumbai;

type ConnectorsConfig = { chainId?: number };
const connectors = ({ chainId }: ConnectorsConfig) => {
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ];
};

// const client = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
//   connectors,
// });

const isDev = process.env.NODE_ENV;
const providerEndpoint = isDev
  ? process.env.NEXT_PUBLIC_POLYGON_MUMBAI_URL
  : process.env.NEXT_PUBLIC_POLYGON_URL;

const provider = new providers.JsonRpcProvider(providerEndpoint);

// autoConnect

export const WagmiProvider: React.FC = ({ children }) => (
  <Provider connectors={connectors} provider={provider}>
    {children}
  </Provider>
);
