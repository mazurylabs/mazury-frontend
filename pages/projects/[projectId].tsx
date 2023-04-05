import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';
import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NextPageContext } from 'next';

import { Avatar, Layout, Table } from 'components';
import { useClickOutside, useMobile } from 'hooks';
import { capitalize, truncateString } from 'utils';
import { Project, ProjectProfile, ProjectProfileStatus } from 'types';
import { axios } from 'lib/axios';
import { useAlert } from 'components/Alert.tsx';
import { useUser } from 'providers/react-query-auth';

type ProjectTableRows = ProjectProfile & {
  socials?: string;
};

interface ProfileProps {
  projectId: string;
}

const Project = ({ projectId }: ProfileProps) => {
  const { data: user } = useUser();
  const [projectTitle, setProjectTitle] = React.useState('Untitled project');
  const prevTitle = React.useRef<string>(projectTitle);

  const { data, isLoading } = useQuery({
    queryKey: ['profile', projectId],
    queryFn: async () => getProjectProfiles(projectId),
    enabled: !!projectId,
    onSuccess: (data) => {
      setProjectTitle(data.project.name);
      prevTitle.current = data.project.name;
    },
  });

  return (
    <Layout variant="plain">
      <div className="flex flex-col space-y-4 px-4 pt-4 lg:px-0 xl:mx-[auto] h-screen xl:w-[1200px] xl:pt-10 xl:pb-[95px]">
        <ProjectHeader
          value={projectTitle}
          onChange={(value) => setProjectTitle(value)}
          projectId={projectId}
          profileId={user?.eth_address}
          ref={prevTitle}
        />

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
            rows={data?.profiles}
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

const LinkIcon = ({ url, icon }: { url: string; icon: string }) => {
  return (
    <a target="_blank" rel="noreferrer" href={url}>
      <SVG src={icon} className="text-indigoGray-90" height={16} width={16} />
    </a>
  );
};

const StatusTags: React.FC<{ status: ProjectProfileStatus }> = ({ status }) => {
  return (
    <div
      className={clsx(
        'flex w-fit items-center space-x-2 rounded-md border py-[2px] px-2',
        status === 'contacted' && 'border-green-200 bg-green-50 text-green-600',
        (!status || status === 'uncontacted') &&
          'border-indigoGray-20 bg-indigoGray-5 text-indigoGray-60',
        status === 'toBeContacted' &&
          'border-amber-200 bg-amber-50 text-amber-600'
      )}
    >
      <div
        className={clsx(
          'h-2 w-2 rounded-full',
          status === 'contacted' && 'bg-green-600',
          (!status || status === 'uncontacted') && 'bg-indigoGray-60',
          'toBeContacted' && 'bg-amber-600'
        )}
      />
      <p className="font-sans text-[13px]">
        {!status || status === 'uncontacted'
          ? 'Not contacted'
          : status === 'contacted'
          ? 'Contacted'
          : 'To be contacted'}
      </p>
    </div>
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
        queryClient.invalidateQueries(['projects']);
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

const Notes = ({ comments }: { comments: string }) => {
  const [note, setNote] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild className="relative">
        <button
          type="button"
          aria-label="comments"
          className="data-[state=open]:bg-indigo-600 data-[state=open]:text-indigo-50 data-[state=open]:before:bg-indigo-50 ml-[auto] flex h-9 w-[44px] items-center justify-center rounded-[32px] border border-indigoGray-20 bg-indigoGray-5 text-indigoGray-40 before:absolute before:z-[-1] before:h-[42px] before:w-[52px] before:rounded-[32px] before:bg-transparent before:content-['*'] hover:bg-indigoGray-10"
        >
          <SVG src="/icons/message-square.svg" className="mr-1" />
          {comments}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          alignOffset={-15}
          sideOffset={0}
          className="h-[272px] w-[calc(100vw-32px)] sm:w-[calc(100vw-64px)] lg:h-[212px] lg:w-[352px]"
        >
          <div className="flex h-full w-full flex-col rounded-lg bg-white shadow-base">
            <div className="px-4">
              <div className="flex justify-end pt-4">
                <Popover.Close aria-label="Close">
                  <SVG src="/icons/x.svg" className="h-4 w-4" />
                </Popover.Close>
              </div>
              <p className="font-sans text-base font-medium text-indigoGray-90">
                Notes
              </p>
            </div>

            <div className="mt-4 h-[110px] space-y-2 overflow-y-auto pl-4 pb-2">
              {true ? (
                <div className="border-l border-l-indigoGray-20 pl-3">
                  <div>
                    <p className="font-sans text-xs font-medium text-indigoGray-40">
                      May 12 2023
                    </p>
                  </div>
                  <p className="font-sans text-sm text-indigoGray-90">
                    They are open to relocation
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-6 border-l border-l-indigoGray-20 pl-3">
                  <p className="font-sans text-sm text-indigoGray-50">
                    Comment deleted
                  </p>
                  <button
                    type="button"
                    className="font-sans text-sm font-medium text-indigo-500"
                  >
                    Undo
                  </button>
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-[auto] flex h-[46px] w-full items-center justify-between bg-indigoGray-5 px-4"
            >
              <textarea
                onChange={handleChange}
                value={note}
                placeholder="Write a note…"
                className="mr-4 h-full grow resize-none bg-transparent py-3 font-sans text-sm text-indigoGray-90"
              />
              <button
                type="submit"
                disabled={!note}
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full',
                  note ? 'bg-indigoGray-90' : 'bg-indigoGray-30'
                )}
              >
                <SVG src="/icons/arrow-up.svg" />
              </button>
            </form>
          </div>
          <Popover.Arrow fill="white" className="drop-shadow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

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
