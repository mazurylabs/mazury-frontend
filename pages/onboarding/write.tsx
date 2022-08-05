import { userSlice } from '@/selectors';
import { Avatar, OnboardingLayout } from 'components';
import { Tags, ITagItem } from 'components';
import { OnboardingContext } from 'contexts';
import { useReferralCount, useReferrals } from 'hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSWRConfig } from 'swr';
import { Referral } from 'types';
import {
  colors,
  getTruncatedAddress,
  hasAlreadyReferredReceiver,
  toCamelCase,
  toCapitalizedWord,
} from 'utils';
import { createReferral, getMessageToBeSigned } from 'utils/api';

const defaultTags: ITagItem[] = [];

const WritePage: NextPage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [tags, setTags] = useState<ITagItem[]>(defaultTags);

  // existingReferral is the referral that the referral that the user has authored for the receiver, if it exists
  const [existingReferral, setExistingReferral] = useState<Referral | null>(
    null
  );

  const [content, setContent] = useState(existingReferral?.content || '');
  const { referralReceiver: receiver } = useContext(OnboardingContext);
  const receiverAddress = receiver?.eth_address;

  const { referralCount: receiverReferralCount } = useReferralCount(
    receiverAddress as string
  );

  const { address } = useSelector(userSlice);

  // All th referrals received by the user
  const { referrals } = useReferrals(address as string);
  // All the referrals authored by the user
  const { referrals: authoredReferrals } = useReferrals(
    address as string,
    true
  );

  // If the user has already referred the receiver, we need to fetch the referral.
  useEffect(() => {
    if (authoredReferrals) {
      const foundExistingReferral = hasAlreadyReferredReceiver(
        authoredReferrals,
        receiverAddress as string,
        address as string
      );
      if (foundExistingReferral) {
        setExistingReferral(foundExistingReferral);
      }
    }
  }, [authoredReferrals, receiverAddress, address]);

  useEffect(() => {
    // If a referral already exists, set the content and tags
    if (existingReferral) {
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
  }, [existingReferral]);

  // Fired when a tag is removed
  const onRemove = (val: string) => {
    const newTags = tags.filter((tag) => tag.value !== val);
    setTags(newTags);
  };

  // Fired when the user clicks on the publish button
  const onSubmit = async () => {
    if (!receiverAddress) {
      router.push('/onboarding/refer');
      return;
    }
    if (!address) {
      return alert('Please connect your wallet first.');
    }

    const skills = tags.map((tag) => tag.value);
    const { error } = await createReferral(
      receiverAddress,
      content,
      skills,
      '',
      mutate,
      address
    );
    if (error) {
      return alert(error);
    }
    alert('Referral created successfully!');
  };

  const receivedReferralContent = useMemo(
    () =>
      referrals?.find(
        (referral) => referral.author.eth_address === receiverAddress
      )?.content,
    [referrals, receiverAddress]
  );

  return (
    <OnboardingLayout
      firstHeading="Referrals"
      secondHeading={null}
      bottomButtonText={
        existingReferral
          ? 'UPDATE REFERRAL - COMING SOON'
          : 'PUBLISH AND CONTINUE'
      }
      bottomButtonDisabled={!!existingReferral}
      bottomButtonOnClick={existingReferral ? async () => {} : onSubmit}
    >
      <div className="mt-[14px] flex flex-col">
        <div className="flex items-center">
          <Avatar
            src={receiver?.avatar || '/avatar-2.png'}
            width="28px"
            height="28px"
          />

          <span className="ml-[14px] font-demi text-base font-bold text-indigoGray-90">
            {receiver?.username ||
              receiver?.ens_name ||
              getTruncatedAddress(receiver?.eth_address)}
          </span>

          {receiverReferralCount && (
            <span className="ml-auto text-xs font-medium text-indigoGray-50">
              {receiverReferralCount} referrals
            </span>
          )}
        </div>

        {receivedReferralContent && (
          <div className="mt-2 rounded-tl-[2px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border-[2px] border-indigoGray-30 bg-indigoGray-10 p-4 shadow-lg">
            <p className="text-sm font-medium text-indigoGray-80">
              {receivedReferralContent}
            </p>
          </div>
        )}

        <textarea
          placeholder="Write your referral here..."
          className="mt-6 resize-none p-4 text-base font-medium text-indigoGray-50 placeholder:text-indigoGray-50 disabled:cursor-not-allowed disabled:opacity-50"
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
        />
      </div>
    </OnboardingLayout>
  );
};

export default WritePage;
