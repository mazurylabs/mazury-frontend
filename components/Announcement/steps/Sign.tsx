import React from 'react';
import SVG from 'react-inlinesvg';

export const Sign = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          Signing messages? Never heard of it
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          No more signing every action on Mazury. From now, we save your
          authentication once after sign in and we’re ready to plays as NFTs and
          have them tied to you forever. A proper proof of work!
        </p>
      </div>

      <div className="h-[203px] w-fit w-[298px]">
        <SVG src="/icons/sign.svg" height={203} width={298} />
      </div>
    </div>
  );
};
