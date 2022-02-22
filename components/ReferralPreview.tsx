import React, { useState, useEffect } from 'react';
import { Avatar, ITagItem, Tags } from '.';
import { Skill } from 'types';
import { colors, toCapitalizedWord } from 'utils';

interface Props {
  referredBy: {
    avatarSrc: string;
    username: string;
  };
  text: string;
  skills: Skill[];
}

export const ReferralPreview: React.FC<Props> = ({
  referredBy,
  text,
  skills,
}) => {
  const [tags, setTags] = useState<ITagItem[]>([]);

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
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Avatar
          src={referredBy.avatarSrc || '/avatar-2.png'}
          alt={`${referredBy.username} avatar`}
          width="32px"
          height="32px"
        />
        <h5 className="w-1/12 overflow-ellipsis font-serif text-xl font-bold text-indigoGray-90">
          {referredBy.username.slice(0, 15)}
        </h5>
        <span className="ml-auto text-sm text-indigoGray-50">13 referrals</span>
      </div>

      <p className="text-base text-indigoGray-80">{text}</p>

      <Tags tags={tags} />
    </div>
  );
};
