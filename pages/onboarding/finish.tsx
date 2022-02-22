import { OnboardingLayout } from 'components';
import { NextPage } from 'next';

const FinishPage: NextPage = () => {
  return (
    <OnboardingLayout
      firstHeading="Ready, set, go!"
      secondHeading="You're all set!"
      bottomButtonText="Go to your profile"
    >
      <p className="mt-4 text-sm font-medium text-indigoGray-60">
        You now have a complete profile on Mazury. Go and discover some new
        people.
      </p>
    </OnboardingLayout>
  );
};

export default FinishPage;
