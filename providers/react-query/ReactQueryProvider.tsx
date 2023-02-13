import * as React from 'react';
import { QueryClient, DefaultOptions, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

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
