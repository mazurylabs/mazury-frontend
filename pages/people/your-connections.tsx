import { Layout } from '@/components';
import Link from 'next/link';
import SVG from 'react-inlinesvg';
import React from 'react';

const YourConnections = () => {
  return (
    <Layout variant="plain">
      <div className="mt-9 px-4 lg:mt-16 lg:px-8">
        <div className="mb-3 w-full border lg:divide-y lg:border-indigoGray-20 lg:pb-4">
          <Link href="/">
            <a className="h-6 w-6">
              <SVG src="/icons/arrow-left.svg" height={24} width={24} />
              <span className="sr-only">Go back</span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default YourConnections;
