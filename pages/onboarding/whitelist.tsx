import { InfoBox, OnboardingLayout } from 'components';
import { NextPage } from 'next';

const WhitelistPage: NextPage = () => {
  return (
    <OnboardingLayout
      firstHeading="Whitelist"
      secondHeading="You are whitelisted!"
    >
      <p className="mt-4 text-sm font-medium text-indigoGray-60">
        It&apos;s the VIP of Mazury. You are getting access to all the features
        before the public does. You can use our search to find the best talent
        for your project.
      </p>

      <InfoBox className="mt-6">
        As a user with extensive access we see your feedback as extremely
        valuable. Use Twitter, DMs, Discord or your private contacts to let us
        know about it!
      </InfoBox>
    </OnboardingLayout>
  );
};

export default WhitelistPage;
