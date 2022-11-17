import * as React from 'react';

import { Button } from '../Button';

interface ErrorStepProps {
  handleSkip: () => void;
  handleRetry: () => void;
  loading: boolean;
}

export const ErrorStep: React.FC<ErrorStepProps> = ({
  handleSkip,
  handleRetry,
  loading,
}) => {
  return (
    <div className="w-fit max-w-[300px]">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Connection failed
      </h3>
      <p className="mt-2 font-sans text-sm font-medium text-indigoGray-60">
        Something went wrong.
      </p>

      <div className="mt-4 flex w-full justify-around space-x-4">
        <Button
          className="w-[140px] shrink-0 !border !border-indigoGray-20 !bg-indigoGray-10 !text-indigoGray-90 !shadow-base"
          variant="secondary"
          onClick={handleSkip}
        >
          Skip
        </Button>
        <Button
          className="w-[140px] shrink-0"
          variant="primary"
          onClick={handleRetry}
          loading={loading}
        >
          Retry
        </Button>
      </div>
    </div>
  );
};
