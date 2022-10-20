import React, { useState, useRef } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { SidebarContext } from 'contexts';
import { profileSuggestionsSlice, userSlice } from '@/selectors';
import { useSelector } from 'react-redux';

import { Avatar, Button, MobileSidebar, Layout } from 'components';
import { useClickOutside, useMobile, useProfileSuggestions } from 'hooks';
import { returnTruncatedIfEthAddress } from 'utils';

type SearchState = 'idle' | 'loading' | 'result' | 'empty';

const credentialSuggestions = [
  {
    title: 'Paradigm CTF 2022 Participant',
    slug: 'paradigm-ctf-2022-2022',
    img: '/badges/paradigm-ctf-2022.png',
    detail: 'Participants in Paradigm CTF 2022 challange',
  },
  {
    title: 'Ethereum Merge Contributor',
    slug: 'gitpoap-ethereum-merge-contributor-2022',
    img: '/badges/gitpoap-ethereum-merge-contributor-2022.png',
    detail: 'Significant contributors to the Ethereum Merge',
  },
  {
    title: 'ETHAmsterdam 2022 Staked Hacker',
    slug: 'ethamsterdam-2022-staked-hacker-2022',
    img: '/badges/ethamsterdam-2022-staked-hacker-2022.png',
    detail: 'Hackers who participated in ETHAmsterdam 2022',
  },
  {
    title: '2022 wagmi Contributor',
    slug: 'gitpoap-2022-wagmi-contributor-2022',
    img: '/badges/gitpoap-2022-wagmi-contributor-2022-logo-1662563704917.webp',
    detail: 'Open source developers who contributed to wagmi project in 2022',
  },
  {
    title: 'Ethereum Power User ZK Badge',
    slug: 'ethereum-power-user-zk-badge',
    img: '/badges/ethereum_power_users.svg',
    detail: 'ZK Badge owned by the most active users on Ethereum',
  },
  {
    title: '2022 OpenZeppelin Contracts for Cairo',
    slug: 'gitpoap-2022-openzeppelin-contracts-for-cairo-contributor-2022',
    img: '/badges/gitpoap-2022-openzeppelin-contracts-for-cairo-contributor-2022-logo-1663873330809.png',
    detail: 'Contributors to OpenZeppelin cairo contracts in 2022',
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
  const [currentSearchState, setCurrentSearchState] =
    useState<SearchState>('idle');

  const { setSignInOpen, setIsOpen } = React.useContext(SidebarContext);

  const { address, isAuthenticated, profile } = useSelector(userSlice);
  const { suggestions } = useSelector(profileSuggestionsSlice);

  useProfileSuggestions(address as string, apiParams);

  const handleLogin = () => {
    setIsOpen(true);
    setSignInOpen(true);
  };

  const accountData = useSelector(userSlice);

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
      <div className="grow-[3] border-indigoGray-20 pb-7">
        <div className="mb-3 flex text-xs font-medium text-indigoGray-50">
          <h2>CREDENTIAL SEARCH SUGGESTIONS</h2>
        </div>
        <div className="px-2 font-sans font-medium lg:mr-12 lg:pt-0">
          <ul className="mb-4 grid grid-cols-1 lg:grid-cols-2">
            {credentialSuggestions.map((credential, index) => (
              <a href={`/search?badges=${credential.slug}`} key={index}>
                <li className=" flex cursor-pointer items-center py-2">
                  <div className="mr-4 flex">
                    <Image
                      src={credential.img}
                      width={46}
                      height={46}
                      layout="fixed"
                      alt="badge"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-indigoGray-90">
                      {credential.title}
                    </p>

                    <p className="text-xs text-indigoGray-80 text-opacity-80">
                      {credential.detail}
                    </p>
                  </div>
                </li>
              </a>
            ))}
          </ul>
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
    <div className="mt-3 font-sans text-sm font-medium text-indigoGray-90">
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
                <h1>Search people using verified credentials</h1>
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

                <div className="ml-4 mr-10 grow font-sans text-base font-medium">
                  <input
                    ref={inputRef}
                    type="search"
                    placeholder="Paradigm CTF 2022, ETHAmsterdam 2022 Finalist Hacker, woj.eth..."
                    aria-label="Search"
                    className="hidden h-full w-full bg-transparent lg:block"
                    value={searchTerm}
                    onChange={handleChange}
                    onFocus={handleFocusBlur}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Paradigm CTF 2022..."
                    aria-label="Search"
                    className="h-full w-full bg-transparent lg:hidden"
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
            <div className="lg:16 mt-10 w-full justify-center lg:mt-16 lg:flex">
              <div className="mb-6 lg:mr-[50px] lg:mb-3 lg:h-min lg:w-1/2 lg:p-4">
                <div className="mb-6 grow rounded-md border border-indigoGray-20 bg-indigo-50 bg-opacity-10 p-3 lg:mb-3">
                  <div className="font-sans font-bold text-indigo-600">
                    <h2>Mazury Talent</h2>
                  </div>

                  <div className="mt-1 mb-3 lg:mb-5">
                    <ul className="space-y-6">
                      {accountData.profile?.is_recruiter ? (
                        <p className="text-sm text-indigo-600">
                          We can help you find the best talent using our
                          database of verified talent ready for new projects
                        </p>
                      ) : (
                        <p className="text-sm text-indigo-600">
                          Get exclusive access to top jobs and get hired based
                          on your verified credentials.
                        </p>
                      )}
                    </ul>
                  </div>

                  {isAuthenticated ? (
                    <a
                      href={`${
                        accountData.profile?.is_recruiter
                          ? 'mailto:wojtek@mazury.xyz'
                          : 'https://airtable.com/shr7Cjchcji8zMay7?prefill_Mazury+profile=https://app.mazury.xyz/people/${profile?.username}'
                      }`}
                      target="_blank"
                      rel="noreferrer"
                      className="grid w-max place-items-center rounded-lg bg-indigo-600 py-2 px-6 text-center font-medium text-indigo-50 shadow-sm"
                    >
                      {accountData.profile?.is_recruiter
                        ? 'Contact us'
                        : 'Apply to join'}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="grid w-max place-items-center rounded-lg bg-indigo-600 py-2 px-6 text-center font-medium text-indigo-50 shadow-sm"
                    >
                      Log in to apply
                    </button>
                  )}
                </div>

                {isAuthenticated && (
                  <Link href="/people/connections">
                    <a className="my-6 flex items-center justify-between rounded-md bg-indigo-50 py-[13.5px] px-3 font-sans text-sm font-semibold text-indigo-900 transition-all lg:my-3">
                      See your connections
                      <Image
                        src="/icons/arrow-right.svg"
                        width={16}
                        height={16}
                        alt="arrow-right"
                      />
                    </a>
                  </Link>
                )}
              </div>

              <div className="w-full shrink-0 pb-8 font-sans lg:w-1/2 lg:pb-0 lg:pl-[50px]">
                <div className="text-sm font-medium text-indigoGray-40">
                  <h2>Recommended profiles</h2>
                </div>

                <div className="mt-3 grow lg:grow-0">
                  <ul className="space-y-6">
                    {Boolean(suggestions) ? (
                      suggestions?.map((suggestion, index) => (
                        <li key={index}>
                          <Link href={`/people/${suggestion?.username}`}>
                            <a className="flex">
                              <Avatar
                                src={suggestion.avatar}
                                width={40}
                                height={40}
                                alt="user"
                                className="object-cover"
                              />

                              <div className="ml-3 mr-4 flex min-w-[208px] grow flex-col justify-center">
                                <p className="font-serif text-base font-bold text-indigoGray-90">
                                  {returnTruncatedIfEthAddress(
                                    suggestion.username
                                  )}
                                </p>

                                <p className="font-sans text-xs font-medium leading-6 text-indigoGray-60">
                                  Mazury Talent spotlight
                                </p>
                              </div>

                              <div className="flex">
                                <Image
                                  src="/icons/arrow-right.svg"
                                  width={16}
                                  height={16}
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
