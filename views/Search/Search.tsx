import {
  Avatar,
  Checkbox,
  Dropdown,
  Pill,
  RoleCard,
  SearchIcon,
  TagItem,
} from 'components';
import { SearchInput } from 'components/SearchInput';
import { Toggle } from 'components/Toggle';
import { useCurrentBreakpoint } from 'hooks';
import Image from 'next/image';
import { FC, KeyboardEvent, useEffect, useState, VFC } from 'react';
import { FCWithClassName, Profile, Role } from 'types';
import { colors } from 'utils';
import { mockProfile } from 'utils/mock';

interface SearchProps {}

export const Search: FC<SearchProps> = ({}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // To track whether the user has pressed enter and 'searched' or not
  const [hasSearched, setHasSearched] = useState(false);

  // Here 'touched` means that the user has interacted with the input and that we should be showing results/suggestions
  const [touched, setTouched] = useState(false);
  const breakpoint = useCurrentBreakpoint();

  const queryEntered = searchQuery?.length > 0;

  // whether the contactable toggle is toggled
  const [isContactableToggled, setIsContactableToggled] = useState(false);

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
    <>
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

          <div className="mt-4 flex flex-col gap-4">
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
            <SearchResult profile={mockProfile} />
          </div>
        </div>
      )}
    </>
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
  const [query, setQuery] = useState('');

  return (
    <div className="flex w-[500px] flex-col">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search badges"
      />

      <div className="mt-6 flex">
        <Pill label="Mazury Badges" color="fuchsia" active />
        <Pill label="POAPs" className="ml-6" />
        <Pill label="Another category" className="ml-6" />
      </div>
    </div>
  );
};

const RolesFilterView: FCWithClassName = ({ className }) => {
  const [formData, setFormData] = useState({
    role_developer: false,
    role_designer: false,
    role_trader: false,
    role_creator: false,
    role_researcher: false,
    role_investor: false,
    role_community_manager: false,
  });

  const handleRoleClick = (role: Role) => {
    setFormData({
      ...formData,
      [role]: !formData[role],
    });
  };

  return (
    <div className={`grid w-[500px] grid-cols-3 gap-3 ${className}`}>
      <RoleCard
        role="role_developer"
        iconSrc="/icons/roles/developer.svg"
        coloredSrc="/icons/roles/colored/developer.svg"
        onClick={() => handleRoleClick('role_developer')}
        selected={formData.role_developer}
        className="h-[118px]"
      />
      <RoleCard
        role="role_designer"
        iconSrc="/icons/roles/designer.svg"
        coloredSrc="/icons/roles/colored/designer.svg"
        onClick={() => handleRoleClick('role_designer')}
        selected={formData.role_designer}
        className="h-[118px]"
      />
      <RoleCard
        role="role_trader"
        iconSrc="/icons/roles/trader.svg"
        coloredSrc="/icons/roles/colored/trader.svg"
        onClick={() => handleRoleClick('role_trader')}
        selected={formData.role_trader}
        className="h-[118px]"
      />
      <RoleCard
        role="role_creator"
        iconSrc="/icons/roles/creator.svg"
        coloredSrc="/icons/roles/colored/creator.svg"
        onClick={() => handleRoleClick('role_creator')}
        selected={formData.role_creator}
        className="h-[118px]"
      />
      <RoleCard
        role="role_researcher"
        iconSrc="/icons/roles/researcher.svg"
        coloredSrc="/icons/roles/colored/researcher.svg"
        onClick={() => handleRoleClick('role_researcher')}
        selected={formData.role_researcher}
        className="h-[118px]"
      />
      <RoleCard
        role="role_investor"
        iconSrc="/icons/roles/investor.svg"
        coloredSrc="/icons/roles/colored/investor.svg"
        onClick={() => handleRoleClick('role_investor')}
        selected={formData.role_investor}
        className="h-[118px]"
      />
      <RoleCard
        role="role_community_manager"
        iconSrc="/icons/roles/community.svg"
        coloredSrc="/icons/roles/colored/community.svg"
        onClick={() => handleRoleClick('role_community_manager')}
        selected={formData.role_community_manager}
      />
    </div>
  );
};

const ReferredSkillsFilterView: FCWithClassName = ({ className }) => {
  const [query, setQuery] = useState('');
  const [skills, setSkills] = useState({
    react: false,
    python: false,
    web3: false,
    javascript: false,
    nodejs: false,
    solidity: false,
  });

  const handleCheck = (key: string) => {
    setSkills({
      ...skills,
      // @ts-ignore for now
      [key]: !skills[key],
    });
  };

  return (
    <div className={`flex w-[500px] flex-col ${className}`}>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search skills"
      />
      <div className="mt-6 flex flex-col gap-6 capitalize">
        {Object.keys(skills).map((key) => {
          return (
            <Checkbox
              key={key}
              label={key}
              // @ts-ignore for now
              checked={skills[key]}
              setChecked={() => handleCheck(key)}
              id={key}
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
  return (
    <div
      className="flex items-center rounded-2xl border border-indigoGray-20 p-4"
      style={{
        boxShadow:
          '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Avatar width="40px" height="40px" src={profile.avatar as string} />

      <div className="ml-3 flex flex-col">
        <span className="font-serif text-xl font-bold text-indigoGray-90">
          {profile.username}
        </span>

        <span className="mt-1 text-xs font-medium text-indigoGray-50">
          43 referrals
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <TagItem color={colors.gray} label="Developer" showRemove={false} />
        <TagItem
          color={colors.gray}
          label="Content creator"
          showRemove={false}
        />
      </div>

      <span className="ml-4 text-xs font-bold text-indigoGray-90">2 more</span>

      {/* TODO: Add vertical divider */}

      <div className="ml-5 flex items-center gap-4">
        <SearchResultBadge label="Graph voter" iconSrc="/icons/command.svg" />
        <SearchResultBadge label="Graph voter" iconSrc="/icons/command.svg" />
      </div>

      <span className="ml-4 text-xs font-bold text-indigoGray-90">2 more</span>
    </div>
  );
};
