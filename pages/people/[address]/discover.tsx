import * as React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';

import { Layout, Progress } from 'components';
import { Container, ProfileSummary } from 'views/Profile';
import { useAccount } from 'hooks';

import { Profile } from 'types';

interface ProfileProps {
  address: string;
}

interface CredentialProps {
  title: string;
  icon: string;
  description: string;
  url: string;
  isViewed?: boolean;
}

export type OverviewViews = 'idle' | 'discover' | 'social';

const Discover = ({ address }: ProfileProps) => {
  const { user, accountInView, isOwnProfile } = useAccount(address);
  const router = useRouter();

  return (
    <Layout variant="plain">
      <Container
        title={'Discover web3 credentials'}
        handleGoBack={router.back}
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
        <div>
          <div className="mb-7 space-y-7">
            <div className="flex space-x-5">
              <FilterButton isSelected={true} title="All" />
              <FilterButton title="Work" value="3" />
              <FilterButton title="Education" value="3" />
              <FilterButton title="Social" value="3" />
              <FilterButton title="Web3 native" value="3" />
            </div>

            <Progress
              total={4}
              current={1}
              label="read"
              size="large"
              variant="light"
            />
          </div>

          <div className="grid grid-cols-3">
            <Credential
              title="Sismo"
              description="Buildspace accelerates your builder journey into web3. It provides courses that set you up for web3 development."
              icon="sismo.svg"
              url="#"
              isViewed={true}
            />
            <Credential
              title="Buildspace"
              description="Buildspace accelerates your builder journey into web3. It provides courses that set you up for web3 development."
              icon="buildspace.svg"
              url="#"
            />
            <Credential
              title="GitPOAP"
              description="Buildspace accelerates your builder journey into web3. It provides courses that set you up for web3 development."
              icon="gitpoap.svg"
              url="#"
            />
            <Credential
              title="101"
              description="Buildspace accelerates your builder journey into web3. It provides courses that set you up for web3 development."
              icon="101.svg"
              url="#"
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Discover;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};

const FilterButton = ({
  title,
  value,
  isSelected,
}: {
  title: string;
  value?: string;
  isSelected?: boolean;
}) => {
  return (
    <button
      type="button"
      className={`flex space-x-2 rounded-md bg-${
        isSelected ? 'indigoGray-90' : 'transparent'
      } py-2 px-3`}
    >
      <span
        className={`text-${
          isSelected
            ? 'indigo-50 font-sansSemi font-semibold'
            : 'indigoGray-90 font-sansMid font-medium'
        }`}
      >
        {title}
      </span>
      {value && (
        <span className={`text-indigoGray-${isSelected ? '5' : '40'}`}>
          {value}
        </span>
      )}
    </button>
  );
};

const Credential = ({
  title,
  icon,
  description,
  url,
  isViewed,
}: CredentialProps) => {
  return (
    <div
      className={`relative mr-6 mb-8 flex flex-col items-center rounded-lg border text-center lg:max-w-[259px] ${
        isViewed ? 'border-2 border-green-600' : 'border-indigoGray-20'
      } p-4`}
    >
      <SVG height={56} width={56} src={`/icons/${icon}`} className="mb-3" />
      <p className="mb-4 font-serif text-xl font-semibold text-indigoGray-90">
        {title}
      </p>
      <p className="mb-5 font-sans text-sm text-indigoGray-90">{description}</p>
      <a target="_blank" rel="noreferrer" className="flex space-x-2" href={url}>
        <span className="font-sansSemi text-sm font-semibold text-indigoGray-90">
          Visit {title}
        </span>
        <SVG height={16} width={16} src="/icons/external-link.svg" />
      </a>

      {isViewed && (
        <div className="absolute top-0 right-0 translate-x-[35%] translate-y-[-35%] bg-white p-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
            <SVG width={21} height={18} src="/icons/checkbox.svg" />
          </div>
        </div>
      )}
    </div>
  );
};
