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
      className='border shadow-base rounded-xl p-6 flex flex-col gap-4 hover:cursor-pointer hover:shadow-lg transition-shadow'
      onClick={() => window.open(link, '_blank')}
    >
      <div className='flex items-center gap-2'>
        <Avatar
          src={author.avatarSrc}
          alt={`${author.username}'s avatar`}
          width='32px'
          height='32px'
        />
        <h5 className='font-bold font-serif text-xl text-indigoGray-90'>
          {author.username}
        </h5>

        <span className='border-2 border-blue-600 text-blue-600 rounded-xl px-6 py-1 ml-auto text-sm'>
          gm
        </span>
      </div>
      <p className='text-indigoGray-80 text-[16px]'>{content}</p>
      <div className='flex items-center'>
        <Image
          src='/icons/arrow-circle-up.svg'
          alt='Upvote post'
          width='16px'
          height='16px'
        />
        <span className='text-indigoGray-90 text-xs mx-1'>{upvoteCount}</span>
        <Image
          src='/icons/arrow-circle-down.svg'
          alt='Downvote post'
          width='16px'
          height='16px'
        />

        <div className='ml-4'></div>
        <Image
          src='/icons/comment-alt.svg'
          alt='Comment icon'
          width='16px'
          height='16px'
        />
        <span className='text-indigoGray-90 text-xs ml-1'>{commentCount}</span>
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
}

export const MirrorPost: React.FC<MirrorPostProps> = ({
  author,
  title,
  link,
  bgImageSrc,
}) => {
  return (
    <div className='relative'>
      <div
        className='border shadow-base rounded-xl p-6 flex flex-col gap-4 hover:cursor-pointer hover:shadow-lg transition-shadow bg-transparent z-10 h-full'
        onClick={() => window.open(link, '_blank')}
      >
        <div className='flex items-center gap-2'>
          <Avatar
            src={author.avatarSrc}
            alt={`${author.username}'s avatar`}
            width='32px'
            height='32px'
          />
          <h5 className='font-bold font-serif text-xl text-indigoGray-90'>
            {author.username}
          </h5>

          <span className='border-2 border-lime-600 text-lime-600 rounded-xl px-6 py-2 ml-auto'>
            <Image
              src='/icons/mirror-icon.svg'
              alt='Mirror icon'
              width='16px'
              height='16px'
            />
          </span>
        </div>
        <h4 className='font-demi text-3xl text-indigoGray-80 mt-12'>{title}</h4>
      </div>
      <div
        className='absolute rounded-lg inset-0 h-full w-full opacity-20 -z-10 bg-cover'
        style={{ backgroundImage: `url(${bgImageSrc})` }}
      />
    </div>
  );
};
