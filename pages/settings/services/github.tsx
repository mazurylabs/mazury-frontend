import { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

import { Button, Input, Modal, SettingsLayout, Spinner } from 'components';
import {
  getMessageToBeSigned,
  getProfile,
  updateProfile,
  verifyTweet,
} from 'utils/api';
import { getTwitterConnectionPopupLink } from 'utils';

type User = Record<'github' | 'address', string>;
type Steps = 'idle' | 'success';

const GithubPage: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<Steps>('idle');
  const [{ data: accountData }] = useAccount();
  const [_, signMessage] = useSignMessage();

  const [user, setUser] = useState<User>({
    github: '',
    address: '',
  });

  // Prefill form with exisiting email
  useEffect(() => {
    if (accountData?.address && !user.address) {
      getProfile(accountData?.address).then(({ data }) => {
        setUser({
          address: data?.eth_address as string,
          github: data?.github as string,
        });
      });

      localStorage.removeItem('gh-route');
    }
  }, [accountData?.address, user.address]);

  const handleVerifyGithub = async () => {
    const githubPopupLink = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
    localStorage.setItem('gh-route', 'settings');
    window.open(githubPopupLink, '_blank');
  };

  const disconnectGithub = async (signature: string) => {
    const { error } = await updateProfile(user.address, signature, {
      github: '',
    });

    if (error) {
      return alert('Error disconnecting profile.');
    }

    setUser((user) => {
      return { ...user, github: '' };
    });
  };

  const getSignature = async (funct: any) => {
    const { data, error } = await getMessageToBeSigned(user.address!);

    if (!data || error) {
      alert('Couldnt get the message to be signed. Please try again later.');
      return;
    }

    const { data: signature, error: signatureError } = await funct({
      message: data,
    });

    if (!signature || signatureError) {
      alert('Error signing message');
      return;
    }

    return signature;
  };

  const handleDisconnectGithub = async (messageSigner: any = signMessage) => {
    const signature = await getSignature(messageSigner);
    disconnectGithub(signature);
  };

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Github</h2>
          </div>

          <div className="mt-3 flex grow flex-col">
            <div className="flex grow flex-col">
              <div className="grow md:mb-8 md:grow-0">
                <div>
                  <p className="font-inter text-sm font-medium leading-[18px] text-indigoGray-60">
                    You can connect your Github account and have it show up as
                    one of your contacts. This way someone can see more info
                    about your projects.
                  </p>
                </div>
              </div>

              <Button
                className="w-full uppercase"
                size="large"
                onClick={
                  user.github ? handleDisconnectGithub : handleVerifyGithub
                }
              >
                {user.github ? 'DISCONNECT' : 'CONNECT'} GITHUB
              </Button>

              {user.github && (
                <div className="font-inter mt-5 flex justify-center text-sm font-bold text-gray-900">
                  <Link href={`/people/${user.address}`}>GO TO PROFILE</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default GithubPage;
