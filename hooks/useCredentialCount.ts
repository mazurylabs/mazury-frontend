import * as React from 'react';
import { axios } from 'lib/axios';

import { CredentialCount } from '../types';

export const useCredentialCount = (address: string) => {
  const [error, setError] = React.useState(false);
  const [credentialCount, setCredentialCount] =
    React.useState<CredentialCount>();

  React.useEffect(() => {
    const getCredentialCount = async () => {
      setError(false);
      try {
        if (address) {
          const { data } = await axios.get(
            `profiles/${address}/credential_counts/`
          );
          setCredentialCount(data);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    getCredentialCount();
  }, [address]);

  return {
    credentialCount,
    error,
  };
};
