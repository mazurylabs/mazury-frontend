import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';

import { Button, Layout } from 'components';
import { Container, Credential, ProfileSummary } from 'views/Profile';
import { useAccount, useBadges } from 'hooks';
import { BadgeIssuer, Profile } from 'types';
import { useRouter } from 'next/router';

interface HighlightProps {
  address: string;
}

const credentialClass: Record<BadgeIssuer, string> = {
  '101': 'h-[230px] w-[230px] rounded bg-gray-100 mb-4',
  buildspace: 'h-[230px] w-[130px] rounded mb-4',
  gitpoap: 'h-[230px] w-[230px] rounded-full mb-4',
  kudos: 'h-[230px] w-[230px] rounded mb-4',
  mazury:
    'h-[260px] w-[175px] md:h-[320px] md:w-[215px] lg:h-[300px] lg:w-[189px] mb-4',
  poap: 'h-[230px] w-[230px] rounded-full mb-4',
  sismo: 'h-[230px] w-[230px] rounded-sm bg-gray-100 mb-4',
};

const dummyImageLink =
  'https://mazury-staging.s3.amazonaws.com/badges/images/mazury_early_adopter.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUV5WL77G5SO2Y7UV%2F20230111%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230111T070912Z&X-Amz-Expires=604799&X-Amz-SignedHeaders=host&X-Amz-Signature=6541942053d53ceef3b7deb8a74a76a60b0b8c7607af2c9157d6f85ae5947401';

const CredentialDetails = ({ address }: HighlightProps) => {
  const router = useRouter();
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);

  const navItems = [
    { label: 'Overview', isActive: false, href: `/profile/${address}` },
    {
      label: 'Credentials',
      isActive: true,
      value: '0',
      icon: '/icons/credentials-active.svg',
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

  return (
    <Layout variant="plain">
      <Container
        title="Credential details"
        navItems={navItems}
        handleGoBack={router.back}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user.profile as Profile}
            isOwnProfile={isOwnProfile}
          />
        }
      >
        <div className="space-y-8 rounded-lg bg-indigoGray-5 p-6">
          <div className="flex space-x-6">
            <div className="shrink-0 px-9">
              <img
                src={dummyImageLink}
                className={`${credentialClass.buildspace}`}
                alt={'title' + ' badge'}
              />
            </div>

            <div className="space-y-4">
              <p className="w-fit rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm text-indigoGray-60">
                1289 people have this credential
              </p>
              <div className="space-y-3">
                <h2 className="font-serif text-4xl font-semibold text-indigoGray-90">
                  Buildspace alumni
                </h2>
                <p className="font-sans text-sm text-indigoGray-90">
                  Voted in an Developer DAO governance snapshot. Voted in an
                  Developer DAO governance snapshot. Voted in an Developer DAO
                  governance snapshot. Voted in an Developer DAO governance
                  snapshot
                </p>

                <div className="flex space-x-6">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center rounded-md bg-indigo-50 py-1 px-2 font-sansMid text-sm font-medium text-indigo-600"
                  >
                    <SVG
                      src={`/icons/opensea.svg`}
                      height={16}
                      width={16}
                      className="mr-2"
                    />
                    See on Opensea
                  </a>

                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center rounded-md bg-indigo-50 py-1 px-2 font-sansMid text-sm font-medium text-indigo-600"
                  >
                    <SVG
                      src={`/icons/rainbow.svg`}
                      height={16}
                      width={16}
                      className="mr-2"
                    />
                    See on Rainbow
                  </a>

                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center rounded-md bg-indigo-50 py-1 px-2 font-sansMid text-sm font-medium text-indigo-600"
                  >
                    <SVG
                      src={`/icons/gitpoap.svg`}
                      height={16}
                      width={16}
                      className="mr-2"
                    />
                    See on GitPOAP
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p>What does this credential mean?</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex w-[60px] justify-end">
                  <SVG src="/icons/star.svg" height={17} width={18} />
                  <SVG src="/icons/star.svg" height={17} width={18} />
                  <SVG src="/icons/star.svg" height={17} width={18} />
                </div>
                <p className="font-sans text-sm font-semibold text-indigoGray-90">
                  Expert at
                </p>
                <p className="rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm font-semibold text-indigoGray-90">
                  Frontend development
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex w-[60px] justify-end">
                  <SVG src="/icons/star.svg" height={17} width={18} />
                  <SVG src="/icons/star.svg" height={17} width={18} />
                </div>
                <p className="font-sans text-sm font-semibold text-indigoGray-90">
                  Intermediate at
                </p>
                <p className="rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm font-semibold text-indigoGray-90">
                  Frontend development
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex w-[60px] justify-end">
                  <SVG src="/icons/star.svg" height={17} width={18} />
                </div>
                <p className="font-sans text-sm font-semibold text-indigoGray-90">
                  Basic at
                </p>
                <p className="rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm font-semibold text-indigoGray-90">
                  Frontend development
                </p>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </Container>
    </Layout>
  );
};

export default CredentialDetails;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};
