import Image from 'next/image';
import React from 'react';
import { Avatar } from '.';
import { Skill } from '../types';

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
  return (
    <div className='flex flex-col gap-2 p-4 rounded-lg border-2 border-indigoGray-20 w-full'>
      <div className='flex items-center gap-2'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Avatar
          src={referredBy.avatarSrc || '/avatar-2.png'}
          alt={`${referredBy.username} avatar`}
          width='32px'
          height='32px'
        />
        <h5 className='text-indigoGray-90 text-xl font-bold font-serif overflow-ellipsis w-1/12'>
          {referredBy.username.slice(0, 15)}
        </h5>
        <span className='ml-auto text-sm text-indigoGray-50'>13 referrals</span>
      </div>

      <p className='text-base text-indigoGray-80'>{text}</p>
    </div>
  );
};
