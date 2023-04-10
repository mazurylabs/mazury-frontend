import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button } from 'components';
import { CustomInput } from '../CustomInput';

interface Props {
  onSave: () => void;
  onSubmit: () => void;
  onBack: () => void;
}

interface Company {
  name: string;
  email: string;
  description: string;
  size: number;
  logo: string;
}

export const CompanyInformation: React.FC<Props> = ({
  onSubmit,
  onSave,
  onBack,
}) => {
  const [company, setCompany] = React.useState<Company>();

  return (
    <div className="w-full space-y-4">
      <form
        // onSubmit={onSubmit}
        className="border rounded-lg px-4 py-3 border-indigoGray-20 w-full space-y-4"
      >
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-[5px] flex items-center justify-center bg-indigoGray-5 border border-indigoGray-20">
            <SVG src="/icons/plus.svg" className="text-indigoGray-90 w-4 h-4" />
          </div>
          <p className="font-sans text-sm font-medium text-indigoGray-90">
            New company
          </p>
        </div>

        <div className="space-y-3">
          <CustomInput label="Contact e-mail" placeholder="Insert e-mail" />
          <CustomInput label="Contact name" placeholder="Insert name" />
          <CustomInput
            label="Description"
            placeholder="Write a short description"
          />
          <Button variant="primary" className="font-semibold" onClick={onSave}>
            Save information
          </Button>
        </div>
      </form>

      <div className="flex w-full justify-between">
        <Button variant="tertiary" size="large" onClick={onBack}>
          <SVG src="/icons/chevron-left.svg" className="mr-2 h-4 w-4" />
          Back
        </Button>

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
