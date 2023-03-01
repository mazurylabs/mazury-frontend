import * as React from 'react';

import { WagmiProvider } from './wagmi';
import { ReduxProvider } from './redux';
import { SwrProvider } from './swr';
import { SidebarProvider } from '@/contexts';
import { ReactQueryProvider } from './react-query';
import { QueryClient } from '@tanstack/react-query';

export const AppProvider: React.FC<{ queryClient: QueryClient }> = ({
  children,
  queryClient,
}) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider queryClient={queryClient}>
        <SwrProvider>
          <WagmiProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </WagmiProvider>
        </SwrProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  );
};
