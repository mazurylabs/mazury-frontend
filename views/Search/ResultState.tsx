import * as React from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import SVG from 'react-inlinesvg';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

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
    setSelectedFilter((prevFilter) =>
      prevFilter === filter ? 'empty' : filter
    );
  };

  const resultStates = {
    loading: <LoadingState />,
    empty: <EmptyState />,
    result: <SearchResults result={searchResults} ref={ref} />,
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
    handleSearch(router.asPath);
  }, [handleSearch, router.query]);

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
          <p className="font-sans text-base font-medium leading-6 text-indigoGray-50">
            {commify(searchResults.length)} / {commify(resultCount)} result
            {resultCount === 1 ? '' : 's'}
          </p>
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
            <p className="font-sans text-base font-medium leading-6 text-indigoGray-50">
              {commify(searchResults.length)} / {commify(resultCount)} result
              {resultCount === 1 ? '' : 's'}
            </p>
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

      <div className="flex grow flex-col">{resultStates[currentStep]}</div>
    </div>
  );
};
