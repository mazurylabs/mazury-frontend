import { Input, OnboardingLayout } from 'components';
import { OnboardingContext } from 'contexts';
import { NextPage } from 'next';
import Image from 'next/image';
import { FC, ReactNode, useContext } from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { getMessageToBeSigned, updateProfile } from 'utils/api';
import { useAccount, useSignMessage } from 'wagmi';

interface SocialButtonProps {
  icon: ReactNode;
  label: string;
  backgroundColor: string;
  className?: string;
}

const SocialButton: FC<SocialButtonProps> = ({
  icon,
  label,
  backgroundColor,
  className,
}) => {
  return (
    <button
      style={{ backgroundColor }}
      className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold uppercase text-indigoGray-5 shadow-base ${className}`}
    >
      {icon}
      {label}
    </button>
  );
};

const SocialsPage: NextPage = () => {
  const { formData, setFormData } = useContext(OnboardingContext);
  const [_, signMessage] = useSignMessage();

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
      formData
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
        label="Twitter"
        backgroundColor="#4A99E9"
        className="mt-12"
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
        label="Discord"
        backgroundColor="#5A65EA"
        className="mt-4"
      />
    </OnboardingLayout>
  );
};

export default SocialsPage;
