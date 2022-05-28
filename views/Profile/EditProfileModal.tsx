import { Button, Input, Modal, RoleCard } from 'components';
import { OnboardingFormDataType } from 'contexts';
import { useProfile } from 'hooks';
import { useState, useEffect, useRef } from 'react';
import { FC } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Role } from 'types';
import { getMessageToBeSigned, updateProfile } from 'utils/api';
import { useSignMessage } from 'wagmi';

interface IEditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export const EditProfileModal: FC<IEditProfileModalProps> = ({
  isOpen,
  onClose,
  address,
}) => {
  const { mutate } = useSWRConfig();
  const { profile } = useProfile(address);
  const [formData, setFormData] = useState(profile);
  const [_, signMessage] = useSignMessage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState<string>();
  const [file, setFile] = useState<File | null>(null);
  const [shouldRemoveAvi, setShouldRemoveAvi] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
      const { data: messageToBeSigned } = await getMessageToBeSigned(address);
      if (!messageToBeSigned) {
        return toast.error('Failed to get message to be signed');
      }
      const { data: signature } = await signMessage({
        message: messageToBeSigned,
      });
      if (!signature) {
        return toast.error('Failed to sign message');
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
        signature,
        formDataToBeSent,
        file,
        shouldRemoveAvi
      );
      if (error || !data) {
        return toast.error('Failed to update profile');
      }
      toast.success('Profile updated successfully');
      mutate(`/profiles/${address}`);
      onClose();
    } catch (error) {
      // @ts-expect-error
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (file) {
      setShouldRemoveAvi(false);
      const fileUrl = URL.createObjectURL(file as Blob);
      setFileUrl(fileUrl);
    }
  }, [file]);

  if (!profile || !formData) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} containerClassName="">
      <Toaster />
      <div className="flex flex-col">
        <h3 className="text-xl font-medium text-indigoGray-90">
          Modify profile
        </h3>

        <div className="mt-6 flex">
          <div className="flex w-1/2 flex-col">
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
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    } else {
                      console.error('Couldnt get file frome the input.');
                    }
                  }}
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
                placeholder="Your full name"
                value={formData.full_name}
                onChange={(val) => setFormData({ ...formData, full_name: val })}
              />
              <Input
                label="Website (optional)"
                placeholder="Your website"
                value={formData.website}
                onChange={(val) => setFormData({ ...formData, website: val })}
              />
              <Input
                label="Bio (optional)"
                placeholder="Your bio"
                value={formData.bio}
                onChange={(val) => setFormData({ ...formData, bio: val })}
              />
            </form>
          </div>

          <div className="ml-6 flex w-1/2 flex-col">
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
