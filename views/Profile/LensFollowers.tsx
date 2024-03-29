import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { MutualFollowers } from 'types';
import { formatIpfsImage, plurify } from 'utils';

export const LensFollowers = ({
  remainder,
  mutuals,
  className,
}: {
  remainder: number;
  mutuals: MutualFollowers['items'];
  className?: string;
}) => {
  if (!mutuals || mutuals.length === 0) return null;

  return (
    <div className={clsx('space-y-2', className)}>
      <div className="flex items-center space-x-[3.5px]">
        <div className="flex space-x-[-6px]">
          {mutuals?.map((follower, index) => {
            return (
              <img
                key={follower.id}
                src={formatIpfsImage(follower.picture.original.url)}
                className={`h-6 w-6 rounded-full`}
                style={{
                  zIndex: mutuals.length - index,
                  marginLeft: index ? -4 : 0,
                }}
              />
            );
          })}
        </div>

        <p className="font-sansMid text-xs font-medium text-indigoGray-50">
          {mutuals?.map(({ handle, id, ownedBy }) => {
            const noMutuals = id === mutuals[mutuals.length - 1].id;
            return (
              <span key={handle + id}>
                <Link legacyBehavior href={`/people/${ownedBy}`}>
                  <a className="cursor-pointer">{handle}</a>
                </Link>
                {noMutuals ? '' : `${!!remainder ? ', ' : ' and '}`}
              </span>
            );
          })}
          {!!remainder && ', and ' + remainder + plurify(+remainder, ' other')}
        </p>
      </div>
    </div>
  );
};
