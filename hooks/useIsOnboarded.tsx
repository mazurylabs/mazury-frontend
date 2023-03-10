import { useRouter } from 'next/router';

import storage from '@/utils/storage';
import { STORED_USER } from '@/config';

export const useIsOnboarded = () => {
  const profile = storage.getToken(STORED_USER);
  const router = useRouter();

  if (profile && !profile?.onboarded) router.push('/onboarding');
};
