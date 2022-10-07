import * as React from 'react';
import ScrollLock from 'react-scrolllock';

import { Profile } from 'types';
import { Talent } from './Talent';

interface Props {
  result: Profile[];
}

export const SearchResults = React.forwardRef<HTMLDivElement, Props>(
  ({ result }, ref) => {
    return (
      <ScrollLock>
        <div className="mt-6 h-[100px] grow overflow-y-auto">
          <div className="m-1 h-fit space-y-4">
            <Talent result={result} />
            {result.length >= 20 && (
              <div ref={ref} className="h-[1px] w-full bg-transparent" />
            )}
          </div>
        </div>
      </ScrollLock>
    );
  }
);
