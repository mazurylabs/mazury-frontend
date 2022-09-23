import * as React from 'react';
import { AnimatePresence } from 'framer-motion';

import { ModalContainer } from './ModalContainer';
import {
  CredentialsIntro,
  GitPOAPIntro,
  BuildspaceIntro,
  SismoIntro,
  OneZeroOneIntro,
  KudosIntro,
} from './steps';

import storage from '@/utils/storage';
import { IS_NEW_USER } from '@/config';

export const AnnouncementModal = () => {
  const [toggleModal, setToggleModal] = React.useState<boolean>(
    () => !Boolean(storage.getToken(IS_NEW_USER))
  );
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps = React.useMemo(
    () => [
      <CredentialsIntro key={'step-0'} />,
      <GitPOAPIntro key={'step-1'} />,
      <BuildspaceIntro key={'step-2'} />,
      <SismoIntro key={'step-3'} />,
      <OneZeroOneIntro key={'step-4'} />,
      <KudosIntro key={'step-5'} />,
    ],
    []
  );

  const handleClose = () => {
    localStorage.clear();
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
