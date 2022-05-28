import React, { useState, useEffect, useMemo } from 'react';
import { Avatar, ITagItem, Tags } from '.';
import { Referral, Skill } from 'types';
import { colors, getMonthAndYear, toCapitalizedWord } from 'utils';
import { useReferralCount } from 'hooks';
import Link from 'next/link';

interface Props {
  referral: Referral;

  // if true, show the receiver's details
  alternate?: boolean;
}

export const ReferralPreview: React.FC<Props> = ({
  referral,
  alternate = false,
}) => {
  const referredBy = alternate ? referral.receiver : referral.author;
  const skills = referral.skills;
  const date = referral.created_at;
  const text = referral.content;

  const [tags, setTags] = useState<ITagItem[]>([]);
  const slicedTags = useMemo(() => tags.slice(0, 3), [tags]);
  const remainingTagsCount = useMemo(() => tags.length - 3, [tags]);
  const { referralCount } = useReferralCount(referredBy.eth_address);

  const appendedContent = useMemo(() => {
    if (remainingTagsCount > 0) {
      return (
        <div className="max-w-fit rounded border border-indigoGray-20 py-1 px-2 text-xs font-bold text-indigoGray-90">
          {remainingTagsCount} more categories
        </div>
      );
    } else {
      return null;
    }
  }, [remainingTagsCount]);

  useEffect(() => {
    setTags(
      skills?.map((skill) => ({
        color: colors.gray,
        label: toCapitalizedWord(skill.name),
        value: skill.slug,
        showRemove: false,
      })) || []
    );
  }, [skills]);

  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-indigoGray-20 p-6">
      <div className="flex h-[40px] items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Avatar
          src={referredBy.avatar || '/avatar-2.png'}
          alt={`${referredBy.username} avatar`}
          width="40px"
          height="40px"
        />
        <div className="flex flex-col">
          <span className="text-xs font-medium text-teal-500">
            {getMonthAndYear(new Date(date))}
          </span>
          <Link href={`/people/${referredBy.username}`}>
            <a className="w-1/12 overflow-ellipsis font-serif text-xl font-bold text-indigoGray-90">
              {referredBy.username.slice(0, 15)}
            </a>
          </Link>
        </div>

        {referralCount !== undefined && (
          <span className="ml-auto text-sm text-indigoGray-50">
            {referralCount} referrals
          </span>
        )}
      </div>

      <p className="text-base text-indigoGray-80">{text}</p>

      <Tags
        className="mt-auto"
        tags={slicedTags}
        appendedContent={appendedContent}
      />
    </div>
  );
};
