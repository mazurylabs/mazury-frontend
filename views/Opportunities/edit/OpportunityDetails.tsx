import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button } from 'components';
import { CustomInput } from '../CustomInput';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

export const OpportunityDetails: React.FC<Props> = ({ onSubmit, onBack }) => {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="space-y-3">
        <CustomInput label="Opportunity title" placeholder="Insert title" />
        <CustomInput label="Location" placeholder="Insert location" />
        <div className="space-y-1">
          <p className="font-sans text-sm text-indigoGray-40">Work mode</p>
          <div className="flex space-x-2">
            <button
              type="button"
              className="font-sans border border-indigoGray-20 w-full grow py-3 rounded-md text-indigoGray-50 text-xs font-medium"
            >
              Remote
            </button>
            <button
              type="button"
              className="font-sans border border-indigoGray-20 w-full grow py-3 rounded-md text-indigoGray-50 text-xs font-medium"
            >
              Hybrid
            </button>
            <button
              type="button"
              className="font-sans border border-indigoGray-20 w-full grow py-3 rounded-md text-indigoGray-50 text-xs font-medium"
            >
              On site
            </button>
          </div>
        </div>
        <CustomInput
          label="Link to more information"
          placeholder="Insert link"
        />
        <CustomInput
          label="Compensation range"
          placeholder="Insert salary"
          info="Please specify if annual, monthly or hourly"
        />
      </div>

      <div className="flex w-full justify-between">
        <Button variant="tertiary" size="large" onClick={onBack}>
          <SVG src="/icons/chevron-left.svg" className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          variant="primary"
          size="large"
          className="text-indigoGray-5 ml-[auto] bg-teal-600"
          type="submit"
        >
          Continue{' '}
          <SVG src="/icons/chevron-right.svg" className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
