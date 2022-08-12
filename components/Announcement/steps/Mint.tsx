import React from 'react';
import SVG from 'react-inlinesvg';

export const Mint = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          Mint <span className="italic">everything</span>
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          And do it for free. Now you can mint credentials as NFTs and have them
          tied to you forever. A proper proof of work!
        </p>
      </div>

      <div className="h-[250px] w-fit w-[225px]">
        <SVG src="/icons/mint-showcase.svg" height={250} width={225} />
      </div>
    </div>
  );
};
