import * as React from 'react';

import { WagmiProvider } from './wagmi';
import { ReduxProvider } from './redux';
import { SwrProvider } from './swr';
import { SidebarProvider } from '@/contexts';
import { ReactQueryProvider } from './react-query';
import { QueryClient } from '@tanstack/react-query';
import { ErrorBoundaryProvider } from './errorBoundary/ErrorBoundaryProvider';
import { AlertProvider } from '@/components/Alert.tsx';

export const AppProvider: React.FC<{ queryClient: QueryClient }> = ({
  children,
  queryClient,
}) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider queryClient={queryClient}>
        <SwrProvider>
          <WagmiProvider>
            <SidebarProvider>
              {/* <ErrorBoundaryProvider> */}
              <AlertProvider>{children}</AlertProvider>
              {/* </ErrorBoundaryProvider> */}
            </SidebarProvider>
          </WagmiProvider>
        </SwrProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  );
};
