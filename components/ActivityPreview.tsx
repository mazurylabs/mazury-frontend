import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import type { Activity } from 'types';
import { returnTruncatedIfEthAddress } from 'utils';
import { Avatar } from './Avatar';

interface ActivityPreviewProps {
  activity: Activity;
}

export const ActivityPreview: React.FC<ActivityPreviewProps> = ({
  activity,
}) => {
  const { type: activityType, created_at, user, metadata } = activity;

  if (activityType === 'new-badge') {
    return (
      <div className="flex w-full items-center">
        <Avatar
          src={metadata?.badge?.image_url as string}
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
                alt="Badge icon"
              />
              <span className="ml-1 text-xs font-bold uppercase text-pink-500">
                New badge
              </span>
            </div>

            <span className="ml-4 text-xs font-medium text-indigoGray-50">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>

          <p>{metadata?.badge?.name}</p>
        </div>
      </div>
    );
  }

  if (activityType === 'new-referral-received') {
    return (
      <div className="flex w-full items-center">
        <div className="relative">
          <Avatar
            src={metadata?.referral_author?.avatar as string}
            width="64px"
            height="64px"
            className="border border-indigoGray-30"
          />
          <Avatar
            src={metadata?.referral_receiver?.avatar as string}
            width="32px"
            height="32px"
            className="absolute top-8 left-8 border border-indigoGray-30"
          />
        </div>

        <div className="ml-6 flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/icons/message-circle coloured.svg"
                width="16px"
                height="16px"
                alt="Referral icon"
              />
              <span className="ml-1 text-xs font-bold uppercase text-teal-500">
                Referral
              </span>
            </div>

            <span className="ml-4 text-xs font-medium text-indigoGray-50">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>

          <p>
            <span className="font-bold">
              {returnTruncatedIfEthAddress(
                metadata?.referral_author?.username as string,
                5
              )}
            </span>{' '}
            wrote a referral for{' '}
            <span className="font-bold">
              {returnTruncatedIfEthAddress(
                metadata?.referral_receiver?.username as string,
                5
              )}
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (activityType === 'new-referral-given') {
    return (
      <div className="flex w-full items-center">
        <Avatar
          src={metadata?.referral_receiver?.avatar as string}
          width="64px"
          height="64px"
          className="border border-indigoGray-30"
        />

        <div className="ml-6 flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/icons/message-circle coloured.svg"
                width="16px"
                height="16px"
                alt="Referral icon"
              />
              <span className="ml-1 text-xs font-bold uppercase text-teal-500">
                Referral
              </span>
            </div>

            <span className="ml-4 text-xs font-medium text-indigoGray-50">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>

          <p>
            <span className="font-bold">
              {returnTruncatedIfEthAddress(
                metadata?.referral_author?.username as string,
                5
              )}
            </span>{' '}
            wrote a referral for{' '}
            <span className="font-bold">
              {returnTruncatedIfEthAddress(
                metadata?.referral_receiver?.username as string,
                5
              )}
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (activityType === 'new-event-attended') {
    return (
      <div className="flex w-full items-center">
        <Avatar
          src={metadata.event?.image_url as string}
          width="64px"
          height="64px"
          className="border border-indigoGray-30"
        />

        <div className="ml-6 flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/icons/fire.svg"
                width="16px"
                height="16px"
                alt="Event icon"
              />
              <span className="ml-1 text-xs font-bold uppercase text-indigo-400">
                Event
              </span>
            </div>

            <span className="ml-4 text-xs font-medium text-indigoGray-50">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>

          <p>
            <span className="font-bold">{user?.username}</span> attended{' '}
            <span className="italic">{metadata.event?.name}</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};
