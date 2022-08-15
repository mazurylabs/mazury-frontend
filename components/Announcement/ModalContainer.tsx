import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVG from 'react-inlinesvg';

import { fadeAnimation, trayAnimation } from '@/utils';
import { useMobile } from '@/hooks';

import { Button } from '../Button';
import { StepIndicator } from './StepIndicator';

interface Props {
  handleClose: () => void;
  handleStep: (nextStep: number) => void;
  activeStep: number;
  isStepEnd: boolean;
}

export const ModalContainer: React.FC<Props> = ({
  handleClose,
  children,
  handleStep,
  activeStep,
  isStepEnd,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null!);
  const isMobile = useMobile();
  const animatedValue = isMobile ? trayAnimation : fadeAnimation;

  const handleGoForward = () =>
    isStepEnd ? handleClose() : handleStep(activeStep + 1);

  return (
    <div className="fixed bottom-0 left-0 z-10 z-[10000] flex h-full w-full items-end lg:inset-0 lg:flex lg:items-center lg:justify-center">
      <motion.div
        {...fadeAnimation}
        animate={{ opacity: 0.5, transition: { delay: 1 } }}
        className="inset-0 hidden h-full w-full lg:absolute lg:flex lg:bg-indigoGray-90"
      />

      <div className="hidden w-[75px] shrink-0 lg:block" />

      <motion.div
        ref={containerRef}
        {...animatedValue}
        animate={{ ...animatedValue.animate, transition: { delay: 1.2 } }}
        className="z-10 flex h-[600px] w-full grow flex-col overflow-hidden rounded-t-3xl bg-white p-6 shadow-3xl lg:max-w-[380px] lg:rounded-b-3xl"
      >
        <div className="space-between flex">
          {activeStep > 0 && (
            <button
              className="m-0 !p-0 !outline-none"
              onClick={() => handleStep(activeStep - 1)}
            >
              <SVG src="/icons/arrow-left.svg" height={24} width={24} />
              <span className="sr-only">Go Back</span>
            </button>
          )}

          <button
            className="m-0 ml-auto !p-0 !outline-none"
            onClick={handleClose}
          >
            <SVG src="/icons/x.svg" height={24} width={24} />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="flex grow flex-col items-center">
          <div className="mb-3 mt-6">
            <StepIndicator activeStep={activeStep} stepCount={5} />
          </div>

          <div className="flex grow items-center">
            <AnimatePresence>{children}</AnimatePresence>
          </div>
        </div>

        <div className="w-full">
          <Button
            size="large"
            onClick={handleGoForward}
            className="w-full !bg-violet-600"
          >
            {isStepEnd ? 'Finish' : 'Next'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
