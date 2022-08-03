import { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

import { Button, Input, Modal, SettingsLayout, Spinner } from 'components';
import { getProfile, updateProfile, verifyTweet } from 'utils/api';
import { getTwitterConnectionPopupLink } from 'utils';
import { useProtectedRoute } from 'hooks';

type User = Record<'twitter' | 'address', string>;
type Steps = 'idle' | 'active' | 'loading' | 'error' | 'success';

const TwitterPage: NextPage = () => {
  useProtectedRoute();

  const [currentStep, setCurrentStep] = useState<Steps>('idle');
  const [{ data: accountData }] = useAccount();
  const [_, signMessage] = useSignMessage();

  const [url, setUrl] = useState('');
  const [user, setUser] = useState<User>({
    twitter: '',
    address: '',
  });

  // Prefill form with exisiting email
  useEffect(() => {
    if (accountData?.address && !user.address) {
      getProfile(accountData?.address).then(({ data }) => {
        setUser({
          address: data?.eth_address as string,
          twitter: data?.twitter as string,
        });
      });
    }
  }, [accountData?.address, user.address]);

  const handleSkip = () => {
    setCurrentStep('idle');
    setUrl('');
  };

  const handleVerifyTwitter = async () => {
    const twitterPopupLink = getTwitterConnectionPopupLink(user.address);

    window.open(twitterPopupLink, '_blank');

    setCurrentStep('active');
  };

  const disconnectTwitter = async () => {
    const { error } = await updateProfile(user.address, '', {
      twitter: '',
    });

    if (error) {
      return alert('Error disconnecting profile.');
    }

    setUser((user) => {
      return { ...user, twitter: '' };
    });
  };

  const submitForVerification = async () => {
    const { data, error } = await verifyTweet(url as string);

    if (error) {
      setCurrentStep('error');
    } else {
      setUser((user) => {
        return { ...user, twitter: data.username };
      });
      setCurrentStep('success');
    }
  };

  const handleConnectTwitter = async (messageSigner: any = signMessage) => {
    submitForVerification();
  };

  const handleDisconnectTwitter = async (messageSigner: any = signMessage) => {
    disconnectTwitter();
  };

  const ActiveStep = () => {
    const [_, signMessage] = useSignMessage();

    useEffect(() => {
      if (url) {
        setCurrentStep('loading');
      }
    }, []);

    return (
      <>
        <h3 className="font-demi text-3xl text-indigoGray-90">
          Verify Twitter link
        </h3>
        <span className="mt-2 text-sm text-indigoGray-60">
          Paste your tweet&apos;s link here to verify
        </span>

        <Input
          label="Twitter link"
          outerClassName="mt-4"
          placeholder="e.g. https://twitter.com/mazuryxyz"
          value={url}
          onChange={(val) => setUrl(val)}
        />

        <div className="mt-4 flex w-full justify-around gap-4">
          <Button variant="secondary" onClick={handleSkip}>
            SKIP
          </Button>
          <Button
            variant="primary"
            onClick={() => handleConnectTwitter(signMessage)}
          >
            RETRY
          </Button>
        </div>
      </>
    );
  };

  const ErrorStep = () => {
    return (
      <div className="flex flex-col">
        <h3 className="font-demi text-3xl text-indigoGray-90">
          Connection failed
        </h3>
        <span className="mt-2 text-sm text-indigoGray-60">
          Something went wrong.
        </span>

        <div className="mt-4 flex w-full justify-around gap-4">
          <Button variant="secondary" onClick={handleSkip}>
            SKIP
          </Button>
          <Button variant="primary">RETRY</Button>
        </div>
      </div>
    );
  };

  const WalletSigningStep = () => {
    const [_, signMessage] = useSignMessage();

    useEffect(() => {
      handleConnectTwitter(signMessage);
      // we only want to run this once
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="flex flex-col">
        <h3 className="font-demi text-3xl text-indigoGray-90">
          Sign with wallet
        </h3>
        <span className="mt-2 text-sm text-indigoGray-60">
          Before we finish we need you to sign this with your wallet
        </span>

        <div className="mt-4 flex justify-center">
          <Spinner />
        </div>

        <div className="mt-4 flex w-full justify-around gap-4">
          <Button variant="secondary" onClick={handleSkip}>
            SKIP
          </Button>
          <Button
            variant="primary"
            onClick={() => handleConnectTwitter(signMessage)}
          >
            RETRY
          </Button>
        </div>
      </div>
    );
  };

  const SuccessStep = () => {
    return (
      <div className="flex flex-col">
        <h3 className="font-demi text-3xl text-indigoGray-90">
          You are connected
        </h3>

        <div className="mt-4 flex w-full justify-center">
          <Image
            src="/icons/success.png"
            height="64px"
            width="64px"
            alt="Success indicator"
          />
        </div>

        {/* TEMP */}
        <div className="mt-4 flex w-full justify-around gap-4">
          <Button variant="primary" onClick={handleSkip}>
            CONTINUE
          </Button>
        </div>
      </div>
    );
  };

  const steps: Record<Steps, JSX.Element> = {
    idle: <></>,
    active: <ActiveStep />,
    error: <ErrorStep />,
    loading: <WalletSigningStep />,
    success: <SuccessStep />,
  };

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Twitter</h2>
          </div>

          <div className="mt-3 flex grow flex-col">
            <div className="flex grow flex-col">
              <div className="grow md:mb-8 md:grow-0">
                <div>
                  <p className="font-inter text-sm font-medium leading-[18px] text-indigoGray-60">
                    {user.twitter ? (
                      <>
                        You are logged in as{' '}
                        <span className="font-bold text-indigo-700">
                          {user.twitter}
                        </span>
                      </>
                    ) : (
                      `You can connect your Twitter account and have it show up as
                    one of your contacts. This way someone can reach you faster.`
                    )}
                  </p>
                </div>
              </div>

              <Button
                className="w-full uppercase"
                size="large"
                onClick={
                  user.twitter ? handleDisconnectTwitter : handleVerifyTwitter
                }
              >
                {user.twitter ? 'DISCONNECT' : 'CONNECT'} TWITTER
              </Button>
            </div>
          </div>

          <Modal
            isOpen={currentStep !== 'idle'}
            onClose={() => setCurrentStep('idle')}
          >
            {steps[currentStep]}
          </Modal>
        </div>
      }
    />
  );
};

export default TwitterPage;
