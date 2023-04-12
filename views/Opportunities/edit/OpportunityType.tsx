import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';

import { Button } from 'components';
import { OpportunityType as Opportunity } from 'types';

interface Props {
  opportunity?: Opportunity<string>;
  onSubmit: (opportunity: Partial<Opportunity<string>>) => void;
  onNavigate: () => void;
}

export const OpportunityType: React.FC<Props> = ({
  opportunity,
  onSubmit,
  onNavigate,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-1">
        <p className="font-sans text-sm text-indigoGray-40">
          Choose what you want to advertise
        </p>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
          <button
            type="button"
            className={clsx(
              'grow font-sans w-full py-3 rounded-md text-indigoGray-50 text-xs font-medium',
              opportunity?.type === 'job'
                ? 'border-[1.5px] border-indigo-600 bg-indigo-50'
                : 'border border-indigoGray-20'
            )}
            onClick={() => onSubmit({ type: 'job' })}
          >
            Job
          </button>
          <button
            type="button"
            className={clsx(
              'grow font-sans w-full py-3 rounded-md text-indigoGray-50 text-xs font-medium',
              opportunity?.type === 'other'
                ? 'border-[1.5px] border-indigo-600 bg-indigo-50'
                : 'border border-indigoGray-20'
            )}
            onClick={() => onSubmit({ type: 'other' })}
          >
            Other
          </button>
        </div>
      </div>

      <div className="flex">
        <Button
          variant="primary"
          size="large"
          className="text-indigoGray-5 ml-[auto] bg-teal-600"
          onClick={onNavigate}
          disabled={!opportunity?.type}
        >
          Continue{' '}
          <SVG src="/icons/chevron-right.svg" className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
