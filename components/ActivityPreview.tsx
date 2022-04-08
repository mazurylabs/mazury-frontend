import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import type { Activity } from 'types';
import { Avatar } from './Avatar';

interface ActivityPreviewProps {
  activity: Activity;
}

export const ActivityPreview: React.FC<ActivityPreviewProps> = ({
  activity,
}) => {
  const {
    type: activityType,
    image,
    description,
    created_at,
    user,
    currentUser,
  } = activity;

  if (activityType === 'new-badge') {
    return (
      <div className="flex w-full items-center">
        <Avatar
          src={image}
          width="64px"
          height="64px"
          className="border border-indigoGray-30"
        />

        <div className="ml-6 flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/icons/thumbs-up.svg"
                width="16px"
                height="16px"
                alt="Event icon"
              />
              <span className="ml-1 text-xs font-bold uppercase text-pink-500">
                Vote
              </span>
            </div>

            <span className="ml-4 text-xs font-medium text-indigoGray-50">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>

          <p>{description}</p>
        </div>
      </div>
    );
  }

  if (activityType === 'new-referral-received') {
    return <div>New referral received</div>;
  }
  if (activityType === 'new-referral-given') {
    return <div>referral given</div>;
  }

  if (activityType === 'new-post') {
    return <div>post</div>;
  }

  return null;
};
