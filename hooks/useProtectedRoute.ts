import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useConnect } from 'wagmi';

// Redirects to '/' if the user has not signed in
export const useProtectedRoute = () => {
  const router = useRouter();
  const [{ data: connectData, loading: connectLoading }] = useConnect();

  useEffect(() => {
    if (!connectLoading && !connectData.connected) {
      router.push('/');
    }
  }, [connectData, connectLoading, router]);
};
