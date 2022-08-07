import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { Activity } from 'types';
import { returnTruncatedIfEthAddress } from 'utils';
import { Avatar } from './Avatar';

type AvatarSize = 'sm' | 'md' | 'lg';
interface ActivityPreviewProps {
  activity: Activity;
  avatarSize?: AvatarSize;
}

const avatarSizes = { sm: 16, md: 40, lg: 64 };
const smallAvatarPosition = {
  sm: 'top-4 left-4',
  md: 'top-6 left-6',
  lg: 'top-9 left-9',
};
const newBadgeImageWidths = {
  sm: 'w-[16px]',
  md: 'w-[40px]',
  lg: 'w-[64px]',
};

export const ActivityPreview: React.FC<ActivityPreviewProps> = ({
  activity,
  avatarSize = 'lg',
}) => {
  const {
    type: activityType,
    activity_datetime: created_at,
    user,
    metadata,
  } = activity;

  if (activityType === 'new-badge') {
    return (
      <div className="flex w-full items-center">
        <div className={newBadgeImageWidths[avatarSize]}>
          <Avatar
            src={metadata?.badge?.image_url as string}
            width={avatarSizes[avatarSize] * 0.62}
            height={avatarSizes[avatarSize]}
            borderRadius={'0%'}
            className="mx-auto"
          />
        </div>

        <div className="ml-6 flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/icons/award-pink.svg"
                width="16px"
                height="16px"
                alt="Badge icon"
              />
              <span className="ml-1 text-xs font-bold uppercase text-fuchsia-500">
                New badge
              </span>
            </div>

            <span className="ml-4 text-xs font-medium text-indigoGray-50">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>

          <p>
            <Link href={`/people/${user.username || user.eth_address}`}>
              <a className="font-bold">
                {returnTruncatedIfEthAddress(user.username as string)}
              </a>
            </Link>
            {' claimed badge '}
            {metadata?.badge?.name}
          </p>
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
            width={avatarSizes[avatarSize]}
            height={avatarSizes[avatarSize]}
            className="border border-indigoGray-30 object-cover"
          />
          <Avatar
            src={metadata?.referral_receiver?.avatar as string}
            width={avatarSizes[avatarSize] / 2}
            height={avatarSizes[avatarSize] / 2}
            className={
              'absolute border border-indigoGray-30 object-cover ' +
              smallAvatarPosition[avatarSize]
            }
          />
        </div>

        <div className="ml-6 flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/icons/referral-colored.svg"
                width="16px"
                height="16px"
                alt="Referral icon"
              />
              <span className="ml-1 text-xs font-bold uppercase text-emerald-700">
                Referral
              </span>
            </div>

            <span className="ml-4 text-xs font-medium text-indigoGray-50">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>

          <p>
            <Link
              href={`/people/${
                metadata?.referral_author?.username ||
                metadata?.referral_author?.eth_address
              }`}
            >
              <a className="font-bold">
                {returnTruncatedIfEthAddress(
                  metadata?.referral_author?.username as string
                )}
              </a>
            </Link>{' '}
            wrote a referral for{' '}
            <Link
              href={`/people/${
                metadata?.referral_receiver?.username ||
                metadata?.referral_receiver?.eth_address
              }`}
            >
              <a className="font-bold">
                {returnTruncatedIfEthAddress(
                  metadata?.referral_receiver?.username as string
                )}
              </a>
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (activityType === 'new-referral-given') {
    return (
      <div className="flex w-full items-center">
        <div className="relative">
          <Avatar
            src={metadata?.referral_author?.avatar as string}
            width={avatarSizes[avatarSize]}
            height={avatarSizes[avatarSize]}
            className="border border-indigoGray-30 object-cover"
          />
          <Avatar
            src={metadata?.referral_receiver?.avatar as string}
            width={avatarSizes[avatarSize] / 2}
            height={avatarSizes[avatarSize] / 2}
            className={
              'absolute border border-indigoGray-30 object-cover ' +
              smallAvatarPosition[avatarSize]
            }
          />
        </div>

        <div className="ml-6 flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/icons/referral-colored.svg"
                width="16px"
                height="16px"
                alt="Referral icon"
              />
              <span className="ml-1 text-xs font-bold uppercase text-emerald-700">
                Referral
              </span>
            </div>

            <span className="ml-4 text-xs font-medium text-indigoGray-50">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>

          <p>
            <Link
              href={`/people/${
                metadata?.referral_author?.username ||
                metadata?.referral_author?.eth_address
              }`}
            >
              <a className="font-bold">
                {returnTruncatedIfEthAddress(
                  metadata?.referral_author?.username as string
                )}
              </a>
            </Link>{' '}
            wrote a referral for{' '}
            <Link
              href={`/people/${
                metadata?.referral_receiver?.username ||
                metadata?.referral_receiver?.eth_address
              }`}
            >
              <a className="font-bold">
                {returnTruncatedIfEthAddress(
                  metadata?.referral_receiver?.username as string
                )}
              </a>
            </Link>
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
          width={avatarSizes[avatarSize]}
          height={avatarSizes[avatarSize]}
          className="border border-indigoGray-30"
        />

        <div className="ml-6 flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/icons/fire-indigo.svg"
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
            <Link href={`/people/${user?.username || user.eth_address}`}>
              <a className="font-bold">
                {returnTruncatedIfEthAddress(user?.username)}
              </a>
            </Link>{' '}
            attended <span className="italic">{metadata.event?.name}</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};
