import * as React from 'react';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import { NextPageContext } from 'next';
import { useQuery } from '@tanstack/react-query';

import { Avatar, Layout, Table } from 'components';
import { ProjectProfile } from 'types';
import { LinkIcon, Notes, StatusTags, Opportunity } from 'views/Opportunities';
import { capitalize } from 'utils';
import { useMobile } from 'hooks';
import { useOpportunity } from '..';
import { axios } from 'lib/axios';

interface Props {
  opportunityId: string;
}

type ProjectTableRows = ProjectProfile & {
  socials?: string;
  onClick?: () => void;
};

const Applicants: React.FC<Props> = ({ opportunityId }) => {
  const isMobile = useMobile();

  const { data } = useOpportunity({
    opportunityId,
  });

  const { data: applicants, isLoading } = useQuery({
    queryKey: ['applicants', opportunityId],
    queryFn: async () => getApplicants(opportunityId),
    enabled: !!opportunityId,
  });

  return (
    <Layout variant="plain" className="!px-4 lg:!px-0">
      <div className="flex flex-col space-y-4 px-4 pt-4 xl:px-0 xl:mx-[auto] h-screen xl:w-[1200px] xl:pb-[95px] xl:pt-16 xl:mx-[auto]">
        <div className="flex space-x-3 items-center">
          <Link href={`/opportunities`}>
            <SVG src="/icons/chevron-left.svg" width={24} height={24} />
          </Link>
          <p className="font-sans font-medium text-2xl text-indigoGray-90">
            Applicants
          </p>
        </div>

        {data && (
          <Opportunity
            title={data?.title}
            companyName={data?.company_info.name}
            location={`${data?.location}, ${data?.work_mode}`}
            salary={data?.salary}
            logo={data?.company_info.logo}
          />
        )}

        <Table<ProjectTableRows>
          emptyState={{
            description: 'You haven’t added any users',
            link: {
              label: 'Dicover web3 talent',
              url: `/search`,
            },
          }}
          isLoading={isLoading}
          rows={[]}
          columns={[
            {
              title: 'Name',
              field: 'username',
              width: isMobile ? 25 : 30,
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
    </Layout>
  );
};

export default Applicants;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      opportunityId: context.query.opportunityId,
    },
  };
};

const getApplicants = async (opportunityId?: string) => {
  const { data } = await axios.get<any>(
    `/opportunities/${opportunityId}/applicants/`
  );
  return data;
};
