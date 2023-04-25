import * as React from 'react';
import { NextPageContext } from 'next';
import { ethers } from 'ethers';

import { Layout } from 'components';
import { Container, ProfileSummary, ProfileSummaryMobile } from 'views/Profile';
import { useAccount, useIntersect, useMobile } from 'hooks';

import { Idle, Projects } from 'views/Profile/Overview';

import { ProfileSummaryAccordion } from 'views/Profile/ProfileSummaryAccordion';

interface ProfileProps {
  ethAddress: string;
}

const Profile = ({ ethAddress }: ProfileProps) => {
  const { user, accountInView, isOwnProfile } = useAccount(ethAddress);
  const isMobile = useMobile();

  const [isSaveProfileView, setIsSaveProfileView] = React.useState(false);

  const { ref, entry } = useIntersect({
    rootMargin: '0px',
    enabled: isMobile,
  });

  const address = ethers.utils.isAddress(ethAddress)
    ? ethAddress
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
    ensAddress: ethAddress,
    address: address,
    activeItem: 'overview',
    profileId: accountInView?.lens_id as string,
  });

  return (
    <Layout variant="plain" showMobileSidebar={entry?.isIntersecting}>
      <Container
        navItems={navItems}
        title={isSaveProfileView ? 'Save profile to folders' : undefined}
        handleGoBack={() => setIsSaveProfileView(false)}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user}
            isOwnProfile={isOwnProfile}
            loading={!accountInView}
            intersectionRef={ref}
            handleSaveProfile={() => setIsSaveProfileView(true)}
          />
        }
      >
        <ProfileSummaryMobile
          navItems={navItems}
          isVisible={!entry?.isIntersecting}
          profile={accountInView}
        />
        {isSaveProfileView ? (
          <Projects profileAddress={accountInView?.eth_address} />
        ) : (
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
        )}
      </Container>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      ethAddress: context.query.address,
    },
  };
};
