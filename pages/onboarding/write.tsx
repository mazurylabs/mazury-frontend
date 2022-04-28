import { Avatar, OnboardingLayout } from 'components';
import { Tags, ITagItem } from 'components';
import { OnboardingContext } from 'contexts';
import { useReferrals } from 'hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
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
import { useAccount, useSignMessage } from 'wagmi';

const defaultTags = [
  {
    label: 'Frontend development',
    color: colors.indigo,
    value: 'frontend',
  },
  {
    label: 'Solidity',
    color: colors.amber,
    value: 'solidity',
  },
  {
    label: 'Community',
    color: colors.emerald,
    value: 'community',
  },
];

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

  const [{ data: accountData }] = useAccount();
  const authorAddress = accountData?.address;

  const [_, signMessage] = useSignMessage();

  // All th referrals received by the user
  const { referrals } = useReferrals(authorAddress as string);
  // All the referrals authored by the user
  const { referrals: authoredReferrals } = useReferrals(
    authorAddress as string,
    true
  );

  // If the user has already referred the receiver, we need to fetch the referral.
  useEffect(() => {
    if (authoredReferrals) {
      const foundExistingReferral = hasAlreadyReferredReceiver(
        authoredReferrals,
        receiverAddress as string,
        authorAddress as string
      );
      if (foundExistingReferral) {
        setExistingReferral(foundExistingReferral);
      }
    }
  }, [authoredReferrals, receiverAddress, authorAddress]);

  useEffect(() => {
    // If a referral already exists, set the content and tags
    if (existingReferral) {
      setContent(existingReferral.content);
      const existingTags: ITagItem[] | undefined = existingReferral.skills?.map(
        (skill) => {
          return {
            value: skill,
            color: colors.indigo,
            label: toCapitalizedWord(skill),
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
    if (!authorAddress) {
      return alert('Please connect your wallet first.');
    }
    const { data: messageToBeSigned } = await getMessageToBeSigned(
      authorAddress
    );
    if (!messageToBeSigned) {
      return alert(
        "Please try again later. (Couldn't get the message to be signed.)"
      );
    }
    const { data: signature } = await signMessage({
      message: messageToBeSigned,
    });
    if (!signature) {
      return alert("Please try again later. (Couldn't get the signed message)");
    }
    const skills = tags.map((tag) => tag.value);
    const { error } = await createReferral(
      receiverAddress,
      content,
      skills,
      signature,
      mutate,
      authorAddress
    );
    if (error) {
      return alert(error);
    }
    alert('Referral created successfully!');
  };

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

          <span className="ml-auto text-xs font-medium text-indigoGray-50">
            13 referrals
          </span>
        </div>

        <div className="mt-2 rounded-tl-[2px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border-[2px] border-indigoGray-30 bg-indigoGray-10 p-4 shadow-lg">
          <p className="text-sm font-medium text-indigoGray-80">
            {
              referrals.find(
                (referral) => referral.author.eth_address === receiverAddress
              )?.content
            }
          </p>
        </div>

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
