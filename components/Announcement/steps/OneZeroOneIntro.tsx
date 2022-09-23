import React from 'react';
import SVG from 'react-inlinesvg';

export const OneZeroOneIntro = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          101
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          Learn from online courses and receive NFT certificates! Learn more at{' '}
          <a target="_blank" href="https://101.xyz/" className="underline">
            101.xyz
          </a>
        </p>
      </div>

      <div className="h-[250px] w-fit w-[225px]">
        <SVG src="/icons/101Intro.svg" height={250} width={225} />
      </div>
    </div>
  );
};
