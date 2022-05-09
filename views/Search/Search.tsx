import {
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  Pill,
  RoleCard,
  SearchIcon,
  TagItem,
} from 'components';
import { SearchInput } from 'components/SearchInput';
import { Toggle } from 'components/Toggle';
import { SearchContext, SearchStateType } from 'contexts/search';
import {
  useBadgesSearch,
  useCurrentBreakpoint,
  useDebounce,
  useProfileSearch,
  useReferralCount,
  useSkillsSearch,
} from 'hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  FC,
  KeyboardEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
  VFC,
} from 'react';
import { BadgeIssuer, FCWithClassName, Profile, Role } from 'types';
import {
  colors,
  getOffsetArray,
  getSkillsFromProfile,
  returnTruncatedIfEthAddress,
  toCapitalizedWord,
} from 'utils';

interface SearchProps {}

export const Search: FC<SearchProps> = ({}) => {
  const [searchState, setSearchState] = useState<SearchStateType>({
    searchQuery: '',
    touched: false,
    hasSearched: false,
    isContactableToggled: false,
    selectedBadgeSlugs: [],
    selectedRoles: [],
    selectedSkillSlugs: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { searchQuery, touched, hasSearched, isContactableToggled } =
    searchState;

  const setTouched = (touched: boolean) => {
    setSearchState((prevState) => ({ ...prevState, touched }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setSearchState((prevState) => ({ ...prevState, searchQuery }));
  };

  const setHasSearched = (hasSearched: boolean) => {
    setSearchState((prevState) => ({ ...prevState, hasSearched }));
  };

  const setIsContactableToggled = (isContactableToggled: boolean) => {
    setSearchState((prevState) => ({
      ...prevState,
      isContactableToggled,
    }));
  };

  const breakpoint = useCurrentBreakpoint();

  const queryEntered = searchQuery?.length > 0;

  // On smaller screens, we want to move the input to the top of the screen and hide everything else
  const shouldGoToTop = touched && (breakpoint === 'sm' || breakpoint === 'xs');

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setTouched(false);
    }
    if (e.key === 'Enter') {
      setHasSearched(true);
    }
  };

  const handleButtonClick = () => {
    if (queryEntered) {
      setHasSearched(true);
    }
  };

  useEffect(() => {
    if (!touched) {
      setSearchQuery('');
    }
  }, [touched]);

  useEffect(() => {
    // We are just making sure that whenever there is some input, `touched` is true
    if (searchQuery) {
      setTouched(true);
    }
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {/* Search input START */}
      <div
        role="input"
        className={`mt-8 flex items-center gap-2 rounded-xl bg-indigoGray-5 p-[14px] text-[14px] font-normal`}
        onFocus={() => setTouched(true)}
        onClick={() => {
          if (!touched) {
            setTouched(true);
          }
        }}
        onKeyUp={handleKeyPress}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {touched ? (
          <Image
            src="/icons/arrow-left.svg"
            width={24}
            height={24}
            alt="Go back icon"
            className="hover:cursor-pointer"
            onClick={() => setTouched(false)}
          />
        ) : (
          <SearchIcon
            className="hover:cursor-pointer"
            width="24px"
            height="24px"
            color={colors.indigoGray[90]}
          />
        )}

        <input
          className="h-[20px] w-3/4 bg-indigoGray-5 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
          placeholder={touched ? 'wojtek.eth, Frontend dev...' : ''}
        />

        {touched && (
          // next/Image doesn't let you apply ml-auto
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/icons/${
              queryEntered ? 'search-forward' : 'search-forward-inactive'
            }.svg`}
            width="24px"
            height="24px"
            alt="Search icon"
            style={{
              marginLeft: 'auto',
              cursor: queryEntered ? 'pointer' : 'default',
            }}
            onClick={handleButtonClick}
          />
        )}
      </div>
      {/* Search input END */}

      {touched && !queryEntered && (
        <>
          <div className="mt-5">
            <HistorySection />
          </div>
        </>
      )}

      {touched && queryEntered && !hasSearched && (
        <div className="mt-6 flex flex-col items-start">
          <HistorySectionItem>Frontend developer</HistorySectionItem>

          <SectionHeading className="mt-8">Keyword suggestions</SectionHeading>

          <div className="mt-1 flex flex-col gap-3">
            <KeywordSuggestion />
            <KeywordSuggestion />
            <KeywordSuggestion />
          </div>
        </div>
      )}

      {hasSearched && (
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <Dropdown label="Badges">
              <BadgesFilterView />
            </Dropdown>

            <Dropdown label="Roles">
              <RolesFilterView />
            </Dropdown>

            <Dropdown label="Referred skills">
              <ReferredSkillsFilterView />
            </Dropdown>

            <Dropdown label="Number of referrals">
              <NumberOfReferralsFilterView />
            </Dropdown>

            <div className="flex">
              <Toggle
                isToggled={isContactableToggled}
                onToggle={setIsContactableToggled}
                id="contactable-toggle"
              />
              <label
                htmlFor="contactable-toggle"
                className="ml-2 text-sm font-bold text-indigoGray-90"
              >
                Contactable
              </label>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 pb-4">
            {getOffsetArray(currentPage).map((offset) => (
              <SearchResultPage offset={offset} key={`search-page-${offset}`} />
            ))}
            <Button
              onClick={() => setCurrentPage((v) => v + 1)}
              className="mx-auto w-fit uppercase"
            >
              Load more
            </Button>
          </div>
        </div>
      )}
    </SearchContext.Provider>
  );
};

const HistorySection: VFC = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex">
        <Image
          src="/icons/history-alt.svg"
          width="16px"
          height="16px"
          alt="History icon"
        />
        <SectionHeading className="ml-2">Previous Search</SectionHeading>
      </div>
      <div className="mt-3 flex flex-col gap-6">
        <HistorySectionItem>React developer</HistorySectionItem>
        <HistorySectionItem>Python developer</HistorySectionItem>
        <HistorySectionItem>Full-stack developer</HistorySectionItem>
      </div>
      <HR className="mt-10 w-full" />
      <SectionHeading className="mt-8">Badge search suggestions</SectionHeading>
      <div className="mt-3 flex flex-col gap-4">
        <Badge name="Early Mazury adopter" imgSrc="/waves.png" />
        <Badge name="Early Mazury adopter" imgSrc="/waves.png" />
        <Badge name="Early Mazury adopter" imgSrc="/waves.png" />
      </div>
      <span
        role="link"
        className="mt-4 ml-12 text-xs font-medium text-indigo-600 hover:cursor-pointer"
      >
        See more badges
      </span>
    </div>
  );
};

const HistorySectionItem: FCWithClassName = ({ children, className }) => {
  return (
    <span
      role="listitem"
      className={`w-fit text-sm font-medium text-indigoGray-90 ${className}`}
    >
      {children}
    </span>
  );
};

const SectionHeading: FCWithClassName = ({ children, className }) => {
  return (
    <h3
      className={`text-xs font-medium uppercase text-indigoGray-50 ${className}`}
    >
      {children}
    </h3>
  );
};

const HR: FCWithClassName = ({ className }) => {
  return <hr className={`w-full border border-indigoGray-20 ${className}`} />;
};

const Badge: FCWithClassName<{ name: string; imgSrc: string }> = ({
  name,
  className,
  imgSrc,
}) => {
  return (
    <div className={`flex items-center px-2 ${className}`}>
      <div className="py-[11.5]">
        {/* Badges will be loaded from external sources */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="rounded-full border border-indigoGray-30"
          src={imgSrc}
          width="24px"
          height="24px"
          alt={`${name} badge`}
        />
      </div>

      <div className="ml-4 flex flex-col items-start">
        <span className="text-base font-semibold text-indigoGray-90">
          {name}
        </span>
        <span className="mt-[2px] text-left text-sm font-medium text-indigoGray-60">
          Search for people who voted on Aave
        </span>
      </div>
    </div>
  );
};

const SuggestionInnerText: FCWithClassName = ({ children, className }) => {
  return (
    <span
      className={`text-xs font-medium uppercase text-indigoGray-50 ${className}`}
    >
      {children}
    </span>
  );
};

const KeywordSuggestion: FCWithClassName = ({ className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <HistorySectionItem>React developer</HistorySectionItem>
      <div className="flex">
        <SuggestionInnerText>13 048 results</SuggestionInnerText>
      </div>
    </div>
  );
};

const BadgesFilterView: FCWithClassName = ({ className }) => {
  const [issuer, setIssuer] = useState<BadgeIssuer>('mazury');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const { searchState, setSearchState } = useContext(SearchContext);
  const { selectedBadgeSlugs } = searchState;

  const setSelectedBadgeSlugs = (slugs: string[]) => {
    setSearchState({
      ...searchState,
      selectedBadgeSlugs: slugs,
    });
  };

  const { badges, error: badgesError } = useBadgesSearch(
    debouncedQuery,
    issuer
  );

  const handleCheckClick = (checked: boolean, slug: string) => {
    if (checked) {
      setSelectedBadgeSlugs([...selectedBadgeSlugs, slug]);
    } else {
      setSelectedBadgeSlugs(selectedBadgeSlugs.filter((s) => s !== slug));
    }
  };

  return (
    <div className="flex max-h-[400px] w-[500px] flex-col overflow-y-scroll">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search badges"
      />

      <div className="mt-6 flex">
        <Pill
          label="Mazury Badges"
          color="fuchsia"
          onClick={() => setIssuer('mazury')}
          active={issuer === 'mazury'}
        />
        <Pill
          color="fuchsia"
          label="POAPs"
          className="ml-6"
          onClick={() => setIssuer('poap')}
          active={issuer === 'poap'}
        />
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {badges?.map((badge) => {
          return (
            <Checkbox
              key={badge.id}
              label={badge.title}
              checked={selectedBadgeSlugs.includes(badge.slug)}
              setChecked={(v) => handleCheckClick(v, badge.slug)}
              id={badge.id}
            />
          );
        })}
      </div>
    </div>
  );
};

const RolesFilterView: FCWithClassName = ({ className }) => {
  const { searchState, setSearchState } = useContext(SearchContext);
  const { selectedRoles } = searchState;

  const handleRoleClick = (role: Role) => {
    if (!selectedRoles.includes(role)) {
      setSearchState({
        ...searchState,
        selectedRoles: [...selectedRoles, role],
      });
    } else {
      setSearchState({
        ...searchState,
        selectedRoles: selectedRoles.filter((r) => r !== role),
      });
    }
  };

  return (
    <div className={`grid w-[500px] grid-cols-3 gap-3 ${className}`}>
      <RoleCard
        role="role_developer"
        iconSrc="/icons/roles/developer.svg"
        coloredSrc="/icons/roles/colored/developer.svg"
        onClick={() => handleRoleClick('role_developer')}
        selected={selectedRoles.includes('role_developer')}
        className="h-[118px]"
      />
      <RoleCard
        role="role_designer"
        iconSrc="/icons/roles/designer.svg"
        coloredSrc="/icons/roles/colored/designer.svg"
        onClick={() => handleRoleClick('role_designer')}
        selected={selectedRoles.includes('role_designer')}
        className="h-[118px]"
      />
      <RoleCard
        role="role_trader"
        iconSrc="/icons/roles/trader.svg"
        coloredSrc="/icons/roles/colored/trader.svg"
        onClick={() => handleRoleClick('role_trader')}
        selected={selectedRoles.includes('role_trader')}
        className="h-[118px]"
      />
      <RoleCard
        role="role_creator"
        iconSrc="/icons/roles/creator.svg"
        coloredSrc="/icons/roles/colored/creator.svg"
        onClick={() => handleRoleClick('role_creator')}
        selected={selectedRoles.includes('role_creator')}
        className="h-[118px]"
      />
      <RoleCard
        role="role_researcher"
        iconSrc="/icons/roles/researcher.svg"
        coloredSrc="/icons/roles/colored/researcher.svg"
        onClick={() => handleRoleClick('role_researcher')}
        selected={selectedRoles.includes('role_researcher')}
        className="h-[118px]"
      />
      <RoleCard
        role="role_investor"
        iconSrc="/icons/roles/investor.svg"
        coloredSrc="/icons/roles/colored/investor.svg"
        onClick={() => handleRoleClick('role_investor')}
        selected={selectedRoles.includes('role_investor')}
        className="h-[118px]"
      />
      <RoleCard
        role="role_community_manager"
        iconSrc="/icons/roles/community.svg"
        coloredSrc="/icons/roles/colored/community.svg"
        onClick={() => handleRoleClick('role_community_manager')}
        selected={selectedRoles.includes('role_community_manager')}
      />
    </div>
  );
};

const ReferredSkillsFilterView: FCWithClassName = ({ className }) => {
  const [query, setQuery] = useState('');
  const { skills } = useSkillsSearch(query);
  const { searchState, setSearchState } = useContext(SearchContext);
  const { selectedSkillSlugs } = searchState;

  const handleCheck = (slug: string) => {
    if (!selectedSkillSlugs.includes(slug)) {
      setSearchState({
        ...searchState,
        selectedSkillSlugs: [...selectedSkillSlugs, slug],
      });
    } else {
      setSearchState({
        ...searchState,
        selectedSkillSlugs: selectedSkillSlugs.filter((s) => s !== slug),
      });
    }
  };

  return (
    <div
      className={`flex max-h-[500px] w-[500px] flex-col overflow-y-scroll ${className}`}
    >
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search skills"
      />
      <div className="mt-6 flex flex-col gap-6 capitalize">
        {skills?.map((skill) => {
          return (
            <Checkbox
              key={`skill-${skill.slug}`}
              label={skill.name}
              checked={selectedSkillSlugs.includes(skill.slug)}
              setChecked={() => handleCheck(skill.slug)}
              id={`skill-${skill.slug}`}
            />
          );
        })}
      </div>
    </div>
  );
};

interface RangeOptionProps {
  starting: number;
  ending: number;
  quantity: number;
}

const RangeOption: FCWithClassName<RangeOptionProps> = ({
  className,
  starting,
  ending,
  quantity,
}) => {
  return (
    <div
      role="button"
      className={`font-regular flex w-fit rounded-[4px] border border-indigoGray-20 py-2 px-4 text-base ${className}`}
    >
      <span className="font-medium text-indigoGray-90">
        {starting} - {ending}
      </span>
      <span className="text-indigoGray-50">
        {` `}({quantity})
      </span>
    </div>
  );
};

const NumberOfReferralsFilterView: FCWithClassName = ({ className }) => {
  return (
    <div className={`grid w-[500px] grid-cols-2 gap-3 ${className}`}>
      <RangeOption starting={0} ending={10} quantity={10} />
      <RangeOption starting={0} ending={10} quantity={10} />
      <RangeOption starting={0} ending={10} quantity={10} />
      <RangeOption starting={0} ending={10} quantity={10} />
    </div>
  );
};

const SearchResultBadge: FCWithClassName<{
  iconSrc: string;
  label: string;
}> = ({ iconSrc, label, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={iconSrc} className="h-4 w-4" alt={label} />
      <span className="ml-2 text-xs font-bold text-indigoGray-90">{label}</span>
    </div>
  );
};

/**
 * SearchResult component
 */
interface SearchResultProps {
  profile: Partial<Profile>;
}

const SearchResult: FCWithClassName<SearchResultProps> = ({
  profile,
  className,
}) => {
  const router = useRouter();
  const skills = useMemo(() => getSkillsFromProfile(profile), [profile]);
  const { referralCount } = useReferralCount(profile?.eth_address as string);

  return (
    <div
      className="flex items-center rounded-2xl border border-indigoGray-20 p-4 hover:cursor-pointer"
      style={{
        boxShadow:
          '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
      }}
      role="link"
      onClick={() => router.push(`/people/${profile.username}`)}
    >
      <Avatar width="40px" height="40px" src={profile.avatar as string} />

      <div className="ml-3 flex flex-col">
        <span className="font-serif text-xl font-bold text-indigoGray-90">
          {profile.ens_name ||
            returnTruncatedIfEthAddress(profile.username as string)}
        </span>

        <span className="mt-1 text-xs font-medium text-indigoGray-50">
          {referralCount} referrals
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {skills?.slice(0, 2).map((skill) => {
          return (
            <TagItem
              color={colors.gray}
              label={toCapitalizedWord(skill)}
              showRemove={false}
              key={`profile-${profile.id}-skill-${skill}`}
            />
          );
        })}
      </div>

      {skills?.length > 2 && (
        <span className="ml-4 text-xs font-bold text-indigoGray-90">
          {skills?.length - 2} more
        </span>
      )}

      {/* TODO: Add vertical divider */}

      <div className="ml-5 flex items-center gap-4">
        {profile?.top_badges?.slice(0, 2).map((badge) => {
          return (
            <SearchResultBadge
              key={badge.id}
              label={badge.badge_type?.title}
              iconSrc={badge.badge_type?.image}
            />
          );
        })}
      </div>

      {profile?.top_badges?.length && profile?.top_badges?.length > 2 && (
        <span className="ml-4 text-xs font-bold text-indigoGray-90">
          {profile?.top_badges?.length - 2} more
        </span>
      )}
    </div>
  );
};

const SearchResultPage: FCWithClassName<{ offset: number }> = ({
  className,
  offset,
}) => {
  const { searchState } = useContext(SearchContext);
  const { selectedBadgeSlugs, selectedRoles, selectedSkillSlugs } = searchState;
  const { profiles, error: profilesError } = useProfileSearch(
    offset,
    selectedBadgeSlugs,
    selectedRoles,
    selectedSkillSlugs
  );

  if (!profilesError && !profiles) {
    return (
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
  }

  return (
    <>
      {profiles?.map((profile) => {
        return <SearchResult profile={profile} key={profile.id} />;
      })}
    </>
  );
};
