import React from 'react';
import SVG from 'react-inlinesvg';

export const BuildspaceIntro = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          Buildspace
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          Complete projects and join the most active community of builders in
          web3. GTFOL and learn more at{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://buildspace.so/"
            className="underline"
          >
            buildspace.so
          </a>
        </p>
      </div>

      <div className="h-[250px] w-fit w-[225px]">
        <SVG src="/icons/buildspaceIntro.svg" height={250} width={225} />
      </div>
    </div>
  );
};
