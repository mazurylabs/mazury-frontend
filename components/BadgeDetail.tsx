import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ScrollLock from 'react-scrolllock';

import { Button } from './Button';
import { useMobile } from 'hooks';

interface BadgeDetailProps {
  handleCloseModal: () => void;
  isMobile: boolean;
}

interface BadgeDetailButtonProp {
  icon: string;
  label: string;
  handleClick: () => void;
  disabled?: boolean;
}

const trayAnimation = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
  },
  exit: {
    y: '100%',
    transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
  },
};

const fadeAnimation = {
  initial: { opacity: 0, y: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

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
}) => {
  const animatedValue = isMobile ? trayAnimation : fadeAnimation;

  return (
    <div
      className="z-10 flex h-full w-full items-end lg:absolute lg:bottom-[40px] lg:left-0 lg:ml-[-24px] lg:h-fit lg:w-[502.23px]"
      onClick={handleCloseModal}
    >
      <motion.div
        {...animatedValue}
        className="z-10 h-[80%] w-full grow overflow-hidden rounded-t-3xl bg-white pt-[30px] shadow-3xl md:h-[97%]  lg:h-fit lg:rounded-xl lg:border lg:p-0"
      >
        <div className="flex h-full flex-col px-6 pb-6 lg:p-0 ">
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
                <video
                  autoPlay={true}
                  loop={true}
                  width={isMobile ? 180 : 123}
                  height={isMobile ? 260 : 186}
                  className="leading-0 flex !border-transparent"
                >
                  <source src="/videos/badge.mp4" type="video/mp4" />
                  {/* <img src="video.gif" width="175" height="260" /> */}
                </video>
              </div>

              <div className="space-y-[25.5px]">
                <div className="space-y-2 lg:mb-[48.5px]">
                  <h2 className="font-demi text-2xl leading-6 text-indigoGray-90">
                    Early Mazury adopter
                  </h2>

                  <p className="font-inter text-sm text-indigoGray-60">
                    Voted in an aave governance snapshot
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
                      <p>{12345} people</p>
                    </div>
                  </div>
                </div>

                <div className="h-fit divide-y divide-indigoGray-20  rounded-xl border border-indigoGray-20 pl-[18px] lg:hidden">
                  <div>
                    <BadgeDetailButton
                      label="Mint NFT (Coming soon)"
                      icon="jackhammer"
                      handleClick={() => {}}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <BadgeDetailButton
                      label="Search using badge"
                      icon="search-black"
                      handleClick={() => {}}
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
                    className="flex shrink-0 items-center space-x-2"
                  >
                    <div className="flex">
                      <Image
                        src={`/icons/search-violet.svg`}
                        height={16}
                        width={16}
                      />
                    </div>

                    <span className="font-inter text-sm font-bold leading-6 text-violet-600">
                      Search using badge
                    </span>
                  </button>

                  <button
                    type="button"
                    className="flex max-h-[36px] shrink-0 items-center space-x-6 rounded-lg bg-violet-600 p-[10px] pl-6"
                  >
                    <span className="font-inter text-xs font-bold leading-6 text-indigoGray-5">
                      MINT NFT
                    </span>

                    <div className="flex border-l border-violet-500 pl-2">
                      <Image
                        src={`/icons/arrow-down.svg`}
                        height={16}
                        width={16}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </ScrollLock>
        </div>
      </motion.div>
    </div>
  );
};
