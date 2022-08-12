import React from 'react';
import SVG from 'react-inlinesvg';

export const Icons = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          New icons. Who dis?
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          We replaced our old pack with a new, properly customised one that will
          make our look even better
        </p>
      </div>

      <div className="h-[300px] w-fit w-[300px]">
        <SVG src="/icons/icons.svg" height={300} width={300} />
      </div>
    </div>
  );
};
