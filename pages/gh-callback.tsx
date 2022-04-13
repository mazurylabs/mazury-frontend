import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connectGithub, getMessageToBeSigned } from 'utils/api';
import { useAccount, useSignMessage } from 'wagmi';

const Page: NextPage = () => {
  const router = useRouter();
  const githubCode = router.query.code as string;
  const [{ data: accountData }] = useAccount();
  const userAddress = accountData?.address;
  const [_, signMessage] = useSignMessage();

  useEffect(() => {
    (async () => {
      if (!userAddress) {
        return;
      }
      if (githubCode) {
        const { data: messageToBeSigned } = await getMessageToBeSigned(
          userAddress
        );
        if (!messageToBeSigned) {
          return alert(
            'Couldnt get the message to be signed. Please try again later.'
          );
        }
        const { data: signature, error: signatureError } = await signMessage({
          message: messageToBeSigned,
        });
        if (!signature || signatureError) {
          return alert('Error signing message');
        }
        const { data, error } = await connectGithub(githubCode, signature);
        if (error) {
          return alert('Error connecting to Github');
        }
        router.push('/onboarding/socials');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [githubCode, userAddress]);

  if (!githubCode) {
    return <div>No code</div>;
  }

  return <div>Redirecting you...</div>;
};

export default Page;
