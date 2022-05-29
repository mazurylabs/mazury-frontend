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

import { FilterType } from 'types';
import { fadeAnimation } from 'utils';

const filters = ['Badges', 'Roles', 'Referred skills', 'Number of referrals'];

export const ResultState = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchFilters, setSearchFilters] = React.useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [isContactable, setIsContactable] = React.useState(false);
  const [selectedFilter, setSelectedFilter] =
    React.useState<FilterType>('empty');

  const queryFromRoute = 'Frontend developer'; //will be gotten from route

  const handleSearch = React.useCallback(
    debounce(async (nextValue) => {
      setIsLoading(false);
      // console.log(nextValue); //make api call
    }, 500),
    []
  );

  const handleAddFilter = (selectedFilter: string) => {
    setSearchFilters((filters) => {
      if (filters.includes(selectedFilter)) {
        return searchFilters.filter((filter) => filter !== selectedFilter);
      } else {
        return [...filters, selectedFilter];
      }
    });
  };

  const handleSelectFilter = (filter: FilterType) => setSelectedFilter(filter);
  const handleToggleContactable = () => {
    setIsContactable((isContactable) => !isContactable);
  };

  const selectedFilterState: Record<FilterType, JSX.Element> = {
    Roles: (
      <RoleFilter
        handleSelect={handleAddFilter}
        handleGoBack={handleSelectFilter}
      />
    ),
    'Number of referrals': <ReferralFilter handleSelect={handleAddFilter} />,
    'Referred skills': <SkillFilter handleSelect={handleAddFilter} />,
    empty: (
      <InitialFilterState
        handleFilterNavigation={handleSelectFilter}
        handleCloseModal={() => setIsFiltersOpen(false)}
        handleContactable={handleToggleContactable}
        isContactable={isContactable}
      />
    ),
    Badges: (
      <BadgeFilter
        handleSelectBadge={handleAddFilter}
        handleGoBack={handleSelectFilter}
        selectedBadges={searchFilters}
      />
    ),
  };

  React.useEffect(() => {
    handleSearch(queryFromRoute);
  }, [handleSearch, queryFromRoute]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full w-full">
      <div className="lg:hidden">
        <button
          type="button"
          className="flex items-center space-x-2"
          onClick={() => setIsFiltersOpen(true)}
        >
          <SVG src="/icons/filter.svg" height={16} width={16} />
          <span>FILTERS</span>
        </button>
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

      <div className="hidden lg:flex">
        <ul className="flex space-x-[52.47px] pl-6">
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
                      'absolute top-[100%] left-0 !ml-[-24px] h-[400px] w-[500px] rounded-t-3xl bg-white shadow-3xl md:rounded-b-3xl',
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

          <li
            className="flex items-center space-x-2 font-sans text-base font-bold leading-[21px] text-indigoGray-90"
            onClick={handleToggleContactable}
          >
            <Toggle
              isToggled={isContactable}
              onToggle={handleToggleContactable}
              className="flex h-fit"
            />
            <span>Contactable</span>
          </li>
        </ul>
      </div>

      <p>Hello result</p>
    </div>
  );
};
