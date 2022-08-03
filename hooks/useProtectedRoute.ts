import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSlice } from 'selectors';
import { useConnect } from 'wagmi';

// Redirects to '/' if the user has not signed in
export const useProtectedRoute = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector(userSlice);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);
};
