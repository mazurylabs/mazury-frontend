import * as React from 'react';

import { WagmiProvider } from './wagmi';
import { ReduxProvider } from './redux';
import { SwrProvider } from './swr';
import { SidebarProvider } from '@/contexts';

export const AppProvider: React.FC = ({ children }) => {
  return (
    <ReduxProvider>
      <SwrProvider>
        <WagmiProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </WagmiProvider>
      </SwrProvider>
    </ReduxProvider>
  );
};
