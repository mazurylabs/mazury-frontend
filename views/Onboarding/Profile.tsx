import { Button, Input, OnboardingLayout } from 'components';
import { OnboardingContext } from 'contexts';
import Image from 'next/image';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';

export const ProfileView: FC = () => {
  const { formData, setFormData } = useContext(OnboardingContext);
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>();

  const onAddPicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onRemovePicClick = () => {
    setFileUrl('');
    setFile(undefined);
  };

  useEffect(() => {
    if (file) {
      const fileUrl = URL.createObjectURL(file as Blob);
      setFileUrl(fileUrl);
    }
  }, [file]);

  useEffect(() => {
    console.log({ formData, setFormData });
  }, [formData, setFormData]);

  return (
    <OnboardingLayout
      firstHeading="Profile information"
      secondHeading={`Hi, ${
        formData.ens_name || formData.username || accountData?.ens || '...'
      }`}
    >
      <p className="mt-3 text-sm font-medium text-indigoGray-60">
        We&apos;re glad you&apos;re joining us. Let&apos;s take a moment to
        polish your profile a bit!
      </p>

      <div className="flex">
        <div className="mt-6 flex w-3/4 flex-col">
          <span className="text-sm font-medium uppercase text-black-300">
            ENS Name
          </span>
          <span className="text-black mt-1 text-lg font-medium">
            {formData.ens_name || '...'}
          </span>
          {/* TODO: Fix overflowing text */}
          <span className="mt-1 text-xs font-medium text-black-700">
            {formData.eth_address || '...'}
          </span>
        </div>

        <div className="mr-6 flex w-1/4 items-center justify-end">
          <Image
            src="/icons/refresh.svg"
            height="24px"
            width="24px"
            alt="Refresh ENS"
            className="hover:cursor-pointer"
            role="button"
            // TODO: implement this
          />
        </div>
      </div>

      <form className="mt-4 flex flex-col">
        <Input
          id="username"
          label="Username"
          value={formData.username}
          onChange={(val) => {
            console.log(val);
            const newFd = { ...formData, username: val };
            setFormData(newFd);
          }}
        />
        <Input
          id="full-name"
          outerClassName="mt-4"
          label={
            <>
              Full name <span className="text-indigoGray-20">(optional)</span>
            </>
          }
        />

        <div className="mt-6 flex items-center justify-center gap-6 p-4">
          <Image
            src={fileUrl || '/default-avi.png'}
            height="100px"
            width="100px"
            alt="Your profile picture"
            className="rounded-full border-[1.5px] border-indigoGray-30 object-cover"
          />

          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={onAddPicClick}
              variant="secondary"
              className="w-full uppercase"
            >
              Add picture
            </Button>
            <input
              ref={fileInputRef}
              accept="image/*"
              type="file"
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                } else {
                  console.error('Couldnt get file frome the input.');
                }
              }}
            />
            {fileUrl && (
              <Button
                onClick={onRemovePicClick}
                variant="tertiary"
                className="w-full uppercase"
              >
                Remove picture
              </Button>
            )}
          </div>
        </div>
      </form>
    </OnboardingLayout>
  );
};
