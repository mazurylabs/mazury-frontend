import Link from 'next/link';
import { useState } from 'react';
import SVG from 'react-inlinesvg';

export const RecruiterModalContent = () => {
  return (
    <div className="mt-6 flex h-[240px] lg:h-[250px]">
      <div>
        <div className="flex flex-col items-center">
          <SVG src="/icons/approved.svg" height={64} width={64} />
        </div>

        <h3 className="mt-6 mb-2 font-serif text-3xl font-semibold text-indigoGray-90">
          Request in processing
        </h3>
        <p className="font-sans text-sm font-normal text-indigoGray-90">
          For safety we are processing contact data manually at this point. We
          will inform you once the contact data is available.
        </p>
      </div>
    </div>
  );
};
