import * as React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';

import { Layout } from 'components';
import { ActionButton, Container, ProfileSummary } from 'views/Profile';
import { useAccount } from 'hooks';
import { Profile } from 'types';

interface PostDetailsProps {
  address: string;
}

const PostDetail = ({ address }: PostDetailsProps) => {
  const router = useRouter();
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);
  const loading = false;

  return (
    <Layout variant="plain">
      <Container
        title="Post details"
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user.profile as Profile}
            isOwnProfile={isOwnProfile}
          />
        }
      >
        <div className="max-w-[700px] space-y-6">
          <div className="overflow-hidden rounded-lg bg-indigoGray-5">
            <div className="h-[200px]">
              <img
                className="h-full w-full"
                src="/badges/dummy-post-image.png"
              />
            </div>

            <div className="h-[180px] space-y-3 px-4 pt-6 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/icons/dummy-user.svg"
                  />
                  <p className="font-sansSemi text-sm font-semibold text-indigoGray-90">
                    nazeeth.eth
                  </p>
                </div>

                <button
                  type="button"
                  className="flex items-center rounded-md bg-indigoGray-90 py-[2px] px-2 text-xs font-medium text-indigoGray-5"
                >
                  <SVG
                    height={16}
                    width={16}
                    src="/icons/eye-slash-white.svg"
                    className="mr-2"
                  />
                  Hidden
                </button>
              </div>

              <div className="w-[55%] space-y-1">
                <p className="font-sansMid font-medium text-indigoGray-90">
                  Mazury is launching soon! What does it mean?
                </p>
                <p className="font-sans text-sm text-indigoGray-90">
                  This FAQ was originally posted on our discord, come join us!
                </p>
              </div>

              <p className="font-sansMid text-xs font-medium text-indigoGray-90">
                November 30th, 2021
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ActionButton
              icon="/icons/mirror-white-icon.svg"
              label="See on Mirror"
              className="border-blue-600 bg-blue-600 text-indigoGray-5"
            />
            {/* <ActionButton
              icon="/icons/heart-black.svg"
              label="Highlight credential"
            /> */}
            {/* <ActionButton icon="/icons/hide.svg" label="Hide" /> */}

            <ActionButton icon="/icons/share.svg" label="Copy link" />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PostDetail;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};
