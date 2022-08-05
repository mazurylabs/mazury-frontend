import * as React from 'react';
import { useSignMessage } from 'wagmi';

import { createSiweMessage } from '@/utils/api';

export const useSignature = (address: string) => {
  const [_, signMessage] = useSignMessage();
  const [signature, setSignature] = React.useState('');

  const handleRequestSignature = React.useCallback(async () => {
    const message = createSiweMessage(
      address,
      'Sign in with Ethereum to the app.'
    );

    const { data: signature, error: signatureError } = await signMessage({
      message: message as any,
    });

    if (!signature || signatureError) {
      //   alert('Error signing message');
      return;
    }

    setSignature(signature);
  }, [address]);

  React.useEffect(() => {
    handleRequestSignature();
  }, [handleRequestSignature]);

  return { signature, getSignature: handleRequestSignature };
};
