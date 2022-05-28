import { Avatar, Button, ITagItem, Modal, Tags, XIcon } from 'components';
import { useReferralCount } from 'hooks';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { PersonBasicDetails, Referral } from 'types';
import { colors, toCamelCase, toCapitalizedWord } from 'utils';
import { createReferral, getMessageToBeSigned } from 'utils/api';
import { useAccount, useSignMessage } from 'wagmi';

interface WriteReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiver: PersonBasicDetails;
  // The referral that the user has already written for the receiver, if it exists
  existingReferral: Referral | null;
  // The referral that the user has received from the receiver, if it exists
  receivedReferral: Referral | null;
}

type IStatus = 'writing' | 'signing' | 'success' | 'error';

const defaultTags: ITagItem[] = [];

export const WriteReferralModal: FC<WriteReferralModalProps> = ({
  isOpen,
  onClose,
  receiver,
  existingReferral,
  receivedReferral,
}) => {
  const [tags, setTags] = useState<ITagItem[]>(defaultTags);
  const [content, setContent] = useState(existingReferral?.content || '');
  const [status, setStatus] = useState<IStatus>('writing');

  const [{ data: accountData }] = useAccount();
  const { referralCount: receiverReferralCount } = useReferralCount(
    receiver.eth_address
  );

  const authorAddress = accountData?.address;
  const receiverAddress = receiver.eth_address;

  const [_, signMessage] = useSignMessage();

  useEffect(() => {
    // Close the modal after 2 seconds if the referral was successfully published
    if (status === 'success') {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [status, onClose]);

  useEffect(() => {
    // If a referral already exists, set the content and tags
    if (existingReferral && isOpen) {
      setContent(existingReferral.content);
      const existingTags: ITagItem[] | undefined = existingReferral.skills?.map(
        (skill) => {
          return {
            value: skill.slug,
            color: colors.indigo,
            label: toCapitalizedWord(skill.name),
          };
        }
      );
      if (existingTags) {
        setTags(existingTags);
      }
    }
  }, [existingReferral, isOpen]);

  // Fired when a tag is removed
  const onRemove = (val: string) => {
    const newTags = tags.filter((tag) => tag.value !== val);
    setTags(newTags);
  };

  // Fired when the user clicks on the publish button
  const onSubmit = async () => {
    if (!authorAddress) {
      alert('Please connect your wallet first.');
      return setStatus('error');
    }
    setStatus('signing');
    const { data: messageToBeSigned } = await getMessageToBeSigned(
      authorAddress
    );
    if (!messageToBeSigned) {
      alert("Please try again later. (Couldn't get the message to be signed.)");
      return setStatus('error');
    }
    const { data: signature } = await signMessage({
      message: messageToBeSigned,
    });
    if (!signature) {
      alert("Please try again later. (Couldn't get the signed message)");
      return setStatus('error');
    }
    const skills = tags.map((tag) => tag.value);
    const { error } = await createReferral(
      receiverAddress,
      content,
      skills,
      signature
    );
    if (error) {
      alert(error);
      return setStatus('error');
    }
    setStatus('success');
  };

  const resetState = () => {
    setTags(defaultTags);
    setContent('');
    setStatus('writing');
  };

  const modalClassName = status === 'writing' ? 'w-[500px]' : 'w-fit';

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetState();
        onClose();
      }}
      containerClassName={modalClassName + ' max-w-full'}
    >
      <div className="flex flex-col">
        {status === 'writing' && (
          <>
            <div className="w-full">
              <div onClick={onClose} className="hover:cursor-pointer">
                <XIcon
                  color={colors.indigoGray[90]}
                  width="24px"
                  height="24px"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <Avatar
                src={receiver.avatar || '/avatar-2.png'}
                width="28px"
                height="28px"
              />

              <span className="ml-[14px] font-demi text-base font-bold text-indigoGray-90">
                {receiver.username}
              </span>

              {receiverReferralCount !== undefined ? (
                <span className="ml-auto text-xs font-medium text-indigoGray-50">
                  {receiverReferralCount} referrals
                </span>
              ) : null}
            </div>

            {/* TODO: Only show this part if the current user has received a referral from the person on the receiving end */}
            {receivedReferral && (
              <div className="mt-2 rounded-tl-[2px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border-[2px] border-indigoGray-30 bg-indigoGray-10 p-4 shadow-lg">
                <p className="text-sm font-medium text-indigoGray-80">
                  {receivedReferral.content}
                </p>
              </div>
            )}

            <textarea
              placeholder="Write your referral here..."
              className="mt-6 resize-none p-4 text-base font-medium text-indigoGray-50 placeholder:text-indigoGray-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50"
              rows={8}
              maxLength={400}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={!!existingReferral}
            />

            <span className="mt-6 text-base font-medium text-indigoGray-60">
              This person is excellent at...
            </span>

            <Tags
              tags={tags}
              onRemove={onRemove}
              className="mt-2"
              allowInput={!existingReferral}
              onAdd={(val) =>
                setTags([
                  ...tags,
                  // TODO: We need to do something about the value that we pass to the backend and the color
                  {
                    label: val,
                    color: colors.gray,
                    value: toCamelCase(val),
                  },
                ])
              }
              addButtonText="Add new skill"
            />
            <Button
              onClick={onSubmit}
              className="mt-6 uppercase"
              disabled={!!existingReferral}
            >
              {existingReferral
                ? 'Edit referral coming soon'
                : 'Publish referral'}
            </Button>
          </>
        )}

        {status === 'signing' && (
          <div className="flex flex-col">
            <h3 className="font-demi text-3xl text-indigoGray-90">
              Sign with wallet
            </h3>
            <span className="mt-2 text-sm text-indigoGray-60">
              Before we finish we need you to sign this with your wallet
            </span>

            <div className="mt-4 flex justify-center">
              <p>Spinner will be ported over here shortly</p>
            </div>

            <div className="mt-4 flex w-full justify-around gap-4">
              <Button variant="secondary" onClick={onClose}>
                CANCEL
              </Button>
              <Button onClick={onSubmit} variant="primary">
                RETRY
              </Button>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col">
            <h3 className="font-demi text-3xl text-indigoGray-90">
              Referral published
            </h3>

            <div className="mt-4 flex w-full justify-center">
              <Image
                src="/icons/success.png"
                height="64px"
                width="64px"
                alt="Success indicator"
              />
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col">
            <h3 className="font-demi text-3xl text-indigoGray-90">
              Connection failed
            </h3>
            <span className="mt-2 text-sm text-indigoGray-60">
              Something went wrong
            </span>

            <div className="mt-4 flex w-full justify-around gap-4">
              <Button variant="secondary" onClick={onClose}>
                CANCEL
              </Button>
              <Button onClick={onSubmit} variant="primary">
                RETRY
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
