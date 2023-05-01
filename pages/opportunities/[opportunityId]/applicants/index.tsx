import * as React from 'react';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import { NextPageContext } from 'next';
import { useQuery } from '@tanstack/react-query';

import { Avatar, Layout, Table } from 'components';
import { ProjectProfile } from 'types';
import { LinkIcon, Notes, StatusTags, Opportunity } from 'views/Opportunities';
import { capitalize, truncateString } from 'utils';
import { useMobile } from 'hooks';
import { useOpportunity } from '..';
import { axios } from 'lib/axios';

interface Props {
  opportunityId: string;
}

interface Applicant {
  applicant_profile: {
    eth_address: string;
    username: string;
    avatar: string;
    mazury_talent_verified: boolean;
    location: string;
    github: string;
    twitter: string;
    followers_count: string;
    lens_handle: string;
    title: string;
    website: string;
  };
  resume: string;
  email: string;
  message: string;
}

type ProjectTableRows = Applicant &
  ProjectProfile & {
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
          <Link href={`/`}>
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
            applicants_count={data?.applicants_count}
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
          rows={applicants?.map((applicant: any) => ({
            ...applicant,
          }))}
          columns={[
            {
              title: 'Name',
              field: 'username',
              width: isMobile ? 25 : 30,
              withSorting: true,
              Cell: ({ entry: { applicant_profile } }) => (
                <div className="flex items-center space-x-3">
                  <Link href={`/people/${applicant_profile.eth_address}`}>
                    <Avatar
                      src={applicant_profile.avatar}
                      alt={applicant_profile.username}
                      className="border border-[1.5px] border-indigoGray-30"
                    />
                  </Link>

                  <Link href={`/people/${applicant_profile.eth_address}`}>
                    <div>
                      <p className="font-sans text-sm font-medium text-indigoGray-90">
                        {capitalize(applicant_profile.username)}
                      </p>
                      {applicant_profile.title && (
                        <p className="font-sans text-[13px] text-indigoGray-40">
                          {capitalize(applicant_profile.title)}
                        </p>
                      )}
                    </div>
                  </Link>
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
              Cell: ({ entry: { applicant_profile } }) => (
                <>{capitalize(applicant_profile.location || '—')}</>
              ),
            },
            {
              title: 'Socials',
              field: 'socials',
              Cell: ({ entry: { applicant_profile } }) => (
                <div className="flex items-center space-x-2">
                  {applicant_profile.website && (
                    <LinkIcon
                      url={applicant_profile.website}
                      icon="/icons/link.svg"
                    />
                  )}
                  {applicant_profile.twitter && (
                    <LinkIcon
                      url={`http://twitter.com/${applicant_profile.twitter}`}
                      icon="/icons/twitter-black.svg"
                    />
                  )}
                  {applicant_profile.lens_handle && (
                    <LinkIcon
                      url={`https://lenster.xyz/u/${applicant_profile.lens_handle}`}
                      icon={'/icons/lens.svg'}
                    />
                  )}
                  {applicant_profile.github && (
                    <LinkIcon
                      url={`https://github.com/${applicant_profile.github}`}
                      icon="/icons/github-black.svg"
                    />
                  )}
                </div>
              ),
            },
            {
              title: 'Email',
              field: 'email',
              Cell: ({ entry }) => (
                <Link target="_blank" href={`mailto:${entry.email}`}>
                  {entry.email}
                </Link>
              ),
            },
            {
              title: 'Resume',
              field: 'resume',
              Cell: ({ entry }) => (
                <Link target="_blank" href={entry.resume}>
                  <SVG
                    src="/icons/external-link.svg"
                    className="text-indigoGray-90 hover:bg-indigoGray-20 w-6 h-6 rounded-full p-1"
                    height={12}
                    width={12}
                  />
                </Link>
              ),
            },
            {
              title: 'Message',
              field: 'message',
              Cell: ({ entry }) => (
                <>{entry.message ? truncateString(entry.message, 10) : '—'}</>
              ),
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
  return data.applicants;
};
