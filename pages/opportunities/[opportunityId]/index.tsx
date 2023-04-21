import * as React from 'react';
import SVG from 'react-inlinesvg';
import { NextPageContext } from 'next';
import Link from 'next/link';
import * as Popover from '@radix-ui/react-popover';
import dayjs from 'dayjs';

import { Avatar, Button, Layout } from 'components';
import { capitalize, truncateString } from 'utils';
import { useUser } from 'providers/react-query-auth';
import { useMobile } from 'hooks';
import { CustomInput } from 'views/Opportunities/CustomInput';
import { useRouter } from 'next/router';
import { useAlert } from 'components/Alert.tsx';
import clsx from 'clsx';
import { EditStepsEnum } from './edit';
import { axios } from '@/lib/axios';
import { CompanyType, ListResponse, OpportunityType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Props {
  opportunityId: string;
}

type OpportunityWithCompany = OpportunityType<CompanyType> & {
  created_at: string;
};

interface Application {
  email: string;
  resume: File;
  website?: string;
  message?: string;
}

const Opportunity: React.FC<Props> = ({ opportunityId }) => {
  const router = useRouter();

  const { data } = useUser();
  const isMobile = useMobile(false);
  const { dispatch } = useAlert({});

  const { data: opportunity, isLoading } = useOpportunity({ opportunityId });

  if (!opportunity) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout
      variant="plain"
      showMobileSidebar={false}
      className="!px-4 lg:!px-0"
    >
      <div className="flex flex-col w-full lg:items-center pb-10 pt-6 lg:px-0 xl:pt-16">
        <div className="lg:w-[730px] xl:w-[1000px] space-y-6 lg:space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex space-x-3 items-center">
                <Link href={`/`} passHref>
                  <SVG src="/icons/chevron-left.svg" width={24} height={24} />
                  <span className="sr-only">back</span>
                </Link>
                <p className="font-sans font-medium text-2xl text-indigoGray-90">
                  {capitalize(
                    isMobile
                      ? truncateString(opportunity.title, 15)
                      : opportunity.title
                  )}
                </p>
              </div>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={opportunity.company_info.logo}
                    alt="company"
                    outerClassName="h-8 w-8"
                    className="border-[0.6px] border-indigoGray-30"
                  />
                  <p className="font-sans text-sm font-medium text-indigoGray-90">
                    {capitalize(opportunity.company_info.name)}
                  </p>
                </div>
                <p className="font-sans font-medium text-sm text-indigoGray-40 flex items-center">
                  <SVG src="/icons/time.svg" className="mr-1" />
                  {dayjs(opportunity.created_at).fromNow()}
                </p>
              </div>
            </div>

            {data?.is_recruiter ? (
              <RecruiterView
                handleViewApplicants={() =>
                  router.push(`/opportunities/${opportunityId}/applicants`)
                }
                handleEdit={() =>
                  router.push(`/opportunities/${opportunityId}/edit`)
                }
                handleUnpublish={() =>
                  dispatch({ type: 'notification', message: 'Unpublished' })
                }
              />
            ) : (
              <ApplicantView opportunityId={opportunityId} />
            )}
          </div>

          {data?.is_recruiter && (
            <Button
              size="medium"
              variant="secondary"
              className="lg:hidden w-full bg-transparent"
              onClick={() =>
                router.push(`/opportunities/${opportunityId}/applicants`)
              }
            >
              {/* See 3 candidates */}
              See candidates
              <SVG src="/icons/chevron-right.svg" className="h-4 w-4 ml-2" />
            </Button>
          )}

          <div className="xl:w-[700px] space-y-4 lg:space-y-6 font-sans text-sm font-medium text-indigoGray-90">
            <div className="space-y-4 p-4 border border border-indigoGray-20 rounded-lg">
              <div className="flex flex-col justify-between space-y-4 lg:flex-row lg:space-y-0">
                <div className="space-y-2">
                  <p className="text-indigoGray-40">Company name</p>
                  <div className="flex space-x-3">
                    <p>{opportunity.company_info.name}</p>
                    {data?.is_recruiter && (
                      <Link
                        href={`/opportunities/${opportunityId}/edit?company-id=${opportunity.company_info.id}`}
                        className=" text-indigo-600"
                      >
                        Edit company information
                      </Link>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-indigoGray-40">Link</p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={opportunity.website}
                    className="text-indigoGray-90 flex"
                  >
                    {truncateString(opportunity.website, 40)}
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row lg:space-y-0">
                <div className="space-y-2">
                  <p className="text-indigoGray-40">Location</p>
                  <p>
                    {opportunity.location} | {opportunity.work_mode}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-indigoGray-40">Company size</p>
                  <p>{opportunity.company_info.size} people work here</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-indigoGray-40">Compensation range</p>
                <p>{opportunity.salary}</p>
              </div>

              <div className="space-y-2">
                <p className="text-indigoGray-40">Company description</p>
                <p className="text-justify">
                  {opportunity.company_info.description}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-indigoGray-40">Description</p>
              <p className="text-justify">
                {capitalize(opportunity.description)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Opportunity;

interface RecruiterViewProps {
  handleEdit: () => void;
  handleUnpublish: () => void;
  handleViewApplicants: () => void;
}

const RecruiterView: React.FC<RecruiterViewProps> = ({
  handleEdit,
  handleUnpublish,
  handleViewApplicants,
}) => {
  const isMobile = useMobile();

  return (
    <Popover.Root>
      <div className="flex items-center space-x-4">
        <Popover.Trigger asChild className="relative">
          <button type="button" aria-label="comments">
            <SVG src="/icons/more.svg" className="mr-1" />
          </button>
        </Popover.Trigger>
        <Button
          onClick={handleViewApplicants}
          size="medium"
          className="hidden h-[37px] lg:flex"
        >
          {/* <SVG src="/icons/user.svg" className="mr-2 h-4 w-4" />0 applications */}
          <SVG src="/icons/user.svg" className="mr-2 h-4 w-4" />
          applications
        </Button>
      </div>

      <Popover.Portal>
        <Popover.Content
          align={isMobile ? 'end' : 'center'}
          sideOffset={10}
          className="h-[63px] w-[220px]"
        >
          <div className="flex flex-col p-[6.5px] space-y-[6.5px] items-start h-full w-full flex-col rounded-lg bg-white shadow-base font-sans text-sm text-indigoGray-90">
            <button
              type="button"
              className="pl-[30px] grow"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className="pl-[30px] grow"
              onClick={handleUnpublish}
            >
              Unpublish
            </button>
          </div>
          <Popover.Arrow fill="white" className="drop-shadow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const ApplicantView: React.FC<{ opportunityId: string }> = ({
  opportunityId,
}) => {
  const [application, setApplication] = React.useState<Application>();
  const isMobile = useMobile();

  const handleChange = (value: Partial<Application>) => {
    setApplication((prev) => ({ ...(prev || ({} as Application)), ...value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length !== 0) {
      handleChange({ resume: files[0] as File });
      event.target.value = '';
    }
  };

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: () => apply({ opportunityId, application }),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  return (
    <Popover.Root>
      <Popover.Trigger className="fixed left-0 bottom-0 py-2 lg:relative">
        <Button className="mx-4 lg:mx-0 mb-4 lg:mb-0 w-[calc(100vw-32px)] lg:w-[211px]">
          Apply
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align={isMobile ? 'center' : 'end'}
          alignOffset={-15}
          sideOffset={0}
          className={clsx(
            isSuccess &&
              'lg:rounded-lg lg:bg-white lg:shadow-base lg:border-[0.6px]'
          )}
        >
          {isSuccess ? (
            <div className="h-[calc(100vh-90px)] lg:h-fit max-w-[370px] flex items-center">
              <div className="rounded-lg bg-white shadow-base border-[0.6px] lg:rounded-none lg:bg-transparent lg:shadow-none lg:border-none">
                <div className="p-4 pb-0">
                  <div className="sticky top-0 flex justify-end">
                    <Popover.Close aria-label="Close">
                      <SVG src="/icons/x.svg" className="h-4 w-4" />
                    </Popover.Close>
                  </div>
                </div>

                <div className="font-sans font-medium space-y-2 px-8 py-10 flex flex-col items-center">
                  <SVG src="/icons/success.svg" className="h-[60px] w-[60px]" />
                  <p className="text-2xl text-indigoGray-90">
                    Application sent
                  </p>
                  <p className="text-indigoGray-60 text-sm text-center">
                    You will be contacted by the publisher of the post
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="before:bg-[rgba(255, 255, 255, 0.7)] h-[calc(100vh-90px)] flex flex-col justify-center lg:h-fit lg:block before:absolute before:top-0 before:left-0 before:h-full before:w-full before:opacity-50 backdrop-blur-[5px]">
              <div className="rounded-lg bg-white shadow-base border-red-200">
                <div className="p-4 pb-0">
                  <div className="sticky top-0 flex justify-end">
                    <Popover.Close aria-label="Close">
                      <SVG src="/icons/x.svg" className="h-4 w-4" />
                    </Popover.Close>
                  </div>

                  <p className="font-sans text-base font-medium text-indigoGray-90">
                    Apply
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col relative w-[calc(100vw-32px)] lg:h-[392px] lg:w-[460px] overflow-y-auto"
                >
                  <div className="space-y-4 mb-4 mt-4 px-4">
                    <CustomInput
                      label="Email"
                      placeholder="Insert email"
                      value={application?.email}
                      onChange={(value) => handleChange({ email: value })}
                    />

                    <div>
                      <p className="font-sans text-sm text-indigoGray-40">
                        Resume
                      </p>

                      <div className="h-[47px] w-full grow border rounded-lg border-indigoGray-20 px-4 py-3 flex items-center justify-between font-sans text-indigoGray-50 font-medium text-sm">
                        <p>{application?.resume?.name || 'Upload resume'}</p>

                        <label
                          className="text-xs font-sans font-medium text-violet-700 cursor-pointer"
                          htmlFor="resume"
                        >
                          Upload file
                        </label>

                        <input
                          id="resume"
                          accept=".pdf"
                          type="file"
                          onInput={handleFileUpload}
                          className="sr-only"
                        />
                      </div>
                    </div>
                    <CustomInput
                      label="Website"
                      placeholder="Insert website"
                      info="Own website, Twitter, discord or any other"
                      required={false}
                      value={application?.website}
                      onChange={(value) => handleChange({ website: value })}
                    />

                    <div className="space-y-1 grow min-h-[229px] flex flex-col">
                      <p className="font-sans text-sm text-indigoGray-40">
                        Message
                      </p>
                      <textarea
                        placeholder="Hi! I’m sending my application. Thanks for your time"
                        className="w-full border rounded-lg border-indigoGray-20 grow resize-none bg-transparent px-4 py-3 font-sans text-sm text-indigoGray-90"
                        value={application?.message}
                        onChange={(event) =>
                          handleChange({ message: event.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button
                    size="large"
                    className="rounded-t-none sticky w-full left-0 bottom-0"
                    type="submit"
                    loading={isLoading}
                    disabled={!application?.email || !application.resume}
                  >
                    Send request
                  </Button>
                </form>
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      opportunityId: context.query.opportunityId,
    },
  };
};

const getOpportunity = async (opportunityId: string) => {
  const { data } = await axios.get<OpportunityWithCompany>(
    `/opportunities/${opportunityId}/`
  );
  return data;
};

export const useOpportunity = ({
  opportunityId,
  onSuccess,
}: {
  opportunityId: string;
  onSuccess?: (data?: OpportunityWithCompany) => void;
}) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['opportunity', opportunityId],
    queryFn: async () => getOpportunity(opportunityId),
    enabled: !!opportunityId,
    initialData: () => {
      const cachedData = queryClient.getQueryData<
        ListResponse<OpportunityWithCompany>
      >(['opportunitities']);

      return cachedData?.results.find(
        (opportunity) => opportunityId === opportunity.id
      );
    },
    initialDataUpdatedAt: queryClient.getQueryState(['opportunitities'])
      ?.dataUpdatedAt,
    onSettled: (data) => onSuccess?.(data),
  });
};

const apply = async ({
  opportunityId,
  application,
}: {
  opportunityId: string;
  application?: Application;
}) => {
  const formData = new FormData();

  for (let key in application) {
    if (key === 'resume') {
      formData.append('resume', application.resume, application.email);
    } else {
      // @ts-ignore
      formData.append(key, application[key]);
    }
  }

  const { data } = await axios.post<Application>(
    `/opportunities/${opportunityId}/apply/`,
    formData
  );
  return data;
};
