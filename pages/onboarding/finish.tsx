import { userSlice } from '@/selectors';
import storage from '@/utils/storage';
import { OnboardingLayout } from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { ROUTE_PATH } from '@/config';

const FinishPage: NextPage = () => {
  const { address } = useSelector(userSlice);
  const router = useRouter();

  const handleSubmit = async () => {
    const pathToRoute = storage.getToken(ROUTE_PATH);

    if (pathToRoute) {
      router.push(pathToRoute);
      storage.clearToken(ROUTE_PATH);
    } else {
      router.push(`/`);
    }
  };

  return (
    <OnboardingLayout
      firstHeading="Ready, set, go!"
      secondHeading="You're all set!"
      bottomButtonText="Go to your profile"
      bottomButtonOnClick={handleSubmit}
      overrideOnClick
    >
      <p className="mt-4 text-sm font-medium text-indigoGray-60">
        You now have a complete profile on Mazury. Go and discover some new
        people.
      </p>
    </OnboardingLayout>
  );
};

export default FinishPage;
