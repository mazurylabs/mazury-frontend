import * as React from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import SVG from 'react-inlinesvg';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

import { Toggle } from 'components/Toggle';

import { LoadingState } from './LoadingState';
import { BadgeFilter } from './BadgeFilter';
import { ReferralFilter } from './ReferralFilter';
import { RoleFilter } from './RoleFilter';
import { SkillFilter } from './SkillFilter';
import { InitialFilterState } from './InitialFilterState';
import { EmptyState } from './EmptyState';
import { SearchResults } from './SearchResults';

import { FilterState, FilterType, Profile, ValueOf } from 'types';
import { api, commify, fadeAnimation } from 'utils';
import { useIntersection } from 'hooks';

const filters = ['Badges', 'Roles', 'Referred skills'];

type ResultSteps = 'loading' | 'empty' | 'result';

export const ResultState = () => {
  // const initialMount = React.useRef(true);
  const [cursor, setCursor] = React.useState('');
  const loadMoreRef = React.useRef(null!);
  const shouldFetchMore = useIntersection(loadMoreRef.current, '50px');
  const router = useRouter();
  const [resultCount, setResultCount] = React.useState(0);
  const [searchResults, setSearchResults] = React.useState<Profile[]>([]);
  const [currentStep, setCurrentStep] = React.useState<ResultSteps>('loading');
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [selectedFilter, setSelectedFilter] =
    React.useState<FilterType>('empty');

  const [filter, setFilter] = React.useState<FilterState>({
    query: '',
    badges: [],
    skills: [],
    role: '',
    contactable: false,
  });

  const handleFilter = (
    key: keyof FilterState,
    value: ValueOf<FilterState>
  ) => {
    setFilter((filter) => {
      return { ...filter, [key]: value };
    });

    if (key !== 'query') {
      let params = router.query;
      router.push(
        {
          pathname: '/search',
          query: {
            ...params,
            [key]:
              key === 'role' || key === 'contactable'
                ? value
                : (value as any).join(';'),
          },
        },
        undefined,
        { shallow: true }
      );
    }

    handleSearch();
  };

  const handleSearch = React.useCallback(
    debounce(async () => {
      try {
        setSearchResults([]);
        setResultCount(0);
        setCurrentStep('loading');

        const path = router.asPath
          .split('&')
          .filter((query) => !query.endsWith('='))
          .join('&');

        let queryPath = path.includes('?') ? path : '?' + path;

        const decodedPath = decodeURIComponent(
          queryPath.replace('?', '/profiles?')
        );

        const result = await api.get(decodedPath);
        let nextCursor = result.data.next?.split('.com/')[1];

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
    }, 0),
    [router.query]
  );

  const handleSelectFilter = (filter: FilterType) => setSelectedFilter(filter);

  const resultStates = {
    loading: <LoadingState />,
    empty: <EmptyState />,
    result: <SearchResults result={searchResults} ref={loadMoreRef} />,
  };

  const selectedFilterState: Record<FilterType, JSX.Element> = {
    Roles: (
      <RoleFilter
        selectedRole={filter.role}
        handleSelect={handleFilter}
        handleGoBack={handleSelectFilter}
      />
    ),
    'Number of referrals': (
      <ReferralFilter
        selectedReferrals={[]}
        handleSelectReferral={() => {}}
        handleGoBack={handleSelectFilter}
      />
    ),
    'Referred skills': (
      <SkillFilter
        selectedSkills={filter.skills}
        handleSelectSkill={handleFilter}
        handleGoBack={handleSelectFilter}
      />
    ),
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
    Badges: (
      <BadgeFilter
        handleSelectBadge={handleFilter}
        handleGoBack={handleSelectFilter}
        selectedBadges={filter.badges}
      />
    ),
  };

  React.useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  React.useEffect(() => {
    const fetchMore = async () => {
      try {
        const result = await api.get(cursor);

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

        {/* <div>
          <ul>
            {filter.role && (
              <li>
                <button type="button" onClick={() => handleFilter('role', '')}>
                  <SVG height={16} width={16} src="/icons/x.svg" />
                </button>
                <span>{filter.role}</span>
              </li>
            )}

            <>
              {filter.badges.map((badge, index) => (
                <li key={index + badge}>{badge}</li>
              ))}
            </>

            <>
              {filter.skills.map((skill, index) => (
                <li key={index + skill}>{skill}</li>
              ))}
            </>

            {filter.contactable && <li>{filter.contactable}</li>}
          </ul>
        </div> */}

        <div className="ml-auto">
          <p className="font-sans text-base font-medium leading-6 text-indigoGray-50">
            {searchResults.length} result
            {searchResults.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            {...fadeAnimation}
            role="dialog"
            aria-modal={true}
            aria-expanded={isFiltersOpen}
            className="fixed top-0 right-0 z-10 flex h-screen w-screen items-end bg-[rgba(17,15,42,0.2)] md:flex md:items-center md:justify-center"
          >
            <AnimatePresence>
              {selectedFilterState[selectedFilter]}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden space-y-4 pl-6 lg:block">
        <div className="flex">
          <ul className="flex space-x-[52.47px]">
            {filters.map((filter) => (
              <li
                key={filter}
                className="relative flex cursor-pointer items-center space-x-2"
                onMouseEnter={() => handleSelectFilter(filter as FilterType)}
                onMouseLeave={() => handleSelectFilter('empty')}
              >
                <span className="font-sans text-sm font-bold leading-[21px] text-indigoGray-90">
                  {filter}
                </span>
                <SVG src="/icons/angle-down.svg" height={16} width={16} />

                <AnimatePresence>
                  {selectedFilter === filter && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={clsx(
                        'absolute top-[100%] left-0 z-10 !ml-[-24px] h-[400px] w-[500px] rounded-t-3xl bg-white shadow-3xl md:rounded-b-3xl',
                        selectedFilter === 'Number of referrals' &&
                          'h-[136px] w-[260px]'
                      )}
                    >
                      {selectedFilterState[selectedFilter]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="ml-auto">
            <p className="font-sans text-base font-medium leading-6 text-indigoGray-50">
              {commify(searchResults.length)} / {commify(resultCount)} result
              {resultCount === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <div
          className="flex w-fit items-center space-x-2 font-sans text-base font-bold leading-[21px] text-indigoGray-90"
          onClick={() => handleFilter('contactable', !filter.contactable)}
        >
          <Toggle
            isToggled={filter.contactable}
            onToggle={() => handleFilter('contactable', !filter.contactable)}
            className="flex h-fit"
          />
          <span>Contactable</span>
        </div>
      </div>

      <div className="flex grow flex-col">{resultStates[currentStep]}</div>
    </div>
  );
};
