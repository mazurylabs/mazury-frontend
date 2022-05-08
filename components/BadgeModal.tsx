import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import ScrollLock from 'react-scrolllock';

import { useClickOutside, useMobile } from 'hooks';
import { Button } from './Button';
import { Pill } from './Pill';
import { Toggle } from './Toggle';
import { Avatar } from './Avatar';
import { BadgeDetail } from './BadgeDetail';

const dummyBadges = [
  {
    title: 'Graph voter',
    snapshot: 'Voted in an aave governance snapshot',
    isHidden: true,
    count: 12497,
    image: '/icons/aave.svg',
  },
  {
    title: 'Early Mazury adopter',
    snapshot: 'Voted in an aave governance snapshot',
    isHidden: false,
    count: 12497,
    image: '/icons/mazury.svg',
  },
  {
    title: 'Graph voter',
    snapshot: 'Voted in an aave governance snapshot',
    isHidden: false,
    count: 12497,
    image: '/icons/graph.svg',
  },
  {
    title: 'Graph voter',
    snapshot: 'Voted in an aave governance snapshot',
    isHidden: true,
    count: 12497,
    image: '/icons/aave.svg',
  },
  {
    title: 'Early Mazury adopter',
    snapshot: 'Voted in an aave governance snapshot',
    isHidden: false,
    count: 12497,
    image: '/icons/mazury.svg',
  },
  {
    title: 'Graph voter',
    snapshot: 'Voted in an aave governance snapshot',
    isHidden: false,
    count: 12497,
    image: '/icons/graph.svg',
  },
];

const skeletonArray = new Array(5).fill(true);

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
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

type BadgeModalState = 'idle' | 'loading' | 'empty';

interface BadgeModalProps {
  triggerButton: React.ReactElement;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ triggerButton }) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const containerRef = useRef(null!);
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserBadges, setShowUserBadges] = useState(false);
  const [showBadgeDetails, setShowBadgeDetails] = useState(false);
  const [hoveredBadge, setHoveredbadge] = useState<number | null>(null);
  const [currentModalStep, setCurrentModalStep] =
    useState<BadgeModalState>('idle');

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleOpenSearch = () => setIsSearchOpen(true);
  const handleCloseSearch = () => setIsSearchOpen(false);
  const handleToggleShowBadges = () => setShowUserBadges((state) => !state);
  const handleResetModal = () => {
    handleCloseModal();
    setCurrentModalStep('idle');
  };

  const handleOpenBadgeDetail = (id: string) => {
    if (!isMobile) return;
    setShowBadgeDetails(true);
  };

  const handleShowDetailsOnHover = (id: number) => {
    if (isMobile) return;
    setHoveredbadge(id);
  };

  useClickOutside(containerRef, handleResetModal);
  useClickOutside(inputRef, handleCloseSearch);

  const trigger = React.cloneElement(triggerButton, {
    onClick: handleOpenModal,
  });

  const animatedValue = isMobile ? trayAnimation : fadeAnimation;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const idle = (
    <ul className="h-[450px] space-y-8 overflow-auto px-6 lg:grid lg:h-fit lg:grid-cols-2 lg:grid-rows-3 lg:gap-7 lg:space-y-0 lg:overflow-visible lg:px-10">
      {dummyBadges.map((badge, index) => (
        <li
          key={index}
          className="relative flex max-h-[98px] items-center justify-between lg:max-h-[77px] lg:min-w-[43.8%]"
          onClick={() => handleOpenBadgeDetail('')}
          onMouseEnter={() => handleShowDetailsOnHover(index)}
          onMouseLeave={() => setHoveredbadge(null)}
        >
          <AnimatePresence>
            {hoveredBadge === index && (
              <BadgeDetail
                handleCloseModal={() => setShowBadgeDetails(false)}
                isMobile={isMobile}
              />
            )}
          </AnimatePresence>

          <div className="flex items-center space-x-3">
            <div className="flex">
              <Avatar src={badge.image} height={40} width={40} alt="badge" />
            </div>

            <div className="space-y-2">
              <div className="space-y-[2px]">
                <p className="font-demi text-lg font-normal leading-5 text-indigoGray-90">
                  {badge.title}
                </p>
                <p className="font-inter text-sm font-medium text-indigoGray-60">
                  {badge.snapshot}
                </p>
              </div>

              <div className="flex max-h-7 items-center space-x-2">
                <div
                  className={`flex w-fit items-center space-x-2 rounded py-[5.33px] pl-[9.33px] pr-2 ${
                    badge.isHidden ? 'bg-indigoGray-10' : 'bg-emerald-50'
                  }`}
                >
                  <div className="flex" role="presentation">
                    <Image
                      height={16}
                      width={16}
                      src={`/icons/${
                        badge.isHidden ? 'eye-slash.svg' : 'trophy.svg'
                      }`}
                      alt="badge type"
                    />
                  </div>
                  <p
                    className={`font-inter text-xs font-bold ${
                      badge.isHidden ? 'text-indigoGray-90' : 'text-emerald-900'
                    }`}
                  >
                    {badge.isHidden ? 'Badge hidden' : 'Badge earned'}
                  </p>
                </div>

                <div className="flex h-1 w-1 rounded-full bg-indigoGray-50" />

                <div className="font-inter text-xs font-medium text-indigoGray-60">
                  <p>{badge.count} people</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex lg:hidden" role="presentation">
            <Image
              src="/icons/arrow-right.svg"
              width={8}
              height={12}
              alt="arrow-right"
            />
          </div>
        </li>
      ))}
    </ul>
  );

  const loading = (
    <div className="flex-1 space-y-6 lg:grid lg:h-fit lg:grid-cols-2 lg:grid-rows-3 lg:gap-7 lg:space-y-0 lg:overflow-visible lg:px-10">
      {skeletonArray.map((_, index) => (
        <div
          className="flex w-full animate-pulse items-end items-center px-6 lg:max-h-[77px] lg:min-w-[43.8%]"
          key={index}
        >
          <div className="h-5 h-10 w-10 shrink-0 rounded-full bg-indigoGray-20" />

          <div className="ml-3 mr-[60px] flex flex-col justify-center space-y-[2px]">
            <div className="space-y-[2px]">
              <div className="h-4 w-20 rounded bg-indigoGray-20" />
              <div className="h-4 w-[160px] rounded bg-indigoGray-20" />
            </div>

            <div className="flex items-center space-x-2">
              <div className="h-4 w-24 rounded bg-indigoGray-20" />
              <div className="flex h-1 w-1 rounded-full bg-indigoGray-50" />
              <div className="h-4 w-20 rounded bg-indigoGray-20" />
            </div>
          </div>

          <div className="ml-auto opacity-50 lg:hidden">
            <Image
              src="/icons/arrow-right.svg"
              width={8}
              height={12}
              alt="arrow-right"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const empty = (
    <div className="font-inter mt-3 px-6 text-sm font-medium text-indigoGray-90 lg:min-h-[19.6rem] lg:px-10">
      <p>No suggestions found</p>
    </div>
  );

  const badgeModalStates: Record<BadgeModalState, JSX.Element> = {
    idle,
    loading,
    empty,
  };

  return (
    <>
      {trigger}

      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal={true}
            aria-expanded={isOpen}
            className="fixed top-0 right-0 z-10 flex h-screen w-screen items-end lg:flex lg:items-center lg:justify-center"
          >
            <AnimatePresence>
              {showBadgeDetails && isMobile && (
                <BadgeDetail
                  handleCloseModal={() => setShowBadgeDetails(false)}
                  isMobile={isMobile}
                />
              )}

              {!showBadgeDetails && (
                <>
                  <motion.div
                    {...fadeAnimation}
                    animate={{ opacity: 0.5 }}
                    className="inset-0 hidden h-full w-full lg:absolute lg:flex lg:bg-indigoGray-90"
                  />

                  <div className="hidden w-[75px] shrink-0 lg:block" />

                  <motion.div
                    ref={containerRef}
                    {...animatedValue}
                    className="z-10 h-[90%] w-full grow rounded-t-3xl bg-white pt-[30px] shadow-3xl md:h-[97%] lg:mx-[30px] lg:h-fit lg:max-w-[900px] lg:rounded-b-3xl lg:pb-6"
                  >
                    <div className="px-6 lg:px-10">
                      <div className="mb-[30px]">
                        <Button
                          className="m-0 !p-0"
                          variant="tertiary"
                          onClick={handleCloseModal}
                        >
                          <span className="sr-only">Close Modal</span>
                          <Image src="/icons/x.svg" height={24} width={24} />
                        </Button>
                      </div>

                      <div className="flex justify-between">
                        <div className="grow lg:flex lg:items-center">
                          <div className="font-demi text-4xl font-normal text-indigoGray-90">
                            <h1>All badges</h1>
                          </div>

                          <div className="mt-6 lg:mt-0 lg:ml-[4rem] lg:grow">
                            {isSearchOpen ? (
                              <div className="w-full rounded-lg bg-indigoGray-5">
                                <form className="flex w-full items-center py-2 pl-[14px] pr-2">
                                  <div className="flex">
                                    <Image
                                      height={24}
                                      width={24}
                                      layout="fixed"
                                      src={`/icons/search-black.svg`}
                                      alt="search"
                                    />
                                  </div>

                                  <div className="font-inter ml-[10px] mr-10 grow  text-base font-medium">
                                    <input
                                      ref={inputRef}
                                      type="text"
                                      placeholder="Search badges"
                                      aria-label="Search"
                                      className="h-full w-full bg-transparent"
                                      value={searchTerm}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </form>
                              </div>
                            ) : (
                              <div className="flex space-x-[24px]">
                                <Pill
                                  label="Mazury badges"
                                  active
                                  color="fuchsia"
                                  className="h-fit w-fit"
                                />
                                <Pill
                                  label="POAPs"
                                  color="fuchsia"
                                  className="h-fit w-fit"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <>
                          {!isSearchOpen && (
                            <div className="flex h-[39px] items-center self-end lg:h-[54px] lg:self-start">
                              <Button
                                className="m-0 !p-0"
                                variant="tertiary"
                                onClick={handleOpenSearch}
                              >
                                <span className="sr-only">Close Modal</span>
                                <Image
                                  src="/icons/search-black.svg"
                                  height={24}
                                  width={24}
                                />
                              </Button>
                            </div>
                          )}
                        </>
                      </div>

                      <div className="my-6 flex space-x-[11px]">
                        <Toggle
                          isToggled={showUserBadges}
                          onToggle={handleToggleShowBadges}
                        />

                        <div className="font-inter text-base text-indigoGray-70">
                          <p>Show only your badges</p>
                        </div>
                      </div>
                    </div>

                    <ScrollLock>
                      <div>{badgeModalStates[currentModalStep]}</div>
                    </ScrollLock>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
