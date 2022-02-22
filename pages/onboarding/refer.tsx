import { Avatar, Button, InfoBox, Input, OnboardingLayout } from 'components';
import { NextPage } from 'next';
import { FC } from 'react';

interface PersonProps {
  date: string;
  avatarSrc: string;
  username: string;
  role: string;
}

const Person: FC<PersonProps> = ({ date, avatarSrc, username, role }) => {
  return (
    <div className="flex items-center">
      <Avatar src={avatarSrc} width="56px" height="56px" />

      <div className="ml-4 flex flex-col">
        <span className="text-xs font-medium text-teal-500">{date}</span>
        <span className="font-serif text-xl font-bold text-indigoGray-90">
          {username}
        </span>
        <span className="mt-1 text-xs font-medium text-indigoGray-50">
          {role}
        </span>
      </div>

      <Button variant="secondary" className="ml-auto h-fit">
        REFER
      </Button>
    </div>
  );
};

const ReferPage: NextPage = () => {
  return (
    <OnboardingLayout
      firstHeading="Role"
      secondHeading="Time to refer!"
      bottomButtonText="SKIP"
    >
      <div className="mt-3 flex flex-col">
        <InfoBox>
          This is a big thing on Mazury. Referrals make your profile pop and
          make sure you get credit for your reputation on web3.
        </InfoBox>

        {/* TODO: Add search icon */}
        <Input className="mt-6" placeholder="Search for a user" />

        <span className="mt-6 text-sm font-medium uppercase text-indigoGray-40">
          People that referred you
        </span>

        <div className="mt-2 flex flex-col gap-4">
          <Person
            avatarSrc="/avatar-2.png"
            date="Feb 2022"
            username="dhaiwat.eth"
            role="Developer"
          />
          <Person
            avatarSrc="/avatar-2.png"
            date="Feb 2022"
            username="dhaiwat.eth"
            role="Developer"
          />
          <Person
            avatarSrc="/avatar-2.png"
            date="Feb 2022"
            username="dhaiwat.eth"
            role="Developer"
          />
          <Person
            avatarSrc="/avatar-2.png"
            date="Feb 2022"
            username="dhaiwat.eth"
            role="Developer"
          />
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ReferPage;
