import { Error } from '@/components';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  if (error.message.includes('404'))
    return (
      <Error
        title="Page not found"
        description="The page you are looking for does not exist"
      />
    );

  return (
    <Error
      title="Something went wrong"
      description="We are sorry, we will make sure that this happens less often."
    />
  );
};

export const ErrorBoundaryProvider: React.FC = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};
