import * as React from 'react';
import SVG from 'react-inlinesvg';
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';

import { Button, Checkbox, Pill } from 'components';

import {
  useBadgeTypes,
  useIntersection,
  useClickOutside,
  useScreenWidth,
} from 'hooks';

import {
  BadgeIssuer,
  BadgeType,
  FilterState,
  FilterType,
  ValueOf,
} from 'types';
import { commify, trayAnimation, fadeAnimation, truncateString } from 'utils';
import { axios } from 'lib/axios';

interface BadgeFilterProps {
  selectedBadges: string[];
  handleSelectBadge: (
    key: keyof FilterState,
    value: ValueOf<FilterState>
  ) => void;
  handleGoBack: (filter: FilterType) => void;
  handleApplyFilter: (key: keyof FilterState, reset?: boolean) => void;
  credentialName: string;
}

export const CredentialFilter = ({
  selectedBadges,
  handleSelectBadge,
  handleGoBack,
  handleApplyFilter,
  credentialName,
}: BadgeFilterProps) => {
  const isMounted = React.useRef(false);
  const containerRef = React.useRef(null!);
  const screenWidth = useScreenWidth();
  useClickOutside(containerRef, () => handleGoBack('empty'));

  const [badges, setBadges] = React.useState<BadgeType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cursor, setCursor] = React.useState('');

  // const { badgeTypes, nextBadgeType } = useBadgeTypes(badgeIssuer);
  const intersectionRef = React.useRef(null!);
  const shouldFetchBadge = useIntersection(intersectionRef.current, '50px');

  const variants =
    screenWidth > 768 ? {} : screenWidth <= 640 ? trayAnimation : fadeAnimation;

  const handleBadge = (slug: string) => {
    if (selectedBadges.includes(slug)) {
      const updatedBadges = selectedBadges.filter((badge) => badge !== slug);
      handleSelectBadge('badges', updatedBadges);
    } else {
      const updatedBadges = [...selectedBadges, slug];
      handleSelectBadge('badges', updatedBadges);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSearch = React.useCallback(
    debounce(async (nextValue) => {
      // const badgeTypesEndpoint = `badge_types?issuer=${badgeIssuer}`;
      const searchEndpoint = `search/badge-types/?query=${
        nextValue ? nextValue : ''
      }&issuer=${credentialName}`;

      const result = await axios.get(searchEndpoint);

      const nextCursor = result.data.next?.split('.com/')[1];

      if (cursor !== nextCursor || !isMounted.current) {
        setBadges(result?.data?.results);
        setCursor(nextCursor);
        isMounted.current = true;
      }
    }, 500),
    [cursor]
  );

  React.useEffect(() => {
    const getCredentials = async () => {
      const searchEndpoint = `search/badge-types/?query=&issuer=${credentialName}`;

      const result = await axios.get(searchEndpoint);

      const nextCursor = result.data.next?.split('.com/')[1];

      if (cursor !== nextCursor) {
        setBadges(result?.data?.results);
        setCursor(nextCursor);
      }
    };

    getCredentials();
  }, [credentialName]);

  React.useEffect(() => {
    const fetchMore = async () => {
      try {
        // let next =
        //   cursor || searchTerm ? cursor : 'nextBadgeType'?.split('.com/')[1];

        // const result = await axios.get(next);
        const result = await axios.get(cursor);

        const newCursor = result.data.next?.split('.com/')[1];

        if (cursor !== newCursor) {
          //only load add unique data
          let updatedResult = badges?.concat(result?.data?.results);
          setBadges(updatedResult);
          setCursor(newCursor);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (shouldFetchBadge) {
      fetchMore();
    }
  }, [shouldFetchBadge, credentialName]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex h-[604px] w-full flex-col rounded-t-3xl bg-white p-6 shadow-base md:h-[600px] md:w-[500px] md:rounded-3xl md:pb-2 lg:h-[400px]"
    >
      <div className="mb-6 lg:hidden">
        <button
          type="button"
          className="flex space-x-4"
          onClick={() => handleGoBack('empty')}
        >
          <div className="h-6 w-6">
            <SVG src="/icons/back.svg" height={24} width={24} />
          </div>
          <span className="font-sans text-xl font-medium leading-[30px] text-indigoGray-90">
            Credentials
          </span>
        </button>
      </div>

      <div className="mb-2">
        <form
          className="flex h-12 w-full items-center space-x-[18px] rounded-lg bg-indigoGray-5 py-2 pl-[14px] pr-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex h-6 w-6 space-x-4">
            <SVG height={24} width={24} src={`/icons/search-black.svg`} />
          </div>

          <div className="grow font-sans text-base font-medium">
            <input
              type="text"
              placeholder="Credential name"
              aria-label="Search"
              className="h-full w-full bg-transparent"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

      <div className="flex grow overflow-y-auto">
        <ul className="mt-7 grow space-y-5 overflow-x-hidden lg:mt-2">
          {badges?.map((badge) => (
            <li className="flex space-x-4" key={badge.id}>
              <Checkbox
                key={badge.id}
                label={
                  <div className="w-full font-sans">
                    <p className="flex w-full text-base font-medium text-indigoGray-90">
                      <span className="">
                        {truncateString(badge.title, 40)}
                      </span>
                      <span className="opacity-0" role="presentation">
                        i
                      </span>
                      {badge.total_supply && (
                        <span className="text-indigoGray-40">
                          ({commify(Number(badge.total_supply))})
                        </span>
                      )}
                    </p>

                    <p className="text-xs font-normal leading-[18px]">
                      {truncateString(badge.description, 50)}
                    </p>
                  </div>
                }
                checked={selectedBadges.includes(badge.slug)}
                setChecked={() => handleBadge(badge.slug)}
                id={badge.id}
                outerClassName="shrink-0"
              />
            </li>
          ))}

          <li
            className="h-[0.1px] w-full bg-transparent"
            ref={intersectionRef}
          />
        </ul>
      </div>

      <div className="ml-auto flex space-x-4 pt-2">
        <Button
          variant="secondary"
          onClick={() => handleApplyFilter('badges', true)}
          className="lg:py-0.5"
        >
          Reset
        </Button>
        <Button
          onClick={() => handleApplyFilter('badges')}
          className="lg:py-0.5"
        >
          Apply
        </Button>
      </div>
    </motion.div>
  );
};
