import * as React from 'react';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { Avatar, Button, Layout } from 'components';
import { capitalize } from 'utils';
import { Credential } from 'views/Profile';

interface Props {
  opportunityId: string;
  applicantId: string;
}

const Applicant: React.FC<Props> = ({ applicantId, opportunityId }) => {
  const router = useRouter();

  return (
    <Layout variant="plain" className="!px-4 lg:!px-0">
      <div className="flex flex-col space-y-4 px-4 pt-4 xl:px-0 xl:mx-[auto] h-screen xl:w-[1000px] xl:pb-[95px] xl:pt-16 xl:mx-[auto]">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex space-x-3 items-center">
              <Link href={`/`}>
                <SVG src="/icons/chevron-left.svg" width={24} height={24} />
              </Link>
              <p className="font-sans font-medium text-2xl text-indigoGray-90">
                {capitalize('mircale.eth’s application')}
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <Avatar
                  src="/icons/dummy-user.svg"
                  outerClassName="h-14 w-14"
                  alt="user"
                />
                <p className="font-sans text-sm font-medium text-indigoGray-90">
                  Wojtek
                </p>
              </div>

              <p className="text-indigoGray-40 flex items-center font-sans text-sm font-medium">
                <SVG className="mr-1 h-4 w-4" src="/icons/time.svg" /> Today
              </p>
            </div>
          </div>

          <Button
            className="h-[37px]"
            onClick={() => router.push(`people/${applicantId}`)}
          >
            See user’s profile
          </Button>
        </div>

        <div className="p-4 space-y-4 font-sans font-medium text-sm border border-indigoGray-20 rounded-lg max-w-[700px]">
          <div className="flex justify-between">
            <div className="space-y-2">
              <p className="text-indigoGray-40">Resume</p>
              <div className="flex space-x-3">
                <p className="text-indigoGray-90">Wojtek.pdf</p>
                <a href="#">Download file</a>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-indigoGray-40">Email</p>
              <p className="text-indigoGray-90">wojtek@mazury.xyz</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-indigoGray-40">Location</p>
            <p className="text-indigoGray-90">NYC</p>
          </div>

          <div className="space-y-2">
            <p className="text-indigoGray-40">Message</p>
            <p className="text-indigoGray-90">
              Hi! I’m sending my application. Thanks for your time
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-sans text-sm font-medium text-indigoGray-40">
            Highlighted credentials
          </p>

          <div className="space-y-4">
            <Credential
              title="Hardhat OSS Contributor 2022"
              description="The holder of this badge has successfully finished"
              onSelect={() => {}}
              imageSrc={'/icons/dummyCredential.svg'}
              totalSupply={1245}
              className="w-fit"
            />
            <Credential
              title="Ethereum.org contributor 2022"
              description="The holder of this badge has successfully finished"
              onSelect={() => {}}
              imageSrc={'/icons/dummyCredential.svg'}
              totalSupply={1245}
              className="w-fit"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Applicant;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      opportunityId: context.query.opportunityId,
      applicantId: context.query.applicantId,
    },
  };
};
