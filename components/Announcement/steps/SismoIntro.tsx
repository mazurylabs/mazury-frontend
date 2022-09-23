import React from 'react';
import SVG from 'react-inlinesvg';

export const SismoIntro = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          Sismo
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          Mint badges for your web3 achievements in a private. Learn more at{' '}
          <a target="_blank" href="https://sismo.io/" className="underline">
            sismo.io
          </a>
        </p>
      </div>

      <div className="h-[250px] w-fit w-[225px]">
        <SVG src="/icons/sismoIntro.svg" height={250} width={225} />
      </div>
    </div>
  );
};
