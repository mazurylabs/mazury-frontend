import Image from 'next/image';
import React from 'react';
import { Avatar } from '.';

type Activity = 'event' | 'referral' | 'vote' | 'badge';

type MappedActivities<T> = { [Key in Activity]: T };

interface Props {
  thumbnailSrc: string;
  activityType: Activity;
  time: Date | string;
  label: string;
  avatarSize?: 'sm' | 'm' | 'lg';
}

const baseClass = 'uppercase text-xs font-bold';

const activityDetails: MappedActivities<{
  iconSrc: string;
  className: string;
}> = {
  event: {
    iconSrc: '/icons/fire.svg',
    className: `${baseClass} text-indigo-400`,
  },
  referral: {
    iconSrc: '/icons/message-circle coloured.svg',
    className: `${baseClass} text-teal-500`,
  },
  vote: {
    iconSrc: '/icons/thumbs-up.svg',
    className: `${baseClass} text-pink-500`,
  },
  badge: {
    iconSrc: '/icons/badge.svg',
    className: `${baseClass} text-pink-500`,
  },
};

const avatarSizes = { sm: 32, m: 40, lg: 64 };

export const ActivityPreview: React.FC<Props> = ({
  thumbnailSrc,
  activityType,
  time,
  label,
  avatarSize = 'lg',
}) => {
  const { iconSrc, className } = activityDetails[activityType];

  return (
    <div className="flex gap-4">
      <Avatar
        src={thumbnailSrc}
        height={avatarSizes[avatarSize]}
        width={avatarSizes[avatarSize]}
      />
      <div className="flex flex-col">
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Image
              src={iconSrc}
              alt={`${activityType} icon`}
              width="16px"
              height="16px"
            />
            <span className={className}>{activityType}</span>
          </div>

          <span className="text-xs">{time}</span>
        </div>
        <p>{label}</p>
      </div>
    </div>
  );
};
