import { Input, OnboardingLayout, SocialButton } from 'components';
import { OnboardingContext } from 'contexts';
import { useDebounce } from 'hooks';
import { NextPage } from 'next';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { getTwitterConnectionPopupLink } from 'utils';
import { getMessageToBeSigned, isValid, updateProfile } from 'utils/api';
import { TwitterConnectionModal } from 'views';
import { useAccount, useSignMessage } from 'wagmi';

const SocialsPage: NextPage = () => {
  const {
    formData,
    setFormData,
    avatarFile,
    twitterConnected,
    setTwitterConnected,
    githubConnected,
    setGithubConnected,
    valid,
    setValid,
  } = useContext(OnboardingContext);
  const [_, signMessage] = useSignMessage();
  const [{ data: accountData }] = useAccount();
  const [twitterModalOpen, setTwitterModalOpen] = useState(false);
  const debouncedEmail = useDebounce(formData.email);

  const ethAddress = accountData?.address;
  const canContinue = valid.email;

  const onTwitterClick = async () => {
    if (!ethAddress) {
      return alert('Please connect your wallet first');
    }
    const twitterPopupLink = getTwitterConnectionPopupLink(ethAddress);
    if (!twitterConnected) {
      window.open(twitterPopupLink, '_blank');
      setTwitterModalOpen(true);
    } else {
      // TODO: Implement disconnection
      alert('Your twitter is already connected!');
    }
  };

  const checkIfValid = useCallback(
    async (field: 'email' | 'username') => {
      if (!formData[field]) {
        return;
      }
      const { data, error } = await isValid(field, formData[field]!);
      if (error) {
        setValid((valid) => ({ ...valid, [field]: false }));
      } else {
        setValid((valid) => ({ ...valid, [field]: true }));
      }
    },
    [formData, setValid]
  );

  useEffect(() => {
    checkIfValid('email');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEmail]);

  const onGithubClick = async () => {
    if (githubConnected) {
      return alert('Your Github is already connected!');
    }
    const githubPopupLink = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
    window.open(githubPopupLink, '_blank');
  };

  const onSubmit = async () => {
    if (!formData.eth_address) {
      return alert('Please connect your wallet first');
    }
    const { data: messageToBeSigned, error: messageSignError } =
      await getMessageToBeSigned(formData.eth_address);

    if (!messageToBeSigned || messageSignError) {
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

    const { error: updateProfileError } = await updateProfile(
      formData.eth_address,
      signature,
      formData,
      avatarFile
    );

    if (updateProfileError) {
      return alert('Error updating profile.');
    }
  };

  return (
    <OnboardingLayout
      firstHeading="Socials"
      secondHeading="Let's get in touch"
      bottomButtonOnClick={onSubmit}
      bottomButtonDisabled={!canContinue}
    >
      <TwitterConnectionModal
        isOpen={twitterModalOpen}
        onClose={() => setTwitterModalOpen(false)}
        onFinish={() => {
          setTwitterModalOpen(false);
          setTwitterConnected(true);
        }}
      />

      <p className="mt-4 text-sm font-medium text-indigoGray-60">
        You can let others contact you and let us notify you about updates on
        your profile. All this data is optional.
      </p>

      <form className="mt-6 flex flex-col">
        <Input
          label="E-mail"
          type="email"
          placeholder="Insert e-mail"
          onChange={(v) =>
            setFormData({
              ...formData,
              email: v,
            })
          }
          value={formData.email}
          error={!valid.email}
        />
        {!valid.email && (
          <span className="mt-1 text-sm text-red-500">
            Please choose a different email.
          </span>
        )}

        <div className="flex">
          <Image
            src="/icons/error-warning-line.svg"
            height="12px"
            width="12px"
            alt="Info"
          />
          <span className="font-regular ml-1 text-xs text-indigoGray-40">
            We will send you a confirmation e-mail
          </span>
        </div>

        <Input
          label="Website"
          placeholder="Insert website"
          outerClassName="mt-4"
          value={formData.website}
          onChange={(v) => setFormData({ ...formData, website: v })}
        />
      </form>

      <SocialButton
        icon={<FaTwitter width="20px" height="20px" />}
        label={
          twitterConnected
            ? `Connected as ${formData.twitter}` || 'Connected'
            : 'Twitter'
        }
        backgroundColor="#4A99E9"
        className="mt-12"
        onClick={onTwitterClick}
        variant={twitterConnected ? 'secondary' : 'primary'}
      />

      <SocialButton
        icon={<FaGithub width="20px" height="20px" />}
        label={
          githubConnected
            ? `Connected as ${formData.github}` || 'Connected'
            : 'Github'
        }
        backgroundColor="#262626"
        className="mt-4"
        onClick={onGithubClick}
        variant={githubConnected ? 'secondary' : 'primary'}
      />
      <SocialButton
        icon={<FaDiscord width="20px" height="20px" />}
        label="Discord - Coming soon"
        backgroundColor="#5A65EA"
        className="mt-4"
        disabled
      />
    </OnboardingLayout>
  );
};

export default SocialsPage;
