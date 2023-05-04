import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import * as Popover from '@radix-ui/react-popover';

import { Avatar, Button, Checkbox, Layout } from 'components';
import { capitalize, truncateString } from 'utils';
import { useClickOutside, useMobile } from 'hooks';
import { axios } from 'lib/axios';
import { CompanyType, ListResponse, OpportunityType } from 'types';

const opportunityTypes = [
  'Backend Developer',
  'Frontend Developer',
  'Fullstack Developer',
  'Marketing',
  'Design',
  'Product',
  'Community',
  'Business',
  'Other',
];

const tags = ['Job', 'Other'];

const searchSuggestions = opportunityTypes;

const Home = () => {
  const containerRef = React.useRef(null!);

  const [search, setSearch] = React.useState('');
  const [tag, setTag] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);

  const { data, isLoading } = useCompanies({
    search,
    categories: categories.join(','),
  });

  return (
    <Layout variant="plain" className="!px-4 lg:!px-0">
      <div
        className="flex grow w-full lg:justify-center pt-6 pb-4 lg:px-0"
        ref={containerRef}
      >
        <div className="w-full xl:w-[1200px] space-y-4">
          <h1 className="font-demi text-4xl text-indigoGray-90">
            Search for opportunities
          </h1>
          <div className="space-y-4">
            <Search ref={containerRef} onApply={(value) => setSearch(value)} />

            <div className="flex space-x-8 px-3">
              <Filter
                label="Opportunity type"
                options={opportunityTypes}
                onApply={setCategories}
              />

              <Filter label="Tags" options={tags} onApply={setTag} />
            </div>

            <div className="space-y-8">
              {data?.results.map((company) => (
                <Company key={company.id} company={company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

interface SearchProps {
  onApply: (query: string) => void;
}

const Search = React.forwardRef<HTMLDivElement, SearchProps>(
  ({ onApply }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [focused, setFocused] = React.useState(false);

    // useClickOutside(ref as any, () => setFocused(false));

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onApply(searchTerm);
    };

    return (
      <div
        className={clsx(
          'rounded-tl-lg rounded-tr-lg relative bg-indigoGray-5 shadow-base z-30',
          !focused && 'rounded-bl-lg rounded-br-lg'
        )}
      >
        <form onSubmit={handleSubmit} className="flex p-2 px-3">
          <div className="grow space-x-4 flex items-center">
            <SVG
              src="/icons/search.svg"
              className="h-6 w-6 text-indigoGray-90"
            />
            <input
              type="text"
              placeholder="Search"
              aria-label="Search"
              className="grow bg-transparent"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>

          <div className="h-8 w-8">
            {focused && (
              <button type="submit" className="border-none !p-0">
                <SVG
                  height={32}
                  width={32}
                  src={`/icons/search-forward${
                    searchTerm ? '' : '-inactive'
                  }.svg`}
                />
                <span className="sr-only">Submit</span>
              </button>
            )}
          </div>
        </form>

        <ul
          className={clsx(
            'w-full shadow-base h-fit xl:pl-[52px] space-y-3 py-4 absolute top-[100%] left-0 bg-indigoGray-5 rounded-bl-lg rounded-br-lg transition-all',
            focused ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          {searchSuggestions.map((item) => (
            <li
              key={`suggestion-${item}`}
              className="font-normal text-indigoGray-90"
              onClick={() => setSearchTerm(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

interface FilterProps {
  label: string;
  options: string[];
  onApply: (options: string[]) => void;
}

const Filter = ({ label, options, onApply }: FilterProps) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const handleSelect = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
    } else {
      setSelectedOptions((prevOptions) => [...prevOptions, value]);
    }
  };
  return (
    <Popover.Root>
      <Popover.Trigger className="text-indigoGray-90 font-normal text-sm flex items-center space-x-1">
        <p>{label}</p>
        <SVG src="/icons/angle-down.svg" className="h-4 w-4" />
      </Popover.Trigger>

      <Popover.Portal className="z-30">
        <Popover.Content
          align="start"
          alignOffset={-25}
          sideOffset={8}
          className="rounded-lg bg-white shadow-base border border-indigoGray-20"
        >
          <div className="h-fit w-[350px] p-6">
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-4 py-1">
                  <Checkbox
                    id={option}
                    checked={selectedOptions.includes(option)}
                    label={option}
                    setChecked={() => handleSelect(option)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end w-full mt-20">
              <Button
                size="small"
                onClick={() => onApply(selectedOptions)}
                disabled={!selectedOptions.length}
              >
                Apply
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

// type Opportunity = OpportunityType<CompanyType> & {
//   created_at: string;
// };

interface CompanyOpportunities extends CompanyType {
  top_opportunities: Array<OpportunityType<string> & { created_at: string }>;
}

const Company = ({ company }: { company: CompanyOpportunities }) => {
  const isMobile = useMobile();
  const router = useRouter();
  return (
    <div className="py-3 px-6 bg-indigoGray-5 hover:bg-indigoGray-10 space-y-3 rounded-lg">
      <div className="flex space-x-3">
        <Avatar
          src={company.logo}
          alt={company.name}
          variant="md"
          className="h-10 w-10 rounded-lg"
        />
        <div className="space-y-1">
          <p className="font-medium font-sans text-sm text-indigoGray-90">
            {company.name}
          </p>
          <p className="font-sans text-sm text-indigoGray-90 font-light">
            {truncateString(company.description, isMobile ? 62 : 160)}
          </p>
          <div className="flex items-center space-x-2 bg-indigoGray-10 max-w-max px-2 py-0.5 rounded-3xl">
            <SVG src="/icons/user.svg" className="w-4 h-4" />
            <p className="font-sans text-xs font-normal text-indigoGray-90">
              {company.size} people work here
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 border border-indigoGray-20 rounded-md divide-y-[1px]">
        {company.top_opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className=" font-sans font-normal flex items-center justify-between py-2"
          >
            <div className="flex items-center space-x-4">
              <div
                className={clsx(
                  'py-[2px] px-2 rounded-[32px]',
                  opportunity.type === 'job' ? 'bg-sky-600' : 'bg-teal-600'
                )}
              >
                <p className="text-indigoGray-5 text-xs">
                  {capitalize(opportunity.type)}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-indigoGray-90">
                  {opportunity.title}
                </p>
                <div className="flex items-center space-x-4 text-xs text-indigoGray-40">
                  <p className="flex items-center">
                    <SVG src="/icons/location.svg" className="h-4 w-4 mr-1" />
                    {opportunity.location}
                  </p>

                  <p>{opportunity.work_mode}</p>

                  <p className="flex items-center">
                    <SVG
                      src="/icons/history-alt.svg"
                      className="h-4 w-4 mr-1"
                    />
                    {dayjs(opportunity.created_at).fromNow()}
                  </p>

                  <p>{opportunity.salary}</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => router.push(`/opportunities/${opportunity.id}`)}
              className="max-h-[29px]"
            >
              Apply
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const getCompanies = async ({
  categories,
  search,
}: {
  categories: string;
  search: string;
}) => {
  const { data } = await axios.get<ListResponse<CompanyOpportunities>>(
    `/companies?${search ? `search=${search}${categories ? '&' : ''}` : ''}${
      categories ? `categories=${categories}` : ''
    }`
  );
  return data;
};

export const useCompanies = ({
  categories,
  search,
}: {
  categories: string;
  search: string;
}) => {
  return useQuery({
    queryKey: clsx('companies', categories, search).split(' '),
    queryFn: async () => getCompanies({ categories, search }),
  });
};
