import { Post } from '@/types';
import Image from 'next/image';
import React from 'react';
import { Avatar } from '.';

interface GMPostProps {
  author: {
    avatarSrc: string;
    username: string;
  };
  content: string;
  upvoteCount: number;
  commentCount: number;
  link: string;
}

export const GMPost: React.FC<GMPostProps> = ({
  author,
  content,
  upvoteCount,
  commentCount,
  link,
}) => {
  return (
    <div
      className="flex flex-col gap-4 rounded-xl border p-6 transition-shadow hover:cursor-pointer hover:shadow-lg"
      onClick={() => window.open(link, '_blank')}
    >
      <div className="flex items-center gap-2">
        <Avatar
          src={author.avatarSrc}
          alt={`${author.username}'s avatar`}
          width="32px"
          height="32px"
        />
        <h5 className="font-serif text-xl font-bold text-indigoGray-90">
          {author.username}
        </h5>

        <span className="ml-auto flex h-[32px] w-[64px] items-center justify-center rounded-xl border-2 border-blue-600 px-6 py-1 text-sm text-blue-600">
          gm
        </span>
      </div>
      <p className="text-[16px] text-indigoGray-80">{content}</p>
      <div className="flex items-center">
        <Image
          src="/icons/arrow-circle-up.svg"
          alt="Upvote post"
          width="16px"
          height="16px"
        />
        <span className="mx-1 text-xs text-indigoGray-90">{upvoteCount}</span>
        <Image
          src="/icons/arrow-circle-down.svg"
          alt="Downvote post"
          width="16px"
          height="16px"
        />

        <div className="ml-4"></div>
        <Image
          src="/icons/comment-alt.svg"
          alt="Comment icon"
          width="16px"
          height="16px"
        />
        <span className="ml-1 text-xs text-indigoGray-90">{commentCount}</span>
      </div>
    </div>
  );
};

interface MirrorPostProps {
  author: {
    avatarSrc: string;
    username: string;
  };
  title: string;
  link: string;
  bgImageSrc: string;
  source: Post['source'];
}

export const MirrorPost: React.FC<MirrorPostProps> = ({
  author,
  title,
  link,
  bgImageSrc,
  source,
}) => {
  return (
    <div className="relative">
      <div
        className="z-10 flex h-full flex-col gap-4 rounded-xl border bg-transparent p-6 shadow-base transition-shadow hover:cursor-pointer hover:shadow-lg"
        onClick={() => window.open(link, '_blank')}
      >
        <div className="flex items-center gap-2">
          <Avatar
            src={author.avatarSrc}
            alt={`${author.username}'s avatar`}
            width="32px"
            height="32px"
          />
          <h5 className="font-serif text-xl font-bold text-indigoGray-90">
            {author.username}
          </h5>

          <span
            className={`ml-auto flex h-[32px] w-[64px] items-center justify-center rounded-xl border-2 ${
              source === 'gm' ? 'border-lime-600' : 'border-blue-800'
            } px-6 py-2`}
          >
            <Image
              src={`/icons/${source === 'gm' ? 'mirror-gr' : 'gm'}-icon.svg`}
              alt="Mirror icon"
              width="11.79px"
              height="16px"
            />
          </span>
        </div>
        <h4 className="mt-12 font-demi text-3xl text-indigoGray-80">{title}</h4>
      </div>
      <div
        className="absolute inset-0 -z-10 h-full w-full rounded-lg bg-cover opacity-20"
        style={{ backgroundImage: `url(${bgImageSrc})` }}
      />
    </div>
  );
};
