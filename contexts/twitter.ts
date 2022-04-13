import { createContext, Dispatch, SetStateAction } from 'react';

interface TwitterModalContextType {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  goToNextStep: () => void;
  resetState: () => void;
  messageToBeSigned: string | undefined;
  setMessageToBeSigned: Dispatch<SetStateAction<string | undefined>>;
  signature: string | undefined;
  setSignature: Dispatch<SetStateAction<string | undefined>>;
  tweetURL: string | undefined;
  setTweetURL: Dispatch<SetStateAction<string | undefined>>;
}

export const TwitterModalContext = createContext<TwitterModalContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
  goToNextStep: () => {},
  resetState: () => {},
  messageToBeSigned: undefined,
  setMessageToBeSigned: () => {},
  signature: undefined,
  setSignature: () => {},
  tweetURL: undefined,
  setTweetURL: () => {},
});
