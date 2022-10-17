import { Layout } from '@/components';
import Link from 'next/link';
import SVG from 'react-inlinesvg';
import Image from 'next/image';
import React from 'react';

const dummyconnections = [
  {
    avatar: '/avatar-2.png',
    userName: 'tranqui.eth',
    status: 'Processing',
  },
  {
    avatar: '/avatar-2.png',
    userName: 'dhiahfioahsoifa.eth',
    status: 'Denied',
  },
  {
    avatar: '/avatar-2.png',
    userName: 'matt.eth',
    status: 'Accepted',
  },
  {
    avatar: '/avatar-2.png',
    userName: 'woj.eth',
    status: 'Denied',
  },
  {
    avatar: '/avatar-2.png',
    userName: 'shluc.eth',
    status: 'Processing',
  },
  {
    avatar: '/avatar-2.png',
    userName: 'tranqui.eth',
    status: 'Processing',
  },
  {
    avatar: '/avatar-2.png',
    userName: 'dhiahfioahsoifa.eth',
    status: 'Denied',
  },
  {
    avatar: '/avatar-2.png',
    userName: 'matt.eth',
    status: 'Accepted',
  },
  {
    avatar: '/avatar-2.png',
    userName: 'woj.eth',
    status: 'Denied',
  },
  {
    avatar: '/avatar-2.png',
    userName: 'shluc.eth',
    status: 'Processing',
  },
];

const YourConnections = () => {
  return (
    <Layout variant="plain">
      <div className="mt-9 mb-10 px-4 lg:mt-16 lg:px-8">
        <div>
          <Link href="/">
            <a className="h-6 w-6">
              <SVG src="/icons/arrow-left.svg" height={24} width={24} />
              <span className="sr-only">Go back</span>
            </a>
          </Link>

          <h1 className="font-serif text-4xl font-semibold">
            Your connections
          </h1>

          <hr className="mt-4 mb-8 hidden w-full border border-indigoGray-20 lg:block" />
        </div>

        <p className="mb-6 hidden font-sans text-xs font-medium text-indigoGray-60 lg:block">
          Connections are in testing. If you have any problems message us at
          <a
            className="ml-1 font-bold text-indigo-600"
            href="mailto:wojtek@mazury.xyz"
            target="_blank"
          >
            wojtek@mazury.xyz
          </a>
        </p>

        <div className="mt-[34px] grid w-full grid-cols-1 gap-y-7 lg:mt-0 lg:grid-cols-2 lg:gap-6">
          {dummyconnections.map((connection, index) => (
            <div key={index}>
              <div className="flex items-center">
                <Image
                  height={40}
                  width={40}
                  src={connection.avatar}
                  layout="fixed"
                  alt={connection.userName}
                />
                <div className="ml-3 flex flex-col">
                  <h4 className="font-serif text-base lowercase text-indigoGray-70">
                    {connection.userName}
                  </h4>
                  <p className="font-sans text-xs font-medium capitalize">
                    {connection.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 font-sans text-xs font-medium text-indigoGray-60 lg:hidden">
          Connections are in testing. If you have any problems message us at
          <a
            className="ml-1 font-bold text-indigo-600"
            href="mailto:wojtek@mazury.xyz"
            target="_blank"
          >
            wojtek@mazury.xyz
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default YourConnections;
