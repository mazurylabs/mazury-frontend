import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { userSlice } from 'selectors';

import { useUser } from 'providers/react-query-auth';

// Redirects to '/' if the user has not signed in
export const useProtectedRoute = () => {
  const router = useRouter();
  const { data } = useUser();

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, [data, router]);
};
