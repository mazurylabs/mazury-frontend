import * as React from 'react';
import { AnimatePresence } from 'framer-motion';

import { ModalContainer } from './ModalContainer';
import { Mint, Icons, Intro, Badges, Sign, Twitter } from './steps';

import storage from '@/utils/storage';
import { IS_NEW_USER } from '@/config';
import { StepIndicator } from './StepIndicator';

export const AnnouncementModal = () => {
  const [toggleModal, setToggleModal] = React.useState<boolean>(
    () => !Boolean(storage.getToken(IS_NEW_USER))
  );
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps = React.useMemo(
    () => [
      <Intro key={'step-0'} />,
      <Mint key={'step-1'} />,
      <Sign key={'step-2'} />,
      <Icons key={'step-3'} />,
      <Badges key={'step-4'} />,
      <Twitter key={'step-5'} />,
    ],
    []
  );

  const handleClose = () => {
    setToggleModal(false);
    storage.setToken('true', IS_NEW_USER);
  };
  const handleStep = (step: number) => setActiveStep(step);

  return (
    <AnimatePresence>
      {toggleModal && (
        <ModalContainer
          handleClose={handleClose}
          handleStep={handleStep}
          activeStep={activeStep}
          isStepEnd={activeStep === steps.length - 1}
        >
          {steps[activeStep]}
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};
