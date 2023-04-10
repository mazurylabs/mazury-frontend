import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button } from 'components';

interface Props {
  onSubmit: () => void;
}

export const OpportunityType: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-1">
        <p className="font-sans text-sm text-indigoGray-40">
          Choose what you want to advertise
        </p>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
          <button
            type="button"
            className="grow font-sans border border-indigoGray-20 w-full py-3 rounded-md text-indigoGray-50 text-xs font-medium"
          >
            Job
          </button>
          <button
            type="button"
            className="grow font-sans border border-indigoGray-20 w-full py-3 rounded-md text-indigoGray-50 text-xs font-medium"
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
          onClick={onSubmit}
        >
          Continue{' '}
          <SVG src="/icons/chevron-right.svg" className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
