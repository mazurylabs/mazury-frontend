import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Avatar, Button, Layout } from 'components';
import { capitalize, truncateString } from 'utils';
import { useMobile } from 'hooks';
import { axios } from 'lib/axios';
import { CompanyType, ListResponse, OpportunityType } from 'types';

const Home = () => {
  const isMobile = useMobile();
  const router = useRouter();

  const { data, isLoading } = useOpportunities({ withId: false });

  return (
    <Layout variant="plain" className="!px-4 lg:!px-0">
      <div className="flex flex-col w-full lg:items-center pt-6 pb-4 lg:px-0 xl:pt-16">
        <div className="lg:w-[1000px] space-y-4">
          <h1 className="font-demi text-4xl text-indigoGray-90">
            Search for opportunities
          </h1>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <Button size="medium" className="max-w-[66px] max-h-[37px]">
                All <span>18</span>
              </Button>
              <Button
                size="large"
                className="max-w-[66px] font-medium max-h-[37px]"
                variant="tertiary"
              >
                Job <span className="text-indigoGray-40">18</span>
              </Button>
              <Button
                size="large"
                className="max-w-[66px] font-medium max-h-[37px]"
                variant="tertiary"
              >
                Other <span className="text-indigoGray-40">18</span>
              </Button>
            </div>

            <div className="p-2 pl-3 space-x-4 flex items-center rounded-lg bg-indigoGray-5">
              <SVG src="/icons/search.svg" className="h-6 w-6" />
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="grow bg-transparent"
              />
            </div>

            <div className="space-y-3">
              {data?.results.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="py-3 px-6 bg-indigoGray-5 space-y-3 rounded-lg"
                >
                  <div className="flex space-x-3">
                    <Avatar
                      src={opportunity.company_info.logo}
                      alt={opportunity.company_info.name}
                      variant="md"
                      className="h-10 w-10 rounded-lg"
                    />
                    <div className="space-y-1">
                      <p className="font-semibold font-sans text-sm text-indigoGray-90">
                        {opportunity.company_info.name}
                      </p>
                      <p className="font-sans text-sm text-indigoGray-90">
                        {truncateString(
                          opportunity.company_info.description,
                          isMobile ? 62 : 170
                        )}
                      </p>
                      <div className="flex items-center space-x-2">
                        <SVG src="/icons/user.svg" className="w-4 h-4" />
                        <p className="font-sans text-xs font-medium text-indigoGray-90">
                          {opportunity.company_info.size} people work here
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2 px-4 border border-indigoGray-20 rounded-md">
                    <div className=" font-sans font-medium flex items-center justify-between">
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
                    {/* <div className="h-[1px] w-full bg-indigoGray-20 my-3" /> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

const getOpportunitites = async (projectId?: string) => {
  const { data } = await axios.get<
    ListResponse<OpportunityType<CompanyType> & { created_at: string }>
  >(`/opportunities${projectId ? `/?project=${projectId}` : '/'}`);

  return data;
};

export const useOpportunities = ({
  projectId,
  onSuccess,
  withId = false,
}: {
  projectId?: string;
  onSuccess?: () => void;
  withId?: boolean;
}) => {
  return useQuery({
    queryKey: clsx('opportunitities', projectId).split(' '),
    queryFn: async () => getOpportunitites(projectId),
    enabled: withId ? !!projectId : true,
  });
};
