import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';

import { truncateString } from 'utils';
import { Post } from 'types';

export const MirrorPost = ({
  author,
  preview,
  url,
  title,
  posted_at,
  background_image,
  hideBanner,
}: Post & { hideBanner?: boolean }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={url}
      className="mb-6 flex w-full flex-col space-y-3 overflow-hidden rounded-lg bg-indigoGray-5 hover:bg-indigoGray-10"
    >
      {!hideBanner && (
        <div className="flex h-[200px] w-full items-center justify-center bg-indigoGray-10 lg:w-[401.3px]">
          <img
            src={background_image || '/icons/brokenImage.svg'}
            className={clsx(
              'h-full w-full object-contain',
              !background_image && 'h-[48px] w-[48px]'
            )}
            onError={(event) => {
              event.currentTarget.src = '/icons/brokenImage.svg';
            }}
            alt="banner"
          />
        </div>
      )}

      <div className="space-y-3 py-3 px-4">
        <div className="flex items-center space-x-2">
          <img
            className="h-8 w-8 rounded-full"
            src={author.avatar}
            alt={author.username}
          />
          <p className="font-sans text-sm font-semibold text-indigoGray-90">
            {author.username || author.ens_name}
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-sansMid font-medium text-indigoGray-90">{title}</p>
          <p className="font-sans text-sm text-indigoGray-90">
            {truncateString(preview, 100)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-sansMid text-xs font-medium text-indigoGray-90">
            {new Date(posted_at).toLocaleDateString()}
          </p>
          <div className="flex items-center space-x-2 font-sans text-xs font-semibold text-sky-600">
            <SVG height={16} width={16} src="/icons/mirror-icon-blue.svg" />
            <span>See on Mirror</span>
            <SVG
              src="/icons/chevron-right.svg"
              className="text-sky-600"
              height={16}
              width={16}
            />
          </div>
        </div>
      </div>
    </a>
  );
};
