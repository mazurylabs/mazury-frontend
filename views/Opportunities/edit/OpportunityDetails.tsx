import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button } from 'components';
import { CustomInput } from '../CustomInput';
import { EditStepsEnum } from 'pages/opportunities/[opportunityId]/edit';
import { OpportunityType } from 'types';
import clsx from 'clsx';

interface Props {
  opportunity?: OpportunityType<string>;
  onChange: (opportunity: Partial<OpportunityType<string>>) => void;
  onNavigate: (step: EditStepsEnum) => void;
}

export const OpportunityDetails: React.FC<Props> = ({
  onChange,
  onNavigate,
  opportunity,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNavigate(EditStepsEnum.DESCRIPTION);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-3">
        <CustomInput
          label="Opportunity title"
          placeholder="Insert title"
          value={opportunity?.title}
          onChange={(value) => onChange({ title: value })}
        />
        <CustomInput
          label="Location"
          placeholder="Insert location"
          value={opportunity?.location}
          onChange={(value) => onChange({ location: value })}
        />
        <div className="space-y-1">
          <p className="font-sans text-sm text-indigoGray-40">Work mode</p>
          <div className="flex space-x-2">
            <button
              type="button"
              className={clsx(
                'font-sans w-full grow py-3 rounded-md text-indigoGray-50 text-xs font-medium',
                opportunity?.work_mode === 'remote'
                  ? 'border-[1.5px] border-indigo-600 bg-indigo-50'
                  : 'border border-indigoGray-20'
              )}
              onClick={() => onChange({ work_mode: 'remote' })}
            >
              Remote
            </button>
            <button
              type="button"
              className={clsx(
                'font-sans w-full grow py-3 rounded-md text-indigoGray-50 text-xs font-medium',
                opportunity?.work_mode === 'hybrid'
                  ? 'border-[1.5px] border-indigo-600 bg-indigo-50'
                  : 'border border-indigoGray-20'
              )}
              onClick={() => onChange({ work_mode: 'hybrid' })}
            >
              Hybrid
            </button>

            <button
              type="button"
              className={clsx(
                'font-sans w-full grow py-3 rounded-md text-indigoGray-50 text-xs font-medium',
                opportunity?.work_mode === 'on-site'
                  ? 'border-[1.5px] border-indigo-600 bg-indigo-50'
                  : 'border border-indigoGray-20'
              )}
              onClick={() => onChange({ work_mode: 'on-site' })}
            >
              On site
            </button>
          </div>
        </div>
        <CustomInput
          label="Link to more information"
          placeholder="Insert link"
          value={opportunity?.website}
          onChange={(value) => onChange({ website: value })}
        />
        <CustomInput
          label="Compensation range"
          placeholder="Insert salary"
          info="Please specify if annual, monthly or hourly"
          value={opportunity?.salary}
          onChange={(value) => onChange({ salary: value })}
        />
      </div>

      <div className="flex w-full justify-between">
        <Button
          variant="tertiary"
          size="large"
          onClick={() => onNavigate(EditStepsEnum.COMPANY_INFORMATION)}
        >
          <SVG src="/icons/chevron-left.svg" className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          variant="primary"
          size="large"
          className="text-indigoGray-5 ml-[auto] bg-teal-600"
          type="submit"
          // disabled={
          //   !opportunity?.salary ||
          //   !opportunity?.location ||
          //   !opportunity?.title ||
          //   !opportunity?.website
          // }
        >
          Continue{' '}
          <SVG src="/icons/chevron-right.svg" className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
