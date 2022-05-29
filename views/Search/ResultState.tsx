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

type FilterType =
  | 'Badges'
  | 'Roles'
  | 'Referred skills'
  | 'Number of referrals'
  | 'empty';

const filters = ['Badges', 'Roles', 'Referred skills', 'Number of referrals'];

export const ResultState = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchFilters, setSearchFilters] = React.useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] =
    React.useState<FilterType>('Badges');

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

  const selectedFilterState: Record<FilterType, JSX.Element> = {
    Roles: <RoleFilter handleSelect={handleAddFilter} />,
    'Number of referrals': <ReferralFilter handleSelect={handleAddFilter} />,
    'Referred skills': <ReferralFilter handleSelect={handleAddFilter} />,
    empty: <></>,
    Badges: (
      <BadgeFilter
        handleSelectBadge={handleAddFilter}
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
        <button type="button" className="flex space-x-2">
          <SVG src="" height={16} width={16} />
          <span>FILTERS</span>
        </button>
      </div>

      <div className="hidden space-x-[52.47px] lg:flex">
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
                      'absolute top-[100%] h-[400px] w-[500px] rounded-t-3xl bg-white shadow-3xl md:rounded-b-3xl',
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

        <Toggle isToggled={false} onToggle={() => {}} />
      </div>

      <p>Hello result</p>
    </div>
  );
};
