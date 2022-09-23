import React from 'react';
import SVG from 'react-inlinesvg';

export const CredentialsIntro = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          New credentials arrived!
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          We added 5 new integrations to make your profile stand out even more.
          Let&apos;s learn more about them!
        </p>
      </div>

      <div className="h-[250px] w-fit w-[225px]">
        <SVG src="/icons/credentialsIntro.svg" height={250} width={225} />
      </div>
    </div>
  );
};
