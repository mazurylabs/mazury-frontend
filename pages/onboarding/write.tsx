import { Avatar, OnboardingLayout } from 'components';
import { Tags, ITagItem } from 'components';
import { NextPage } from 'next';
import { useState } from 'react';
import { colors } from 'utils';

const WritePage: NextPage = () => {
  const [tags, setTags] = useState<ITagItem[]>([
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
  ]);

  const onRemove = (val: string) => {
    const newTags = tags.filter((tag) => tag.value !== val);
    setTags(newTags);
  };

  return (
    <OnboardingLayout
      firstHeading="Referrals"
      secondHeading={null}
      bottomButtonText="PUBLISH AND CONTINUE"
    >
      <div className="mt-[14px] flex flex-col">
        <div className="flex items-center">
          <Avatar src="/avatar-2.png" width="28px" height="28px" />

          <span className="ml-[14px] font-demi text-base font-bold text-indigoGray-90">
            0xluc.eth
          </span>

          <span className="ml-auto text-xs font-medium text-indigoGray-50">
            13 referrals
          </span>
        </div>

        <div className="mt-2 rounded-tl-[2px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border-[2px] border-indigoGray-30 bg-indigoGray-10 p-4 shadow-lg">
          <p className="text-sm font-medium text-indigoGray-80">
            wojtek is one of the smartest and kindest friends i&apos;ve had the
            honor to meet. unreserved support for whatever he brings into
            existence with his big brain. LFG 🌊
          </p>
          {/* TODO: Tags component */}
        </div>

        <textarea
          placeholder="Write your referral here..."
          className="mt-6 resize-none p-4 text-base font-medium text-indigoGray-50 placeholder:text-indigoGray-50"
          rows={8}
          maxLength={400}
        />

        <span className="mt-6 text-base font-medium text-indigoGray-60">
          This person is excellent at...
        </span>

        <Tags tags={tags} onRemove={onRemove} className="mt-2" />
      </div>
    </OnboardingLayout>
  );
};

export default WritePage;
