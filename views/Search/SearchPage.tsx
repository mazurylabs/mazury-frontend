import React, { useState, useRef, useCallback } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';

import { Button, MobileSidebar } from 'components';

import { useClickOutside, useMobile } from 'hooks';

import { LoadingState } from './LoadingState';
import { ResultState } from './ResultState';
import { EmptyState } from './EmptyState';
import { IdleState } from './IdleState';

type SearchState = 'idle' | 'result' | 'empty';

const SearchPage: NextPage = () => {
  const searchRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);

  const router = useRouter();
  const [{ data: accountData }] = useAccount();
  const isMobile = useMobile();
  useClickOutside(searchRef, handleCloseSearch);

  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [UIState, setUIState] = useState<SearchState>('idle');

  const handleFocusBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(() => (event.type === 'focus' ? true : false));
  };

  const handleSearch = (query?: string, badge?: string) => {
    const badgeParam = query ? 'query=' + encodeURIComponent(query) : '';
    const queryParam = badge ? 'badges=' + encodeURIComponent(badge) : '';

    // router.push(`/search?${queryParam}${badgeParam}`);
    setUIState('result');
    setIsFocused(false);
  };

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseSearch();
    }
  };

  function handleCloseSearch() {
    if (!isMobile) {
      setIsFocused(false);
      inputRef.current.blur();
      //   setSearchTerm('');
      //   setUIState('idle');
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // handleSearchh(event.target.value);
  };

  const handleSearchh = useCallback(
    debounce(async (nextValue) => {
      setUIState('result');
      console.log(nextValue); //make api call
    }, 500),
    []
  );

  const animationAttributes = !isMobile
    ? {
        initial: { opacity: 0.5, scale: 0.9 },
        animate: {
          opacity: 1,
          scale: 1,
        },
        exit: { opacity: 0 },
      }
    : {};

  const searchStates: Record<SearchState, JSX.Element> = {
    idle: isMobile ? <IdleState /> : <></>,
    // loading: <LoadingState />,
    result: <ResultState />,
    empty: <EmptyState />,
  };

  return (
    <div className="flex grow flex-col">
      <div className="flex max-w-[1000px] flex-col items-center pl-4 pr-6 md:px-0  xl:w-[1000px]">
        <div
          ref={searchRef}
          onKeyDown={handleKeydown}
          className={`relative sticky top-8 z-10 flex w-full grow flex-col rounded-lg bg-indigoGray-5`}
        >
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

            <div className="font-inter ml-4 mr-10 grow  text-base font-medium">
              <input
                ref={inputRef}
                type="text"
                placeholder="wojtek.eth, Frontend dev…"
                aria-label="Search"
                className="h-full w-full bg-transparent"
                value={searchTerm}
                onChange={handleChange}
                onFocus={handleFocusBlur}
              />
            </div>

            <div className="h-8 w-8">
              {isFocused && (
                <Button
                  className="border-none !p-0"
                  disabled={searchTerm === ''}
                  onClick={() => handleSearch(searchTerm)}
                >
                  <Image
                    height={32}
                    width={32}
                    layout="fixed"
                    src={`/icons/search-forward${
                      searchTerm ? '' : '-inactive'
                    }.svg`}
                    alt="search"
                  />
                </Button>
              )}
            </div>
          </form>

          <AnimatePresence>
            {isFocused && !isMobile && (
              <motion.div
                {...animationAttributes}
                className={`top-[99%] z-10 flex w-full flex-grow flex-col px-4 pt-6 md:h-[16.8125rem] md:flex-row md:rounded-b-lg lg:absolute lg:mt-0 lg:bg-indigoGray-5 lg:pt-5 lg:shadow-xl`}
              >
                <IdleState />
              </motion.div>
            )}
          </AnimatePresence>

          {/* {focused && (
            <div className="absolute bottom-0">
              <MobileSidebar />
            </div>
          )} */}
        </div>

        <div className="lg:16 mt-10 w-full lg:mt-16 lg:flex">
          {/* <div className="grow lg:mr-16"></div>

          <div className="font-inter mt-10  w-full shrink-0 pb-8 lg:mt-0 lg:w-fit lg:pb-0"></div> */}
          {searchStates[UIState]}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
