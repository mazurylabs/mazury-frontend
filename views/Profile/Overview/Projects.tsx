import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useProjects } from 'pages/projects';
import { commify } from 'utils';
import { Project } from 'types';
import { useAlert } from 'components/Alert.tsx';
import { axios } from 'lib/axios';

interface Props {
  profileAddress?: string;
  userAddress?: string;
}

export const Projects: React.FC<Props> = ({ profileAddress, userAddress }) => {
  const { data, isLoading } = useProjects({ address: userAddress });

  const projects = data?.results.flatMap((project) => project.projects);

  if (!profileAddress || isLoading) return <h1>Loading...</h1>;

  return (
    <div className="space-y-3">
      {projects?.map((project) => (
        <Project
          key={project.id}
          project={project}
          profileId={profileAddress}
        />
      ))}
    </div>
  );
};

interface ProjectProp {
  project: Project;
  profileId: string;
}

const Project: React.FC<ProjectProp> = ({ project, profileId }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useAlert({});

  const { mutate } = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(clsx('project', profileId).split(' '));
    },
    onError: (error: any) => {
      if (error?.response) {
        dispatch({ message: error.response.data[0], type: 'error' });
      }
    },
    mutationFn: () =>
      saveProject({
        profileId,
        projectId: project.id,
        isIncluded: project.already_in_project,
      }),
  });

  return (
    <div className="px-4 py-2 bg-indigoGray-5 rounded-[15px] flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SVG height={24} width={24} src="/icons/folder.svg" />
        <div>
          <p className="font-sans text-sm font-semibold text-indigoGray-90">
            {project.name}
          </p>
          <div className="flex space-x-3 font-sans text-xs text-indigoGray-50 font-medium">
            <p>
              {commify(project.saved_profiles_preview_count)} user
              {project.saved_profiles_preview_count !== 1 && 's'}
            </p>
            <p>
              Last updated {dayjs(project.updated_at).format('MMM DD YYYY')}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={clsx(
          'rounded-lg p-2 font-sans font-medium text-xs',
          project.already_in_project
            ? 'border border-[#E2E6F0] text-indigoGray-90'
            : 'text-indigoGray-5 flex items-center bg-indigoGray-90 shrink-0'
        )}
        onClick={() => mutate()}
      >
        {!project.already_in_project && (
          <SVG src="/icons/folder-plus.svg" className="mr-2" />
        )}
        {project.already_in_project ? 'Remove' : 'Add'}
      </button>
    </div>
  );
};

const saveProject = async ({
  profileId,
  projectId,
  isIncluded,
}: {
  projectId: string;
  profileId: string;
  isIncluded: boolean;
}) => {
  const { data } = await axios[isIncluded ? 'delete' : 'post']<Project>(
    `/projects/${projectId}/profiles/`,
    { eth_address: profileId }
  );
  return data;
};
