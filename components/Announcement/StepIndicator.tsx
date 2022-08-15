import * as React from 'react';

interface Props {
  stepCount: number;
  activeStep: number;
}

export const StepIndicator: React.FC<Props> = ({ stepCount, activeStep }) => {
  const steps = Array(stepCount).fill('');

  if (activeStep === 0) return null;

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-fit space-x-2">
        {steps.map((_, index) => (
          <div
            key={index + 'step'}
            className={`h-2 w-2 shrink-0 rounded-full ${
              index + 1 === activeStep ? 'bg-violet-600' : 'bg-indigoGray-10'
            } `}
          />
        ))}
      </div>
    </div>
  );
};
