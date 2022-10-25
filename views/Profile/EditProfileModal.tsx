import * as React from 'react';
import Image from 'next/image';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

import { Role } from 'types';
import { updateProfile } from 'utils/api';
import { useMobile } from 'hooks';
import { OnboardingFormDataType } from 'contexts';
import { userSlice } from '@/selectors';
import { Button, Input, Modal, RoleCard, WalletRequestModal } from 'components';
import { updateUserProfile } from '@/slices/user';

type Steps = 'active' | 'idle' | 'error';

interface IEditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export const EditProfileModal: React.FC<IEditProfileModalProps> = ({
  isOpen,
  onClose,
  address,
}) => {
  const isMobile = useMobile();
  const dispatch = useDispatch();
  const { profile } = useSelector(userSlice);
  const [formData, setFormData] = React.useState(profile);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = React.useState<string>();
  const [file, setFile] = React.useState<File | null>(null);
  const [shouldRemoveAvi, setShouldRemoveAvi] = React.useState(false);
  const [walletRequestStep, setWalletRequestStep] =
    React.useState<Steps>('idle');

  const [isLoading, setIsLoading] = React.useState(false);

  const onAddPicClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onRemovePicClick = () => {
    setFileUrl('');
    setFile(null);
    // @ts-expect-error
    setFormData({
      ...formData,
      avatar: '',
    });
    setShouldRemoveAvi(true);
  };

  const handleRoleClick = (role: Role) => {
    // @ts-expect-error
    setFormData({
      ...formData,
      [role]: !formData![role],
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!formData) {
        return toast.error('Something went wrong.');
      }

      const formDataToBeSent: OnboardingFormDataType = {
        website: formData.website,
        bio: formData.bio,
        full_name: formData.full_name,
        role_community_manager: formData.role_community_manager,
        role_developer: formData.role_developer,
        role_designer: formData.role_designer,
        role_trader: formData.role_trader,
        role_creator: formData.role_creator,
        role_researcher: formData.role_researcher,
      };

      const { data, error } = await updateProfile(
        address,
        '',
        formDataToBeSent,
        file,
        shouldRemoveAvi
      );

      dispatch(updateUserProfile({ ...data, avatar: fileUrl }));

      if (error || !data) {
        setWalletRequestStep('error');
        return toast.error('Failed to update profile');
      }

      toast.success('Profile updated successfully');
      setWalletRequestStep('idle');
      onClose();
    } catch (error) {
      // @ts-expect-error
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file as Blob);

    setFile(event.target.files[0]);
    setShouldRemoveAvi(false);
    setFileUrl(fileUrl);
  };

  if (!profile || !formData) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClassName={isMobile ? 'w-full' : ''}
    >
      <Toaster />

      <WalletRequestModal
        step={walletRequestStep}
        handleSkip={() => setWalletRequestStep('idle')}
        handleRequestSignature={handleSubmit}
      />
      <div className="flex flex-col">
        <div className="flex">
          <Image
            src="/icons/x.svg"
            className="cursor-pointer"
            onClick={onClose}
            alt="Close modal"
            width="24px"
            height="24px"
          />

          <h3 className="ml-4 text-xl font-medium text-indigoGray-90">
            Modify profile
          </h3>
        </div>

        <div
          className={`mt-6 flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6`}
        >
          <div className={`flex ${isMobile ? 'w-full' : 'w-1/2'} flex-col`}>
            <div className="flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fileUrl || formData.avatar || '/default-avi.png'}
                alt="Your avatar"
                className="h-[100px] w-[100px] rounded-full border-[1.5px] border-indigoGray-30 object-cover"
              />
              <div className="ml-6 flex flex-col">
                <Button variant="secondary" onClick={onAddPicClick}>
                  CHANGE PICTURE
                </Button>
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  type="file"
                  hidden
                  onChange={handleFileUpload}
                />

                <Button
                  variant="tertiary"
                  className="mt-2 text-indigoGray-50"
                  onClick={onRemovePicClick}
                >
                  REMOVE PICTURE
                </Button>
              </div>
            </div>

            <form className="mt-6 flex flex-col gap-6">
              <Input
                label="Full name (optional)"
                placeholder="Vitalik Buterin"
                value={formData.full_name}
                onChange={(val) => setFormData({ ...formData, full_name: val })}
              />
              <Input
                label="Website URL"
                placeholder="https://vitalik.ca/"
                value={formData.website}
                onChange={(val) => setFormData({ ...formData, website: val })}
              />
              <Input
                label="Bio"
                placeholder="Founder of ethereum"
                value={formData.bio}
                onChange={(val) => setFormData({ ...formData, bio: val })}
              />
            </form>
          </div>

          <div className={`flex ${isMobile ? 'w-full' : 'w-1/2'} flex-col`}>
            <div className="grid grid-cols-3 gap-3">
              <RoleCard
                role="role_developer"
                iconSrc="/icons/roles/developer.svg"
                coloredSrc="/icons/roles/colored/developer.svg"
                onClick={() => handleRoleClick('role_developer')}
                selected={formData.role_developer}
                className="h-[108px]"
              />
              <RoleCard
                role="role_designer"
                iconSrc="/icons/roles/designer.svg"
                coloredSrc="/icons/roles/colored/designer.svg"
                onClick={() => handleRoleClick('role_designer')}
                selected={formData.role_designer}
                className="h-[108px]"
              />
              <RoleCard
                role="role_trader"
                iconSrc="/icons/roles/trader.svg"
                coloredSrc="/icons/roles/colored/trader.svg"
                onClick={() => handleRoleClick('role_trader')}
                selected={formData.role_trader}
                className="h-[108px]"
              />
              <RoleCard
                role="role_creator"
                iconSrc="/icons/roles/creator.svg"
                coloredSrc="/icons/roles/colored/creator.svg"
                onClick={() => handleRoleClick('role_creator')}
                selected={formData.role_creator}
                className="h-[108px]"
              />
              <RoleCard
                role="role_researcher"
                iconSrc="/icons/roles/researcher.svg"
                coloredSrc="/icons/roles/colored/researcher.svg"
                onClick={() => handleRoleClick('role_researcher')}
                selected={formData.role_researcher}
                className="h-[108px]"
              />
              <RoleCard
                role="role_investor"
                iconSrc="/icons/roles/investor.svg"
                coloredSrc="/icons/roles/colored/investor.svg"
                onClick={() => handleRoleClick('role_investor')}
                selected={formData.role_investor}
                className="h-[108px]"
              />
              <RoleCard
                role="role_community_manager"
                iconSrc="/icons/roles/community.svg"
                coloredSrc="/icons/roles/colored/community.svg"
                onClick={() => handleRoleClick('role_community_manager')}
                selected={formData.role_community_manager}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="mt-6"
            >
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
