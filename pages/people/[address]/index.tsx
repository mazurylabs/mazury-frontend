import * as React from 'react';
import { NextPageContext } from 'next';
import { ethers } from 'ethers';

import { Layout } from 'components';
import { Container, ProfileSummary, ProfileSummaryMobile } from 'views/Profile';
import { useAccount, useIntersect, useMobile } from 'hooks';

import { Idle } from 'views/Profile/Overview';

import { ProfileSummaryAccordion } from 'views/Profile/ProfileSummaryAccordion';

interface ProfileProps {
  address: string;
}

export type OverviewViews = 'idle';

const Profile = ({ address }: ProfileProps) => {
  const { user, accountInView, isOwnProfile } = useAccount(address);
  const isMobile = useMobile();

  const { ref, entry } = useIntersect({
    rootMargin: '0px',
    enabled: isMobile,
  });

  const ethAddress = ethers.utils.isAddress(address)
    ? address
    : accountInView?.eth_address || '';

  const profileSummaryAccordion = (
    <ProfileSummaryAccordion
      address={address}
      profile={accountInView}
      user={user}
      isOwnProfile={isOwnProfile}
    />
  );

  const navItems = Container.useNavItems({
    address,
    activeItem: 'overview',
    profileId: accountInView?.lens_id as string,
  });

  return (
    <Layout variant="plain" showMobileSidebar={entry?.isIntersecting}>
      <Container
        navItems={navItems}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user}
            isOwnProfile={isOwnProfile}
            loading={!accountInView}
            intersectionRef={ref}
          />
        }
      >
        <ProfileSummaryMobile
          navItems={navItems}
          isVisible={!entry?.isIntersecting}
          profile={accountInView}
        />
        <Idle
          address={ethAddress}
          isOwnProfile={isOwnProfile}
          profileSummaryAccordion={profileSummaryAccordion}
          lensId={accountInView?.lens_id || ''}
          author={{
            username: accountInView?.username,
            avatar: accountInView?.avatar,
          }}
        />
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
