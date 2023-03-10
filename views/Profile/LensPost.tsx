import * as React from 'react';
import SVG from 'react-inlinesvg';

import { truncateString } from 'utils';

interface LensPost {
  replies: string;
  likes: string;
  quotes: string;
  saves: string;
  author: { username: string; avatar: string };
  description: string;
  url: string;
}

export const LensPost = ({
  replies,
  likes,
  quotes,
  saves,
  url,
  author,
  description,
}: LensPost) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={url}
      className="mb-6 flex w-full flex-col space-y-3 rounded-lg bg-indigoGray-5 py-3 px-4 hover:bg-indigoGray-10"
    >
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <img
            className="h-8 w-8 rounded-full"
            src={author.avatar}
            alt={author.username}
          />
          <p className="font-sans text-sm font-semibold text-indigoGray-90">
            {author.username}
          </p>
        </div>

        <p className="font-sans text-sm text-indigoGray-90">
          {truncateString(description, 100)}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
            <SVG
              height={16}
              width={16}
              src="/icons/message-circle.svg"
              className="mr-1"
            />
            {replies}
          </p>
          <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
            <SVG
              height={16}
              width={16}
              src="/icons/repeat.svg"
              className="mr-1"
            />
            {quotes}
          </p>
          <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
            <SVG
              height={16}
              width={16}
              src="/icons/heart-black.svg"
              className="mr-1"
            />
            {likes}
          </p>
          <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
            <SVG
              height={16}
              width={16}
              src="/icons/folder.svg"
              className="mr-1"
            />
            {saves}
          </p>
        </div>

        <div className="flex items-center space-x-2 font-sans text-xs font-semibold text-[#8b5df5]">
          <SVG height={16} width={16} src="/icons/lenster-indigo.svg" />
          <span>See on Lenster</span>
          <SVG src="/icons/chevron-right-indigo.svg" height={16} width={16} />
        </div>
      </div>
    </a>
  );
};
