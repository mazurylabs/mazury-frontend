import * as React from 'react';
import ScrollLock from 'react-scrolllock';
import clsx from 'clsx';

import { Profile } from 'types';
import { Talent } from './Talent';

interface Props {
  result: Profile[];
}

const Tag = ({
  label,
  highlighted,
}: {
  label?: string;
  highlighted?: boolean;
}) => {
  return (
    <p
      className={clsx(
        highlighted && 'bg-emerald-50 text-emerald-900',
        'flex h-fit w-fit items-center rounded bg-indigoGray-5 px-2 py-1 font-sans text-xs font-bold text-indigoGray-90'
      )}
    >
      {(label as string)[0].toUpperCase() + label?.slice(1)}
    </p>
  );
};

export const SearchResults = React.forwardRef<HTMLDivElement, Props>(
  ({ result }, ref) => {
    return (
      <ScrollLock>
        <div className="my-6 h-[100px] grow overflow-y-auto">
          <div className="m-1 h-fit space-y-4">
            <Talent result={result} />
          </div>
        </div>
      </ScrollLock>
    );
  }
);
