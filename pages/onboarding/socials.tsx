import { Input, OnboardingLayout } from 'components';
import { NextPage } from 'next';
import Image from 'next/image';
import { FC } from 'react';

interface SocialButtonProps {
  iconSrc: string;
  label: string;
  backgroundColor: string;
  className?: string;
}

const SocialButton: FC<SocialButtonProps> = ({
  iconSrc,
  label,
  backgroundColor,
  className,
}) => {
  return (
    <button
      style={{ backgroundColor }}
      className={`flex items-center justify-center gap-2 rounded-lg py-4 text-sm font-bold uppercase text-indigoGray-5 shadow-base ${className}`}
    >
      <Image
        src={iconSrc}
        width="20px"
        height="20px"
        alt={`${label} icon`}
        className="border-[1.33px] border-indigoGray-5"
      />
      {label}
    </button>
  );
};

const SocialsPage: NextPage = () => {
  return (
    <OnboardingLayout firstHeading="Socials" secondHeading="Let's get in touch">
      <p className="mt-4 text-sm font-medium text-indigoGray-60">
        You can let others contact you and let us notify you about updates on
        your profile. All this data is optional.
      </p>

      <form className="mt-6 flex flex-col">
        <Input label="E-mail" type="email" placeholder="Insert e-mail" />

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
        />
      </form>

      <SocialButton
        iconSrc="/icons/twitter.svg"
        label="Twitter"
        backgroundColor="#4A99E9"
        className="mt-12"
      />
      <SocialButton
        iconSrc="/icons/github.svg"
        label="Github"
        backgroundColor="#262626"
        className="mt-4"
      />
      <SocialButton
        iconSrc="/icons/discord.svg"
        label="Discord"
        backgroundColor="#5A65EA"
        className="mt-4"
      />
    </OnboardingLayout>
  );
};

export default SocialsPage;
