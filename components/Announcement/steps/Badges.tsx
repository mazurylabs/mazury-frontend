import React from 'react';
import SVG from 'react-inlinesvg';

export const Badges = () => {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div>
        <h1 className="items-center font-demi text-3xl text-indigoGray-90">
          New badges, new you
        </h1>
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          Our credential collection has 4 new shiny badges available
        </p>
      </div>

      <div className="h-[237px] w-fit w-[270px]">
        <SVG src="/icons/badges.svg" height={237} width={270} />
      </div>
    </div>
  );
};
