import * as React from 'react';
import SVG from 'react-inlinesvg';
import ScrollLock from 'react-scrolllock';
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';

import { Checkbox, Pill } from 'components';

import {
  useBadgeTypes,
  useIntersection,
  useClickOutside,
  useScreenWidth,
} from 'hooks';

import { BadgeIssuer, BadgeType, FilterType } from 'types';
import { api, commify, trayAnimation, fadeAnimation } from 'utils';

interface BadgeFilterProps {
  selectedBadges: string[];
  handleSelectBadge: (badge: string) => void;
  handleGoBack: (filter: FilterType) => void;
}

export const BadgeFilter = ({
  selectedBadges,
  handleSelectBadge,
  handleGoBack,
}: BadgeFilterProps) => {
  const containerRef = React.useRef(null!);
  const screenWidth = useScreenWidth();
  useClickOutside(containerRef, () => handleGoBack('empty'));

  const [badgeIssuer, setBadgeIssuer] = React.useState<BadgeIssuer>('mazury');
  const [badges, setBadges] = React.useState<BadgeType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cursor, setCursor] = React.useState('');

  const { badgeTypes, nextBadgeType } = useBadgeTypes(badgeIssuer);
  const intersectionRef = React.useRef(null!);
  const shouldFetchBadge = useIntersection(intersectionRef.current, '50px');

  const variants =
    screenWidth > 768 ? {} : screenWidth <= 640 ? trayAnimation : fadeAnimation;

  const handleBadgeIssuer = (issuer: 'mazury' | 'poap') => {
    setCursor('');
    setSearchTerm('');
    setBadges([]);
    setBadgeIssuer(issuer);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSearch = React.useCallback(
    debounce(async (nextValue) => {
      const badgeTypesEndpoint = `badge_types?issuer=${badgeIssuer}`;
      const searchEndpoint = `search/badge-types/?query=${nextValue}&issuer=${badgeIssuer}`;

      const result = await api.get(
        nextValue ? searchEndpoint : badgeTypesEndpoint
      );

      const nextCursor = result.data.next?.split('.com/')[1];

      if (cursor !== nextCursor) {
        setBadges(result?.data?.results);
        setCursor(nextCursor);
      }
    }, 500),
    [badgeIssuer, cursor]
  );

  React.useEffect(() => {
    setBadges(badgeTypes as BadgeType[]);
  }, [badgeTypes]);

  React.useEffect(() => {
    const fetchMore = async () => {
      try {
        let next =
          cursor || searchTerm ? cursor : nextBadgeType?.split('.com/')[1];

        const result = await api.get(next);

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
  }, [shouldFetchBadge, badgeIssuer]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex h-[604px] w-full !cursor-default flex-col rounded-3xl bg-white p-6 pb-10 shadow-base md:h-[600px] md:w-[500px] lg:h-[400px]"
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
            Badges
          </span>
        </button>
      </div>

      <div>
        <form className="flex h-12 w-full items-center space-x-[18px] rounded-lg bg-indigoGray-5 py-2 pl-[14px] pr-2">
          <div className="flex h-6 w-6 space-x-4">
            <SVG height={24} width={24} src={`/icons/search-black.svg`} />
          </div>

          <div className="grow font-sans text-base font-medium">
            <input
              type="text"
              placeholder="wojtek.eth, Frontend dev…"
              aria-label="Search"
              className="h-full w-full bg-transparent"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

      <div className="mt-6 flex space-x-[24px]">
        <Pill
          label="Mazury badges"
          active={badgeIssuer === 'mazury'}
          color="fuchsia"
          className="h-fit w-fit"
          onClick={() => handleBadgeIssuer('mazury')}
        />
        <Pill
          label="POAPs"
          active={badgeIssuer === 'poap'}
          color="fuchsia"
          className="h-fit w-fit"
          onClick={() => handleBadgeIssuer('poap')}
        />
      </div>

      <ScrollLock>
        <div className="flex overflow-y-auto">
          <ul className="mt-7 grow space-y-8 overflow-x-hidden">
            {badges?.map((badge, index) => (
              <li className="flex space-x-4" key={badge.id}>
                <Checkbox
                  key={badge.id}
                  label={
                    <div className="w-full font-sans">
                      <p className="flex w-full truncate text-base font-medium text-indigoGray-90">
                        <span className="max-w-[80%] truncate">
                          {badge.title}
                        </span>
                        <span className="opacity-0" role="presentation">
                          i
                        </span>
                        <span className="text-indigoGray-40">
                          ({commify(Number(badge.total_supply))})
                        </span>
                      </p>

                      <p className="text-xs font-normal leading-[18px]">
                        {badge.description}
                      </p>
                    </div>
                  }
                  checked={selectedBadges.includes(badge.slug)}
                  setChecked={() => handleSelectBadge(badge.slug)}
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
      </ScrollLock>
    </motion.div>
  );
};
