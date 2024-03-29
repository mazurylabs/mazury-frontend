import * as React from 'react';
import type { NextPage } from 'next';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';

import { useClickOutside, useMobile } from 'hooks';

import { ResultState } from './ResultState';
import { EmptyState } from './EmptyState';
import { IdleState } from './IdleState';

import { useUser } from 'providers/react-query-auth';

type SearchState = 'idle' | 'result' | 'empty';

const SearchPage: NextPage = () => {
  const { data: profile } = useUser();
  const searchRef = React.useRef<HTMLDivElement>(null!);
  const inputRef = React.useRef<HTMLInputElement>(null!);

  const router = useRouter();
  const isMobile = useMobile();
  useClickOutside(searchRef, handleCloseSearch);

  const [isFocused, setIsFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [UIState, setUIState] = React.useState<SearchState>('result');

  const shouldQuerySearch = profile?.email && profile.email_verified;

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

  const handleFocusBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // if (!shouldQuerySearch) return;
    setIsFocused(() => (event.type === 'focus' ? true : false));
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(
      { pathname: '/search', query: { ...router.query, query: searchTerm } },
      undefined,
      { shallow: true }
    );
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
  };

  React.useEffect(() => {
    const query = router.query?.query || '';
    if (Object.keys(router.query).length !== 0) {
      setSearchTerm(query as string);
      setUIState('result');
    }
  }, [router.query]);

  const searchStates: Record<SearchState, JSX.Element> = {
    idle: isMobile ? <IdleState /> : <></>,
    result: <ResultState />,
    empty: <EmptyState />,
  };

  return (
    <div className="flex grow flex-col w-full xl:w-[1200px] xl:mx-[auto] h-full">
      <div className="flex grow flex-col items-center pr-6 pt-6 md:px-0">
        <div
          ref={searchRef}
          onKeyDown={handleKeydown}
          className={`relative z-10 flex w-full flex-col rounded-lg bg-indigoGray-5`}
        >
          <form
            className="flex w-full items-center py-2 pl-[14px] pr-2"
            onSubmit={handleSearch}
          >
            <div className="flex h-6 w-6">
              <SVG height={24} width={24} src={`/icons/search-black.svg`} />
            </div>

            <div className="font-regular ml-4 mr-10 grow font-sans text-base">
              <input
                ref={inputRef}
                type="text"
                placeholder="Smart contract, ethonline, paradigm, woj.eth..."
                aria-label="Search"
                className="hidden h-full w-full bg-transparent lg:block"
                value={searchTerm}
                onChange={handleChange}
                onFocus={handleFocusBlur}
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Smart contract, ethonline..."
                aria-label="Search"
                className="h-full w-full bg-transparent lg:hidden"
                value={searchTerm}
                onChange={handleChange}
                onFocus={handleFocusBlur}
              />
            </div>

            <div className="h-8 w-8">
              {isFocused && (
                <button type="submit" className="border-none !p-0">
                  <SVG
                    height={32}
                    width={32}
                    src={`/icons/search-forward${
                      searchTerm ? '' : '-inactive'
                    }.svg`}
                  />
                  <span className="sr-only">Submit</span>
                </button>
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

        <div className="lg:16 flex w-full grow">{searchStates[UIState]}</div>
      </div>
    </div>
  );
};

export default SearchPage;
