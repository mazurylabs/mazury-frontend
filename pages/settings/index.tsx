import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SettingsLayout } from 'components';

const SettingsPage: NextPage = () => {
  const router = useRouter();
  return <SettingsLayout />;
};

export default SettingsPage;
