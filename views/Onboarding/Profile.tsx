import { Button, Input, OnboardingLayout } from 'components';
import { OnboardingContext } from 'contexts';
import { useDebounce } from 'hooks';
import Image from 'next/image';
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { isValid } from 'utils/api';
import { useAccount } from 'wagmi';

export const ProfileView: FC = () => {
  const {
    formData,
    setFormData,
    avatarFile: file,
    setAvatarFile: setFile,
    valid,
    setValid,
  } = useContext(OnboardingContext);
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState<string>();
  const debouncedUsername = useDebounce(formData.username);
  const canContinue = valid.username;

  const onAddPicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onRemovePicClick = () => {
    setFileUrl('');
    setFile(null);
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
    checkIfValid('username');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUsername]);

  useEffect(() => {
    if (file) {
      const fileUrl = URL.createObjectURL(file as Blob);
      setFileUrl(fileUrl);
    }
  }, [file]);

  const displayName = formData.ens_name || accountData?.ens;

  const hasEns = !!accountData?.ens;

  const greeting = displayName ? `Hi, ${displayName}!` : 'Hi there!';

  return (
    <OnboardingLayout
      firstHeading="Profile information"
      secondHeading={greeting}
      bottomButtonDisabled={!canContinue}
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
          {hasEns ? (
            <>
              <span className="text-black mt-1 text-lg font-medium">
                {formData.ens_name}
              </span>
              {/* TODO: Fix overflowing text */}
              <span className="mt-1 text-xs font-medium text-black-700">
                {formData.eth_address}
              </span>
            </>
          ) : (
            <span className="text-black mt-1 text-lg font-medium">
              {formData.eth_address || '...'}
            </span>
          )}
        </div>

        {/* <div className="mr-6 flex w-1/4 items-center justify-end">
          <Image
            src="/icons/refresh.svg"
            height="24px"
            width="24px"
            alt="Refresh ENS"
            className="hover:cursor-pointer"
            role="button"
            // TODO: implement this
          />
        </div> */}
      </div>

      <form className="mt-4 flex flex-col">
        <Input
          id="username"
          label="Username"
          value={formData.username}
          onChange={(val) => {
            const newFd = { ...formData, username: val };
            setFormData(newFd);
          }}
          error={!valid.username}
        />
        {!valid.username && (
          <span className="mt-1 text-sm text-red-500">
            Please choose a different username.
          </span>
        )}

        <Input
          id="full-name"
          outerClassName="mt-4"
          label={
            <>
              Full name <span className="text-indigoGray-20">(optional)</span>
            </>
          }
        />

        <div className="mt-6 flex items-center justify-center gap-6 p-4 sm:justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fileUrl || formData?.avatar || '/default-avi.png'}
            alt="Your profile picture"
            className="h-[100px] w-[100px] rounded-full border-[1.5px] border-indigoGray-30 object-cover"
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
