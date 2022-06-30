import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrollLock from 'react-scrolllock';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast';
import { useSignMessage, useAccount, useContractEvent } from 'wagmi';

import { Button } from './Button';
import { fadeAnimation, trayAnimation } from 'utils';
import { Spinner } from './Spinner';
import { getMessageToBeSigned, mintBadge } from 'utils/api';
import contractABI from 'utils/abi.json';

interface BadgeDetailProps {
  handleCloseModal: () => void;
  isMobile: boolean;
  title: string;
  description: string;
  videoUrl: string;
  isBadgeHidden: boolean;
  badgeCount?: number;
  image: string;
  slug: string;
  variant: 'badge' | 'poap';
}

interface BadgeDetailButtonProp {
  icon: string;
  label: string;
  handleClick: () => void;
  disabled?: boolean;
}

type Steps = 'idle' | 'initialise' | 'signing' | 'submitting';

const BadgeDetailButton = ({
  icon,
  handleClick,
  label,
  disabled = false,
}: BadgeDetailButtonProp) => {
  return (
    <Button
      disabled={disabled}
      className="m-0 flex space-x-4 !bg-white !px-0 !py-4 !shadow-none"
      onClick={handleClick}
    >
      <div className="flex">
        <Image src={`/icons/${icon}.svg`} height={24} width={24} />
      </div>
      <span
        className={`font-inter text-base font-semibold leading-6 text-indigoGray-${
          disabled ? 40 : 90
        }`}
      >
        {label}
      </span>
    </Button>
  );
};

export const BadgeDetail: React.FC<BadgeDetailProps> = ({
  handleCloseModal,
  isMobile,
  title,
  description,
  videoUrl,
  isBadgeHidden,
  badgeCount = 0,
  image,
  variant,
  slug,
}) => {
  const [{ data: accountData }] = useAccount();
  const [_, signMessage] = useSignMessage();
  const router = useRouter();

  useContractEvent(
    {
      addressOrName: '0x2cf3b4b267c75d0dc997656aeb4ef390d544327e',
      contractInterface: contractABI.result,
    },
    'Claim',
    (event) => {
      console.log('minting', event);
    }
  );

  const [currentStep, setCurrentStep] = React.useState<Steps>('idle');

  const animatedValue = isMobile ? trayAnimation : fadeAnimation;

  const handleSearch = (badge: string) => {
    const queryParam =
      (variant === 'badge' ? 'badges=' : 'poap=') + encodeURIComponent(badge);

    router.push(`/search?${queryParam}`);
  };

  const handleSteps = (step: Steps) => setCurrentStep(step);

  const handleRequestSignature = async () => {
    try {
      const { data: messageToBeSigned } = await getMessageToBeSigned(
        accountData?.address as string
      );

      const { data: signature } = await signMessage({
        message: messageToBeSigned as string,
      });

      return signature;
    } catch (error: any) {
      return toast.error(error.message || 'Failed to get signature');
    }
  };

  const handleInitialiseMint = async (badgeId: string) => {
    try {
      handleSteps('signing');
      const signature = await handleRequestSignature();
      if (signature) {
        handleSteps('submitting');
        const data = await mintBadge(signature as string, badgeId);
        console.log('data', data);
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
      handleSteps('initialise');
    }
  };

  const idle = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-[680px] flex-col px-6 pb-6 md:h-[719px] lg:h-full lg:p-0 "
    >
      <div className="lg:hidden">
        <Button
          className="m-0 !p-0"
          variant="tertiary"
          onClick={handleCloseModal}
        >
          <span className="sr-only">Close Modal</span>
          <Image src="/icons/x.svg" height={24} width={24} />
        </Button>
      </div>

      <ScrollLock>
        <div className="flex grow flex-col lg:flex-row lg:pt-6 lg:pr-4 lg:pb-4">
          <div className="flex grow items-center justify-center">
            <img
              src={image}
              className="h-[260px] w-[175px] md:h-[320px] md:w-[215px] lg:h-[156px] lg:w-[110px] lg:px-[15px] lg:pt-[30px]"
              alt={title + ' badge'}
            />
          </div>

          <div className="space-y-[25.5px]">
            <div className="space-y-2 lg:mb-[48.5px]">
              <h2 className="font-demi text-2xl leading-6 text-indigoGray-90">
                {title}
              </h2>

              <p className="font-inter text-sm text-indigoGray-60 line-clamp-2">
                {description}
              </p>

              <div className="flex max-h-7 items-center space-x-2">
                <div
                  className={`flex w-fit items-center space-x-2 rounded bg-emerald-50 py-[5.33px] pl-[9.33px] pr-2`}
                >
                  <div className="flex" role="presentation">
                    <Image
                      height={16}
                      width={16}
                      src={`/icons/trophy.svg`}
                      alt="badge type"
                    />
                  </div>
                  <p
                    className={`font-inter text-xs font-bold text-emerald-900`}
                  >
                    Badge earned
                  </p>
                </div>

                <div className="flex h-1 w-1 rounded-full bg-indigoGray-50" />

                <div className="font-inter text-xs font-medium text-indigoGray-60">
                  <p>{badgeCount} people</p>
                </div>
              </div>
            </div>

            <div className="h-fit divide-y divide-indigoGray-20  rounded-xl border border-indigoGray-20 pl-[18px] lg:hidden">
              <div>
                <BadgeDetailButton
                  label="Mint NFT"
                  icon="jackhammer"
                  handleClick={() => handleSteps('initialise')}
                />
              </div>

              <div>
                <BadgeDetailButton
                  label={`Search using ${variant}`}
                  icon="search-black"
                  handleClick={() => handleSearch(slug)}
                />
              </div>

              <div>
                <BadgeDetailButton
                  label="Hide on my profile"
                  icon="eye-slash"
                  handleClick={() => {}}
                />
              </div>
            </div>

            <div className="hidden space-x-6 lg:flex ">
              <button
                type="button"
                className="flex shrink-0 cursor-pointer items-center space-x-2"
                onClick={() => handleSearch(slug)}
              >
                <div className="flex">
                  <Image
                    src={`/icons/search-violet.svg`}
                    height={16}
                    width={16}
                  />
                </div>

                <span className="font-inter text-sm font-bold leading-6 text-violet-600">
                  {`Search using ${variant}`}
                </span>
              </button>

              {variant == 'badge' && (
                <button
                  type="button"
                  className="flex max-h-[36px] shrink-0 cursor-pointer items-center space-x-6 rounded-lg bg-violet-600 p-[10px] px-6"
                  onClick={() => handleSteps('initialise')}
                >
                  <span className="font-inter text-xs font-bold leading-6 text-indigoGray-5">
                    Mint NFT
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </ScrollLock>
    </motion.div>
  );

  const initialise = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-[609px] flex-col px-6 pb-6 sm:h-[728px] lg:h-full lg:p-6 "
    >
      <div>
        <Button
          className="m-0 !p-0"
          variant="tertiary"
          onClick={() => handleSteps('idle')}
        >
          <span className="sr-only">Close Modal</span>
          <Image src="/icons/arrow-left.svg" height={24} width={24} />
        </Button>
      </div>

      <ScrollLock>
        <div className="flex grow flex-col lg:flex-row">
          <div className="flex grow items-center justify-center">
            <img
              src={image}
              className="h-[260px] w-[175px] md:h-[320px] md:w-[215px] lg:h-[156px] lg:w-[110px] lg:px-[15px] lg:pt-[30px]"
              alt={title + ' badge'}
            />
          </div>

          <div className="max-w-[330px] space-y-6">
            <div className="space-y-2">
              <div>
                <h2 className="font-demi text-3xl text-indigoGray-90">
                  Mint on Polygon
                </h2>
              </div>

              <div className="font-inter space-y-2 text-sm font-medium leading-[21px] text-indigoGray-60">
                <p>
                  We use Polygon to mint your favourite badges without affecting
                  the enviornment while also taking the gas fees on us.
                </p>

                <p>
                  Your NFT is soul-bound, meaning nobody can take it.{' '}
                  <span className="font-bold">It‘s proof of your work!</span>
                </p>
              </div>
            </div>

            <div>
              <Button
                variant="primary"
                size="large"
                className="w-full bg-violet-600"
                onClick={() =>
                  handleInitialiseMint('53a9acc2-9ec4-489b-9a1b-32264f44355f')
                }
              >
                Mint NFT
              </Button>
            </div>
          </div>
        </div>
      </ScrollLock>
    </motion.div>
  );

  const signing = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-[450px] flex-col space-y-6 px-6 pb-6 sm:h-[728px] lg:h-full lg:space-y-0 lg:p-6"
    >
      <div>
        <Button
          className="m-0 !p-0"
          variant="tertiary"
          onClick={() => handleSteps('idle')}
        >
          <span className="sr-only">Close Modal</span>
          <Image src="/icons/arrow-left.svg" height={24} width={24} />
        </Button>
      </div>

      <ScrollLock>
        <div className="flex grow flex-col">
          <div className="space-y-2">
            <h2 className="font-demi text-3xl text-indigoGray-90">
              Sign with wallet
            </h2>
            <p className="font-sm font-sans font-medium leading-[21px] text-indigoGray-60">
              Before we finish we need you to sign this with your wallet
            </p>
          </div>

          <div className="flex shrink-0 grow items-center justify-center lg:py-4">
            <Spinner />
          </div>

          <div className="flex space-x-4">
            <Button
              variant="secondary"
              className="grow"
              onClick={() => handleSteps('idle')}
            >
              SKIP
            </Button>
            <Button variant="primary" className="grow">
              RETRY
            </Button>
          </div>
        </div>
      </ScrollLock>
    </motion.div>
  );

  const submitting = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-[450px] flex-col space-y-6 px-6 pb-6 sm:h-[728px] lg:h-full lg:p-6"
    >
      <ScrollLock>
        <div className="mt-6 flex grow flex-col">
          <div className="space-y-2">
            <h2 className="font-demi text-3xl text-indigoGray-90">
              Submitting on the chain
            </h2>
            <p className="font-sm font-sans font-medium leading-[21px] text-indigoGray-60">
              We are waiting for executing the transaction on Polygon. Please
              wait until it is finished.
            </p>
          </div>

          <div className="flex shrink-0 grow items-center justify-center lg:py-4">
            <Spinner />
          </div>
        </div>
      </ScrollLock>
    </motion.div>
  );

  const steps: Record<Steps, JSX.Element> = {
    idle,
    initialise,
    signing: signing,
    submitting,
  };

  return (
    <div
      className="fixed bottom-0 left-0 z-10 flex h-full w-full items-end lg:absolute lg:bottom-[40px] lg:ml-[-24px] lg:h-fit lg:w-[502.23px]"
      // onClick={() => isMobile && handleCloseModal()}
    >
      <Toaster />
      <motion.div
        {...animatedValue}
        className="z-10 h-fit w-full grow overflow-hidden rounded-t-3xl bg-white pt-[30px] shadow-3xl lg:rounded-xl lg:border lg:p-0"
      >
        <AnimatePresence>{steps[currentStep]}</AnimatePresence>
      </motion.div>
    </div>
  );
};
