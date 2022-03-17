import { Input, OnboardingLayout, SocialButton } from 'components';
import { OnboardingContext } from 'contexts';
import { NextPage } from 'next';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { getMessageToBeSigned, updateProfile } from 'utils/api';
import { TwitterConnectionModal } from 'views';
import { useAccount, useSignMessage } from 'wagmi';

const SocialsPage: NextPage = () => {
  const {
    formData,
    setFormData,
    avatarFile,
    twitterConnected,
    setTwitterConnected,
  } = useContext(OnboardingContext);
  const [_, signMessage] = useSignMessage();
  const [{ data: accountData }] = useAccount();
  const [twitterModalOpen, setTwitterModalOpen] = useState(false);

  const ethAddress = accountData?.address;

  const onTwitterClick = async () => {
    const twitterPopupLink = `https://twitter.com/intent/tweet?text=I'm%20verifying%20myself%20for%20%40mazuryxyz%20%F0%9F%8C%8A%0a%0a${ethAddress}`;
    if (!twitterConnected) {
      window.open(twitterPopupLink, 'popup');
      setTwitterModalOpen(true);
    } else {
      // TODO: Implement disconnection
      alert('Your twitter is already connected!');
    }
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
        />

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
        icon={
          <FaTwitter
            width="20px"
            height="20px"
            className="border-[1.33px border-indigoGray-5"
          />
        }
        label={twitterConnected ? 'Connected' : 'Twitter'}
        backgroundColor="#4A99E9"
        className="mt-12"
        onClick={onTwitterClick}
        variant={twitterConnected ? 'secondary' : 'primary'}
      />
      <SocialButton
        icon={
          <FaGithub
            width="20px"
            height="20px"
            className="border-[1.33px border-indigoGray-5"
          />
        }
        label="Github"
        backgroundColor="#262626"
        className="mt-4"
      />
      <SocialButton
        icon={
          <FaDiscord
            width="20px"
            height="20px"
            className="border-[1.33px border-indigoGray-5"
          />
        }
        label="Discord - Coming soon"
        backgroundColor="#5A65EA"
        className="mt-4"
        disabled
      />
    </OnboardingLayout>
  );
};

export default SocialsPage;
