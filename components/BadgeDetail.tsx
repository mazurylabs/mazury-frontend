import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SVG from 'react-inlinesvg';
import Image from 'next/image';
import ScrollLock from 'react-scrolllock';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast';
import { useContractEvent } from 'wagmi';
import { Player } from '@lottiefiles/react-lottie-player';

import { Button } from './Button';
import {
  fadeAnimation,
  returnTruncatedIfEthAddress,
  trayAnimation,
} from 'utils';
import { Spinner } from './Spinner';
import { mintBadge } from 'utils/api';
import contractInterface from 'utils/abi.json';
import { useClickOutside } from 'hooks';
import { useSelector } from 'react-redux';
import { userSlice } from '@/selectors';
import { isDev } from '@/config';
import { BadgeIssuer } from '@/types';

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
  variant: BadgeIssuer;
  id: string;
  canBeMinted: boolean;
  mintedAt?: string;
  owner: string;
  openseaUrl?: string;
  rainbowUrl?: string;
  externalLinks?: string;
}

interface BadgeDetailButtonProp {
  icon: string;
  label: string;
  handleClick: () => void;
  disabled?: boolean;
  iconStyle?: string;
}

type Steps = 'idle' | 'initialise' | 'submitting';

const credentialClass: Record<BadgeIssuer, string> = {
  '101': 'h-[230px] w-[230px] rounded bg-gray-100 mb-4',
  buildspace: 'h-[230px] w-[230px] rounded mb-4',
  gitpoap: 'h-[230px] w-[230px] rounded-full mb-4',
  kudos: 'h-[230px] w-[230px] rounded mb-4',
  mazury:
    'h-[260px] w-[175px] md:h-[320px] md:w-[215px] lg:h-[300px] lg:w-[189px] mb-4',
  poap: 'h-[230px] w-[230px] rounded-full mb-4',
  sismo: 'h-[230px] w-[230px] rounded-sm bg-gray-100 mb-4',
};

const BadgeDetailButton = ({
  icon,
  handleClick,
  label,
  disabled = false,
  iconStyle,
}: BadgeDetailButtonProp) => {
  return (
    <Button
      disabled={disabled}
      className="m-0 flex space-x-4 !bg-white !px-0 !py-4 !shadow-none"
      onClick={handleClick}
    >
      <div className="flex">
        <SVG
          src={`/icons/${icon}.svg`}
          height={24}
          width={24}
          className={iconStyle}
        />
      </div>
      <span
        className={`font-sans text-base font-semibold leading-6 text-indigoGray-${
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
  id,
  canBeMinted,
  mintedAt,
  owner,
  openseaUrl,
  rainbowUrl,
  externalLinks,
}) => {
  const router = useRouter();
  const containerRef = React.useRef(null!);

  const { address } = useSelector(userSlice);

  const isOwnProfile = router?.query?.address === address;

  const [currentStep, setCurrentStep] = React.useState<Steps>('idle');
  const [isBadgeMinted, setIsBadgeMinted] = React.useState(false);
  const [isNewlyMinted, setIsNewlyMinted] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState('');

  const mintedDate = isNewlyMinted ? new Date().toDateString() : mintedAt;

  const animatedValue = isMobile ? trayAnimation : fadeAnimation;

  const handleSearch = (badge: string) => {
    const queryParam = 'badges=' + encodeURIComponent(badge);

    router.push(`/search?${queryParam}`);
  };

  const handleClose = () => {
    if (currentStep === 'submitting') return;
    handleCloseModal();
  };

  const handleSteps = (step: Steps) => setCurrentStep(step);

  const handleInitialiseMint = async (badgeId: string) => {
    try {
      handleSteps('submitting');
      const { data } = await mintBadge(badgeId);
      if (data) setTransactionId(data?.transaction_id);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
      handleSteps('initialise');
    }
  };

  const handleMinting = (event: any) => {
    setIsBadgeMinted(true);
    setIsNewlyMinted(true);
    setCurrentStep('idle');
  };

  const handleGoToTwitter = () => {
    const twitterLink = `https://twitter.com/intent/tweet?text=Just%20minted%20a%20new%20badge%20on%20@mazuryxyz!%20Check%20out%20my%20profile%20at%20mzry.me/${address}`;
    window.open(twitterLink, '_blank');
  };

  const copyShareLinkToClipboard = async (slug: string) => {
    const linkToCredential = `https://${window.location.host}/people/${owner}?credential=${variant}%23${id}`;
    await navigator.clipboard.writeText(linkToCredential);
    toast.success('Share link copied to clipboard!');
  };

  const addressOrName = isDev
    ? '0xf2f00C34c2607b6F68Cb5abcedC845A2dCCe8d3b'
    : '0x2a44dd7ff860a93cb8f31c3b4104ba8a7d1c0b64';

  const contractConfig = {
    addressOrName,
    contractInterface,
  };

  React.useEffect(() => {
    setIsBadgeMinted(!canBeMinted);
  }, [canBeMinted]);

  useContractEvent(contractConfig, 'Mint', handleMinting);
  useClickOutside(containerRef, handleClose);

  const idle = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex h-full flex-col px-6 pb-6 md:h-[719px] lg:h-full lg:w-full lg:p-0"
    >
      {isNewlyMinted && (
        <Player
          autoplay
          src="https://assets1.lottiefiles.com/packages/lf20_o5oeyvbk.json"
          className="absolute top-[50%] left-[50%] z-[-1] h-[150%] w-[150%] translate-x-[-50%] translate-y-[-50%]"
        />
      )}

      <div>
        <Button
          className="m-0 !p-0 lg:hidden"
          variant="tertiary"
          onClick={handleClose}
        >
          <span className="sr-only">Close Modal</span>
          <SVG src="/icons/x.svg" height={24} width={24} />
        </Button>
      </div>

      <ScrollLock>
        <div className="flex grow flex-col lg:flex-row lg:items-center">
          <div
            className={`flex grow items-center justify-center lg:max-w-[45%] `}
          >
            {image?.slice(-4) == '.mp4' ? (
              <video
                src={image}
                className={'mb-4 h-[230px] w-[300px] rounded bg-gray-100'}
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={image}
                className={credentialClass[variant]}
                alt={title + ' badge'}
              />
            )}
          </div>

          <div
            className={`space-y-[25.5px] lg:grow lg:space-y-[${
              isBadgeMinted ? '40px' : '90px'
            }]`}
          >
            <div className="space-y-2 lg:max-w-[400px]">
              <h2 className="font-demi text-2xl leading-6 text-indigoGray-90 lg:text-4xl lg:leading-[43.2px]">
                {title}
              </h2>

              <p className="font-sans text-sm text-indigoGray-60 line-clamp-[7]">
                {description}
              </p>

              <div className="flex max-h-7 items-center space-x-2">
                <div
                  className={`flex w-fit items-center space-x-2 rounded bg-emerald-50 py-[5.33px] pl-[9.33px] pr-2`}
                >
                  <div className="flex" role="presentation">
                    <SVG height={16} width={16} src={`/icons/minted.svg`} />
                  </div>
                  <p className={`font-sans text-xs font-bold text-emerald-900`}>
                    Credential verified
                  </p>
                </div>

                <div className="flex h-1 w-1 rounded-full bg-indigoGray-50" />

                <div className="font-sans text-xs font-medium text-indigoGray-60">
                  <p>{badgeCount} people</p>
                </div>
              </div>
            </div>

            {isBadgeMinted && (
              <motion.div
                initial={
                  isNewlyMinted && {
                    backgroundColor: '#6366F1',
                    boxShadow: '0px 0px 20px #4D50FF',
                  }
                }
                animate={{
                  backgroundColor: '#fff',
                  boxShadow: '0px 0px 0px #fff',
                  transition: { duration: 1.5, delay: 0.5 },
                }}
                className="flex items-center justify-between rounded-lg py-1 px-2 font-sans text-xs"
              >
                {variant === 'mazury' && (
                  <div className="space-y-[2px]">
                    <motion.p
                      initial={isNewlyMinted && { color: '#F8F9FC' }}
                      animate={{
                        color: '#110F2A',
                        transition: { duration: 1.5, delay: 0.5 },
                      }}
                      className="text-sm text-indigoGray-5"
                    >
                      {returnTruncatedIfEthAddress(owner)} minted this badge
                    </motion.p>
                    <motion.p
                      initial={isNewlyMinted && { color: '#E0E7FF' }}
                      animate={{
                        color: '#646B8B',
                        transition: { duration: 1.5, delay: 0.5 },
                      }}
                      className="font-normal text-indigo-100"
                    >
                      {mintedDate}
                    </motion.p>
                  </div>
                )}

                <div className="flex space-x-2">
                  <motion.div
                    initial={
                      isNewlyMinted && {
                        backgroundColor: '#F8F9FC',
                        color: '#2081E2',
                      }
                    }
                    animate={{
                      color: '#F8F9FC',
                      backgroundColor: '#2081E2',
                      transition: { duration: 1.5, delay: 0.5 },
                    }}
                    className="relative h-4 w-4 rounded-full"
                  >
                    <SVG
                      src={`/icons/open-sea.svg`}
                      height={9}
                      width={10}
                      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                    />
                  </motion.div>

                  <motion.a
                    rel="noreferrer"
                    href={
                      variant === 'mazury'
                        ? isDev
                          ? 'https://testnets.opensea.io/collection/mazury-v3'
                          : 'https://opensea.io/collection/mazury'
                        : 'https://poap.gallery/event/44608'
                    }
                    target="_blank"
                    initial={isNewlyMinted && { color: '#F8F9FC' }}
                    animate={{
                      color: '#2081E2',
                      transition: { duration: 1.5, delay: 0.5 },
                    }}
                    className="text-indigoGray-5"
                  >
                    {variant === 'mazury' ? 'See on Opensea' : 'See on Poap'}
                  </motion.a>
                </div>
              </motion.div>
            )}

            {isNewlyMinted && (
              <div>
                <Button
                  variant="primary"
                  className="flex w-full items-center justify-center space-x-2 bg-blue-600 font-sans text-sm font-semibold"
                  onClick={handleGoToTwitter}
                >
                  <SVG
                    src="/icons/twitter.svg"
                    height={16}
                    width={16}
                    className="text-white"
                  />
                  <span>Share on Twitter</span>
                </Button>
              </div>
            )}

            <div className="h-fit divide-y divide-indigoGray-20  rounded-xl border border-indigoGray-20 pl-[18px] lg:hidden">
              {!isBadgeMinted && variant === 'mazury' && (
                <div>
                  <BadgeDetailButton
                    label="Mint NFT"
                    icon="jackhammer"
                    handleClick={() => handleSteps('initialise')}
                  />
                </div>
              )}

              <div>
                <BadgeDetailButton
                  label={`Search using ${
                    variant === 'mazury' ? 'badge' : variant
                  }`}
                  icon="search-black"
                  handleClick={() => handleSearch(slug)}
                />
              </div>

              {isBadgeMinted && (
                <div>
                  <BadgeDetailButton
                    label="Share on Twitter"
                    icon="twitter"
                    handleClick={handleGoToTwitter}
                    iconStyle="text-[#000]"
                  />
                </div>
              )}
            </div>

            <div className="hidden justify-between space-x-6 lg:flex">
              {isOwnProfile && (
                <div>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigoGray-20 bg-indigoGray-10 shadow-sm"
                    onClick={handleGoToTwitter}
                  >
                    <div className="flex">
                      <SVG
                        src={`/icons/twitter.svg`}
                        height={16}
                        width={16}
                        className="text-[#000]"
                      />
                    </div>

                    <span className="sr-only">Share on Twitter</span>
                  </button>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  className="flex h-[37px] w-[40px] shrink-0 cursor-pointer items-center justify-center space-x-2 rounded-lg border border-indigoGray-90 border-opacity-20"
                  onClick={() => copyShareLinkToClipboard(slug)}
                >
                  <div className="flex">
                    <SVG src={`/icons/link.svg`} height={16} width={16} />
                  </div>
                </button>
                {(variant.includes('poap') || variant === 'kudos') &&
                  externalLinks && (
                    <div>
                      <motion.a
                        rel="noreferrer"
                        href={externalLinks}
                        target="_blank"
                        className="flex h-[37px] w-[40px] shrink-0 cursor-pointer items-center justify-center space-x-2 rounded-lg border border-indigoGray-90 border-opacity-20
                  "
                      >
                        {variant.includes('poap') ? (
                          <SVG
                            src={`/icons/poap.svg`}
                            height={16}
                            width={16}
                            className="m-2"
                          />
                        ) : (
                          <span>🎉</span>
                        )}
                      </motion.a>
                    </div>
                  )}
                {openseaUrl && (
                  <a
                    href={openseaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-[37px] w-[40px] shrink-0 cursor-pointer items-center justify-center space-x-2 rounded-lg border border-indigoGray-90 border-opacity-20"
                  >
                    <div className="flex">
                      <SVG src={`/icons/opensea.svg`} height={16} width={16} />
                    </div>
                  </a>
                )}
                {rainbowUrl && (
                  <a
                    href={rainbowUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-[37px] w-[40px] shrink-0 cursor-pointer items-center justify-center space-x-2 rounded-lg border border-indigoGray-90 border-opacity-20"
                  >
                    <div className="flex">
                      <SVG src={`/icons/rainbow.svg`} height={16} width={16} />
                    </div>
                  </a>
                )}
                <button
                  type="button"
                  className="flex h-[37px] w-[104px] shrink-0 cursor-pointer items-center justify-center space-x-2 rounded-lg border border-indigoGray-20 bg-indigoGray-10 shadow-sm"
                  onClick={() => handleSearch(slug)}
                >
                  <div className="flex">
                    <SVG
                      src={`/icons/search-black.svg`}
                      height={16}
                      width={16}
                    />
                  </div>

                  <span className="font-sans text-sm font-semibold leading-[21px] text-indigoGray-90">
                    {`Search`}
                  </span>
                </button>

                {variant === 'mazury' && !isBadgeMinted && isOwnProfile && (
                  <button
                    type="button"
                    className="ml-auto flex h-[37px] shrink-0 cursor-pointer items-center space-x-2 rounded-lg bg-violet-600 p-[10px] px-6 text-white shadow-sm"
                    onClick={() => handleSteps('initialise')}
                  >
                    <SVG src={`/icons/mint.svg`} height={16} width={16} />
                    <span className="font-sans text-xs font-bold leading-6 text-indigoGray-5">
                      Mint NFT
                    </span>
                  </button>
                )}
              </div>
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
      className="flex h-[609px] flex-col px-6 pb-6 sm:h-[728px] lg:h-full lg:w-full lg:p-0 "
    >
      <div>
        <Button
          className="m-0 !p-0 lg:hidden"
          variant="tertiary"
          onClick={() => handleSteps('idle')}
        >
          <span className="sr-only">Close Modal</span>
          <SVG src="/icons/arrow-left.svg" height={24} width={24} />
        </Button>
      </div>

      <ScrollLock>
        <div className="flex grow flex-col lg:flex-row lg:items-center">
          <div className="flex grow items-center justify-center lg:max-w-[45%]">
            <div className="relative">
              <img
                src={image}
                className="h-[260px] w-[175px] md:h-[320px] md:w-[215px] lg:h-[300px] lg:w-[189px]"
                alt={title + ' badge'}
              />

              {variant === 'mazury' && (
                <div className="absolute bottom-0 right-0 h-[117px] w-[117px] translate-x-[30%] translate-y-[20%]">
                  <SVG src="/badges/polygon.svg" height={117} width={117} />
                </div>
              )}
            </div>
          </div>

          <div className="max-w-[530px] space-y-6 lg:grow">
            <div className="space-y-2">
              <div>
                <h2 className="font-demi text-3xl text-indigoGray-90">
                  Mint on Polygon
                </h2>
              </div>

              <div className="space-y-2 font-sans text-sm font-medium leading-[21px] text-indigoGray-60">
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
                className="w-full !bg-violet-600"
                onClick={() => handleInitialiseMint(id)}
              >
                Mint NFT
              </Button>
            </div>
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

          <div className="flex justify-center">
            {transactionId && (
              <a
                rel="noreferrer"
                href={`https://${
                  isDev ? 'mumbai.' : ''
                }polygonscan.com/tx/${transactionId}`}
                className="flex items-center space-x-2"
                target="_blank"
              >
                <SVG src={`/icons/external-link.svg`} height={16} width={16} />
                <span className="font-sans text-sm font-semibold text-indigo-700">
                  Track progress on polygonscan
                </span>
              </a>
            )}
          </div>
        </div>
      </ScrollLock>
    </motion.div>
  );

  const steps: Record<Steps, JSX.Element> = {
    idle,
    initialise,
    submitting,
  };

  return (
    <div
      className="fixed bottom-0 left-0 z-10 z-[10000] flex h-full w-full items-end lg:inset-0 lg:flex lg:items-center lg:justify-center"
      // onClick={() => isMobile && handleCloseModal()}
    >
      <Toaster />

      <motion.div
        {...fadeAnimation}
        animate={{ opacity: 0.5 }}
        className="inset-0 hidden h-full w-full lg:absolute lg:flex lg:bg-indigoGray-90"
      />

      <div className="hidden w-[75px] shrink-0 lg:block" />

      <motion.div
        ref={containerRef}
        {...animatedValue}
        className="z-10 h-fit w-full grow overflow-hidden rounded-t-3xl bg-white pt-[30px] shadow-3xl lg:block lg:flex lg:h-[500px] lg:max-w-[900px] lg:flex-col lg:rounded-b-3xl lg:px-6 lg:pb-6 lg:pt-6"
      >
        <div className="hidden lg:block">
          {currentStep !== 'submitting' && (
            <div className="space-x-2">
              <Button
                className="m-0 !p-0 !outline-none"
                variant="tertiary"
                onClick={handleClose}
              >
                <Image src="/icons/arrow-left.svg" height={24} width={24} />
                Go back
              </Button>
            </div>
          )}
        </div>

        <div className="lg:flex lg:grow lg:items-center lg:items-center lg:justify-center">
          <AnimatePresence>{steps[currentStep]}</AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
