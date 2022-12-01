import { NextPage } from 'next';
import { SettingsLayout } from 'components';
import { useIsOnboarded, useProtectedRoute } from 'hooks';

const SettingsPage: NextPage = () => {
  useIsOnboarded();
  useProtectedRoute();

  return <SettingsLayout />;
};

export default SettingsPage;
