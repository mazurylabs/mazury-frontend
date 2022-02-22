import { Button, Input, OnboardingLayout } from 'components';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';

export const ProfileView: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>();

  const onAddPicClick = () => {
    if (fileInputRef.current) {
      console.log(fileInputRef);
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

  return (
    <OnboardingLayout
      firstHeading="Profile information"
      secondHeading="Hi, wojtek.eth!"
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
            wojtek.eth
          </span>
          {/* TODO: Fix overflowing text */}
          <span className="mt-1 text-xs font-medium text-black-700">
            0xF417ACe7b13c0ef4fcb55483 90a450A4B75D3eB3
          </span>
        </div>

        <div className="mr-6 flex w-1/4 items-center justify-end">
          <Image
            src="/icons/refresh.svg"
            height="24px"
            width="24px"
            alt="Refresh ENS"
          />
        </div>
      </div>

      <form className="mt-4 flex flex-col">
        <Input id="username" label="Username" />
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
