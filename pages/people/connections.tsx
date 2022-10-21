import { Layout } from '@/components';
import Link from 'next/link';
import SVG from 'react-inlinesvg';
import React from 'react';
import { useConnections } from '../../hooks';

const connectionStatusColor = {
  pending: 'text-yellow-600',
  accepted: 'text-green-600',
  declined: 'text-indigoGray-60',
};

const Connections = () => {
  const { connections } = useConnections();

  return (
    <Layout variant="plain">
      <div className="mb-10 px-4 lg:mt-16 lg:px-8">
        <div className="sticky z-50 w-full bg-white pt-9">
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
            rel="noreferrer"
          >
            wojtek@mazury.xyz
          </a>
        </p>

        <div className="mt-[34px] grid w-full grid-cols-1 gap-y-7 lg:mt-0 lg:grid-cols-2 lg:gap-6">
          {connections?.map((connection, index) => (
            <div key={index}>
              <Link
                href={`/people/${connection.requested_profile.eth_address}`}
              >
                <a className="flex items-center">
                  <img
                    className="h-10 w-10 overflow-hidden rounded-full"
                    src={connection.requested_profile.avatar}
                    alt={connection.requested_profile.username}
                  />
                  <div className="ml-3 flex flex-col">
                    <h4 className="font-serif text-base lowercase text-indigoGray-70">
                      {connection.requested_profile.username}
                    </h4>
                    <p
                      className={`font-sans text-xs font-medium capitalize ${
                        connectionStatusColor[connection.status]
                      }`}
                    >
                      {connection.status}
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 font-sans text-xs font-medium text-indigoGray-60 lg:hidden">
          Connections are in testing. If you have any problems message us at
          <a
            className="ml-1 font-bold text-indigo-600"
            href="mailto:wojtek@mazury.xyz"
            target="_blank"
            rel="noreferrer"
          >
            wojtek@mazury.xyz
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default Connections;
