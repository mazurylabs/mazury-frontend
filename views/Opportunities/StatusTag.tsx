import * as React from 'react';
import clsx from 'clsx';

import { ProjectProfileStatus } from 'types';

export const StatusTags: React.FC<{ status: ProjectProfileStatus }> = ({
  status,
}) => {
  return (
    <div
      className={clsx(
        'flex w-fit items-center space-x-2 rounded-md border py-[2px] px-2',
        status === 'contacted' && 'border-green-200 bg-green-50 text-green-600',
        (!status || status === 'uncontacted') &&
          'border-indigoGray-20 bg-indigoGray-5 text-indigoGray-60',
        status === 'toBeContacted' &&
          'border-amber-200 bg-amber-50 text-amber-600'
      )}
    >
      <div
        className={clsx(
          'h-2 w-2 rounded-full',
          status === 'contacted' && 'bg-green-600',
          (!status || status === 'uncontacted') && 'bg-indigoGray-60',
          'toBeContacted' && 'bg-amber-600'
        )}
      />
      <p className="font-sans text-[13px]">
        {!status || status === 'uncontacted'
          ? 'Not contacted'
          : status === 'contacted'
          ? 'Contacted'
          : 'To be contacted'}
      </p>
    </div>
  );
};
