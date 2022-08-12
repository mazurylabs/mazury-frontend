import React from 'react';
import SVG from 'react-inlinesvg';

export const Intro = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div className="flex justify-center">
        <h1 className="max-w-[70%] items-center text-center font-demi text-3xl text-indigoGray-90">
          Mazury has been updated
        </h1>
      </div>

      <div className="h-[150px] w-fit w-[150px]">
        <SVG src="/icons/updated.svg" height={150} width={150} />
      </div>
    </div>
  );
};
