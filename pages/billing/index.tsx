import * as React from 'react';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Avatar, Button, Input, Layout } from 'components';
import { truncateString } from '@/utils';
import { axios } from '@/lib/axios';
import { useUser } from '@/providers/react-query-auth';
import { ListResponse, TeamMembership, TeamPlans } from '@/types';
import { useAlert } from '@/components/Alert.tsx';
import { useClickOutside, useMobile } from '@/hooks';

const BillingAndTeams = () => {
  const { data: profile } = useUser();

  const { mutate: deleteMemberMutation } = useDeleteTeamMember();
  const { mutate: updateAdminMutation } = useUpdateAdmin();

  const { data } = useQuery({
    queryKey: ['teams'],
    queryFn: async () =>
      getTeamMembers({ teamId: profile?.team_membership.team_data.id }),
    enabled: !!profile?.team_membership.team_data.id,
  });

  return (
    <Layout
      variant="plain"
      showMobileSidebar={false}
      className="!px-4 lg:!px-0"
    >
      <div className="flex flex-col w-full pb-4 pt-6 lg:px-0 lg:ml-[71px]">
        <div className="w-full xl:w-[800px] space-y-6 lg:space-y-4">
          <BillingHeader
            teamName={profile?.team_membership.team_data?.name || ''}
            teamId={profile?.team_membership.team_data.id || ''}
          />

          <div className="space-y-2">
            <div className="py-4 px-6 rounded-lg bg-indigoGray-5 w-full space-y-2">
              <p className="font-sans font-light text-indigoGray-90">
                Team members
              </p>

              {data?.map((team) => (
                <div
                  key={team.profile.id}
                  className="py-2 px-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Avatar
                      src={team.profile.avatar}
                      alt={team.profile.username}
                    />
                    <p className="font-sans font-normal text-sm text-indigoGray-90">
                      {team.profile.username}
                    </p>
                  </div>

                  {team.role === 'admin' ? (
                    <p className="text-indigoGray-90 font-medium text-sm flex items-center space-x-1">
                      <p>{team.role === 'admin' ? 'Admin' : 'Team member'}</p>
                      <SVG src="/icons/angle-down.svg" className="h-4 w-4" />
                    </p>
                  ) : (
                    <Popover.Root>
                      <Popover.Trigger className="text-indigoGray-90 font-medium text-sm flex items-center space-x-1">
                        <p>Team member</p>
                        <SVG src="/icons/angle-down.svg" className="h-4 w-4" />
                      </Popover.Trigger>

                      <Popover.Portal className="z-30">
                        <Popover.Content
                          align="center"
                          sideOffset={8}
                          className="rounded-lg bg-white shadow-base border border-indigoGray-20"
                        >
                          <div className="h-fit w-[220px] p-1">
                            <button
                              className="pl-6 py-1 font-sans font-light text-indigoGray-90 text-sm"
                              onClick={() =>
                                updateAdminMutation({
                                  teamId: team.team_data.id,
                                  profileId: team.profile.id,
                                })
                              }
                            >
                              Make admin
                            </button>
                            <button
                              className="px-6 font-sans font-light text-indigoGray-90 text-sm"
                              onClick={() =>
                                deleteMemberMutation({
                                  teamId: team.team_data.id,
                                  profileId: team.profile.id,
                                })
                              }
                            >
                              Remove from team
                            </button>
                          </div>
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  )}
                </div>
              ))}

              <AddTeamMember
                teamId={profile?.team_membership.team_data.id || ''}
              />
            </div>

            <div className="py-4 px-6 rounded-lg bg-indigoGray-5 w-full space-y-2">
              <p className="font-sans font-light text-indigoGray-90">Billing</p>
              <div className="divide-y space-y-2">
                <div className="py-2 flex items-center justify-between">
                  <div>
                    <p className="font-sans text-sm font-normal text-indigoGray-90">
                      Team plan $200/month (price lowered until 09/23)
                    </p>
                    <p className="text-indigoGray-40 font-sans text-[13px]">
                      2 team members
                    </p>
                  </div>
                  <Link
                    href="/pricing"
                    className="text-sm font-medium font-sans text-indigoGray-90"
                  >
                    Change plan
                  </Link>
                </div>

                <div className="py-2 space-y-3">
                  <p className="text-indigoGray-40 font-sans text-[13px]">
                    Credit card information
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigoGray-90 font-sans font-normal text-sm">
                        **** **** **** **87
                      </p>
                      <p className="text-indigoGray-40 font-sans text-[13px]">
                        Mastercard
                      </p>
                    </div>

                    <button
                      type="button"
                      className="text-sm font-medium font-sans text-indigoGray-90"
                    >
                      Change data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BillingAndTeams;

interface BillingHeaderProps {
  teamName: string;
  teamId: string;
}

const BillingHeader: React.FC<BillingHeaderProps> = ({ teamName, teamId }) => {
  const isMobile = useMobile();
  const [focusInput, setFocusInput] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null!);
  const [newTeamName, setNewTeamName] = React.useState('');
  const prevTeamName = React.useRef(teamName);

  useClickOutside(inputRef, () => handleRename());

  const { mutate } = useUpdateTeam({ onError: () => setNewTeamName('') });

  const handleView = () => {
    setFocusInput(true);
    inputRef.current.focus();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isMobile && event.target.value.length < 70) {
      event.target.setAttribute('size', `${event.target.value.length + 1}`);
    }

    setNewTeamName(event.target.value);
  };

  const handleRename = () => {
    if (!newTeamName) {
      setNewTeamName((prevTeamName as React.MutableRefObject<string>).current);
      return;
    }

    mutate({ name: newTeamName, teamId });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRename();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link href={'/settings'}>
          <SVG src="/icons/chevron-left.svg" height={24} width={24} />
          <span className="sr-only">Back</span>
        </Link>

        <div
          className={clsx(
            'relative h-8 font-sans text-2xl font-normal text-indigoGray-90'
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
            {truncateString(newTeamName || teamName, isMobile ? 20 : 70)}
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
              value={newTeamName || teamName}
            />
          </form>
        </div>
      </div>

      <Popover.Root>
        <Popover.Trigger className="text-indigoGray-90 font-medium text-sm flex items-center space-x-1">
          <SVG src="/icons/more.svg" className="h-6 w-6" />
        </Popover.Trigger>

        <Popover.Portal className="z-30">
          <Popover.Content
            align="center"
            sideOffset={8}
            className="rounded-lg bg-white shadow-base border border-indigoGray-20"
          >
            <div className="flex-col items-start h-fit flex w-[220px] p-1">
              <button
                type="button"
                className="pl-6 py-1 font-sans font-light text-indigoGray-90 text-sm"
                onClick={handleView}
              >
                Rename
              </button>
              <button
                type="button"
                className="px-6 font-sans font-light text-red-600 text-sm"
              >
                Close team
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

const AddTeamMember: React.FC<{ teamId: string }> = ({ teamId }) => {
  const [teamMember, setTeamMember] = React.useState('');

  const { mutate, isLoading } = useAddTeamMember();

  return (
    <div className="flex space-x-2">
      <input
        value={teamMember}
        onChange={(event) => setTeamMember(event.target.value)}
        className="py-3 px-4 bg-transparent rounded-lg grow font-sans font-normal text-indigoGray-40 border border-indigoGray-20 h-[34px]"
        placeholder="E-mail, ETH or wallet address"
      />
      <Button
        disabled={!teamMember}
        onClick={() => mutate({ user: teamMember, teamId })}
        size="small"
        className="h-[34px]"
        loading={isLoading}
      >
        Add member
      </Button>
    </div>
  );
};

const getTeamMembers = async ({ teamId }: { teamId?: string }) => {
  const { data } = await axios.get<ListResponse<TeamMembership>>(
    `/teams/${teamId}/members/`
  );
  return data.results;
};

const updateTeam = async ({
  teamId,
  ...body
}: {
  teamId: string;
  name?: string;
  plan?: TeamPlans;
  role?: string;
}) => {
  await axios.patch(`/teams/${teamId}/`, body);
};

export const useUpdateTeam = ({ onError }: { onError?: () => void }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useAlert({});

  return useMutation({
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
        ...prev,
        team_membership: {
          ...prev?.team_membership,
          team_data: {
            ...prev?.team_membership.team_data,
            name: variables.name || prev?.team_membership.team_data.name,
            plan: variables.plan || prev?.team_membership.team_data.plan,
          },
          role: variables.role || prev?.team_membership.role,
        },
      }));
    },
    onError: (error: any) => {
      if (error?.response) {
        dispatch({ message: error.response.data.detail, type: 'error' });
        onError?.();
      }
    },
    mutationFn: updateTeam,
  });
};

const updateAdmin = async ({
  teamId,
  profileId,
}: {
  teamId: string;
  profileId: string;
}) => {
  await axios.patch(`/teams/${teamId}/members/${profileId}/`, {
    role: 'admin',
  });
};

const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useAlert({});

  return useMutation({
    onSuccess: (_, variables) => {
      queryClient.setQueryData<TeamMembership[]>(['teams'], (prev) => {
        return prev?.map((member) =>
          member.profile.id === variables.profileId
            ? { ...member, role: 'admin' }
            : member
        );
      });
    },
    mutationFn: updateAdmin,
  });
};

const deleteTeamMember = async ({
  teamId,
  profileId,
}: {
  teamId: string;
  profileId: string;
}) => {
  await axios.delete(`/teams/${teamId}/members/${profileId}/`);
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useAlert({});

  return useMutation({
    onSuccess: (_, variables) => {
      queryClient.setQueryData<TeamMembership[]>(['teams'], (prev) => {
        return prev?.filter(
          (member) => member.profile.id !== variables.profileId
        );
      });
    },
    mutationFn: deleteTeamMember,
  });
};

const addTeamMember = async ({
  user,
  role = 'member',
  teamId,
}: {
  user: string;
  role?: string;
  teamId: string;
}) => {
  const { data } = await axios.post<TeamMembership>(
    `/teams/${teamId}/members/`,
    {
      user,
      role,
    }
  );
  return data;
};

export const useAddTeamMember = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useAlert({});

  return useMutation({
    onSuccess: (data) => {
      queryClient.setQueryData<TeamMembership[]>(['teams'], (prev) => {
        return [...(prev || []), data];
      });
    },
    mutationFn: addTeamMember,
  });
};
