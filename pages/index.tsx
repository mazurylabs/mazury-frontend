import React, { useState, useRef } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

import {
  ActivityPreview,
  Avatar,
  BadgeModal,
  Button,
  MobileSidebar,
} from 'components';
import { Layout } from 'components';
import {
  useClickOutside,
  useMobile,
  useActivity,
  useProfileSuggestions,
} from 'hooks';
import { commify, returnTruncatedIfEthAddress } from 'utils';

type SearchState = 'idle' | 'loading' | 'result' | 'empty';

const keywordSuggestions = [
  { title: 'Frontend developer', results: 259 },
  { title: 'Smart contract developer', results: 792 },
  { title: 'Designer', results: 163 },
];

const badgeSuggestions = [
  {
    title: 'Contract deployer',
    slug: 'contract_deployer',
    img: '/badges/contract_deployer.png',
    detail: 'People who deployed a smart contract',
  },
  {
    title: 'Buildspace alumni',
    slug: 'buildspace',
    img: '/badges/buildspace.png',
    detail: 'People who finished a buildspace course',
  },
  {
    title: 'Developer DAO member',
    slug: 'd_d_member',
    img: '/badges/d_d.png',
    detail: 'Members of Developer DAO',
  },
];

const skeletonArray = new Array(4).fill(true);

const apiParams = {
  isNetwork: true,
  limit: 4,
};

const Home: NextPage = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);
  const isMobile = useMobile();
  const [focused, setFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [{ data: accountData }] = useAccount();
  const { activity } = useActivity(accountData?.address as string, apiParams);
  const { profiles } = useProfileSuggestions(accountData?.address, apiParams);
  const [currentSearchState, setCurrentSearchState] =
    useState<SearchState>('idle');

  useClickOutside(searchRef, handleCloseSearch);

  const handleFocusBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(() => (event.type === 'focus' ? true : false));
  };

  const handleSearch = (query?: string, badge?: string) => {
    const badgeParam = query ? 'query=' + encodeURIComponent(query) : '';
    const queryParam = badge ? 'badges=' + encodeURIComponent(badge) : '';

    router.push(`/search?${queryParam}${badgeParam}`);
  };

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseSearch();
    }
  };

  function handleCloseSearch() {
    setFocused(false);
    inputRef.current.blur();
    setSearchTerm('');
    setCurrentSearchState('idle');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (event.target.value) {
      // setCurrentSearchState('loading');
    } else {
      setCurrentSearchState('idle');
    }
  };

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

  const idle = (
    <div className="w-full lg:flex">
      <div className="grow-[3] border-b border-solid border-indigoGray-20 pb-7 lg:border-b-0 lg:pb-0">
        {/* <div className="mb-5 hidden lg:flex">
          <button
            type="button"
            className="font-inter flex shrink-0 items-center rounded-xl bg-indigo-50 py-1 px-2 text-xs font-bold text-indigo-700"
          >
            <Image
              src={'/icons/network.svg'}
              layout="fixed"
              width={20}
              height={20}
              alt="network"
            />
            <span className="ml-2">See your network</span>
          </button>

          <button
            type="button"
            className="font-inter ml-3 flex shrink-0 items-center rounded-xl bg-indigo-50 py-1 px-2 text-xs font-bold text-indigo-700"
          >
            <Image
              src={'/icons/recommendation.svg'}
              layout="fixed"
              width={16}
              height={16}
              alt="recommendations"
            />
            <span className="ml-2">See recommendations</span>
          </button>
        </div> */}

        <div className="mb-3 flex text-xs font-medium text-indigoGray-40">
          {/* <div className="mr-2 hidden lg:flex">
            <Image
              src={'/icons/previous.svg'}
              layout="fixed"
              width={16}
              height={16}
              alt="previous search"
            />
          </div> */}
          {/* <h2>{isMobile ? 'KEYWORD SUGGESTIONS' : 'PREVIOUS SEARCH'}</h2> */}
          <h2>KEYWORD SUGGESTIONS</h2>
        </div>

        <ul className="font-inter font-medium">
          {keywordSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="mb-6 cursor-pointer"
              onClick={() => handleSearch(suggestion.title)}
            >
              <p className="text-sm text-indigoGray-90">{suggestion.title}</p>

              <div className="flex text-xs  text-indigoGray-50">
                <p>{commify(suggestion.results)} results</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-[44.5px] mt-7 mr-14 hidden justify-center lg:flex">
        <div className=" w-[1px] shrink-0 bg-indigoGray-20 " />
      </div>

      <div className="pt-8 lg:mr-12 lg:pt-0">
        <div className="mb-3 flex text-xs font-medium text-indigoGray-50">
          <h2>BADGE SEARCH SUGGESTIONS</h2>
        </div>

        <div className="font-inter px-2 font-medium">
          <ul className="mb-4">
            {badgeSuggestions.map((badge, index) => (
              <li
                key={index}
                className=" mb-4 flex cursor-pointer items-center"
                onClick={() => handleSearch('', badge.slug)}
              >
                <div className="mr-4 flex">
                  <Image
                    src={badge.img}
                    width={24}
                    height={38}
                    layout="fixed"
                    alt="badge"
                  />
                </div>

                <div>
                  <p className=" text-base font-semibold text-indigoGray-90">
                    {badge.title}
                  </p>

                  <p className="text-sm text-indigoGray-60">{badge.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex">
            <div className="mr-4 w-6" aria-hidden={true} />
            <BadgeModal
              triggerButton={
                <button
                  type="button"
                  className="flex items-center text-xs text-indigo-600"
                >
                  <span className="mr-2">See more badges</span>
                  <Image
                    src="/icons/arrow-right-indigo.svg"
                    width={16}
                    height={16}
                    alt="arrow-right"
                  />
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  const loading = (
    <div className="mt-1 w-[60%]">
      <div className="animate-pulse">
        <div className="h-5 w-full rounded bg-indigoGray-20" />

        <div className="flex-1 space-y-3 py-10">
          <div className="space-y-1">
            <div className="h-5 w-[40%] rounded bg-indigoGray-20" />
            <div className="h-5 w-[70%] rounded bg-indigoGray-20" />
            <div className="h-5 w-full rounded bg-indigoGray-20" />
          </div>

          <div className="space-y-1">
            <div className="h-5 w-[70%] rounded bg-indigoGray-20" />
            <div className="h-5 w-full rounded bg-indigoGray-20" />
          </div>

          <div className="space-y-1">
            <div className="h-5 w-[70%] rounded bg-indigoGray-20" />
            <div className="h-5 w-full rounded bg-indigoGray-20" />
          </div>
        </div>
      </div>
    </div>
  );

  const result = <></>;

  const empty = (
    <div className="font-inter mt-3 text-sm font-medium text-indigoGray-90">
      <p>No suggestions found</p>
    </div>
  );

  const searchStates: Record<SearchState, JSX.Element> = {
    idle,
    loading,
    result,
    empty,
  };

  return (
    <div>
      <Head>
        <title>Home - Mazury</title>
      </Head>

      <Layout variant="plain">
        <div className="flex grow flex-col items-center justify-center">
          <div className="flex max-w-[1000px] flex-col items-center pl-4 pr-6 md:px-0  xl:w-[1000px]">
            <div className={`overflow-hidden pt-12 lg:pt-0`}>
              <div className="mx-auto w-fit lg:hidden">
                <Image
                  height={32}
                  width={32}
                  layout="fixed"
                  src="/icons/logo.svg"
                  alt="mazury"
                />
              </div>

              <div className="my-8 text-center font-serif text-3xl font-semibold leading-9 text-indigoGray-90 md:text-5xl md:leading-[3.6rem] lg:mt-0 xl:mb-10">
                <h1>Welcome to the professional metaverse</h1>
              </div>
            </div>

            <div
              ref={searchRef}
              onKeyDown={handleKeydown}
              className={`${
                focused && isMobile
                  ? 'fixed h-screen bg-white pt-8'
                  : 'relative sticky top-8 grow rounded-lg bg-indigoGray-5'
              }  z-10 flex w-full flex-col`}
            >
              <form className="flex w-full items-center py-2 pl-[14px] pr-2">
                <div className="flex">
                  {isMobile ? (
                    <button
                      type="button"
                      className="flex"
                      onClick={handleCloseSearch}
                    >
                      <Image
                        height={24}
                        width={24}
                        layout="fixed"
                        src={`/icons/${
                          focused ? 'arrow-left' : 'search-black'
                        }.svg`}
                        alt="search"
                      />
                    </button>
                  ) : (
                    <div className="flex">
                      <Image
                        height={24}
                        width={24}
                        layout="fixed"
                        src={`/icons/search-black.svg`}
                        alt="search"
                      />
                    </div>
                  )}
                </div>

                <div className="font-inter ml-4 mr-10 grow  text-base font-medium">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="woj.eth, frontend developer..."
                    aria-label="Search"
                    className="h-full w-full bg-transparent"
                    value={searchTerm}
                    onChange={handleChange}
                    onFocus={handleFocusBlur}
                  />
                </div>

                <div className="h-8 w-8">
                  {focused && (
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
                {focused && (
                  <motion.div
                    {...animationAttributes}
                    className={`top-[99%] z-10 flex w-full flex-grow flex-col px-4 pt-6 md:h-[16.8125rem] md:flex-row md:rounded-b-lg lg:absolute lg:mt-0 lg:bg-indigoGray-5 lg:pt-5 lg:shadow-xl`}
                  >
                    {searchStates[currentSearchState]}
                  </motion.div>
                )}
              </AnimatePresence>

              {focused && (
                <div className="absolute bottom-0">
                  <MobileSidebar />
                </div>
              )}
            </div>

            <div className="lg:16 mt-10 w-full lg:mt-16 lg:flex">
              <div className="grow lg:mr-16">
                <div className="font-inter text-sm font-medium text-indigoGray-40">
                  <h2>RECENT ACTIVITY IN YOUR NETWORK</h2>
                </div>

                <div className="mt-3 ">
                  <ul className="space-y-6">
                    {!accountData?.address ? (
                      <p className="text-lg text-indigoGray-60">
                        No recent activity to show. Use the searchbox to find
                        your friend and give them a referral to see their
                        activity here!
                      </p>
                    ) : Boolean(activity) ? (
                      activity?.map((item) => {
                        return (
                          <ActivityPreview
                            activity={item}
                            key={item.id}
                            avatarSize="md"
                          />
                        );
                      })
                    ) : (
                      skeletonArray.map((_, index) => (
                        <div
                          className="flex w-full animate-pulse items-end"
                          key={index}
                        >
                          <div className="h-5 h-10 w-10 shrink-0 rounded-full bg-indigoGray-20" />

                          <div className="ml-3 flex w-full flex-col justify-center space-y-[2px] lg:mr-[60px] lg:w-fit">
                            <div className="h-4 w-20 rounded bg-indigoGray-20" />
                            <div className="h-4 w-full rounded bg-indigoGray-20 lg:w-[400px]" />
                          </div>
                        </div>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div className="font-inter mt-10  w-full shrink-0 pb-8 lg:mt-0 lg:w-fit lg:pb-0">
                <div className="text-sm font-medium text-indigoGray-40">
                  <h2>PEOPLE YOU MAY KNOW</h2>
                </div>

                <div className="mt-3 grow lg:grow-0">
                  <ul className="space-y-6">
                    {Boolean(profiles) ? (
                      profiles?.map((suggestion, index) => (
                        <li key={index}>
                          <Link
                            href={`/people/${
                              suggestion?.username || suggestion?.eth_address
                            }`}
                          >
                            <a className="flex">
                              <Avatar
                                src={suggestion.avatar}
                                width={40}
                                height={40}
                                alt="user"
                              />

                              <div className="ml-3 mr-4 flex min-w-[208px] grow flex-col justify-center lg:grow-0">
                                <p className="font-serif text-base font-bold text-indigoGray-90">
                                  {returnTruncatedIfEthAddress(
                                    suggestion.username
                                  )}
                                </p>

                                <p className="font-inter text-xs font-medium leading-6 text-indigoGray-60">
                                  Talent spotlight
                                </p>
                              </div>

                              <div className="flex">
                                <Image
                                  src="/icons/arrow-right.svg"
                                  width={8}
                                  height={12}
                                  alt="arrow-right"
                                />
                              </div>
                            </a>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <div className="flex-1 space-y-6">
                        {skeletonArray.map((_, index) => (
                          <div
                            className="flex animate-pulse items-end"
                            key={index}
                          >
                            <div className="h-5 h-10 w-10 shrink-0 rounded-full bg-indigoGray-20" />

                            <div className="ml-3 mr-[60px] flex flex-col justify-center space-y-[2px]">
                              <div className="h-4 w-20 rounded bg-indigoGray-20" />
                              <div className="h-4 w-[160px] rounded bg-indigoGray-20" />
                            </div>

                            <div className="flex pb-3 opacity-50">
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
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
