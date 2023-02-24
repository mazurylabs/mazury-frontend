import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const ReactQueryProvider: React.FC<{ queryClient: QueryClient }> = ({
  queryClient,
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <>{children}</>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
