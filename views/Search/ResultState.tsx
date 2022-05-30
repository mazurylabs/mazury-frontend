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

import { FilterState, FilterType, Profile, ValueOf } from 'types';
import { api, fadeAnimation } from 'utils';

const filters = ['Badges', 'Roles', 'Referred skills'];

interface ResultStateProps {
  handleNoResult: () => void;
}

export const ResultState = ({ handleNoResult }: ResultStateProps) => {
  const router = useRouter();
  const [searchResults, setSearchResults] = React.useState<Profile[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
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
        setIsLoading(true);
        const path = router.asPath
          .split('&')
          .filter((query) => !query.endsWith('='))
          .join('&');

        let queryPath = path.includes('?') ? path : '?' + path;
        const result = await api.get('/search/profiles' + queryPath);
        setSearchResults(result.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, 1000),
    [router.query]
  );

  const handleSelectFilter = (filter: FilterType) => setSelectedFilter(filter);

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
    <div className="h-full w-full">
      <div className="flex lg:hidden">
        <button
          type="button"
          className="flex items-center space-x-2"
          onClick={() => setIsFiltersOpen(true)}
        >
          <SVG src="/icons/filter.svg" height={16} width={16} />
          <span>FILTERS</span>
        </button>

        <div>
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
        </div>

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
                <span>{filter}</span>
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
              {searchResults.length} result
              {searchResults.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <div
          className="flex items-center space-x-2 font-sans text-base font-bold leading-[21px] text-indigoGray-90"
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

      <div className="mt-5">
        {isLoading ? <LoadingState /> : <p>Hello result</p>}
      </div>
    </div>
  );
};
