import * as React from 'react';
import SVG from 'react-inlinesvg';
import { NextPageContext } from 'next';
import Link from 'next/link';
import * as Popover from '@radix-ui/react-popover';
import dayjs from 'dayjs';

import { Avatar, Button, Layout } from 'components';
import {
  capitalize,
  matchCategorySlugToHumanName,
  truncateString,
} from 'utils';
import { useUser } from 'providers/react-query-auth';
import { useMobile } from 'hooks';
import { CustomInput } from 'views/Opportunities/CustomInput';
import { useRouter } from 'next/router';
import { useAlert } from 'components/Alert.tsx';
import clsx from 'clsx';
import { axios } from '@/lib/axios';
import { CompanyType, ListResponse, OpportunityType, Profile } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Filter, Search, opportunityTypes, tags } from '..';

interface Props {
  companyId: string;
}

interface CompanyOpportunity extends CompanyType {
  top_opportunities: Array<OpportunityType<string> & { created_at: string }>;
}

const Company: React.FC<Props> = ({ companyId }) => {
  const [search, setSearch] = React.useState('');
  const [jobType, setJobType] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);

  const { data: company, isLoading } = useCompany({
    companyId,
    search,
    categories: categories.join(','),
    jobTypes: jobType.join(','),
  });

  const { data } = useUser();
  const router = useRouter();

  return (
    <Layout
      variant="plain"
      showMobileSidebar={false}
      className="!px-4 lg:!px-0"
    >
      <div className="flex flex-col w-full lg:items-center pb-10 pt-6 lg:px-0">
        <div className="lg:w-[730px] xl:w-[1200px] space-y-6 lg:space-y-4">
          {isLoading && !company ? (
            <LoadingView />
          ) : (
            <CompanyView company={company as CompanyOpportunity} />
          )}

          <div className="space-y-4">
            <Search onApply={(value) => setSearch(value)} />

            <div className="flex space-x-8 px-3">
              <Filter
                label="Category"
                options={opportunityTypes}
                onApply={setCategories}
                orientation="vertical"
              />

              <Filter
                label="Type"
                options={tags}
                onApply={setJobType}
                orientation="horizontal"
              />
            </div>

            <div className="px-4 border border-indigoGray-20 rounded-md divide-y-[1px] flex flex-col">
              {company?.top_opportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className=" font-sans font-normal flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={clsx(
                        'py-[2px] px-2 rounded-[32px]',
                        opportunity.type === 'job'
                          ? 'bg-sky-600'
                          : 'bg-teal-600'
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
                          <SVG
                            src="/icons/location.svg"
                            className="h-4 w-4 mr-1"
                          />
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
                    onClick={() =>
                      router.push(`/opportunities/${opportunity.id}`)
                    }
                    className="max-h-[29px]"
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const LoadingView = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-5 w-[273px] animate-pulse rounded-2xl bg-indigoGray-30" />
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 animate-pulse rounded-full bg-indigoGray-30" />
            <div className="h-3 w-[147px] animate-pulse rounded-2xl bg-indigoGray-30" />
          </div>
        </div>
      </div>

      <div className="xl:w-[700px] space-y-4 lg:space-y-6 font-sans text-sm font-normal text-indigoGray-90">
        <div className="flex-col space-y-8 lg:space-y-0 p-4 border border border-indigoGray-20 rounded-lg flex flex lg:flex-row">
          <div className="grow space-y-8 lg:space-y-4">
            <div className="space-y-2">
              <div className="h-3 w-[212px] animate-pulse rounded-2xl bg-indigoGray-30" />
              <div className="h-3 w-[147px] animate-pulse rounded-2xl bg-indigoGray-30" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-[212px] animate-pulse rounded-2xl bg-indigoGray-30" />
              <div className="h-3 w-[147px] animate-pulse rounded-2xl bg-indigoGray-30" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-[212px] animate-pulse rounded-2xl bg-indigoGray-30" />
              <div className="h-3 w-[147px] animate-pulse rounded-2xl bg-indigoGray-30" />
            </div>
          </div>

          <div className="grow space-y-8 lg:space-y-4">
            <div className="space-y-2">
              <div className="h-3 w-[212px] animate-pulse rounded-2xl bg-indigoGray-30" />
              <div className="h-3 w-[147px] animate-pulse rounded-2xl bg-indigoGray-30" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-[212px] animate-pulse rounded-2xl bg-indigoGray-30" />
              <div className="h-3 w-[147px] animate-pulse rounded-2xl bg-indigoGray-30" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-sans font-normal text-sm text-indigoGray-40">
          Description
        </p>
        <div className="space-y-3">
          <div className="h-3 w-[90%] lg:w-[370px] animate-pulse rounded-2xl bg-indigoGray-30" />
          <div className="h-3 w-[85%] lg:w-[390px] animate-pulse rounded-2xl bg-indigoGray-30" />
          <div className="h-3 w-[90%] lg:w-[370px] animate-pulse rounded-2xl bg-indigoGray-30" />
          <div className="h-3 w-[85%] lg:w-[390px] animate-pulse rounded-2xl bg-indigoGray-30" />
          <div className="h-3 w-[90%] lg:w-[370px] animate-pulse rounded-2xl bg-indigoGray-30" />
          <div className="h-3 w-[85%] lg:w-[390px] animate-pulse rounded-2xl bg-indigoGray-30" />
          <div className="h-3 w-[90%] lg:w-[370px] animate-pulse rounded-2xl bg-indigoGray-30" />
          <div className="h-3 w-[85%] lg:w-[390px] animate-pulse rounded-2xl bg-indigoGray-30" />
        </div>
      </div>
    </>
  );
};

const CompanyView = ({ company }: { company: CompanyOpportunity }) => {
  const isMobile = useMobile(false);

  const categories = company.top_opportunities.reduce((prev, next) => {
    if (prev.includes(next.job_category)) {
      return prev;
    } else {
      return [...prev, next.job_category];
    }
  }, [] as string[]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex space-x-3 items-center">
            <Link href={`/`} passHref>
              <SVG src="/icons/chevron-left.svg" width={24} height={24} />
              <span className="sr-only">back</span>
            </Link>
            <p className="font-sans font-normal text-2xl text-indigoGray-90">
              {capitalize(
                isMobile ? truncateString(company.name, 15) : company.name
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="xl:w-[700px] space-y-4 lg:space-y-6 font-sans text-sm font-normal text-indigoGray-90">
        <div className="space-y-4 p-4 border border border-indigoGray-20 rounded-lg">
          <div className="flex flex-col justify-between space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
            <div className="space-y-2 lg:w-[calc(50%-8px)]">
              <p className="text-indigoGray-40">Company name</p>
              <div className="flex space-x-3">
                <p>{company.name}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
            <div className="space-y-2 lg:w-[calc(50%-8px)]">
              <p className="text-indigoGray-40">Company size</p>
              <p>{company.size} people work here</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-indigoGray-40">Company description</p>
            <p className="text-justify">{company.description}</p>
          </div>
          <div className="space-y-2">
            <p className="text-indigoGray-40">Categories of opportunities</p>
            <div className="flex flex-col lg:flex-row space-y-1 lg:items-center flex-wrap lg:space-x-2 lg:space-y-0">
              {categories.map((category) => (
                <span
                  key={category}
                  className="text-justify font-normal text-indigo-400 py-1 px-2 border border-indigo-300 rounded-lg max-w-max"
                >
                  {matchCategorySlugToHumanName(category)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const getCompany = async ({
  companyId,
  categories,
  search,
  jobTypes,
}: {
  companyId: string;
  categories: string;
  search: string;
  jobTypes: string;
}) => {
  const { data } = await axios.get<CompanyOpportunity>(
    `/companies/${companyId}?${
      search ? `search=${search}${categories || jobTypes ? '&' : ''}` : ''
    }${categories ? `categories=${categories}${jobTypes ? '&' : ''}` : ''}${
      jobTypes ? `job_types=${jobTypes}` : ''
    }`
  );
  return data;
};

export const useCompany = ({
  companyId,
  onSuccess,
  search,
  categories,
  jobTypes,
}: {
  companyId: string;
  onSuccess?: (data?: CompanyOpportunity) => void;
  search: string;
  categories: string;
  jobTypes: string;
}) => {
  return useQuery({
    queryKey: clsx('company', companyId, categories, search, jobTypes).split(
      ' '
    ),
    queryFn: async () =>
      getCompany({ companyId, search, categories, jobTypes }),
    enabled: !!companyId,
    onSettled: (data) => onSuccess?.(data),
  });
};

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      companyId: context.query.companyId,
    },
  };
};

export default Company;
