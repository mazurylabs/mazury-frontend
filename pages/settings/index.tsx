import { NextPage } from 'next';
import { SettingsLayout } from 'components';
import { useProtectedRoute } from 'hooks';

const SettingsPage: NextPage = () => {
  useProtectedRoute();

  return <SettingsLayout />;
};

export default SettingsPage;
