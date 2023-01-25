import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from 'components';
import { Container, ProfileSummary, Dropdown, Credential } from 'views/Profile';
import { useAccount } from 'hooks';
import { Profile } from 'types';

interface CredentialsProps {
  address: string;
}

const dummyCredentials = [
  {
    id: 123,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: 1234,
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 456,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: 1234,
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 789,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: 1234,
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 101112,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: 1234,
    image: '/icons/dummyCredential.svg',
  },
];

const Credentials = ({ address }: CredentialsProps) => {
  const router = useRouter();
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);

  const navItems = [
    { label: 'Overview', isActive: false, href: `/people/${address}` },
    {
      label: 'Credentials',
      isActive: true,
      value: '0',
      icon: '/icons/credentials-active.svg',
      href: `/people/${address}/credentials`,
    },
    {
      label: 'Writing',
      isActive: false,
      value: '0',
      icon: '/icons/writing-black.svg',
      href: `/people/${address}/writing`,
    },
    {
      label: 'Socials',
      isActive: false,
      value: '0',
      icon: '/icons/dao.svg',
      href: `/people/${address}/socials`,
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
      >
        <div className="space-y-6">
          <div className="flex w-full items-center space-x-4">
            <Dropdown
              onSelect={() => {}}
              options={[]}
              label="credentials"
              className="grow"
            />
            <button
              aria-label="search"
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigoGray-5"
            >
              <SVG src="/icons/search-black.svg" height={24} width={24} />
            </button>
            <Link href={`/people/${address}/credentials/highlight`}>
              <a className="flex items-center space-x-2 py-3 px-6 font-sansSemi text-sm font-semibold text-indigo-600">
                <SVG
                  src="/icons/heart-colored.svg"
                  height={16}
                  width={16}
                  className="mr-2"
                />
                Highlight
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {dummyCredentials.map((credential) => (
              <Credential
                key={credential.id}
                title={credential.title}
                description={credential.description}
                onSelect={() =>
                  router.push(`/people/${address}/credentials/${credential.id}`)
                }
                imageSrc={credential.image}
                totalSupply={credential.ownedBy}
                isSelected={true}
                className="border-transparent px-4 py-2"
              />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Credentials;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};
