import { useEffect, useState } from 'react';
import { useConnect } from 'wagmi';

export const useAuthState = () => {
  const [authStatus, setAuthStatus] = useState<
    'loading' | 'logged_in' | 'logged_out'
  >('loading');
  const [{ data: connectData, loading: connectLoading }] = useConnect();

  useEffect(() => {
    if (!connectLoading && !connectData.connected) {
      setAuthStatus(
        connectData.connected === false ? 'logged_out' : 'logged_in'
      );
    }
  }, [connectData, connectLoading]);

  return authStatus;
};
