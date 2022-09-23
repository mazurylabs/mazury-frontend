import React from 'react';
import SVG from 'react-inlinesvg';

export const KudosIntro = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          Kudos
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          Capture community contributions with NFT kudos. Learn more at{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://mintkudos.xyz/"
            className="underline"
          >
            mintkudos.xyz
          </a>
        </p>
      </div>

      <div className="h-[250px] w-fit w-[225px]">
        <SVG src="/icons/kudosIntro.svg" height={250} width={225} />
      </div>
    </div>
  );
};
