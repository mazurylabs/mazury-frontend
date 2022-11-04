import * as React from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import SVG from 'react-inlinesvg';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { Toggle } from 'components/Toggle';

import { LoadingState } from './LoadingState';
import { BadgeFilter } from './BadgeFilter';
import { CredentialFilter } from './CredentialFilter';
import { ReferralFilter } from './ReferralFilter';
import { RoleFilter } from './RoleFilter';
import { SkillFilter } from './SkillFilter';
import { InitialFilterState } from './InitialFilterState';
import { EmptyState } from './EmptyState';
import { SearchResults } from './SearchResults';

import { FilterState, FilterType, Profile, ValueOf } from 'types';
import { commify, fadeAnimation, toCapitalizedWord } from 'utils';
import { axios } from 'lib/axios';
import { useIntersect } from '@/hooks/useIntersect';
import { useClickOutside } from '@/hooks';
import { RequireSignin } from '@/components/RequireSignin';
import { userSlice } from '@/selectors';

const filters = [
  'Mazury',
  'POAP',
  'GitPOAP',
  'Buildspace',
  'Sismo',
  '101',
  'Kudos',
];

type ResultSteps = 'loading' | 'empty' | 'result';

const FilterTag: React.FC<{ label: string; handleClose: () => void }> = ({
  label,
  handleClose,
}) => {
  if (!label) return null;

  return (
    <div className="flex shrink-0 space-x-2 rounded border border-indigoGray-20 px-4 py-1">
      <button type="button" onClick={handleClose}>
        <SVG height={16} width={16} src="/icons/x.svg" />
      </button>
      <span className="font-sans text-sm font-bold text-indigoGray-90">
        {label}
      </span>
    </div>
  );
};

const initialFilterState = {
  query: '',
  badges: [],
  skills: [],
  role: '',
  contactable: false,
};

export const ResultState = () => {
  const { isAuthenticated, profile } = useSelector(userSlice);
  const filterRef = React.useRef<HTMLUListElement>(null!);
  const [cursor, setCursor] = React.useState('');
  const { ref, entry } = useIntersect({ rootMargin: '50px' });
  const shouldFetchMore = entry?.isIntersecting;
  const router = useRouter();
  const [resultCount, setResultCount] = React.useState(0);
  const [searchResults, setSearchResults] = React.useState<Profile[]>([]);
  const [currentStep, setCurrentStep] = React.useState<ResultSteps>('loading');
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  useClickOutside(filterRef, () => setSelectedFilter('empty'));
  const [selectedFilter, setSelectedFilter] =
    React.useState<FilterType>('empty');

  const [filter, setFilter] = React.useState<FilterState>(initialFilterState);

  const handleFilter = (
    key: keyof FilterState,
    value: ValueOf<FilterState>
  ) => {
    // let params = router.query;
    if (key !== 'query') {
      setFilter((filter) => {
        return { ...filter, [key]: value };
      });
    }
  };

  const handleApplyFilter = (
    key: keyof FilterState,
    reset?: boolean,
    value?: ValueOf<FilterState>
  ) => {
    const params = router.query;

    router.push(
      {
        pathname: '/search',
        query: {
          ...params,
          [key]: reset
            ? initialFilterState[key]
            : key === 'contactable'
            ? value
            : value && Array.isArray(value)
            ? value.join(';')
            : key === 'role'
            ? filter[key]
            : (filter[key] as any).join(';'),
        },
      },
      undefined,
      { shallow: true }
    );

    handleSearch(router.asPath);
  };

  const handleContactable = () => {
    handleFilter('contactable', !filter.contactable);
    handleApplyFilter('contactable', false, !filter.contactable);
  };

  const getCredentialFromRoute = (key: keyof FilterState) => {
    let credential = router.query[key] as string;
    const isArrayType = key === 'badges' || key === 'skills';

    if (credential && isArrayType) {
      return credential?.split(';');
    }

    return credential;
  };

  const handleSearch = React.useCallback(
    debounce(async (pathh) => {
      try {
        setSearchResults([]);
        setResultCount(0);
        setCurrentStep('loading');

        const routePath = pathh.split('?');

        let path = [
          routePath[0],
          routePath[1]
            ?.split('&')
            ?.filter((query: any) => !query.endsWith('='))
            ?.join('&'),
        ].join('?');

        let queryPath = path.includes('?') ? path : '?' + path;

        const decodedPath = decodeURIComponent(
          queryPath.replace('?', '/search-es/?')
        );

        const result = await axios.get(decodedPath);
        let nextCursor = result.data.next?.split('.com/')[1]; // TODO

        if (result.data?.results?.length !== 0) {
          setSearchResults(result.data.results);
          setResultCount(result.data.count);
          setCursor(nextCursor);
          setCurrentStep('result');
        } else {
          setCurrentStep('empty');
          setSearchResults([]);
          setCursor('');
          setResultCount(0);
        }
      } catch (error) {
        console.log(error);
        setSearchResults([]);
        setCursor('');
        setResultCount(0);
        setCurrentStep('empty');
      }
    }, 250),
    []
  );

  const handleSelectFilter = (filter: FilterType) => {
    if (!shouldQuerySearch) return;
    setSelectedFilter((prevFilter) =>
      prevFilter === filter ? 'empty' : filter
    );
  };

  const shouldQuerySearch =
    isAuthenticated && profile?.email && profile.email_verified;

  const resultStates = {
    loading: <LoadingState />,
    empty: <EmptyState />,
    result: (
      <SearchResults
        result={shouldQuerySearch ? searchResults : (dummyProfile as any)}
        ref={ref}
      />
    ),
  };

  const selectedFilterState: Record<FilterType, JSX.Element> = {
    empty: (
      <InitialFilterState
        handleFilterNavigation={handleSelectFilter}
        handleCloseModal={() => setIsFiltersOpen(false)}
        handleContactable={() =>
          handleFilter('contactable', !filter.contactable)
        }
        isContactable={filter.contactable}
      />
    ),
    Mazury: (
      <CredentialFilter
        handleSelectBadge={handleFilter}
        handleGoBack={handleSelectFilter}
        selectedBadges={filter.badges}
        handleApplyFilter={handleApplyFilter}
        credentialName={'mazury'}
      />
    ),
    POAP: (
      <CredentialFilter
        handleSelectBadge={handleFilter}
        handleGoBack={handleSelectFilter}
        selectedBadges={filter.badges}
        handleApplyFilter={handleApplyFilter}
        credentialName={'poap'}
      />
    ),
    GitPOAP: (
      <CredentialFilter
        handleSelectBadge={handleFilter}
        handleGoBack={handleSelectFilter}
        selectedBadges={filter.badges}
        handleApplyFilter={handleApplyFilter}
        credentialName={'gitpoap'}
      />
    ),
    Buildspace: (
      <CredentialFilter
        handleSelectBadge={handleFilter}
        handleGoBack={handleSelectFilter}
        selectedBadges={filter.badges}
        handleApplyFilter={handleApplyFilter}
        credentialName={'buildspace'}
      />
    ),
    Sismo: (
      <CredentialFilter
        handleSelectBadge={handleFilter}
        handleGoBack={handleSelectFilter}
        selectedBadges={filter.badges}
        handleApplyFilter={handleApplyFilter}
        credentialName={'sismo'}
      />
    ),
    '101': (
      <CredentialFilter
        handleSelectBadge={handleFilter}
        handleGoBack={handleSelectFilter}
        selectedBadges={filter.badges}
        handleApplyFilter={handleApplyFilter}
        credentialName={'101'}
      />
    ),
    Kudos: (
      <CredentialFilter
        handleSelectBadge={handleFilter}
        handleGoBack={handleSelectFilter}
        selectedBadges={filter.badges}
        handleApplyFilter={handleApplyFilter}
        credentialName={'kudos'}
      />
    ),
  };

  React.useEffect(() => {
    if (!shouldQuerySearch) {
      setCurrentStep('result');
    } else {
      handleSearch(router.asPath);
    }
  }, [handleSearch, router.query, shouldQuerySearch]);

  React.useEffect(() => {
    const fetchMore = async () => {
      try {
        const result = await axios.get(cursor);

        const newCursor = result.data.next?.split('.com/')[1];

        if (cursor !== newCursor) {
          //only load add unique data
          let updatedResult = searchResults?.concat(result?.data?.results);
          setSearchResults(updatedResult);
          setCursor(newCursor);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (shouldFetchMore) {
      fetchMore();
    }
  }, [shouldFetchMore]);

  React.useEffect(() => {
    const populateFiltersFromRoute = () => {
      let routeFilters: any = router.query;

      let filtersFromRoute = {};

      Object.keys(routeFilters).forEach((key: any) => {
        let filter = routeFilters[key].split(';');
        filtersFromRoute = {
          ...filtersFromRoute,
          [key]:
            key === 'role'
              ? filter.join('')
              : key === 'contactable'
              ? filter.join('').toLowerCase() === 'true'
              : filter,
        };
      });

      setFilter((filter) => {
        return { ...filter, ...filtersFromRoute };
      });
    };

    populateFiltersFromRoute();
  }, []);

  const routeBadges = getCredentialFromRoute('badges') as string[];
  const routeSkills = getCredentialFromRoute('skills') as string[];

  return (
    <div className="mt-5 flex w-full flex-col lg:mt-6">
      <div className="ml-[25px] flex lg:hidden">
        <button
          type="button"
          className="flex items-center space-x-2"
          onClick={() => setIsFiltersOpen(true)}
        >
          <SVG src="/icons/filter.svg" height={16} width={16} />
          <span>FILTERS</span>
        </button>

        <div className="ml-auto">
          {shouldQuerySearch && (
            <p className="font-sans text-base font-medium leading-6 text-indigoGray-50">
              {commify(searchResults.length)} / {commify(resultCount)} result
              {resultCount === 1 ? '' : 's'}
            </p>
          )}
        </div>
      </div>

      {isFiltersOpen && (
        <div
          {...fadeAnimation}
          role="dialog"
          className="fixed top-0 right-0 z-10 flex h-screen w-screen items-end bg-[rgba(17,15,42,0.2)] md:flex md:items-center md:justify-center"
        >
          {selectedFilterState[selectedFilter]}
        </div>
      )}

      <div className="mb-4 hidden pl-4 lg:block">
        <div className="mb-2 flex items-center">
          <ul className="flex space-x-8" ref={filterRef}>
            {filters.map((filter) => (
              <li key={filter} className="fit-content relative">
                <div
                  className="flex cursor-pointer items-center  space-x-1"
                  onClick={() => handleSelectFilter(filter as FilterType)}

                  // onMouseLeave={() => handleSelectFilter('empty')}
                >
                  <span className="font-sans text-sm font-semibold leading-[21px] text-indigoGray-90">
                    {filter}
                  </span>
                  <SVG src="/icons/angle-down.svg" height={16} width={16} />
                </div>

                <AnimatePresence>
                  {selectedFilter === filter && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={clsx(
                        'absolute top-[100%] left-0 z-10 !ml-[-24px] h-[400px] w-[500px] rounded-t-3xl bg-white shadow-3xl md:rounded-b-3xl'
                      )}
                    >
                      {selectedFilterState[selectedFilter]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
          <a
            className="ml-10 hidden text-sm font-light underline 2xl:block"
            rel="noreferrer"
            target="_blank"
            href="https://mazury.notion.site/How-to-scout-talent-using-Mazury-Search-3b0b609e4d334349bb997562ef446773"
          >
            Learn how to scout talent using Mazury Search
          </a>

          <div className="ml-auto">
            {shouldQuerySearch && (
              <p className="font-sans text-base font-medium leading-6 text-indigoGray-50">
                {commify(searchResults.length)} / {commify(resultCount)} result
                {resultCount === 1 ? '' : 's'}
              </p>
            )}
          </div>
        </div>
        <a
          className="text-sm font-light underline 2xl:hidden"
          rel="noreferrer"
          target="_blank"
          href="https://mazury.notion.site/How-to-scout-talent-using-Mazury-Search-3b0b609e4d334349bb997562ef446773"
        >
          Learn how to scout talent using Mazury Search
        </a>
      </div>

      <div className="mt-1">
        <ul className="flex flex-wrap gap-2">
          {getCredentialFromRoute('role') && (
            <li>
              <FilterTag
                label={getCredentialFromRoute('role') as string}
                handleClose={() => handleApplyFilter('role', true)}
              />
            </li>
          )}

          {routeBadges && (
            <>
              {routeBadges?.map((badge, index) => {
                const updatedBadges = routeBadges?.filter(
                  (item) => item !== badge
                );

                return (
                  <li>
                    <FilterTag
                      key={index + badge}
                      label={badge}
                      handleClose={() =>
                        handleApplyFilter('badges', false, updatedBadges)
                      }
                    />
                  </li>
                );
              })}
            </>
          )}

          {routeSkills && (
            <>
              {routeSkills?.map((skill, index) => {
                const updatedSkills = routeSkills?.filter(
                  (item) => item !== skill
                );

                return (
                  <li>
                    <FilterTag
                      key={index + skill}
                      label={skill}
                      handleClose={() =>
                        handleApplyFilter('skills', false, updatedSkills)
                      }
                    />
                  </li>
                );
              })}
            </>
          )}

          {/* {filter.contactable && <li>{filter.contactable}</li>} */}
        </ul>
      </div>

      <div className="relative flex grow flex-col">
        {resultStates[currentStep]}
        <AnimatePresence>
          <RequireSignin />
        </AnimatePresence>
      </div>
    </div>
  );
};

const dummyProfile = [
  {
    id: 'faea5b99-0ea9-44fe-8f9b-902405b9270a',
    top_badges: [
      {
        badge_type: {
          id: 'fc12e581-8236-4d6c-8fb2-d1c7b3882722',
          issuer: {
            name: 'buildspace',
          },
          image:
            'https://tokens.buildspace.so/assets/CHb51f7d0f-8bf0-4fb2-bc4c-c8cfcfaf67ff-51/render.png',
          poap_badge_extra_data: null,
          created_at: '2022-09-08T10:00:30.335979Z',
          updated_at: '2022-10-28T00:05:06.711533Z',
          video: null,
          title: 'Intro to Web3',
          slug: 'buildspace_intro_web3',
          description:
            "A 2-week project where you'll learn some Solidity, write + deploy a smart contract to the blockchain, and build a Web3 client app to interact with your contract. Perfect for hackers curious about crypto.",
          external_image_url:
            'https://tokens.buildspace.so/assets/CHb51f7d0f-8bf0-4fb2-bc4c-c8cfcfaf67ff-51/render.png',
          total_supply: 6543,
        },
      },
      {
        badge_type: {
          id: '0925596e-e60f-437a-8719-6b0b1f80b0b8',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/paradigm-ctf-2022-2022-logo-1661818929100.png',
          poap_badge_extra_data: {
            id: '49125dbe-3114-4a0c-9600-ee2485609790',
            created_at: '2022-08-30T15:30:27.382726Z',
            updated_at: '2022-09-20T16:13:26.521062Z',
            url: 'https://ctf.paradigm.xyz',
            start_date: '2022-08-20',
            end_date: '2022-08-22',
            expired: true,
            expiry_date: '2022-09-19',
            last_synced: '2022-09-20',
            event_id: 62691,
            image_url:
              'https://assets.poap.xyz/paradigm-ctf-2022-2022-logo-1661818929100.png',
          },
          created_at: '2022-08-30T15:30:27.391423Z',
          updated_at: '2022-10-28T00:03:16.693387Z',
          video: null,
          title: 'Paradigm CTF 2022',
          slug: 'paradigm-ctf-2022-2022',
          description:
            'This POAP was given to those who solved at least one challenge in Paradigm CTF 2022',
          external_image_url: null,
          total_supply: 438,
        },
      },
      {
        badge_type: {
          id: '57840265-9d1f-4073-9c39-3dcdd671d6df',
          issuer: {
            name: 'poap',
          },
          image: null,
          poap_badge_extra_data: {
            id: '20a330bd-ff4f-49a1-8759-28b759396c1f',
            created_at: '2022-04-26T09:18:08.957361Z',
            updated_at: '2022-08-26T23:13:05.246477Z',
            url: 'https://www.guildofguardians.com/',
            start_date: '2021-06-02',
            end_date: '2021-06-09',
            expired: true,
            expiry_date: '2021-07-09',
            last_synced: '2022-08-26',
            event_id: 2598,
            image_url: null,
          },
          created_at: '2022-04-26T09:18:08.968945Z',
          updated_at: '2022-10-28T00:08:56.096134Z',
          video: null,
          title: 'Guild of Guardians Founder Badge',
          slug: 'guild-of-guardians-founder-badge-2021',
          description:
            'A special, exclusive Founders Badge for early members of the Guardian community. ',
          external_image_url: null,
          total_supply: 27903,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0xE913c0f42fB60F85Bd43bDdDAf4e004135eF318c',
    bio: '',
    username: '0xE913c0f42fB60F85Bd43bDdDAf4e004135eF318c',
    ens_name: '',
    github: 'dummy',
    twitter: 'dummy',
    website: 'https://dummy.com',
    credentials_count: 19,
  },
  {
    id: 'b240be8b-114c-4e4a-8e1d-4c16162d3615',
    top_badges: [
      {
        badge_type: {
          id: '6f00c484-258f-473c-bc0b-ca36a172da5b',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/ethbogotc3a1-2022-2022-logo-1666290785384.png',
          poap_badge_extra_data: {
            id: '36c19db5-5f05-42c1-bd5c-9e3aec631bf7',
            created_at: '2022-10-21T15:30:43.613695Z',
            updated_at: '2022-10-27T18:30:28.445782Z',
            url: 'https://bogota.ethglobal.com',
            start_date: '2022-10-07',
            end_date: '2022-10-09',
            expired: false,
            expiry_date: '2022-11-30',
            last_synced: '2022-10-27',
            event_id: 77610,
            image_url:
              'https://assets.poap.xyz/ethbogotc3a1-2022-2022-logo-1666290785384.png',
          },
          created_at: '2022-10-21T15:30:43.620082Z',
          updated_at: '2022-10-28T00:04:32.807973Z',
          video: null,
          title: 'ETHBogotá 2022 Hacker',
          slug: 'ethbogotc3a1-2022-2022',
          description:
            "This POAP confirms that you were a Hacker at ETHGlobal's ETHBogotá hackathon on October 7-9th, 2022 in Bogotá 🇨🇴. Thank you for joining us and for building!\r\n\r\nETHBogotá was ETHGlobal's first hackathon at Devcon and united over 1400 people passionate about the future of Ethereum under one roof. As a result, it was the largest Ethereum Hackathon ever in LATAM!",
          external_image_url: null,
          total_supply: 422,
        },
      },
      {
        badge_type: {
          id: 'afca2e0a-4d85-4570-8f9b-6a465f5815a2',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/i-met-flomojoeth-at-devcon-6-2022-logo-1665517018066.png',
          poap_badge_extra_data: {
            id: '8d302261-a6c7-4329-bf2c-4a1da61a1133',
            created_at: '2022-10-12T15:31:14.223094Z',
            updated_at: '2022-10-15T21:16:24.888925Z',
            url: 'https://devcon.org/',
            start_date: '2022-10-11',
            end_date: '2022-10-14',
            expired: true,
            expiry_date: '2022-10-14',
            last_synced: '2022-10-15',
            event_id: 74823,
            image_url:
              'https://assets.poap.xyz/i-met-flomojoeth-at-devcon-6-2022-logo-1665517018066.png',
          },
          created_at: '2022-10-12T15:31:14.231567Z',
          updated_at: '2022-10-28T00:05:34.862322Z',
          video: null,
          title: 'I met flomojo.eth at Devcon 6',
          slug: 'i-met-flomojoeth-at-devcon-6-2022',
          description:
            'This POAP proves that the bearer met flomojo.eth at Devcon 6 and scanned their ENS card.',
          external_image_url: null,
          total_supply: 18,
        },
      },
      {
        badge_type: {
          id: 'd2e2e88c-1e06-4b03-b733-44035df569e4',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/arch-at-devcon-2022-logo-1665152325357.png',
          poap_badge_extra_data: {
            id: 'dd9277c5-62dc-40cc-9407-e90f70484e5b',
            created_at: '2022-10-07T15:31:00.395307Z',
            updated_at: '2022-10-17T20:14:43.817644Z',
            url: '',
            start_date: '2022-10-07',
            end_date: '2022-10-15',
            expired: true,
            expiry_date: '2022-10-16',
            last_synced: '2022-10-17',
            event_id: 73232,
            image_url:
              'https://assets.poap.xyz/arch-at-devcon-2022-logo-1665152325357.png',
          },
          created_at: '2022-10-07T15:31:00.403823Z',
          updated_at: '2022-10-28T00:07:20.881244Z',
          video: null,
          title: 'Arch at Devcon',
          slug: 'arch-at-devcon-2022',
          description:
            "This POAP is proof of having met a member of the Arch team in Devcon 🇨🇴, in order to claim your $WEB3 Airdrop the following is necessary:\r\n\r\n1.Enter discord: https://bit.ly/3fPL4Ft\r\n2.Say hello ✌🏻in general #channel\r\n\r\n¡Ready! 🪂\r\n\r\nDon't forget follow us in more digital spaces: https://linktr.ee/archfinance.io",
          external_image_url: null,
          total_supply: 88,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0x7447aa707b577D1EB65f8f7102fd3A54Ad81fa6d',
    bio: '',
    username: '0x7447aa707b577D1EB65f8f7102fd3A54Ad81fa6d',
    ens_name: '',
    github: 'dummy',
    twitter: 'dummy',
    website: '',
    credentials_count: 109,
  },
  {
    id: 'a1e798b7-0439-43c0-98b1-f4fa35b5b132',
    top_badges: [
      {
        badge_type: {
          id: '08aabe3d-0737-4700-ba7e-410346584670',
          issuer: {
            name: 'sismo',
          },
          image:
            'https://sismo-prod-hub-static.s3.eu-west-1.amazonaws.com/badges/sismo_early_users.svg',
          poap_badge_extra_data: null,
          created_at: '2022-09-27T15:17:50.975987Z',
          updated_at: '2022-10-28T00:04:09.926139Z',
          video: null,
          title: 'Sismo Early User ZK Badge',
          slug: 'sismo-early-user-zk-badge',
          description: 'ZK Badge owned by Sismo Early users',
          external_image_url:
            'https://sismo-prod-hub-static.s3.eu-west-1.amazonaws.com/badges/sismo_early_users.svg',
          total_supply: 5383,
        },
      },
      {
        badge_type: {
          id: '03d82415-01ce-46d1-98c8-828cf80030b6',
          issuer: {
            name: 'kudos',
          },
          image: 'https://images.mintkudos.xyz/token/1655.mp4',
          poap_badge_extra_data: null,
          created_at: '2022-09-08T10:31:59.275878Z',
          updated_at: '2022-10-28T00:07:43.996624Z',
          video: null,
          title: 'Alchemy student pass - Exclusive',
          slug: 'alchemy-student-pass-exclusive1655',
          description:
            "Congratulations 🎉 You are now an Alchemist!\n\nThis pass gives you access to Road to Web3 (R2W3) a 10-week Bootcamp to kickstart your web3 career. \n\nUnlock all R2W3 NFTs by completing the challenges for special rewards.\n\nThis NFT is soul-bound, it can't be transferred and will be yours forever.",
          external_image_url: 'https://images.mintkudos.xyz/token/1655.mp4',
          total_supply: 11794,
        },
      },
      {
        badge_type: {
          id: '7c8cf18e-bdc4-47bf-8aae-e104f131f193',
          issuer: {
            name: 'sismo',
          },
          image:
            'https://sismo-prod-hub-static.s3.eu-west-1.amazonaws.com/badges/sismo_contributors.svg',
          poap_badge_extra_data: null,
          created_at: '2022-09-22T12:50:29.312758Z',
          updated_at: '2022-10-28T00:05:13.488558Z',
          video: null,
          title: 'Sismo Contributor ZK Badge',
          slug: 'sismo-contributor-zk-badge',
          description:
            'ZK Badge owned by Sismo contributors. This Badge is used in Sismo Governance for contributors to voice their opinions.',
          external_image_url:
            'https://sismo-prod-hub-static.s3.eu-west-1.amazonaws.com/badges/sismo_contributors.svg',
          total_supply: 2703,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0x0b13047B3100ae0e97a27873936742268DeCC512',
    bio: 'im working tthere!',
    username: 'matteo',
    ens_name: 'mtteo.eth',
    github: '',
    twitter: '',
    website: 'https://www.test.com',
    credentials_count: 42,
  },
  {
    id: 'f0ce7007-3ee2-47f7-89bf-44b3cf19ce81',
    top_badges: [
      {
        badge_type: {
          id: '7c7f83eb-2471-4a41-b2d8-22ac82950ba3',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/developer-dao-devntell-attendee-october-21st2c-2022-2022-logo-1666150838578.png',
          poap_badge_extra_data: {
            id: '901424ea-0274-4162-8f41-a75d40e35eb4',
            created_at: '2022-10-19T15:30:45.078681Z',
            updated_at: '2022-10-27T18:47:36.192636Z',
            url: 'https://www.developerdao.com',
            start_date: '2022-10-21',
            end_date: '2022-10-21',
            expired: false,
            expiry_date: '2022-11-21',
            last_synced: '2022-10-27',
            event_id: 77299,
            image_url:
              'https://assets.poap.xyz/developer-dao-devntell-attendee-october-21st2c-2022-2022-logo-1666150838578.png',
          },
          created_at: '2022-10-19T15:30:45.094023Z',
          updated_at: '2022-10-28T00:08:06.397170Z',
          video: null,
          title: 'Developer DAO - DevNTell - Attendee - October 21st, 2022',
          slug: 'developer-dao-devntell-attendee-october-21st2c-2022-2022',
          description:
            'This POAP is for the attendees of the Developer DAO DevNTell for season 1',
          external_image_url: null,
          total_supply: 30,
        },
      },
      {
        badge_type: {
          id: '605f42db-1fb6-4965-bb56-165d23e4c90c',
          issuer: {
            name: 'kudos',
          },
          image: 'https://images.mintkudos.xyz/token/2698.mp4',
          poap_badge_extra_data: null,
          created_at: '2022-10-20T13:38:26.284095Z',
          updated_at: '2022-10-28T00:02:29.824364Z',
          video: null,
          title: 'Alchemy University Early Access',
          slug: 'alchemy-university-early-access2698',
          description:
            "Get excited! This student pass provides you with early-access to Alchemy University's courses. You are on the fast track to earning your web3 degree!",
          external_image_url: 'https://images.mintkudos.xyz/token/2698.mp4',
          total_supply: 3320,
        },
      },
      {
        badge_type: {
          id: '97cb227b-0ee2-4e2e-905a-d05c85cd00cd',
          issuer: {
            name: 'kudos',
          },
          image: 'https://images.mintkudos.xyz/token/2532.mp4',
          poap_badge_extra_data: null,
          created_at: '2022-10-03T13:47:48.303949Z',
          updated_at: '2022-10-28T00:06:10.587620Z',
          video: null,
          title: 'TYSM for joining our zeroth game night :)',
          slug: 'tysm-for-joining-our-zeroth-game-night-2532',
          description:
            'Your participation in our new social layer initiative means a lot! ',
          external_image_url: 'https://images.mintkudos.xyz/token/2532.mp4',
          total_supply: 7,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0xCa0F403D2A602e4D8c0A6A984b973D7958FBF463',
    bio: '',
    username: '0x7i7o.eth',
    ens_name: '0x7i7o.eth',
    github: 'dummy',
    twitter: '',
    website: 'https://dummy.com',
    credentials_count: 95,
  },
  {
    id: 'fc605970-81a4-4ba6-8176-2c4db0c3b561',
    top_badges: [
      {
        badge_type: {
          id: 'f7407807-3e5b-425b-8ab5-988ed056c791',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/interface-community-call-003-2022-logo-1665000627052.png',
          poap_badge_extra_data: {
            id: 'b81bd34c-e75a-470f-a032-672607398d70',
            created_at: '2022-10-06T15:31:15.548188Z',
            updated_at: '2022-10-27T21:31:10.947464Z',
            url: 'https://interface.social/',
            start_date: '2022-10-06',
            end_date: '2022-10-06',
            expired: false,
            expiry_date: '2022-10-27',
            last_synced: '2022-10-27',
            event_id: 72537,
            image_url:
              'https://assets.poap.xyz/interface-community-call-003-2022-logo-1665000627052.png',
          },
          created_at: '2022-10-06T15:31:15.561371Z',
          updated_at: '2022-10-28T00:04:35.419122Z',
          video: null,
          title: 'Interface - Community Call 003',
          slug: 'interface-community-call-003-2022',
          description:
            'Thankyou for coming to Community Call 003! You make Interface possible <3 ',
          external_image_url: null,
          total_supply: 18,
        },
      },
      {
        badge_type: {
          id: 'b61cefc4-e7df-4c3c-a462-f8deab5eebbf',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/ethberlin3-2022-logo-1663259548826.gif',
          poap_badge_extra_data: {
            id: 'e9e0b045-5b1d-4c56-af60-a0bd6bbc2ae9',
            created_at: '2022-09-16T15:30:34.818683Z',
            updated_at: '2022-10-17T19:39:35.670179Z',
            url: 'https://ethberlin.ooo/',
            start_date: '2022-09-16',
            end_date: '2022-09-18',
            expired: true,
            expiry_date: '2022-10-16',
            last_synced: '2022-10-17',
            event_id: 65440,
            image_url:
              'https://assets.poap.xyz/ethberlin3-2022-logo-1663259548826.gif',
          },
          created_at: '2022-09-16T15:30:34.824360Z',
          updated_at: '2022-10-28T00:08:08.633334Z',
          video: null,
          title: 'ETHBerlin³',
          slug: 'ethberlin3-2022',
          description:
            'ETHBerlin³ is a hackathon, a cultural festival, an educational event, a platform for hacktivism, and a community initiative to push the decentralized ecosystem forward.',
          external_image_url: null,
          total_supply: 390,
        },
      },
      {
        badge_type: {
          id: '156d29c7-d920-44e9-ad77-3f4385558c7f',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/you-have-met-patricio-in-september-2022-irl-2022-logo-1662136941258.png',
          poap_badge_extra_data: {
            id: '8ddf906d-61ee-44f2-81ef-4bbd0ba2970c',
            created_at: '2022-09-03T15:30:28.953568Z',
            updated_at: '2022-10-02T16:24:47.150795Z',
            url: 'http://poap.xyz',
            start_date: '2022-09-01',
            end_date: '2022-09-02',
            expired: true,
            expiry_date: '2022-10-01',
            last_synced: '2022-10-02',
            event_id: 63400,
            image_url:
              'https://assets.poap.xyz/you-have-met-patricio-in-september-2022-irl-2022-logo-1662136941258.png',
          },
          created_at: '2022-09-03T15:30:28.961944Z',
          updated_at: '2022-10-28T00:03:37.503056Z',
          video: null,
          title: 'You have met Patricio in September 2022 (IRL)',
          slug: 'you-have-met-patricio-in-september-2022-irl-2022',
          description:
            'Proof that you have met Patricio in-person during September 2022',
          external_image_url: null,
          total_supply: 307,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0xF4844a06d4f995C4c03195AfcB5Aa59dCBB5b4Fc',
    bio: '',
    username: 'wijuwiju.eth',
    ens_name: 'wijuwiju.eth',
    github: 'dummy',
    twitter: 'dummy',
    website: 'https://dummy.com',
    credentials_count: 52,
  },
  {
    id: '749c3d7d-0359-4d3c-9694-62589494e932',
    top_badges: [
      {
        badge_type: {
          id: 'f551f688-6c37-427b-a684-5b4ab2396620',
          issuer: {
            name: 'poap',
          },
          image: null,
          poap_badge_extra_data: {
            id: 'c55546c6-2b96-4dfc-8e21-35234ff7c7a4',
            created_at: '2022-04-26T09:14:12.697310Z',
            updated_at: '2022-05-24T16:15:20.286360Z',
            url: 'https://unicode.ethglobal.com/',
            start_date: '2021-10-29',
            end_date: '2021-11-10',
            expired: true,
            expiry_date: '2021-12-10',
            last_synced: '2022-05-24',
            event_id: 13384,
            image_url: null,
          },
          created_at: '2022-04-26T09:14:12.710418Z',
          updated_at: '2022-10-28T00:04:13.413213Z',
          video: null,
          title: 'UniCode 2021 Staked Hacker',
          slug: 'unicode-2021-staked-hacker-2021',
          description:
            "This badge asserts that you were a staked hacker at ETHGlobal's UniCode 2021.",
          external_image_url: null,
          total_supply: 176,
        },
      },
      {
        badge_type: {
          id: '8a1231ff-b8c6-4af1-9b3d-55917d4115f2',
          issuer: {
            name: 'poap',
          },
          image: null,
          poap_badge_extra_data: {
            id: 'f47d9d0a-26fb-4a36-91bb-bee35d757281',
            created_at: '2022-04-26T09:13:46.707833Z',
            updated_at: '2022-05-25T07:56:26.066613Z',
            url: 'https://www.developerdao.com/',
            start_date: '2021-11-07',
            end_date: '2021-11-12',
            expired: true,
            expiry_date: '2021-11-16',
            last_synced: '2022-05-25',
            event_id: 13024,
            image_url: null,
          },
          created_at: '2022-04-26T09:13:46.718048Z',
          updated_at: '2022-10-28T00:08:10.150571Z',
          video: null,
          title: 'Developer DAO Season 0 Snapshot Vote',
          slug: 'developer-dao-season-0-snapshot-vote-2021',
          description:
            'Voters in the Developer DAO Season 0 proposal receive this POAP!\nhttps://snapshot.org/#/devdao.eth/proposal/0x52fc76fe5865cf038b89b8c6ef78b6e691c0ab9c2b1228b84b0813b7832ce369\n\nArtist: Erik Knobl',
          external_image_url: null,
          total_supply: 471,
        },
      },
      {
        badge_type: {
          id: '38c18960-0246-4cc7-a494-5f2a0811dfce',
          issuer: {
            name: 'mazury',
          },
          image:
            'https://mazury-staging.s3.eu-central-1.amazonaws.com/badges/images/ens_dao_voter.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUV5WL77G5SO2Y7UV%2F20221028%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20221028T104351Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d15de8d0bbc7f9eca166af61688d62f5bd9a0c5dca74ee326c2bbed1fa9a8b17',
          poap_badge_extra_data: null,
          created_at: '2022-03-18T09:34:59.682480Z',
          updated_at: '2022-10-28T00:07:37.181173Z',
          video:
            'https://mazury-staging.s3.eu-central-1.amazonaws.com/badges/videos/ens_dao_voter.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUV5WL77G5SO2Y7UV%2F20221028%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20221028T104351Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5d7458af2237614653973807c96036e0e44f9d3ab1e4d1b9fe78c2c179639916',
          title: 'ENS DAO voter',
          slug: 'ens_dao_voter',
          description: 'You voted in a ENS DAO governance snapshot',
          external_image_url: null,
          total_supply: 86183,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0x2cf8b2A689B9bE7dbe508089184Bac178925d010',
    bio: '',
    username: '0x2cf8b2A689B9bE7dbe508089184Bac178925d010',
    ens_name: '',
    github: 'dummy',
    twitter: '',
    website: 'https://dummy.com',
    credentials_count: 4,
  },
  {
    id: '15fe1ab5-910e-4ce2-98de-018b234c65a0',
    top_badges: [
      {
        badge_type: {
          id: 'ec1c17e5-a117-4188-afa1-8f0561958d5f',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/metaclan-sunset-undefined-logo-1664800271338.gif',
          poap_badge_extra_data: {
            id: '3d1b850c-cbd4-4e5e-86c9-ff503871b066',
            created_at: '2022-10-03T15:30:35.593850Z',
            updated_at: '2022-10-27T21:15:47.353609Z',
            url: '',
            start_date: '2022-10-03',
            end_date: '2022-10-03',
            expired: false,
            expiry_date: '2023-10-03',
            last_synced: '2022-10-27',
            event_id: 71609,
            image_url:
              'https://assets.poap.xyz/metaclan-sunset-undefined-logo-1664800271338.gif',
          },
          created_at: '2022-10-03T15:30:35.602429Z',
          updated_at: '2022-10-28T00:03:02.036127Z',
          video: null,
          title: 'MetaClan',
          slug: 'metaclan-sunset-undefined',
          description:
            'As the first gaming DAO that appeared on the landscape MetaClan was assembled for playing together online.',
          external_image_url: null,
          total_supply: 14,
        },
      },
      {
        badge_type: {
          id: 'b61cefc4-e7df-4c3c-a462-f8deab5eebbf',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/ethberlin3-2022-logo-1663259548826.gif',
          poap_badge_extra_data: {
            id: 'e9e0b045-5b1d-4c56-af60-a0bd6bbc2ae9',
            created_at: '2022-09-16T15:30:34.818683Z',
            updated_at: '2022-10-17T19:39:35.670179Z',
            url: 'https://ethberlin.ooo/',
            start_date: '2022-09-16',
            end_date: '2022-09-18',
            expired: true,
            expiry_date: '2022-10-16',
            last_synced: '2022-10-17',
            event_id: 65440,
            image_url:
              'https://assets.poap.xyz/ethberlin3-2022-logo-1663259548826.gif',
          },
          created_at: '2022-09-16T15:30:34.824360Z',
          updated_at: '2022-10-28T00:08:08.633334Z',
          video: null,
          title: 'ETHBerlin³',
          slug: 'ethberlin3-2022',
          description:
            'ETHBerlin³ is a hackathon, a cultural festival, an educational event, a platform for hacktivism, and a community initiative to push the decentralized ecosystem forward.',
          external_image_url: null,
          total_supply: 390,
        },
      },
      {
        badge_type: {
          id: '0462586e-6c5e-495f-b5b1-a07bf6ac2db0',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/i-met-nielseth-at-blockchain-week-berlin-2022-2022-logo-1662298723917.png',
          poap_badge_extra_data: {
            id: '882a9ae2-b53c-47eb-be0c-8b0b0ac42e7b',
            created_at: '2022-09-04T15:30:49.256722Z',
            updated_at: '2022-10-27T16:07:13.525457Z',
            url: 'https://twitter.com/Dakavon',
            start_date: '2022-09-12',
            end_date: '2022-09-18',
            expired: false,
            expiry_date: '2022-10-31',
            last_synced: '2022-10-27',
            event_id: 63574,
            image_url:
              'https://assets.poap.xyz/i-met-nielseth-at-blockchain-week-berlin-2022-2022-logo-1662298723917.png',
          },
          created_at: '2022-09-04T15:30:49.271028Z',
          updated_at: '2022-10-28T00:03:29.778357Z',
          video: null,
          title: 'I met niels.eth at Blockchain Week Berlin 2022',
          slug: 'i-met-nielseth-at-blockchain-week-berlin-2022-2022',
          description:
            'Holders of this POAP met niels.eth at Blockchain Week Berlin 2022',
          external_image_url: null,
          total_supply: 29,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0x2bEBa030cdC9c4a47c5aa657974840428b9fEfAc',
    bio: '',
    username: '0x2bEBa030cdC9c4a47c5aa657974840428b9fEfAc',
    ens_name: '',
    github: 'dummy',
    twitter: 'dummy',
    website: 'https://dummy.com',
    credentials_count: 51,
  },
  {
    id: '003b9475-8fb4-4022-b958-494d2057f390',
    top_badges: [
      {
        badge_type: {
          id: 'd64c4be6-aea4-4392-bc25-8808f4421b94',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/90s-babes-x-atari-halloween-trivia-night-2022-logo-1666738209160.png',
          poap_badge_extra_data: {
            id: '18db8d2a-e46a-4a63-b83f-4f800f2839e4',
            created_at: '2022-10-26T15:30:45.499959Z',
            updated_at: '2022-10-27T20:45:50.962019Z',
            url: 'http://90sbabesnft.com/',
            start_date: '2022-10-25',
            end_date: '2022-10-25',
            expired: false,
            expiry_date: '2022-11-25',
            last_synced: '2022-10-27',
            event_id: 79544,
            image_url:
              'https://assets.poap.xyz/90s-babes-x-atari-halloween-trivia-night-2022-logo-1666738209160.png',
          },
          created_at: '2022-10-26T15:30:45.508945Z',
          updated_at: '2022-10-28T00:02:36.119092Z',
          video: null,
          title: '90s Babes x Atari Halloween Trivia Night',
          slug: '90s-babes-x-atari-halloween-trivia-night-2022',
          description:
            'You participated in the spooky 90s Babes x Atari trivia night and survived.',
          external_image_url: null,
          total_supply: 47,
        },
      },
      {
        badge_type: {
          id: '614edd32-930e-4b8a-a869-70c02c324637',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/ultra-sound-poap-event-2022-logo-1663527819992.gif',
          poap_badge_extra_data: {
            id: '25094cc6-d9e1-4254-bae2-5676921b4487',
            created_at: '2022-09-19T15:30:49.986776Z',
            updated_at: '2022-10-27T18:10:13.599673Z',
            url: 'https://ultrasound.money',
            start_date: '2022-09-15',
            end_date: '2022-09-15',
            expired: false,
            expiry_date: '2023-09-15',
            last_synced: '2022-10-27',
            event_id: 65873,
            image_url:
              'https://assets.poap.xyz/ultra-sound-poap-event-2022-logo-1663527819992.gif',
          },
          created_at: '2022-09-19T15:30:50.001728Z',
          updated_at: '2022-10-28T00:02:28.810703Z',
          video: null,
          title: 'ultra sound POAP',
          slug: 'ultra-sound-poap-event-2022',
          description:
            'celebrating the ultra sound fam 🦇🔊👪\r\n\r\na special POAP for 1,559 pre-merge believers\r\n\r\nmeet the meme spreaders on ultrasound.money',
          external_image_url: null,
          total_supply: 503,
        },
      },
      {
        badge_type: {
          id: 'e0ad05aa-3b45-4664-bcc1-17c176025df5',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/i-met-0xjoshuaeth-at-devcon-6-2022-logo-1664209175682.png',
          poap_badge_extra_data: {
            id: 'bcd5f002-1806-4289-8985-e8c9da34a4e6',
            created_at: '2022-09-27T15:31:00.820863Z',
            updated_at: '2022-10-15T22:43:51.321294Z',
            url: 'https://devcon.org/',
            start_date: '2022-10-11',
            end_date: '2022-10-14',
            expired: true,
            expiry_date: '2022-10-14',
            last_synced: '2022-10-15',
            event_id: 67357,
            image_url:
              'https://assets.poap.xyz/i-met-0xjoshuaeth-at-devcon-6-2022-logo-1664209175682.png',
          },
          created_at: '2022-09-27T15:31:00.829528Z',
          updated_at: '2022-10-28T00:06:27.929085Z',
          video: null,
          title: 'I met 0xjoshua.eth at Devcon 6',
          slug: 'i-met-0xjoshuaeth-at-devcon-6-2022',
          description:
            'This POAP proves that the bearer met 0xjoshua.eth at Devcon 6 and scanned their ENS card.',
          external_image_url: null,
          total_supply: 98,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0xE04885c3f1419C6E8495C33bDCf5F8387cd88846',
    bio: '',
    username: 'skydao.eth',
    ens_name: 'skydao.eth',
    github: '',
    twitter: 'dummy',
    website: 'https://dummy.com',
    credentials_count: 370,
  },
  {
    id: '5ac19001-cf6d-42c1-af62-37e7dc96137f',
    top_badges: [
      {
        badge_type: {
          id: '3a5867ed-cdad-40b7-bd2a-a3ed8030a35c',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/poap-community-call-2342-2022-logo-1666792519728.gif',
          poap_badge_extra_data: {
            id: '7a5beb86-f91e-458a-a97a-0b50b79c9a46',
            created_at: '2022-10-26T15:30:44.161090Z',
            updated_at: '2022-10-27T17:18:55.673593Z',
            url: 'https://poap.directory/',
            start_date: '2022-10-26',
            end_date: '2022-10-26',
            expired: false,
            expiry_date: '2022-11-01',
            last_synced: '2022-10-27',
            event_id: 79689,
            image_url:
              'https://assets.poap.xyz/poap-community-call-2342-2022-logo-1666792519728.gif',
          },
          created_at: '2022-10-26T15:30:44.169878Z',
          updated_at: '2022-10-28T00:02:34.277452Z',
          video: null,
          title: 'POAP Community Call #42',
          slug: 'poap-community-call-2342-2022',
          description:
            'Thank you for attending the 42nd POAP Community Call where we discuss the most significant news affecting POAP and its communities, including the POAP showcase, 3rd party innovations, and major news mentions from around the metaverse. This community call POAP required attendees to submit a transaction via the Revv.gg platform to dissuade POAP farming.\r\nPOAP created by diablo_verde',
          external_image_url: null,
          total_supply: 400,
        },
      },
      {
        badge_type: {
          id: 'da0cec2b-9618-4b9d-8587-120fad50ff92',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/i-met-justinlerouxeth-at-devcon-6-2022-logo-1664209215930.png',
          poap_badge_extra_data: {
            id: '17e1ed46-1d1b-4a7f-8efc-0fa775fc88ee',
            created_at: '2022-09-27T15:31:00.889604Z',
            updated_at: '2022-10-15T22:31:45.265411Z',
            url: 'https://devcon.org/',
            start_date: '2022-10-11',
            end_date: '2022-10-14',
            expired: true,
            expiry_date: '2022-10-14',
            last_synced: '2022-10-15',
            event_id: 67360,
            image_url:
              'https://assets.poap.xyz/i-met-justinlerouxeth-at-devcon-6-2022-logo-1664209215930.png',
          },
          created_at: '2022-09-27T15:31:00.906749Z',
          updated_at: '2022-10-28T00:04:01.921178Z',
          video: null,
          title: 'I met justinleroux.eth at Devcon 6',
          slug: 'i-met-justinlerouxeth-at-devcon-6-2022',
          description:
            'This POAP proves that the bearer met justinleroux.eth at Devcon 6 and scanned their ENS card.',
          external_image_url: null,
          total_supply: 17,
        },
      },
      {
        badge_type: {
          id: '6cea073e-c0e7-47a2-b22a-efbf280bddc2',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/i-met-hudsoneth-at-devcon-6-2022-logo-1665459689606.png',
          poap_badge_extra_data: {
            id: '6933309d-796b-4535-bf53-f50619da7a3a',
            created_at: '2022-10-11T15:30:45.186931Z',
            updated_at: '2022-10-15T19:15:42.176601Z',
            url: 'https://devcon.org/',
            start_date: '2022-10-11',
            end_date: '2022-10-14',
            expired: true,
            expiry_date: '2022-10-14',
            last_synced: '2022-10-15',
            event_id: 74422,
            image_url:
              'https://assets.poap.xyz/i-met-hudsoneth-at-devcon-6-2022-logo-1665459689606.png',
          },
          created_at: '2022-10-11T15:30:45.215844Z',
          updated_at: '2022-10-28T00:08:37.288562Z',
          video: null,
          title: 'I met hudson.eth at Devcon 6',
          slug: 'i-met-hudsoneth-at-devcon-6-2022',
          description:
            'This POAP proves that the bearer met hudson.eth at Devcon 6 and scanned their ENS card.',
          external_image_url: null,
          total_supply: 59,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0xB6d052d6F5921d52C1c14b69a02De04f840CeFCd',
    bio: '',
    username: 'wackerow.eth',
    ens_name: 'wackerow.eth',
    github: '',
    twitter: '',
    website: 'https://dummy.com',
    credentials_count: 387,
  },
  {
    id: 'b911be26-d2d0-4637-89dc-2e1c3200921c',
    top_badges: [
      {
        badge_type: {
          id: 'b02be22b-98c8-43e4-8bbc-6897a2956fde',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/enablers-of-reputation-gated-communities-season-0-ep-1-2022-logo-1664393779782.png',
          poap_badge_extra_data: {
            id: '6c317f75-f741-4534-8c87-d2f8c6a601d0',
            created_at: '2022-09-29T15:30:33.001440Z',
            updated_at: '2022-10-10T19:24:25.720290Z',
            url: 'https://app.orangeprotocol.io/campaigns',
            start_date: '2022-10-07',
            end_date: '2022-10-07',
            expired: true,
            expiry_date: '2022-10-09',
            last_synced: '2022-10-10',
            event_id: 70238,
            image_url:
              'https://assets.poap.xyz/enablers-of-reputation-gated-communities-season-0-ep-1-2022-logo-1664393779782.png',
          },
          created_at: '2022-09-29T15:30:33.010076Z',
          updated_at: '2022-10-28T00:09:02.455750Z',
          video: null,
          title: 'Enablers of Reputation-Gated Communities - Season 0 Ep 1',
          slug: 'enablers-of-reputation-gated-communities-season-0-ep-1-2022',
          description:
            'The first in a series of events that seeks to empower DAOs, project leads, and community members with the tools needed to use self-sovereign identity and reputation technologies and provision access to community channels with reputation NFTs',
          external_image_url: null,
          total_supply: 99,
        },
      },
      {
        badge_type: {
          id: '9055d6f4-2d98-4bbb-8056-d51a1c01656f',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/banklessdao-community-call-2373-premium-2022-logo-1665105707986.gif',
          poap_badge_extra_data: {
            id: '9c56febf-15d9-478e-a03e-39c796f41d6f',
            created_at: '2022-10-07T15:30:59.340139Z',
            updated_at: '2022-10-27T19:13:23.122994Z',
            url: '',
            start_date: '2022-10-07',
            end_date: '2022-10-07',
            expired: false,
            expiry_date: '2022-11-07',
            last_synced: '2022-10-27',
            event_id: 73073,
            image_url:
              'https://assets.poap.xyz/banklessdao-community-call-2373-premium-2022-logo-1665105707986.gif',
          },
          created_at: '2022-10-07T15:30:59.348360Z',
          updated_at: '2022-10-28T00:06:01.292082Z',
          video: null,
          title: 'BanklessDAO Community Call #73 PREMIUM',
          slug: 'banklessdao-community-call-2373-premium-2022',
          description:
            'Awarded for attending the BanklessDAO Community Call #73 on 10/7/2022\r\nArd By: DEVALEX',
          external_image_url: null,
          total_supply: 21,
        },
      },
      {
        badge_type: {
          id: '676483b7-b735-4e9f-8715-a05da38a572d',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/banklessdao-community-call-2373-2022-logo-1665092723188.png',
          poap_badge_extra_data: {
            id: 'db458c92-42d3-4265-b99a-02a6ccb0aa95',
            created_at: '2022-10-07T15:30:59.268617Z',
            updated_at: '2022-10-27T18:18:55.328956Z',
            url: '',
            start_date: '2022-10-07',
            end_date: '2022-10-07',
            expired: false,
            expiry_date: '2022-11-07',
            last_synced: '2022-10-27',
            event_id: 73032,
            image_url:
              'https://assets.poap.xyz/banklessdao-community-call-2373-2022-logo-1665092723188.png',
          },
          created_at: '2022-10-07T15:30:59.276553Z',
          updated_at: '2022-10-28T00:06:01.406577Z',
          video: null,
          title: 'BanklessDAO Community Call #73',
          slug: 'banklessdao-community-call-2373-2022',
          description:
            'Awarded for attending the BanklessDAO Community Call #73 on 10/7/2022\r\nArt By: DEVALEX',
          external_image_url: null,
          total_supply: 35,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0x1EC1CcEF3e1735bdA3F4BA698e8a524AA7c93274',
    bio: '',
    username: 'mantisclone.eth',
    ens_name: 'mantisclone.eth',
    github: '',
    twitter: '',
    website: '',
    credentials_count: 162,
  },
  {
    id: 'e0687fd3-160d-42bd-87ce-3f02fd7fbb9c',
    top_badges: [
      {
        badge_type: {
          id: '6f00c484-258f-473c-bc0b-ca36a172da5b',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/ethbogotc3a1-2022-2022-logo-1666290785384.png',
          poap_badge_extra_data: {
            id: '36c19db5-5f05-42c1-bd5c-9e3aec631bf7',
            created_at: '2022-10-21T15:30:43.613695Z',
            updated_at: '2022-10-27T18:30:28.445782Z',
            url: 'https://bogota.ethglobal.com',
            start_date: '2022-10-07',
            end_date: '2022-10-09',
            expired: false,
            expiry_date: '2022-11-30',
            last_synced: '2022-10-27',
            event_id: 77610,
            image_url:
              'https://assets.poap.xyz/ethbogotc3a1-2022-2022-logo-1666290785384.png',
          },
          created_at: '2022-10-21T15:30:43.620082Z',
          updated_at: '2022-10-28T00:04:32.807973Z',
          video: null,
          title: 'ETHBogotá 2022 Hacker',
          slug: 'ethbogotc3a1-2022-2022',
          description:
            "This POAP confirms that you were a Hacker at ETHGlobal's ETHBogotá hackathon on October 7-9th, 2022 in Bogotá 🇨🇴. Thank you for joining us and for building!\r\n\r\nETHBogotá was ETHGlobal's first hackathon at Devcon and united over 1400 people passionate about the future of Ethereum under one roof. As a result, it was the largest Ethereum Hackathon ever in LATAM!",
          external_image_url: null,
          total_supply: 422,
        },
      },
      {
        badge_type: {
          id: '5c06ee30-a240-4e88-af5c-89e58404e30d',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/i-demod-at-ethbogotc3a1-2022-2022-logo-1666291649536.png',
          poap_badge_extra_data: {
            id: '58d0df3c-d260-4b4f-953c-ea338a71dbdc',
            created_at: '2022-10-21T15:30:43.166367Z',
            updated_at: '2022-10-27T18:03:26.705330Z',
            url: 'https://bogota.ethglobal.com/',
            start_date: '2022-10-09',
            end_date: '2022-10-09',
            expired: false,
            expiry_date: '2022-11-30',
            last_synced: '2022-10-27',
            event_id: 77617,
            image_url:
              'https://assets.poap.xyz/i-demod-at-ethbogotc3a1-2022-2022-logo-1666291649536.png',
          },
          created_at: '2022-10-21T15:30:43.173901Z',
          updated_at: '2022-10-28T00:08:52.688056Z',
          video: null,
          title: "I Demo'd at ETHBogotá 2022",
          slug: 'i-demod-at-ethbogotc3a1-2022-2022',
          description:
            "This POAP confirms that you not only built a project but went on to demo your project live to the finalist judges at ETHGlobal's ETHBogotá hackathon on October 7-9th, 2022 in Bogotá 🇨🇴.\r\n\r\nETHBogotá was ETHGlobal's first hackathon at Devcon and united over 1400 people passionate about the future of Ethereum under one roof. As a result, it was the largest Ethereum Hackathon ever in LATAM!",
          external_image_url: null,
          total_supply: 311,
        },
      },
      {
        badge_type: {
          id: '605f42db-1fb6-4965-bb56-165d23e4c90c',
          issuer: {
            name: 'kudos',
          },
          image: 'https://images.mintkudos.xyz/token/2698.mp4',
          poap_badge_extra_data: null,
          created_at: '2022-10-20T13:38:26.284095Z',
          updated_at: '2022-10-28T00:02:29.824364Z',
          video: null,
          title: 'Alchemy University Early Access',
          slug: 'alchemy-university-early-access2698',
          description:
            "Get excited! This student pass provides you with early-access to Alchemy University's courses. You are on the fast track to earning your web3 degree!",
          external_image_url: 'https://images.mintkudos.xyz/token/2698.mp4',
          total_supply: 3320,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0xF1B64174Bc04780affD4b555C1c2EA4acb82ad07',
    bio: '',
    username: '0xF1B64174Bc04780affD4b555C1c2EA4acb82ad07',
    ens_name: '',
    github: '',
    twitter: 'dummy',
    website: '',
    credentials_count: 19,
  },
  {
    id: '954171b7-c08a-4f2b-8c57-fb1fb2fc2d3f',
    top_badges: [
      {
        badge_type: {
          id: '1d9ce68f-cf47-49a9-916e-61cb7b3ecd27',
          issuer: {
            name: 'sismo',
          },
          image:
            'https://sismo-prod-hub-static.s3.eu-west-1.amazonaws.com/badges/proof-of-attendance-main-events.svg',
          poap_badge_extra_data: null,
          created_at: '2022-10-04T15:13:44.600439Z',
          updated_at: '2022-10-28T00:04:21.962355Z',
          video: null,
          title: 'Proof of Attendance ZK Badge',
          slug: 'proof-of-attendance-zk-badge',
          description:
            'ZK Badge owned by Ethereum events attendees. This Badge proves their IRL attendance to at least one Ethereum event.',
          external_image_url:
            'https://sismo-prod-hub-static.s3.eu-west-1.amazonaws.com/badges/proof-of-attendance-main-events.svg',
          total_supply: 66,
        },
      },
      {
        badge_type: {
          id: 'b53ca739-a595-444b-aec8-cdf205940d62',
          issuer: {
            name: 'mazury',
          },
          image:
            'https://mazury-staging.s3.eu-central-1.amazonaws.com/badges/images/sismo_badge_owner.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUV5WL77G5SO2Y7UV%2F20221028%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20221028T104351Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ce8f3ccacdb0ff697b757aad65bf0e6b5d104daf28d4d9cbc4b2b41a8b2e9ba4',
          poap_badge_extra_data: null,
          created_at: '2022-09-22T12:41:30.500027Z',
          updated_at: '2022-10-28T00:06:15.804140Z',
          video:
            'https://mazury-staging.s3.eu-central-1.amazonaws.com/badges/videos/sismo_badge_owner.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUV5WL77G5SO2Y7UV%2F20221028%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20221028T104351Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=cf3e24580b465d6fa6ba5aabd716620aaf9606ec785b0a3d301a1618efbf2856',
          title: 'Sismo badge owner',
          slug: 'sismo_badge_owner',
          description: 'You own a Sismo badge',
          external_image_url: null,
          total_supply: 15704,
        },
      },
      {
        badge_type: {
          id: '20848715-4cbb-4d85-9777-bb51a6c133c4',
          issuer: {
            name: 'poap',
          },
          image:
            'https://assets.poap.xyz/youve-met-colfax-in-berlin-sep-22-2022-logo-1662833432228.png',
          poap_badge_extra_data: {
            id: '5df57545-669d-4ea2-ab3d-49ff5ea5bf55',
            created_at: '2022-09-11T15:30:49.956851Z',
            updated_at: '2022-10-13T17:06:19.945370Z',
            url: '',
            start_date: '2022-09-12',
            end_date: '2022-09-19',
            expired: true,
            expiry_date: '2022-10-12',
            last_synced: '2022-10-13',
            event_id: 64508,
            image_url:
              'https://assets.poap.xyz/youve-met-colfax-in-berlin-sep-22-2022-logo-1662833432228.png',
          },
          created_at: '2022-09-11T15:30:49.962501Z',
          updated_at: '2022-10-28T00:02:42.662674Z',
          video: null,
          title: "You've met Colfax in Berlin - Sep '22",
          slug: 'youve-met-colfax-in-berlin-sep-22-2022',
          description:
            'You met Colfax in Berlin in September 2022.  May you look back on the memory fondly.',
          external_image_url: null,
          total_supply: 115,
        },
      },
    ],
    avatar: '/default-avi.png',
    eth_address: '0xdc66cC593c838939dc52Aa692EEc8c348732c4C1',
    bio: '',
    username: '0xdc66cC593c838939dc52Aa692EEc8c348732c4C1',
    ens_name: '',
    github: 'dummy',
    twitter: '',
    website: '',
    credentials_count: 16,
  },
];
