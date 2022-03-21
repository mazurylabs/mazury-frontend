import React, { useState, useEffect, useMemo } from 'react';
import { Avatar, ITagItem, Tags } from '.';
import { Skill } from 'types';
import { colors, getMonthAndYear, toCapitalizedWord } from 'utils';

interface Props {
  referredBy: {
    avatarSrc: string;
    username: string;
  };
  text: string;
  skills: Skill[];
  date: Date | string;
}

export const ReferralPreview: React.FC<Props> = ({
  referredBy,
  text,
  skills,
  date,
}) => {
  const [tags, setTags] = useState<ITagItem[]>([]);
  const slicedTags = useMemo(() => tags.slice(0, 3), [tags]);
  const remainingTagsCount = useMemo(() => tags.length - 3, [tags]);

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
      skills.map((skill) => ({
        color: colors.gray,
        label: toCapitalizedWord(skill),
        value: skill,
        showRemove: false,
      }))
    );
  }, [skills]);

  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl border border-indigoGray-20 p-6">
      <div className="flex h-[40px] items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Avatar
          src={referredBy.avatarSrc || '/avatar-2.png'}
          alt={`${referredBy.username} avatar`}
          width="40px"
          height="40px"
        />
        <div className="flex flex-col">
          <span className="text-xs font-medium text-teal-500">
            {getMonthAndYear(new Date(date))}
          </span>
          <h5 className="w-1/12 overflow-ellipsis font-serif text-xl font-bold text-indigoGray-90">
            {referredBy.username.slice(0, 15)}
          </h5>
        </div>

        <span className="ml-auto text-sm text-indigoGray-50">13 referrals</span>
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
