import * as React from 'react';
import { NextPageContext } from 'next';

import { Layout } from 'components';
import { Container, ProfileSummary } from 'views/Profile';
import { useAccount } from 'hooks';

import { DiscoverCredentials, Idle, SocialMedia } from 'views/Profile/Overview';
import { Badge, Profile } from 'types';
import { getHighlightedCredentials } from 'views/Profile/Overview/Idle';

interface ProfileProps {
  address: string;
  highlightedCredentials: Badge[];
}

export type OverviewViews = 'idle' | 'discover' | 'social';

const Profile = ({ address, highlightedCredentials }: ProfileProps) => {
  const { user, accountInView, isOwnProfile } = useAccount(address);
  const [selectedOverviewViews, setSelectedOverviewViews] =
    React.useState<OverviewViews>('idle');

  const overviewViews: Record<
    OverviewViews,
    { title?: string; view: JSX.Element; handleSave?: () => void }
  > = {
    discover: {
      title: 'Discover web3 credentials',
      view: <DiscoverCredentials />,
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
          highlightedCredentials={highlightedCredentials}
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
        navItems={Container.useNavItems({ address, activeItem: 'Overview' })}
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
  const highlightedCredentials = await getHighlightedCredentials(
    context.query.address as string
  );

  return {
    props: {
      address: context.query.address,
      highlightedCredentials,
    },
  };
};
