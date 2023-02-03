import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import Link from 'next/link';

import { Layout } from 'components';
import { Container, FilterSearch, ProfileSummary } from 'views/Profile';
import { useAccount } from 'hooks';
import { Profile } from 'types';

const dummyPosts = [
  {
    type: 'lens',
    id: '1',
    replies: '7',
    likes: '12',
    quotes: '3',
    saves: '1',
    url: '#',
    author: { username: 'nazeeth.eth', avatar: '/icons/dummy-user.svg' },
    description:
      "wojtek is one of the smartest and kindest friends i've had the honor to meet. unreserved support for whatever he brings into existence with his big brain. LFG 🌊",
  },
  {
    type: 'mirro',
    id: '3',
    url: '#',
    author: { username: 'nazeeth.eth', avatar: '/icons/dummy-user.svg' },
    banner: '/badges/dummy-post2.png',
    date: 'November 30th, 2021',
    description: 'Mazury is launching soon! What does it mean?',
  },
  {
    type: 'lens',
    id: '2',
    replies: '7',
    likes: '12',
    quotes: '3',
    saves: '1',
    url: '#',
    author: { username: 'nazeeth.eth', avatar: '/icons/dummy-user.svg' },
    description:
      "wojtek is one of the smartest and kindest friends i've had the honor to meet. unreserved support for whatever he brings into existence with his big brain. LFG 🌊",
  },

  {
    type: 'lens',
    id: '4',
    replies: '7',
    likes: '12',
    quotes: '3',
    saves: '1',
    url: '#',
    author: { username: 'nazeeth.eth', avatar: '/icons/dummy-user.svg' },
    description: 'jfhdeshfkjdsjk',
  },
  {
    type: 'lens',
    id: '5',
    replies: '7',
    likes: '12',
    quotes: '3',
    saves: '1',
    url: '#',
    author: { username: 'nazeeth.eth', avatar: '/icons/dummy-user.svg' },
    description: 'jfhdeshfkjdsjk',
  },
  {
    type: 'mirro',
    id: '6',
    url: '#',
    author: { username: 'nazeeth.eth', avatar: '/icons/dummy-user.svg' },
    banner: '/badges/dummy-post2.png',
    date: 'November 30th, 2021',
    description: 'Mazury is launching soon! What does it mean?',
  },
];

interface WritingProps {
  address: string;
}

interface Post {
  author: { username: string; avatar: string };
  description: string;
  url: string;
}

const Writing = ({ address }: WritingProps) => {
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);

  const navItems = [
    { label: 'Overview', isActive: false, href: `/people/${address}` },
    {
      label: 'Credentials',
      isActive: false,
      value: '0',
      icon: '/icons/credentials.svg',
      href: `/people/${address}/credentials`,
    },
    {
      label: 'Writing',
      isActive: true,
      value: '0',
      icon: '/icons/writing-active.svg',
      href: `/people/${address}/writing`,
    },
    {
      label: 'Socials',
      isActive: false,
      value: '0',
      icon: '/icons/dao.svg',
      href: `/people/${address}/socials`,
    },
  ];

  return (
    <Layout variant="plain">
      <Container
        navItems={navItems}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user.profile as Profile}
            isOwnProfile={isOwnProfile}
          />
        }
      >
        <div className="space-y-6">
          <div className="flex w-full items-center space-x-4">
            <FilterSearch
              dropdown={{
                onSelect: () => {},
                options: [],
                label: 'credentials',
                className: 'grow',
              }}
              defaultView="dropdown"
            />
            <button
              aria-label="search"
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigoGray-5"
            >
              <SVG src="/icons/search-black.svg" height={24} width={24} />
            </button>
          </div>

          <div className="columns-2 gap-6">
            {dummyPosts.map(({ id, type, ...rest }) => {
              if (type === 'lens')
                return (
                  <Lens
                    key={id}
                    {...(rest as LensPost)}
                    detailUrl={`/people/${address}/writing/${id}`}
                  />
                );

              return (
                <Mirror
                  key={id}
                  {...(rest as MirrorPost)}
                  detailUrl={`/people/${address}/writing/${id}`}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Writing;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};

interface LensPost extends Post {
  replies: string;
  likes: string;
  quotes: string;
  saves: string;
  detailUrl: string;
}

const Lens = ({
  replies,
  likes,
  quotes,
  saves,
  url,
  author,
  description,
  detailUrl,
}: LensPost) => {
  return (
    <Link href={detailUrl}>
      <a className="mb-6 flex w-full flex-col space-y-3 rounded-lg bg-indigoGray-5 py-3 px-4">
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

          <p className="font-sans text-sm text-indigoGray-90">{description}</p>
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
                src="/icons/message-circle.svg"
                className="mr-1"
              />
              {quotes}
            </p>
            <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
              <SVG
                height={16}
                width={16}
                src="/icons/message-circle.svg"
                className="mr-1"
              />
              {likes}
            </p>
            <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
              <SVG
                height={16}
                width={16}
                src="/icons/message-circle.svg"
                className="mr-1"
              />
              {saves}
            </p>
          </div>

          <a
            className="flex items-center space-x-2 font-sans text-xs font-semibold text-[#8b5df5]"
            target="_blank"
            rel="noreferrer"
            href={url}
          >
            <SVG height={16} width={16} src="/icons/lenster-indigo.svg" />
            <span>See on Lenster</span>
            <SVG src="/icons/chevron-right-indigo.svg" height={16} width={16} />
          </a>
        </div>
      </a>
    </Link>
  );
};

interface MirrorPost extends Post {
  date: string;
  banner: string;
  detailUrl: string;
}

const Mirror = ({
  author,
  description,
  date,
  url,
  banner,
  detailUrl,
}: MirrorPost) => {
  return (
    <Link href={detailUrl}>
      <a className="mb-6 flex w-full flex-col space-y-3 overflow-hidden rounded-lg bg-indigoGray-5">
        <div className="h-[200px]">
          <img src={banner} className="h-full w-full" alt="banner" />
        </div>

        <div className="space-y-3 py-3 px-4">
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

          <div className="space-y-1">
            <p className="font-sansMid font-medium text-indigoGray-90">
              {description}
            </p>
            <p className="font-sans text-sm text-indigoGray-90">
              This FAQ was originally posted on our discord, come join us!
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-sansMid text-xs font-medium text-indigoGray-90">
              {date}
            </p>
            <a
              className="flex items-center space-x-2 font-sans text-xs font-semibold text-[#8b5df5]"
              target="_blank"
              rel="noreferrer"
              href={url}
            >
              <SVG height={16} width={16} src="/icons/lenster-indigo.svg" />
              <span>See on Lenster</span>
              <SVG
                src="/icons/chevron-right-indigo.svg"
                height={16}
                width={16}
              />
            </a>
          </div>
        </div>
      </a>
    </Link>
  );
};
