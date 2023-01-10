import * as React from 'react';
import { NextPageContext } from 'next';

import { Button, Layout } from 'components';
import { Container, ProfileSummary } from 'views/Profile';
import { useAccount } from 'hooks';

import {
  DiscoverCredentials,
  HighlightCredentials,
  Idle,
  SocialMedia,
} from 'views/Profile/Overview';
import { Profile } from 'types';

interface ProfileProps {
  address: string;
}

export type OverviewViews = 'idle' | 'discover' | 'highlight' | 'social';

const Profile = ({ address }: ProfileProps) => {
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);
  const [selectedOverviewViews, setSelectedOverviewViews] =
    React.useState<OverviewViews>('idle');

  const navItems = [
    { label: 'Overview', isActive: true, href: `/profile/${address}` },
    {
      label: 'Credentials',
      isActive: false,
      value: '0',
      icon: '/icons/credentials.svg',
      href: `/profile/${address}/credentials`,
    },
    {
      label: 'Writing',
      isActive: false,
      value: '0',
      icon: '/icons/writing-black.svg',
      href: `/profile/${address}/writing`,
    },
    {
      label: 'Socials',
      isActive: false,
      value: '0',
      icon: '/icons/dao.svg',
      href: `/profile/${address}/socials`,
    },
  ];

  const overviewViews: Record<
    OverviewViews,
    { title?: string; view: JSX.Element; handleSave?: () => void }
  > = {
    discover: {
      title: 'Discover web3 credentials',
      view: <DiscoverCredentials />,
    },
    highlight: {
      title: 'Highlight credentials',
      view: (
        <HighlightCredentials address={accountInView?.eth_address as string} />
      ),
      handleSave: () => console.log('saving'),
    },
    social: {
      title: 'Social media',
      view: <SocialMedia address={address} />,
    },
    idle: {
      view: (
        <Idle
          address={address}
          isOwnProfile={isOwnProfile}
          handleNavigateViews={(view: OverviewViews) =>
            setSelectedOverviewViews(view)
          }
        />
      ),
    },
  };

  return (
    <Layout variant="plain">
      <Container
        title={overviewViews[selectedOverviewViews].title}
        handleGoBack={
          selectedOverviewViews !== 'idle'
            ? () => setSelectedOverviewViews('idle')
            : undefined
        }
        handleSave={overviewViews[selectedOverviewViews].handleSave}
        navItems={navItems}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user.profile as Profile}
            isOwnProfile={isOwnProfile}
            loading={!accountInView}
          />
        }
      >
        {overviewViews[selectedOverviewViews].view}
      </Container>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};
