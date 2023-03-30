import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';
import * as Accordion from '@radix-ui/react-accordion';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { Layout } from 'components';
import { axios } from 'lib/axios';
import { useUser } from 'providers/react-query-auth';
import { ListResponse, Project } from 'types';
import Link from 'next/link';
import { useAlert } from 'components/Alert.tsx';

const Dashboard = () => {
  const { dispatch } = useAlert({});
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const router = useRouter();
  const [showArchivedProjects, setShowArchivedProjects] = React.useState(false);

  const { isLoading, data } = useProjects({
    archived: showArchivedProjects,
    address: user?.eth_address,
  });

  const { mutate } = useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries(
        clsx('projects', user?.eth_address).split(' ')
      );
      router.push(`/projects/${data.id}`);
    },
    onError: (error: any) => {
      if (error?.response) {
        dispatch({ message: error.response.data[0], type: 'error' });
      }
    },
    mutationFn: createProject,
  });

  return (
    <Layout variant="plain">
      <div className="flex grow flex-col space-y-8 px-4 pt-4 lg:flex-row lg:px-0 xl:mx-[auto] xl:w-[1200px] xl:space-x-[40px] xl:space-y-0 xl:pt-10 xl:pb-[95px]">
        <div className="space-y-4 lg:grow">
          <div className="flex justify-between">
            <h1 className="font-demi text-4xl text-indigoGray-90">Dashboard</h1>
            <button
              type="button"
              aria-label="Create Project"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-indigoGray-90 text-indigoGray-5 transition-all xl:hover:bg-indigoGray-60 transition-all"
              onClick={() => mutate()}
            >
              <SVG height={24} width={24} src="/icons/plus.svg" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-3">
              <TabButton
                label="All projects"
                active={!showArchivedProjects}
                onClick={() => setShowArchivedProjects(false)}
              />
              <TabButton
                label="Archived projects"
                active={showArchivedProjects}
                onClick={() => setShowArchivedProjects(true)}
              />
            </div>

            <div>
              {isLoading ? (
                <p>Loading...</p>
              ) : !data?.count ? (
                <button
                  type="button"
                  onClick={() => mutate()}
                  className="flex w-full hover:bg-indigoGray-5 flex-col items-center space-y-2 rounded-md border border-[2px] border-dashed border-[#E2E6F0] px-8 py-6 font-sans lg:py-4 xl:w-[400px] xl:border-solid"
                >
                  <span className="text-black flex items-center font-sans text-lg font-medium">
                    <SVG src="/icons/plus.svg" className="mr-2" />
                    Create a project
                  </span>
                  <span className="px-10 text-sm text-indigoGray-50 xl:px-0">
                    Projects let you save users and publish opportunities
                  </span>
                </button>
              ) : (
                <ProjectGroupList projectGroup={data} />
              )}
            </div>
          </div>
        </div>

        <div className="h-fit shrink-0 space-y-[40px] font-sans xl:border-l xl:border-l-indigoGray-20 xl:py-6 xl:pl-10">
          <div className="ml-2 mt-4 space-y-2 border-l border-l-indigoGray-20 pl-4 xl:m-0 xl:max-w-[210px] xl:border-none xl:pl-0">
            <p className="font-semibold text-indigoGray-90">
              Recruiting with Mazury
            </p>
            <p className="text-sm">
              We can help you find the best talent using our database of
              verified talent ready for new projects
            </p>
            <a
              href="#"
              className="font-sm flex cursor-pointer font-semibold text-indigo-600 hover:bg-indigoGray-5 w-fit xl:px-2 xl:py-1 rounded-lg"
            >
              Contact us
            </a>
          </div>

          <div className="ml-2 mt-4 space-y-2 border-l border-l-indigoGray-20 pl-4 xl:m-0 xl:max-w-[210px] xl:border-none xl:pl-0">
            <p className="font-semibold text-indigoGray-90">
              Candidates open to new positions
            </p>
            <p className="text-sm">
              Use the Mazury Talent filter to find screened talent open to
              offers
            </p>
            <a
              href="#"
              className="font-sm flex cursor-pointer font-semibold text-indigo-600 hover:bg-indigoGray-5 w-fit xl:px-2 xl:py-1 rounded-lg"
            >
              Use the filter
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ProjectGroupList: React.FC<{ projectGroup: GetProjectsResponse }> = ({
  projectGroup,
}) => {
  return (
    <Accordion.Root
      className="AccordionRoot"
      type="single"
      defaultValue="project-group-1"
      collapsible
    >
      {projectGroup.results.map((category, index) => (
        <Accordion.Item
          key={category.month}
          value={`project-group-${index + 1}`}
        >
          <Accordion.Header className="mb-2">
            <Accordion.Trigger className="data-[state=open]:[&>svg]:text-red-200 font-sans font-medium text-xs text-indigoGray-40 flex items-center">
              <SVG
                src="/icons/chevron-down-black.svg"
                height={16}
                width={16}
                className="mr-2"
              />
              {dayjs(category.month).format('MMMM YYYY')}
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="flex flex-wrap">
            {category.projects.map((project) => (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className="overflow-hidden grow-0 rounded-lg xl:grow-0 shrink-0 xl:w-[calc(50%-16px)] bg-indigoGray-5 xl:odd:mr-4 mb-4"
              >
                <div className="space-y-1 p-6">
                  <p className="font-sans font-medium text-indigoGray-90">
                    {project.name}
                  </p>
                  <p className="text-xs font-sans text-[#646B8B]">
                    Created {dayjs(project.created_at).format('MMM DD YYYY')}
                  </p>
                </div>
                <div className="px-6 py-3 bg-indigoGray-10 border-t border-t-indigoGray-20 flex items-center justify-between">
                  {!project.saved_profiles_preview_count ? (
                    <p className="text-indigoGray-40 font-sans text-sm">
                      No users saved
                    </p>
                  ) : (
                    <div></div>
                  )}
                  <p className="font-sans text-[13px] text-indigoGray-90">
                    {project.saved_profiles_preview_count} candidate
                    {project.saved_profiles_preview_count !== 1 && 's'}
                  </p>
                </div>
              </Link>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

const TabButton = ({
  active,
  label,
  ...props
}: {
  active: boolean;
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    className={clsx(
      'rounded-md px-3 py-1 font-sans text-sm',
      active
        ? 'bg-indigoGray-90 font-semibold text-indigoGray-5'
        : 'bg-transparent font-medium text-indigoGray-90'
    )}
    {...props}
  >
    {label}
  </button>
);

export default Dashboard;

type GetProjectsResponse = ListResponse<{ month: string; projects: Project[] }>;

const createProject = async () => {
  const { data } = await axios.post<Project>(`/projects/`, {});
  return data;
};

const getProjects = async ({
  archived,
  nextPage,
}: {
  archived?: boolean;
  nextPage?: string;
}) => {
  const { data } = await axios.get<GetProjectsResponse>(
    nextPage || `/projects/?archived=${!!archived}`
  );
  return data;
};

export const useProjects = ({
  archived,
  address,
}: {
  archived?: boolean;
  address?: string;
}) => {
  const { data, ...rest } = useInfiniteQuery(
    clsx('projects', address, archived && 'archived').split(' '),
    ({ pageParam }) => getProjects({ archived, nextPage: pageParam }),
    { getNextPageParam: (lastPage) => lastPage.next, enabled: !!address }
  );

  const projects = data?.pages.reduce((prev, next) => {
    return {
      ...prev,
      ...next,
      results: [...(prev?.results || []), ...next.results],
    };
  }, {} as GetProjectsResponse);

  return { data: projects, ...rest };
};
