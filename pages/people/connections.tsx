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
        <div className="w-full bg-white pt-9">
          <Link href="/">
            <a className="h-6 w-6">
              <SVG src="/icons/arrow-left.svg" height={24} width={24} />
              <span className="sr-only">Go back</span>
            </a>
          </Link>

          <h1 className="mt-3 mb-4 font-serif text-4xl font-semibold lg:mb-12">
            Your connections
          </h1>
        </div>

        <p className="mb-8 font-sans text-sm font-medium text-indigoGray-60 lg:block lg:max-w-4xl lg:text-xs">
          We are working hard to connect you with selected talent. We have
          emails to some, for other we will run our custom searches.<br></br>The
          process can take up to few days. If you have any problems, please
          message us at
          <a
            className="ml-1 font-bold text-indigo-600"
            href="mailto:recruiting@mazury.xyz"
            target="_blank"
            rel="noreferrer"
          >
            recruiting@mazury.xyz
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
      </div>
    </Layout>
  );
};

export default Connections;
