import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';
import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { Avatar, Layout, Table } from 'components';
import { useClickOutside, useMobile } from 'hooks';
import { capitalize, truncateString } from 'utils';
import { Project, ProjectProfile } from 'types';
import { axios } from 'lib/axios';
import { useAlert } from 'components/Alert.tsx';
import { useUser } from 'providers/react-query-auth';
import { LinkIcon, Notes, Opportunity, StatusTags } from 'views/Opportunities';
import { useOpportunity } from '@/pages/opportunities/[opportunityId]';

type ProjectTableRows = ProjectProfile & {
  socials?: string;
};

interface ProfileProps {
  projectId: string;
}

const Project = ({ projectId }: ProfileProps) => {
  const { data: user } = useUser();
  const router = useRouter();
  const [projectTitle, setProjectTitle] = React.useState('Untitled project');
  const [opportunityId, setOpportunityId] = React.useState<string>('');
  const prevTitle = React.useRef<string>(projectTitle);
  const { dispatch } = useAlert({});

  const { data, isLoading } = useQuery({
    queryKey: ['profile', projectId],
    queryFn: async () => getProjectProfiles(projectId),
    enabled: !!projectId,
    onSuccess: (data) => {
      setProjectTitle(data.project.name);
      setOpportunityId(data.project.opportunity_id);
      prevTitle.current = data.project.name;
    },
  });

  const { data: opportunity } = useOpportunity({ opportunityId });

  return (
    <Layout variant="plain">
      <div className="flex flex-col space-y-4 px-4 pt-4 lg:px-0 xl:mx-[auto] h-screen xl:w-[1200px] xl:pt-6 xl:pb-[95px]">
        <ProjectHeader
          value={projectTitle}
          onChange={(value) => setProjectTitle(value)}
          projectId={projectId}
          profileId={user?.eth_address}
          ref={prevTitle}
        />

        {opportunity ? (
          <Opportunity
            key={opportunity.id}
            title={opportunity.title}
            companyName={opportunity.company_info.name}
            location={opportunity.location}
            salary={opportunity.salary}
            logo={opportunity.company_info.logo}
            opportunityUrl={`/opportunities/${opportunity.id}`}
            candidatesUrl={`/opportunities/${opportunity.id}/candidates`}
            applicants_count={opportunity.applicants_count}
          />
        ) : (
          <Link
            href={`/projects/${projectId}/create-opportunity`}
            passHref
            className="flex w-full hover:bg-indigoGray-5 flex-col items-center rounded-md border border-[2px] border-dashed border-[#E2E6F0] px-2 py-6 font-sans"
          >
            <span className="text-black flex items-center font-sans text-lg font-medium">
              <SVG src="/icons/plus.svg" className="mr-2" />
              Publish to Mazury Opportunities
            </span>
            <span className="whitespace-nowrap px-10 text-sm text-indigoGray-50 xl:px-0">
              Make your project seen by the best web3 talent
            </span>
          </Link>
        )}

        <div className="grow flex flex-col">
          <Table<ProjectTableRows>
            emptyState={{
              description: 'You haven’t added any users',
              link: {
                label: 'Dicover web3 talent',
                url: `/search`,
              },
            }}
            isLoading={isLoading}
            rows={data?.profiles.map((profile) => ({
              ...profile,
              onClick: () => router.push(`/people/${profile.eth_address}`),
            }))}
            columns={[
              {
                title: 'Name',
                field: 'username',
                width: 30,
                withSorting: true,
                Cell: ({ entry: { username, avatar, title } }) => (
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={avatar}
                      alt={username}
                      className="border border-[1.5px] border-indigoGray-30"
                    />

                    <div>
                      <p className="font-sans text-sm font-medium text-indigoGray-90">
                        {capitalize(username)}
                      </p>
                      {title && (
                        <p className="font-sans text-[13px] text-indigoGray-40">
                          {capitalize(title)}
                        </p>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                title: 'Status',
                withSorting: true,
                field: 'status',
                Cell: ({ entry }) => <StatusTags status={entry.status} />,
              },
              {
                title: 'Location',
                withSorting: true,
                field: 'location',
                Cell: ({ entry }) => <>{capitalize(entry.location || 'N/A')}</>,
              },
              {
                title: 'Socials',
                field: 'socials',
                Cell: ({ entry: { twitter, lens_handle, github } }) => (
                  <div className="flex items-center space-x-2">
                    {twitter && (
                      <LinkIcon
                        url={`http://twitter.com/${twitter}`}
                        icon="/icons/twitter-black.svg"
                      />
                    )}

                    {lens_handle && (
                      <LinkIcon
                        url={`https://lenster.xyz/u/${lens_handle}`}
                        icon={'/icons/lens.svg'}
                      />
                    )}

                    {github && (
                      <LinkIcon
                        url={`https://github.com/${github}`}
                        icon="/icons/github-black.svg"
                      />
                    )}
                  </div>
                ),
              },
              {
                title: 'Number of followers',
                field: 'followers',
              },
              {
                title: 'Comments',
                field: 'comments',
                align: 'right',
                Cell: ({ entry: { comments } }) => (
                  <Notes comments={comments || '0'} />
                ),
              },
            ]}
          />
        </div>
      </div>
    </Layout>
  );
};

interface ProjectHeaderProps {
  value: string;
  onChange: (value: string) => void;
  projectId: string;
  profileId?: string;
}

const ProjectHeader = React.forwardRef<string, ProjectHeaderProps>(
  ({ value, onChange, projectId, profileId }, ref) => {
    const isMobile = useMobile();
    const [focusInput, setFocusInput] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null!);
    const { dispatch } = useAlert({});
    const queryClient = useQueryClient();

    useClickOutside(inputRef, () => handleRename());

    const { mutate } = useMutation({
      onMutate: () => setFocusInput(false),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['projects', profileId]);
        variables.archived &&
          dispatch({ type: 'success', message: 'Project has been archived' });
      },
      onError: (error: any) => {
        if (error?.response) {
          dispatch({ message: error.response.data.detail, type: 'error' });
        }
      },
      mutationFn: updateProject,
    });

    const handleView = () => {
      setFocusInput(true);
      inputRef.current.focus();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isMobile && event.target.value.length < 70) {
        event.target.setAttribute('size', `${event.target.value.length + 1}`);
      }

      onChange(event.target.value);
    };

    const handleRename = () => {
      setFocusInput(false);
      if (!value) {
        onChange((ref as React.MutableRefObject<string>).current);

        return;
      }
      mutate({ name: value, projectId });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleRename();
    };

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href={'/projects'}>
            <SVG src="/icons/chevron-left.svg" height={24} width={24} />
            <span className="sr-only">Back</span>
          </Link>

          <div
            className={clsx(
              'relative h-8 font-sans text-2xl font-medium text-indigoGray-90'
            )}
          >
            <button
              type="button"
              onClick={handleView}
              className={clsx(
                'absolute inset-0 z-10 flex flex h-full w-fit items-center whitespace-nowrap bg-transparent hover:bg-indigoGray-20',
                focusInput ? 'invisible' : 'visible'
              )}
            >
              {truncateString(value, isMobile ? 20 : 70)}
            </button>

            <form
              onSubmit={handleSubmit}
              className={clsx(
                'absolute inset-0 flex h-full w-fit items-center',
                focusInput ? 'z-10 opacity-100' : 'z-[-1] opacity-0'
              )}
            >
              <input
                ref={inputRef}
                type="text"
                onChange={handleChange}
                autoFocus={true}
                value={value}
              />
            </form>
          </div>
        </div>

        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              type="button"
              aria-label="settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-indigoGray-10"
            >
              <SVG src="/icons/more.svg" height={24} width={24} />
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content align="end" alignOffset={-15} sideOffset={0}>
              <div className="flex h-[63px] w-[220px] flex-col items-start space-y-[6.5px] rounded-lg bg-white p-[5px] shadow-sm">
                <button
                  type="button"
                  aria-label="rename project"
                  className="pl-6 font-sans text-sm text-indigoGray-90 outline-none"
                  onClick={handleView}
                >
                  Rename
                </button>
                <button
                  type="button"
                  aria-label="archive project"
                  className="pl-6 font-sans text-sm text-indigoGray-90 outline-none"
                  onClick={() => mutate({ archived: true, projectId })}
                >
                  Archive
                </button>
              </div>

              <Popover.Arrow fill="white" className="drop-shadow" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  }
);

ProjectHeader.displayName = 'ProjectHeader';

export default Project;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      projectId: context.query.projectId,
    },
  };
};

interface GetProjectProfilesResponse {
  project: Project;
  profiles: ProjectProfile[];
}

const getProjectProfiles = async (projectId: string) => {
  const { data } = await axios.get<GetProjectProfilesResponse>(
    `/projects/${projectId}/profiles/`
  );
  return data;
};

const updateProject = async ({
  projectId,
  ...body
}: {
  name?: string;
  archived?: boolean;
  projectId: string;
}) => {
  await axios.patch(`/projects/${projectId}/`, body);
};
