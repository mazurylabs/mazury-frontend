import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectKitProvider } from 'connectkit';

import * as React from 'react';

import { ReduxProvider } from './redux';
import { SwrProvider } from './swr';
import { SidebarProvider } from '@/contexts';

// const client = createClient(
//   getDefaultClient({
//     appName: "Mazury",
//     // provider: new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_POLYGON_URL) // change to alchemy
//   }),
// );

const { provider } = configureChains([mainnet], [publicProvider()]);

const client = createClient({
  provider,
});

export const AppProvider: React.FC = ({ children }) => {
  return (
    <ReduxProvider>
      <SwrProvider>
        <WagmiConfig client={client}>
          <ConnectKitProvider theme="auto" mode="light">
            <SidebarProvider>{children}</SidebarProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      </SwrProvider>
    </ReduxProvider>
  );
};
