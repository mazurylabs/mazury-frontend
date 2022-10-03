import Link from 'next/link';
import React from 'react';
import SVG from 'react-inlinesvg';
import Image from 'next/image';

const ApplicationView = () => {
  return (
    <div className="mt-9 px-4 lg:mt-16 lg:px-8">
      <div className="mb-3 lg:mb-4">
        <Link href="/jobs/manage-post">
          <SVG src="/icons/arrow-left.svg" height={24} width={24} />
        </Link>
      </div>

      <h1 className="font-serif text-4xl font-semibold text-indigoGray-90">
        nazeeh’s application
      </h1>

      <div className="mt-3 flex flex-row items-center">
        <h3 className="font-sans text-sm font-medium text-indigoGray-90">
          NFT x DeFi Content Writer
        </h3>
        <div className="ml-[24.67px] flex items-center">
          <SVG src="/icons/Time.svg" width={16} height={16} />
          <span className="ml-1 font-sans font-medium capitalize text-indigoGray-40">
            today
          </span>
        </div>
      </div>

      <div className="my-6 h-[auto] w-full rounded-lg bg-fuchsia-50 p-3">
        <div className="flex w-full flex-row items-start">
          <Image
            src="/avatar-4.png"
            width="48px"
            height="49px"
            alt="user profile avatar"
            className="rounded-full"
          />

          <div className="ml-[15.5px]">
            <p className="font-serif text-base font-semibold text-indigoGray-90">
              nazeeh.eth
            </p>
            <div className="my-[3px] flex flex-row items-center">
              <p className="mr-6 font-sans text-xs font-medium text-indigoGray-40">
                Nazeeh Vahora
              </p>
              <p className="flex flex-row items-center font-sans text-xs font-medium text-indigoGray-90">
                <SVG
                  src="/icons/map-pin.svg"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                India
              </p>
            </div>

            <p className="flex flex-row items-center font-sans text-xs font-medium text-indigoGray-70">
              nazeeh.eth (0xf...867)
              <SVG
                src="/icons/clipboard.svg"
                width={16}
                height={16}
                className="ml-2"
              />
            </p>
          </div>
        </div>

        <p className="my-3 font-sans text-xs font-medium text-indigoGray-70">
          I'm a 21 year old frontend developer and technical writer. Currently I
          am working as a frontend engineer at ReImagined Finance and am also an
          active member of Developer DAO, MoonshotCollective andMMM Workstream
        </p>

        <button className="mt-3 h-[37px] w-full rounded-lg bg-fuchsia-600 font-sans text-sm font-semibold text-fuchsia-50 hover:shadow-lg">
          See profile
        </button>
      </div>
    </div>
  );
};

export default ApplicationView;
