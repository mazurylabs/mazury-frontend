import React from 'react';
import SVG from 'react-inlinesvg';

export const GitPOAPIntro = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          GitPOAP
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          Collect poaps for your open source contributions! Learn more at{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://gitpoap.io"
            className="underline"
          >
            gitpoap.io
          </a>
        </p>
      </div>

      <div className="h-[250px] w-fit w-[225px]">
        <SVG src="/icons/gitpoapIntro.svg" height={250} width={225} />
      </div>
    </div>
  );
};
