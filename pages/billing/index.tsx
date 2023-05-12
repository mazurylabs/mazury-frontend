import * as React from 'react';
import SVG from 'react-inlinesvg';
import { NextPageContext } from 'next';
import Link from 'next/link';
import * as Popover from '@radix-ui/react-popover';

import { Avatar, Button, Layout } from 'components';
import clsx from 'clsx';
import { convertUnicode } from '@/utils';
import { axios } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/providers/react-query-auth';
import { ListResponse, Profile, TeamMembership, TeamPlans } from '@/types';
import { useAlert } from '@/components/Alert.tsx';

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
          <div className="flex items-center justify-between space-x-2  pb-5">
            <h1 className="font-sans text-2xl font-normal text-indigoGray-90">
              {profile?.team_membership.team_data?.name}
            </h1>

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
                    <button className="pl-6 py-1 font-sans font-light text-indigoGray-90 text-sm">
                      Rename
                    </button>
                    <button className="px-6 font-sans font-light text-red-600 text-sm">
                      Close team
                    </button>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
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

export const useUpdateTeam = () => {
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
