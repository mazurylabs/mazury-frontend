import * as React from 'react';
import SVG from 'react-inlinesvg';
import ScrollLock from 'react-scrolllock';
import debounce from 'lodash.debounce';

import { Checkbox, Pill } from 'components';

import { useBadgeTypes, useIntersection } from 'hooks';
import { BadgeIssuer, BadgeType } from 'types';
import { api, commify } from 'utils';

interface BadgeFilterProps {
  selectedBadges: string[];
  handleSelectBadge: (badge: string) => void;
}

export const BadgeFilter = ({
  selectedBadges,
  handleSelectBadge,
}: BadgeFilterProps) => {
  const [badgeIssuer, setBadgeIssuer] = React.useState<BadgeIssuer>('mazury');
  const [badges, setBadges] = React.useState<BadgeType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cursor, setCursor] = React.useState('');

  const { badgeTypes, nextBadgeType } = useBadgeTypes(badgeIssuer);
  const intersectionRef = React.useRef(null!);
  const shouldFetchBadge = useIntersection(intersectionRef.current, '50px');

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
      const searchEndpoint = `search/badge-types/?query=${nextValue}&issuer=${badgeIssuer}`;

      const result = await api.get(searchEndpoint);

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
    <div className="flex h-full w-full !cursor-default flex-col p-6">
      <div className="mb-6 lg:hidden">
        <button type="button" className="flex space-x-4">
          <SVG src="/icons/" height={24} width={24} />
          <span className="font-sans text-xl font-medium leading-[30px] text-indigoGray-90">
            Badges
          </span>
        </button>
      </div>

      <div>
        <form className="flex h-12 w-full items-center space-x-[18px] rounded-lg bg-indigoGray-5 py-2 pl-[14px] pr-2">
          <div className="flex space-x-4">
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

      <div className="mb-10">
        <ScrollLock>
          <ul className="mt-7 h-[222px] space-y-8 overflow-y-auto overflow-x-hidden">
            {badges?.map((badge) => (
              <li className="flex space-x-4">
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
        </ScrollLock>
      </div>
    </div>
  );
};
