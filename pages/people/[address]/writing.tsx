import * as React from 'react';
import { NextPageContext } from 'next';

import { Layout } from 'components';
import { Container, ProfileSummary } from 'views/Profile';
import { useAccount } from 'hooks';
import { Profile } from 'types';

interface WritingProps {
  address: string;
}

const Writing = ({ address }: WritingProps) => {
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);

  const navItems = [
    { label: 'Overview', isActive: false, href: `/profile/${address}` },
    {
      label: 'Credentials',
      isActive: false,
      value: '0',
      icon: '/icons/credentials.svg',
      href: `/profile/${address}/credentials`,
    },
    {
      label: 'Writing',
      isActive: true,
      value: '0',
      icon: '/icons/writing-active.svg',
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

  return (
    <Layout variant="plain">
      <Container
        navItems={navItems}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user.profile as Profile}
            isOwnProfile={isOwnProfile}
          />
        }
      ></Container>
    </Layout>
  );
};

export default Writing;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};
